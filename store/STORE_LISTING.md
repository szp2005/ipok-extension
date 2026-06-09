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

**中文：**

点一下工具栏图标，一秒看清当前线路出口 IP 的真实状况——再也不用手动开网站查。

🔍 它能告诉你：
• 公网出口 IP（IPv4 / IPv6）、归属地、ASN / 运营商
• 多源聚合的纯净度 / 风险值，并标注是代理 / VPN / 机房还是滥用 IP
• 原生 IP 还是广播 / 机房 IP
• ChatGPT、Claude、Gemini 在你所在地区是否可用
• 适不适合 TikTok / 跨境电商 / 社媒养号 / AI 应用

适合谁：做跨境电商、社媒运营、用 AI 服务、跑机场 / VPS 节点、或任何在意「我这条 IP 干不干净」的人。

特点：
✓ 免费、无需注册、无任何追踪
✓ 只向 ipok.io 发一次请求检测你的当前 IP，不收集、不存储、不卖数据
✓ 现代简洁的暗色界面
✓ 点「查看完整报告」可在 ipok.io 看 BGP 路由、IP 反查域名、WebRTC / DNS 泄露检测等更多细节

数据来源：ip-api、proxycheck、AbuseIPDB、Scamalytics、RIPEstat 等。结果为最佳努力的诊断参考，不构成任何账号 / 风控的绝对保证。

**English：**

Click the toolbar icon and instantly see the real status of your current exit IP — no more opening a site by hand.

🔍 It tells you:
• Public exit IP (IPv4 / IPv6), location, ASN / ISP
• Multi-source purity / risk score, flagging proxy / VPN / datacenter / abuse
• Native IP vs broadcast / datacenter IP
• Whether ChatGPT, Claude and Gemini are available in your region
• How suitable the IP is for TikTok / e-commerce / social / AI use

Who it's for: cross-border e-commerce, social-media operators, AI users, proxy / VPS users — anyone who cares whether their exit IP is "clean".

Highlights:
✓ Free, no sign-up, zero tracking
✓ Makes a single request to ipok.io to detect your current IP; stores nothing, sells nothing
✓ Clean modern dark UI
✓ Click "Full report" to see BGP routing, reverse-IP, WebRTC / DNS leak tests and more on ipok.io

Data sources: ip-api, proxycheck, AbuseIPDB, Scamalytics, RIPEstat. Results are best-effort diagnostics, not a guarantee.

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
