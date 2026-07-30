<div align="center">

<img src="https://raw.githubusercontent.com/Kaique-Sique/FRCScouter7563-Frontend/main/scouter7563/public/logo.png" alt="Scouter7563" width="70" onerror="this.style.display='none'" />

# Tech Stack & Architecture

<sub>Technical reference for Scouter7563</sub>

<br />

<a href="../README.md">README</a> ·
<a href="#-tech-stack">Tech Stack</a> ·
<a href="#-project-structure">Structure</a> ·
<a href="#-routing">Routing</a> ·
<a href="#%EF%B8%8F-environment-variables">Env Vars</a> ·
<a href="#-available-scripts">Scripts</a>

</div>

<br />

## 🧱 Tech Stack

<div align="center">

<img src="https://img.shields.io/badge/Framework-Next.js_16-black?style=flat-square&logo=next.js" />
<img src="https://img.shields.io/badge/UI-React_19-61DAFB?style=flat-square&logo=react&logoColor=101010" />
<img src="https://img.shields.io/badge/Lang-TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Style-Tailwind_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
<br />
<img src="https://img.shields.io/badge/Icons-lucide--react-f56565?style=flat-square&logo=lucide" />
<img src="https://img.shields.io/badge/Icons-react--icons-e91e63?style=flat-square" />
<img src="https://img.shields.io/badge/Charts-Recharts-8884d8?style=flat-square" />
<img src="https://img.shields.io/badge/Lint-ESLint_9-4B32C3?style=flat-square&logo=eslint&logoColor=white" />
<br />
<img src="https://img.shields.io/badge/Data-TBA_API_v3-003b6f?style=flat-square" />
<img src="https://img.shields.io/badge/Storage-PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" />

</div>

<br />

<table>
<tr>
<td width="33%" valign="top" align="center">
<h3>⚡</h3>
<b>Turbopack</b>
<br />
<sub>Instant HMR during development, fast production builds</sub>
</td>
<td width="33%" valign="top" align="center">
<h3>🎨</h3>
<b>Tailwind 4</b>
<br />
<sub>CSS-first theming, consistent design tokens across the app</sub>
</td>
<td width="33%" valign="top" align="center">
<h3>🧩</h3>
<b>App Router</b>
<br />
<sub>Server + client components split, server-only data access</sub>
</td>
</tr>
</table>

<br />

> [!NOTE]
> The old FastAPI backend is **retired**. TBA proxying and scouting persistence now live inside this repo as an internal TypeScript layer (`src/lib/api`) — server-only, nothing exposed over HTTP.

<br />

## 🗂️ Project Structure

<details open>
<summary><b>Expand tree</b></summary>
<br />

```
frcscouter7563-frontend/
├── public/                 # Static assets
└── src/
    ├── app/                 # Routes & layouts (App Router)
    ├── components/          # cards · dashboard · scout · team · ui
    ├── lib/
    │   ├── api/tba/         # Internal TBA API v3 client
    │   └── config/          # Typed .env access
    ├── types/               # Shared types, incl. types/tba
    └── utils/               # Formatting & helpers
```

</details>

<br />

## 🧭 Routing

<div align="center">

<table>
<tr><th align="left">Route</th><th align="left">Description</th></tr>
<tr><td><code>/</code></td><td>Dashboard — current event, live stats</td></tr>
<tr><td><code>/events</code> → <code>/events/{key}</code></td><td>Event browser & details</td></tr>
<tr><td><code>/teams</code> → <code>/teams/{key}</code></td><td>Team directory & profiles</td></tr>
<tr><td><code>/matches/{key}</code> → <code>/{key}/{team}</code></td><td>Match & per-team scout view</td></tr>
<tr><td><code>/scout</code> → <code>/scout/{match}/{team}</code></td><td>New scouting entry</td></tr>
</table>

</div>

<br />

## ⚙️ Environment variables

<details>
<summary><b>Expand variables</b></summary>
<br />

<div align="center">

<table>
<tr><th align="left">Variable</th><th>Required</th><th align="left">Purpose</th></tr>
<tr><td><code>TBA_KEY</code></td><td align="center">✅</td><td><a href="https://www.thebluealliance.com/account">TBA</a> read key</td></tr>
<tr><td><code>TBA_BASE_URL</code></td><td align="center">✅</td><td><code>https://www.thebluealliance.com/api/v3</code></td></tr>
<tr><td><code>DB_NAME</code></td><td align="center">✅</td><td>PostgreSQL database</td></tr>
<tr><td><code>DB_USER</code></td><td align="center">✅</td><td>PostgreSQL user</td></tr>
<tr><td><code>DB_PASSWORD</code></td><td align="center">✅</td><td>PostgreSQL password</td></tr>
<tr><td><code>DB_HOST</code></td><td align="center">✅</td><td>PostgreSQL host</td></tr>
<tr><td><code>DB_PORT</code></td><td align="center">✅</td><td>PostgreSQL port</td></tr>
</table>

</div>

</details>

<br />

## 📜 Available scripts

<details>
<summary><b>Expand scripts</b></summary>
<br />

<div align="center">

<table>
<tr><th align="left">Command</th><th align="left">Description</th></tr>
<tr><td><code>npm run dev</code></td><td>Dev server with Turbopack</td></tr>
<tr><td><code>npm run build</code></td><td>Production build</td></tr>
<tr><td><code>npm run start</code></td><td>Serve production build</td></tr>
<tr><td><code>npm run lint</code></td><td>ESLint across the project</td></tr>
</table>

</div>

</details>

<br />

<div align="center">
<sub>Back to <a href="../README.md">main README</a> · See <a href="../CONTRIBUTING.md">CONTRIBUTING.md</a> for how to work in this codebase</sub>
</div>
