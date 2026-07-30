<div align="center">

# 🤝 Contributing to Scouter7563

<sub>How Team 7563 works on this repo day to day</sub>

<br />

<a href="./README.md">README</a> ·
<a href="./docs/TECH_STACK.md">Tech Stack & Architecture</a>

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

Copy `.env.exemple` to `.env.local` and fill in the required variables — see [docs/TECH_STACK.md](./docs/TECH_STACK.md#️-environment-variables).

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

<sub>Keep branches scoped to a single feature or fix — smaller PRs are easier to review, especially close to competition.</sub>

<br />

## ✅ Before opening a PR

- [ ] `npm run lint` passes with no new warnings
- [ ] `npm run build` completes successfully
- [ ] UI strings are in English, consistent with the rest of the app
- [ ] No TBA keys, DB credentials, or other secrets committed
- [ ] Server-only logic (TBA calls, DB access) stays in `src/lib/api` and isn't leaked into client components

<br />

## 📝 Commits & PRs

- Use clear, imperative commit messages (e.g. `Fix match dropdown navigation bug`, not `fixed stuff`)
- Reference related issues in the PR description when applicable
- Describe **what** changed and **why**, and include screenshots/GIFs for UI changes
- Keep PRs focused; unrelated refactors should be their own PR

<br />

## 🎨 Code style

- Follow the existing patterns in `src/lib/api`, `src/components`, and `src/types` — typed models over `any`, server components by default, client components only where interactivity is needed
- Run `npm run lint` and fix issues before pushing
- Match the Tailwind design tokens already used in the app instead of introducing one-off styles

<br />

## 🐛 Reporting bugs / suggesting features

<details>
<summary><b>What to include</b></summary>
<br />

- A clear title and description
- Steps to reproduce (for bugs) or the use case (for features)
- Screenshots if relevant, especially for anything scouting-form related

</details>

<br />

<div align="center">
<sub>Questions? Ask in the team's dev channel before guessing — especially for changes touching the TBA API layer or the DB schema.</sub>
</div>
