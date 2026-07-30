<div align="center">

<img src="https://raw.githubusercontent.com/Kaique-Sique/FRCScouter7563-Frontend/main/scouter7563/public/logo.png" alt="Scouter7563" width="70" onerror="this.style.display='none'" />

# Contributing to Scouter7563

<sub>How Team 7563 works on this repo day to day</sub>

<br />

<img src="https://img.shields.io/badge/team-FRC_7563-blue?style=flat-square" />
<img src="https://img.shields.io/badge/status-active_development-2ea043?style=flat-square" />

<br /><br />

<a href="./README.md">README</a> ·
<a href="./docs/TECH_STACK.md">Tech Stack & Architecture</a> ·
<a href="#%EF%B8%8F-local-setup">Local Setup</a> ·
<a href="#-branching">Branching</a> ·
<a href="#-before-opening-a-pr">PR Checklist</a>

</div>

<br />

## 🛠️ Local setup

<table>
<tr><td width="28"><b>1</b></td><td>

```bash
git clone https://github.com/Kaique-Sique/Scouter7563.git
cd FRCScouter7563-Frontend/scouter7563
npm install
```

</td></tr>
<tr><td><b>2</b></td><td>

Copy `.env.exemple` to `.env.local` and fill in the required variables — see <a href="./docs/TECH_STACK.md#️-environment-variables">docs/TECH_STACK.md</a>.

</td></tr>
<tr><td><b>3</b></td><td>

```bash
npm run dev
```

Confirm `localhost:3000` loads before making changes.

</td></tr>
</table>

<br />

## 🌿 Branching

<table>
<tr>
<td width="33%" valign="top" align="center">
<h3>✨</h3>
<b>feat/…</b>
<br />
<sub>New feature, e.g. <code>feat/scout-form-validation</code></sub>
</td>
<td width="33%" valign="top" align="center">
<h3>🐛</h3>
<b>fix/…</b>
<br />
<sub>Bug fix, e.g. <code>fix/week-calculation-bug</code></sub>
</td>
<td width="33%" valign="top" align="center">
<h3>🧹</h3>
<b>chore/…</b>
<br />
<sub>Maintenance, e.g. <code>chore/update-deps</code></sub>
</td>
</tr>
</table>

<div align="center"><sub>Keep branches scoped to a single feature or fix — smaller PRs are easier to review, especially close to competition.</sub></div>

<br />

## ✅ Before opening a PR

<div align="center">

<table>
<tr><td>☐</td><td align="left"><code>npm run lint</code> passes with no new warnings</td></tr>
<tr><td>☐</td><td align="left"><code>npm run build</code> completes successfully</td></tr>
<tr><td>☐</td><td align="left">UI strings are in English, consistent with the rest of the app</td></tr>
<tr><td>☐</td><td align="left">No TBA keys, DB credentials, or other secrets committed</td></tr>
<tr><td>☐</td><td align="left">Server-only logic (TBA calls, DB access) stays in <code>src/lib/api</code> and isn't leaked into client components</td></tr>
</table>

</div>

<br />

## 📝 Commits & PRs

<table>
<tr>
<td width="50%" valign="top">
<h3 align="center">✅ Do</h3>

- Clear, imperative commit messages (`Fix match dropdown navigation bug`)
- Reference related issues in the PR description
- Describe **what** changed and **why**
- Screenshots/GIFs for UI changes
- Keep PRs focused on one thing

</td>
<td width="50%" valign="top">
<h3 align="center">🚫 Avoid</h3>

- Vague messages (`fixed stuff`)
- Bundling unrelated refactors into one PR
- Silent UI changes with no visual before/after
- Mixing feature work with formatting-only diffs

</td>
</tr>
</table>

<br />

## 🎨 Code style

<table>
<tr>
<td width="33%" valign="top" align="center">
<h3>🧬</h3>
<b>Typed patterns</b>
<br />
<sub>Follow <code>src/lib/api</code>, <code>src/components</code>, <code>src/types</code> — typed models over <code>any</code></sub>
</td>
<td width="33%" valign="top" align="center">
<h3>🖥️</h3>
<b>Server-first</b>
<br />
<sub>Server components by default, client components only where interactivity is needed</sub>
</td>
<td width="33%" valign="top" align="center">
<h3>🎨</h3>
<b>Design tokens</b>
<br />
<sub>Match the existing Tailwind tokens instead of one-off styles</sub>
</td>
</tr>
</table>

<div align="center"><sub>Run <code>npm run lint</code> and fix issues before pushing.</sub></div>

<br />

## 🐛 Reporting bugs / suggesting features

<details>
<summary><b>What to include</b></summary>
<br />

<div align="center">

<table>
<tr><td align="left">A clear title and description</td></tr>
<tr><td align="left">Steps to reproduce (for bugs) or the use case (for features)</td></tr>
<tr><td align="left">Screenshots if relevant, especially for anything scouting-form related</td></tr>
</table>

</div>

</details>

<br />

<div align="center">
<sub>Questions? Ask in the team's dev channel before guessing — especially for changes touching the TBA API layer or the DB schema.</sub>
</div>
