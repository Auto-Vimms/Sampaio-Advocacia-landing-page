# 04 — Git (fluxo obrigatório)

## Branches e commits

1. Prefixo semântico no nome da branch:
   - `feature/...` — funcionalidade nova
   - `fix/...` — correção de algo que já existia
   - `style/...` — mudanças visuais
2. Sempre partir da `main` atualizada:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b <numero-do-card>(<prefixo>)<nome-da-branch-linear>
   ```

   Exemplo: `DEV-28 (security): add missing security headers via vercel.json`
3. Commits em **inglês**, seguindo **Conventional Commits** (`feat:`, `fix:`, `style:`,
   `test:`, `chore:`, `docs:`...).
4. Formato do commit: `feat(dev-28): <o-que-foi-feito>`

## Fluxo até o merge: dev local → staging → PR → main

1. **Desenvolver e testar localmente.** (Opcional pular direto para staging se preferir
   validar já no ambiente real.)
2. **Publicar e validar em `staging`** — obrigatório. É o ambiente que simula produção.
   Nenhuma alteração vai para PR sem passar por ele.
3. **Abrir a Pull Request** para revisão, só depois de confirmar tudo certo em staging.
4. **Após aprovação da PR, merge na `main`.**

## Enviar sua branch para staging

Depois de commitar na sua branch:

```bash
git branch -D staging          # remove cópia local (garante partir da versão mais atual)
git fetch                       # atualiza referências do remoto
git checkout staging
git merge <nome-da-sua-branch>  # resolva conflitos antes de continuar, se houver
git push                        # dispara o deploy automático de staging
```

Só abra a PR depois de validar tudo funcionando em staging.

> ⚠️ Fez uma alteração e esqueceu de mandar para `staging`? Mande depois. O objetivo é
> `staging` estar **sempre atualizada** com tudo que está em progresso.

## Antes de abrir a PR (rebase)

```bash
git fetch origin
git rebase origin/main
```

- Depois de um rebase que reescreveu histórico já publicado, use
  `git push --force-with-lease origin <branch>` — **nunca `--force` puro**.
- Resolva conflitos de rebase arquivo por arquivo: `git add <arquivo>` +
  `git rebase --continue` até finalizar.

## Descrição da PR

Em **inglês**, sempre com as seções:

- **What changed**
- **Why**
- **Changed files**
- **Tests**
- **Follow-up** (quando houver pontos deixados para depois)
