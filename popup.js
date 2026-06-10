const LANGS = {
  zh: {
    sub: "IP 纯净度",
    detecting: "检测中…",
    failed: "检测失败，请稍后重试",
    full: "查看完整报告 →",
    bands: ["极度纯净", "安全", "警惕", "高风险"],
    types: { residential: "家庭宽带", hosting: "数据中心/机房", mobile: "移动蜂窝", business: "商业宽带", unknown: "未知" },
  },
  en: {
    sub: "IP purity",
    detecting: "Detecting…",
    failed: "Detection failed, try again later",
    full: "Full report →",
    bands: ["Pristine", "Clean", "Caution", "High risk"],
    types: { residential: "Residential", hosting: "Datacenter", mobile: "Mobile", business: "Business", unknown: "Unknown" },
  },
};

const SVC = { chatgpt: "ChatGPT", claude: "Claude", gemini: "Gemini" };
const TYPE_COLOR = { residential: "#22c55e", hosting: "#f97316", mobile: "#38bdf8", business: "#a78bfa", unknown: "#94a3b8" };

// 语言：用户手动选过(localStorage) 优先，否则按浏览器全部偏好语言自动判定（任一为中文即中文）
function autoLang() {
  const ls = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
  return ls.some((l) => l.toLowerCase().startsWith("zh")) ? "zh" : "en";
}
function getLang() {
  try {
    const s = localStorage.getItem("ipok-lang");
    if (s === "zh" || s === "en") return s;
  } catch {}
  return autoLang();
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

async function render(lang) {
  const T = LANGS[lang];
  document.getElementById("sub").textContent = T.sub;
  document.getElementById("loading").textContent = T.detecting;
  document.getElementById("error").textContent = T.failed;
  document.getElementById("full").textContent = T.full;
  document.querySelectorAll(".lbtn").forEach((b) => b.classList.toggle("on", b.dataset.l === lang));

  show("loading", true);
  show("result", false);
  show("error", false);

  try {
    const res = await fetch("https://ipok.io/api/ip?lang=" + lang, { cache: "no-store" });
    if (!res.ok) throw new Error();
    const d = await res.json();
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

    const base = lang === "en" ? "https://ipok.io/en" : "https://ipok.io/";
    document.getElementById("full").href = base + (g.ip ? "?ip=" + encodeURIComponent(g.ip) : "");

    show("loading", false);
    show("result", true);
  } catch {
    show("loading", false);
    show("error", true);
  }
}

let current = getLang();
document.querySelectorAll(".lbtn").forEach((b) =>
  b.addEventListener("click", () => {
    current = b.dataset.l;
    try {
      localStorage.setItem("ipok-lang", current);
    } catch {}
    render(current);
  }),
);
render(current);
