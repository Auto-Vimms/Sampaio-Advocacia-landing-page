---
name: finish-linear-card
description: Use when a task/card in this repo is done (code written, tests passing) and a PR is about to be opened or was just opened — runs the before-PR checklist and posts the mandatory closing comment on the Linear card. Trigger words: "abrir PR", "terminei", "finalizei o card", "pronto para PR", or right after `gh pr create` succeeds for a branch tied to a DEV-XX card.
---

# Finish a Linear card (Sampaio Advocacia)

This project's `code-rules/rules/00-workflow.md` and
`code-rules/checklists/before-pr.md` require a closing comment on the Linear
card every time a task finishes. It is easy to open the PR and forget this
last step — treat it as non-optional, not a nice-to-have.

## When to run this

- Right before opening a PR (to confirm the checklist is clean).
- Immediately after `gh pr create` succeeds, as the very next action — not
  deferred, not left for the user to ask about.

## Steps

1. **Read `code-rules/checklists/before-pr.md`** in full and confirm every
   box under Código / Testes / Git / Descrição da PR is actually true for
   this change (don't assume — check `npm test` output, `git log`, the PR
   body). If a box isn't checked, fix it before continuing.
2. **Identify the Linear card ID** for this branch/PR (the `DEV-XX` in the
   branch name or commit messages). If no card exists yet, stop and create
   one first (see `code-rules/AGENTS.md` — card before branch).
3. **Post the closing comment** on that Linear card (`save_comment`), in
   Portuguese, following the exact structure used on card DEV-25:
   - `## Resumo do que foi feito` — **bold subsection headers** grouping the
     work (main change; then Segurança / Qualidade / Infraestrutura as
     applicable).
   - **Problemas / decisões no caminho** — what went wrong, what was
     discarded and why, what was found but left out of scope (with links to
     any cards created for it).
   - `## Pendente` — what's left for later, linking related cards.
   - File/symbol names in `code`; link related Linear issues and the PR.
4. **Link the PR to the card** (`save_issue` with `links`) and move the card
   to **In Review** if it isn't already, so Linear state matches reality.

## Why this exists

Documentation alone (`00-workflow.md`, `before-pr.md`) wasn't enough — the
step got skipped once because it wasn't a concrete checklist run at the
right moment. This skill exists so the closing comment happens as a matter
of course, every time, without the user having to ask.
