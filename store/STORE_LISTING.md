# Chrome Web Store 上架文案（IPOK 浏览器插件）

> 复制到开发者后台对应字段即可。建议主语言选「中文（简体）」，再「添加翻译」补英文。
> 截图用 `store/screenshot-1280x800.png`（已生成）；可再补 1-2 张真实弹窗截图。

---

## 基本信息

| 字段 | 内容 |
|------|------|
| **名称 (Name)** | IPOK — IP 纯净度 / 风险检测 |
| **类别 (Category)** | 开发者工具（Developer Tools） |
| **语言** | 中文（简体） + English |
| **官网** | https://ipok.io |
| **隐私政策 URL** | https://ipok.io/privacy |

---

## 简短说明（Summary，≤132 字符）

**中文：**
一键查看当前线路 IP 的纯净度、风险值、原生/机房判定，以及能否使用 ChatGPT / Claude / Gemini。免费、无需登录、无追踪。

**English：**
One-click check of your IP's purity, risk score, residential-vs-datacenter, and ChatGPT/Claude/Gemini availability. Free, no login.

---

## 详细说明（Detailed description）

**中文（简体）：**

IPOK 是一款一键检测当前线路 IP「纯净度 / 风险值」的浏览器插件，数据由 ipok.io 多源聚合提供。点开工具栏图标即可看到：

✅ 风险值（0–100）：多家数据源加权聚合，并解释「为什么被标记」——代理 / VPN / Tor / 机房 / 滥用记录一目了然
✅ IP 类型：家庭宽带 / 数据中心机房 / 移动蜂窝 / 商业，以及是否为「原生 IP」
✅ 归属地 + 运营商 + ASN
✅ AI 服务可用性：当前 IP 能否使用 ChatGPT / Claude / Gemini
✅ 一键跳转完整报告（含网络溯源、BGP、垃圾黑名单、WebRTC/DNS 泄露检测等）

适合谁：
· 跨境电商 / 独立站卖家 —— 换线路前先看这个 IP 干不干净
· 远程办公 / 出海团队 —— 判断当前 IP 会不会被平台风控
· 自建节点 / VPS 用户 —— 快速体检机房 IP 纯净度
· 任何关心「我现在这个 IP 安不安全」的人

隐私优先：
· 免费，无需注册登录
· 不收集、不存储、不追踪，无 Cookie、无埋点
· 仅向 ipok.io 发一次请求来检测当前 IP，不申请任何多余权限
· 评分算法完全公开透明（ipok.io/methodology）

官网：https://ipok.io

**English：**

IPOK is a one-click browser extension that checks your current IP's "purity / risk score", powered by multi-source data from ipok.io. Click the toolbar icon to instantly see:

✅ Risk score (0–100): a weighted blend of multiple sources, with a clear "why it's flagged" — proxy / VPN / Tor / datacenter / abuse history at a glance
✅ IP type: residential / datacenter / mobile / business, plus whether it's a "native IP"
✅ Location + ISP + ASN
✅ AI availability: whether your IP can use ChatGPT / Claude / Gemini
✅ One click to the full report (network intel, BGP, spam blocklists, WebRTC/DNS leak tests…)

Who it's for:
· Cross-border e-commerce & independent sellers — check if an IP is clean before switching lines
· Remote / global teams — see whether your current IP risks being flagged
· VPS / self-hosted node users — quickly audit datacenter IP purity
· Anyone wondering "is the IP I'm on right now safe?"

Privacy first:
· Free, no sign-up
· No data collection, no storage, no tracking, no cookies, no analytics
· Makes a single request to ipok.io to check your current IP; requests no extra permissions
· Fully transparent — the scoring methodology is public (ipok.io/methodology)

Website: https://ipok.io

---

## 单一用途说明（Single purpose — 必填）

**中文：** 检测并展示用户当前出口 IP 的归属地、纯净度 / 风险值与服务可用性信息。

**English：** Detect and display the location, purity / risk score and service availability of the user's current exit IP.

---

## 权限说明（Permission justification）

- **host_permissions: `https://ipok.io/*`** — 用于调用 IPOK 的公开 API（`https://ipok.io/api/ip`）检测当前出口 IP 并返回结果。这是插件运行的唯一外部请求。
- 不申请 tabs、history、storage、cookies 等任何其他权限。

---

## 数据使用声明（Privacy practices —— 按此填，避免"未如实申报"被拒）

> ⚠️ 别勾"不收集任何数据"。插件会向 ipok.io 发请求、由它读到你的出口 IP（=位置数据），Chrome 审核会据此判定属于数据处理，瞒报反而被拒。如实勾、并声明不出售，最稳：

- **Does this item collect or use user data? → 是 (Yes)**
- 数据类型只勾一项：**Location（位置）** —— 即基于 IP 的归属地（插件的核心功能）。
  - 不勾 PII / 健康 / 财务 / 认证 / 通信 / 浏览记录 / 网站内容 等其它项。
- 三项认证全部勾「是 / 符合」：
  1. ✅ 不把用户数据出售或转让给第三方
  2. ✅ 不用于与单一用途无关的目的
  3. ✅ 不用于判断信用 / 放贷
- 隐私政策 URL：`https://ipok.io/privacy`
- 补充说明（可填进备注）：插件本身不存储任何数据；唯一网络请求是向 ipok.io 检测当前出口 IP 并展示结果，IP 是检测对象本身。

---

## 关键词（写进文案以利搜索 + 备查）

IP 纯净度, IP 检测, IP 风险值, 原生IP, 机房IP, 住宅IP, 代理检测, VPN 检测, ChatGPT IP, 跨境电商, 节点检测, 机场, IP 查询, 我的IP,
IP purity, IP checker, IP reputation, fraud score, proxy detection, residential IP, my IP, what is my IP, ChatGPT availability

---

## 上架步骤提醒
1. 把 `/Users/szp2005/ClaudeCode/ipok-extension/`（不含 .git、不含 store/ 也行）打成 zip
2. 开发者后台 → 新增项目 → 上传 zip
3. 填上面的名称 / 简短说明 / 详细说明 / 类别 / 隐私政策 URL
4. 上传 `store/screenshot-1280x800.png` 作为截图
5. 「隐私权」标签：按上面的「数据使用声明」勾选 + 填 host 权限理由
6. 提交审核（1-3 天）
