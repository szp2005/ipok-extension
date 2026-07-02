const LANGS = {
  zh: {
    sub: "IP 纯净度",
    detecting: "检测中…",
    failed: "检测失败，请稍后重试",
    full: "查看完整报告 →",
    bands: ["极度纯净", "安全", "警惕", "高风险"],
    types: { residential: "家庭宽带", hosting: "数据中心/机房", mobile: "移动蜂窝", business: "商业宽带", unknown: "未知" },
    votesTitle: "多源投票",
    votesSplit: "源之间有分歧，按共识门槛裁定",
    votesAgree: "源一致",
  },
  en: {
    sub: "IP purity",
    detecting: "Detecting…",
    failed: "Detection failed, try again later",
    full: "Full report →",
    bands: ["Pristine", "Clean", "Caution", "High risk"],
    types: { residential: "Residential", hosting: "Datacenter", mobile: "Mobile", business: "Business", unknown: "Unknown" },
    votesTitle: "Source votes",
    votesSplit: "Sources disagree — resolved by consensus threshold",
    votesAgree: "sources agree",
  },
};

// 各风险类别的展示标签 + 颜色（与网站 ConsensusCard 同口径）。多源投票=聚合器独有透明层。
const CVOTE = {
  tor: { zh: "Tor 出口", en: "Tor exit", c: "#ef4444" },
  proxy: { zh: "代理", en: "Proxy", c: "#ef4444" },
  vpn: { zh: "VPN", en: "VPN", c: "#f97316" },
  abuser: { zh: "滥用历史", en: "Abuse", c: "#ef4444" },
  hosting: { zh: "机房", en: "Datacenter", c: "#eab308" },
  mobile: { zh: "移动网络", en: "Mobile", c: "#38bdf8" },
  bot: { zh: "机器人", en: "Bot", c: "#a78bfa" },
};

const SVC = { chatgpt: "ChatGPT", claude: "Claude", gemini: "Gemini" };
const TYPE_COLOR = { residential: "#22c55e", hosting: "#f97316", mobile: "#38bdf8", business: "#a78bfa", unknown: "#94a3b8" };

// 接口缓存，防止中英文切换时发起重复网络请求
const apiCache = {
  zh: null,
  en: null,
};

// 自动判断语言首选
function autoLang() {
  const ls = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
  return ls.some((l) => l.toLowerCase().startsWith("zh")) ? "zh" : "en";
}

// 异步读取已保存的语言设置 (兼容 chrome.storage.local 与 localStorage)
async function getLang() {
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    try {
      const res = await new Promise((resolve) => {
        chrome.storage.local.get("ipok-lang", resolve);
      });
      if (res && (res["ipok-lang"] === "zh" || res["ipok-lang"] === "en")) {
        return res["ipok-lang"];
      }
    } catch {}
  }
  try {
    const s = localStorage.getItem("ipok-lang");
    if (s === "zh" || s === "en") return s;
  } catch {}
  return autoLang();
}

// 保存语言设置
async function saveLang(lang) {
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    try {
      await new Promise((resolve) => {
        chrome.storage.local.set({ "ipok-lang": lang }, resolve);
      });
      return;
    } catch {}
  }
  try {
    localStorage.setItem("ipok-lang", lang);
  } catch {}
}

function band(risk, T) {
  if (risk < 15) return { label: T.bands[0], color: "#16a34a" };
  if (risk < 50) return { label: T.bands[1], color: "#22c55e" };
  if (risk < 70) return { label: T.bands[2], color: "#eab308" };
  return { label: T.bands[3], color: "#ef4444" };
}

function show(id, on = true) {
  document.getElementById(id).hidden = !on;
}

// 多源投票共识条：把「N 源里几个说你是代理/滥用/机房」摊开——竞品(ping0/whoer)无此透明层。
function renderConsensus(d, lang, T) {
  const c = d.consensus;
  const box = document.getElementById("consensus");
  box.innerHTML = "";
  if (!c || !c.votes || c.votes.length === 0 || !c.total) {
    box.hidden = true;
    return;
  }
  box.hidden = false;
  const title = document.createElement("div");
  title.className = "ctitle";
  title.textContent = T.votesTitle + " · /" + c.total;
  box.appendChild(title);
  c.votes.forEach((v) => {
    const m = CVOTE[v.key] || { zh: v.key, en: v.key, c: "#94a3b8" };
    const row = document.createElement("div");
    row.className = "crow";
    const lab = document.createElement("span");
    lab.className = "clabel";
    lab.textContent = lang === "en" ? m.en : m.zh;
    const bar = document.createElement("div");
    bar.className = "cbar";
    const fill = document.createElement("div");
    fill.className = "cfill";
    fill.style.width = Math.round((v.count / c.total) * 100) + "%";
    fill.style.background = m.c;
    bar.appendChild(fill);
    const num = document.createElement("span");
    num.className = "cnum";
    num.style.color = v.count === c.total ? m.c : "rgba(255,255,255,.55)";
    num.textContent = v.count + "/" + c.total;
    row.append(lab, bar, num);
    box.appendChild(row);
  });
  const note = document.createElement("div");
  note.className = "cnote";
  if (c.disagreement) {
    note.style.color = "rgba(251,191,36,.72)";
    note.textContent = T.votesSplit;
  } else {
    note.style.color = "rgba(52,211,153,.72)";
    note.textContent = c.total + "/" + c.total + " " + T.votesAgree;
  }
  box.appendChild(note);
}

async function render(lang, forceReload = false) {
  const T = LANGS[lang];
  document.getElementById("sub").textContent = T.sub;
  document.getElementById("loading").textContent = T.detecting;
  document.getElementById("err-text").textContent = T.failed;
  document.getElementById("full").textContent = T.full;
  document.querySelectorAll(".lbtn").forEach((b) => b.classList.toggle("on", b.dataset.l === lang));

  show("loading", true);
  show("result", false);
  show("error", false);

  try {
    let d = null;
    // 如果没有强制重载且本地有缓存，直接读取缓存
    if (!forceReload && apiCache[lang]) {
      d = apiCache[lang];
    } else {
      // 9s 超时护栏：网络卡住时不无限转圈，走 catch 显示重试
      const ctrl = new AbortController();
      const to = setTimeout(() => ctrl.abort(), 9000);
      let res;
      try {
        res = await fetch("https://ipok.io/api/ip?lang=" + lang, { cache: "no-store", signal: ctrl.signal });
      } finally {
        clearTimeout(to);
      }
      if (!res.ok) throw new Error();
      d = (await res.json()) || {};
      
      // 成功获取后，写入当前语言的缓存，同时清空对立语言的旧缓存以防其过期
      apiCache[lang] = d;
      if (lang === "zh") apiCache.en = null;
      else apiCache.zh = null;
    }

    const g = d.geo || {};
    const b = band(d.risk ?? 0, T);

    document.getElementById("ip").textContent = g.ip || "—";
    document.getElementById("ver").textContent = "IPv" + (g.version || "?");
    document.getElementById("loc").textContent = [g.country, g.city, g.asName || g.isp].filter(Boolean).join(" · ");

    const score = document.getElementById("score");
    score.textContent = d.risk ?? "—";
    score.style.color = b.color;
    const bandEl = document.getElementById("band");
    bandEl.textContent = b.label;
    bandEl.style.color = b.color;
    bandEl.style.background = b.color + "22";

    const tEl = document.getElementById("type");
    const tk = d.ipType || "unknown";
    tEl.textContent = T.types[tk] || tk;
    tEl.style.color = TYPE_COLOR[tk];
    tEl.style.background = TYPE_COLOR[tk] + "22";

    const ai = document.getElementById("ai");
    ai.innerHTML = "";
    (d.services || []).forEach((s) => {
      const ok = s.status === "available";
      const color = ok ? "#22c55e" : s.status === "blocked" ? "#ef4444" : "#94a3b8";
      const el = document.createElement("span");
      el.className = "svc";
      el.style.color = color;
      el.style.background = color + "1a";
      el.textContent = (ok ? "✓ " : s.status === "blocked" ? "✕ " : "? ") + (SVC[s.key] || s.name);
      ai.appendChild(el);
    });

    renderConsensus(d, lang, T);

    const base = lang === "en" ? "https://ipok.io/en" : "https://ipok.io/";
    document.getElementById("full").href = base + (g.ip ? "?ip=" + encodeURIComponent(g.ip) : "");

    show("loading", false);
    show("result", true);
  } catch {
    show("loading", false);
    show("error", true);
  }
}

// 初始化
(async () => {
  let current = await getLang();

  // 绑定语言切换按键
  document.querySelectorAll(".lbtn").forEach((b) =>
    b.addEventListener("click", async () => {
      if (current === b.dataset.l) return;
      current = b.dataset.l;
      await saveLang(current);
      render(current);
    }),
  );

  // 绑定重试按键
  const retryBtn = document.getElementById("retry");
  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      apiCache.zh = null;
      apiCache.en = null;
      render(current, true);
    });
  }

  render(current);
})();
