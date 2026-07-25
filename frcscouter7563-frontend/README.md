<div align="center">

<img src="https://raw.githubusercontent.com/Kaique-Sique/FRCScouter7563-Frontend/main/frcscouter7563-frontend/public/logo.png" alt="Scouter7563" width="90" onerror="this.style.display='none'" />

# Scouter7563

<sub>Internal scouting platform for FRC Team 7563 — Megazord</sub>

<br />

<a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=next.js&logoColor=white" /></a>
<a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=101010" /></a>
<a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /></a>
<a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" /></a>

<br />

<img src="https://img.shields.io/github/last-commit/Kaique-Sique/FRCScouter7563-Frontend?style=flat-square&color=8957e5" />
<img src="https://img.shields.io/github/issues/Kaique-Sique/FRCScouter7563-Frontend?style=flat-square&color=orange" />
<img src="https://img.shields.io/github/license/Kaique-Sique/FRCScouter7563-Frontend?style=flat-square&color=yellow" />
<img src="https://img.shields.io/badge/status-active_development-2ea043?style=flat-square" />
<img src="https://img.shields.io/badge/team-FRC_7563-blue?style=flat-square" />
<img src="https://img.shields.io/badge/made%20in-Jundiaí%2C_BR-009c3b?style=flat-square" />

<br /><br />

<a href="#-overview">Overview</a> ·
<a href="#-features">Features</a> ·
<a href="#-tech-stack">Tech Stack</a> ·
<a href="#-getting-started">Getting Started</a> ·
<a href="#-project-structure">Structure</a> ·
<a href="#-contributing">Contributing</a>

</div>

<br />

## 📡 Overview

<table>
<tr>
<td>

Scouter7563 is the single place Team 7563 uses to browse events, teams and matches, and to collect scouting data live during competition. Built as a Next.js app with a fully internal TypeScript data layer — no external backend to deploy or babysit at the field.

</td>
</tr>
</table>

<br />

## ✨ Features

<table>
<tr>
<td width="33%" valign="top" align="center">
<h3>🏟️</h3>
<b>Events</b>
<br />
<sub>Browse every event by competition week, drill into results, teams and rankings</sub>
</td>
<td width="33%" valign="top" align="center">
<h3>🤖</h3>
<b>Teams</b>
<br />
<sub>Full team profiles with stats, history and event participation</sub>
</td>
<td width="33%" valign="top" align="center">
<h3>📋</h3>
<b>Live Scouting</b>
<br />
<sub>Fast in-match forms for auto, teleop, endgame and notes</sub>
</td>
</tr>
<tr>
<td width="33%" valign="top" align="center">
<h3>📊</h3>
<b>Match Insights</b>
<br />
<sub>Per-team match breakdowns, timelines and custom metrics</sub>
</td>
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
</tr>
</table>

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

> [!NOTE]
> The old FastAPI backend is **retired**. TBA proxying and scouting persistence now live inside this repo as an internal TypeScript layer (`src/lib/api`) — server-only, nothing exposed over HTTP.

<br />

## 🚀 Getting Started

<table>
<tr><td width="28"><b>1</b></td><td>

```bash
git clone https://github.com/Kaique-Sique/FRCScouter7563-Frontend.git
cd FRCScouter7563-Frontend/frcscouter7563-frontend
```

</td></tr>
<tr><td><b>2</b></td><td>

```bash
npm install
```

</td></tr>
<tr><td><b>3</b></td><td>

```bash
cp .env.exemple .env.local   # fill in TBA_KEY + DB_* — see table below
```

</td></tr>
<tr><td><b>4</b></td><td>

```bash
npm run dev
```

</td></tr>
</table>

<div align="center">→ open <a href="http://localhost:3000"><code>localhost:3000</code></a></div>

<br />

<details>
<summary><b>Environment variables</b></summary>
<br />

| Variable | Required | Purpose |
|:--|:--:|:--|
| `TBA_KEY` | ✅ | [TBA](https://www.thebluealliance.com/account) read key |
| `TBA_BASE_URL` | ✅ | `https://www.thebluealliance.com/api/v3` |
| `DB_NAME` | ✅ | PostgreSQL database |
| `DB_USER` | ✅ | PostgreSQL user |
| `DB_PASSWORD` | ✅ | PostgreSQL password |
| `DB_HOST` | ✅ | PostgreSQL host |
| `DB_PORT` | ✅ | PostgreSQL port |

</details>

<details>
<summary><b>Available scripts</b></summary>
<br />

| Command | Description |
|:--|:--|
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint across the project |

</details>

<br />

## 🗂️ Project Structure

<details open>
<summary><b>Expand tree</b></summary>

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

| Route | Description |
|:--|:--|
| `/` | Dashboard — current event, live stats |
| `/events` → `/events/{key}` | Event browser & details |
| `/teams` → `/teams/{key}` | Team directory & profiles |
| `/matches/{key}` → `/{key}/{team}` | Match & per-team scout view |
| `/scout` → `/scout/{match}/{team}` | New scouting entry |

</div>

<div align="center"><sub>Full route map: <a href="../README.md">top-level architecture guide</a></sub></div>

<br />

## 🤝 Contributing

<table>
<tr><td>

Internal tool for Team 7563 — teammates welcome:

1. Branch off `main`
2. Keep components typed, colocated under `src/components/<feature>`
3. `npm run lint && npm run build` before opening a PR
4. Open the PR with a short description

</td></tr>
</table>

<br />

<div align="center">

<img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" />

<sub>Built by <a href="https://megazord7563.com.br">Team 7563 — Megazord</a> · Jundiaí, SP</sub>

</div>