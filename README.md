# IPOK Browser Extension

> One-click **IP purity / risk / AI-availability** check in your browser toolbar — powered by [ipok.io](https://ipok.io)

Click the toolbar icon to instantly see your current line's exit IP: risk score, residential vs datacenter, native IP, and whether it can use **ChatGPT / Claude / Gemini**. No account, no tracking — it just calls the free [IPOK API](https://ipok.io/developers).

点工具栏图标，一秒看清当前线路出口 IP 的纯净度/风险值、机房还是住宅、能不能用 ChatGPT/Claude/Gemini。

## Install (load unpacked)

Until it's on the Chrome Web Store:

1. Download / clone this repo.
2. Open `chrome://extensions` (or `edge://extensions`).
3. Enable **Developer mode** (top-right).
4. Click **Load unpacked** and select this folder.
5. Pin the IPOK icon and click it any time to check your current IP.

Works on Chrome, Edge, Brave, and other Chromium browsers (Manifest V3).

## What it shows

- Public exit IP (IPv4/IPv6) + location + ASN/ISP
- Risk score (0–100) with purity band
- IP type: residential / datacenter / mobile
- AI availability: ChatGPT · Claude · Gemini
- Link to the full report on ipok.io

## Privacy

The popup makes a single request to `https://ipok.io/api/ip` to detect your current exit IP. No data is stored by the extension, no analytics, no extra permissions beyond reaching ipok.io.

## License

MIT. Not affiliated with any provider; data is best-effort and for diagnostics only.
