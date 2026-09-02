# AGENTS.md — Leia isto antes de qualquer coisa

> Este arquivo é o ponto de entrada de contexto para qualquer IA/agente que vá **criar,
> modificar ou revisar** código nesta landing page. Leia-o por completo, e depois os
> arquivos de `rules/` relevantes à sua tarefa, **antes** de escrever qualquer linha de
> código ou propor qualquer mudança.

## Como usar esta pasta

`code-rules/` vive dentro de **cada** projeto de landing page (é copiada por projeto, não
compartilhada). Assim o agente olha só para as regras deste projeto, nunca para outros.

Ordem de leitura recomendada:

1. **Este arquivo** (`AGENTS.md`) — regras inegociáveis e índice.
2. [`rules/00-workflow.md`](rules/00-workflow.md) — como você deve trabalhar (sempre).
3. O(s) arquivo(s) de `rules/` referentes ao que a tarefa toca:
   - Mudança de comportamento/entrega de lead → [`rules/01-architecture.md`](rules/01-architecture.md)
   - Escrever/editar código → [`rules/02-code-conventions.md`](rules/02-code-conventions.md)
   - Qualquer alteração de lógica → [`rules/03-testing.md`](rules/03-testing.md)
   - Vai commitar / abrir PR → [`rules/04-git-flow.md`](rules/04-git-flow.md)
   - Mexer em env vars / rodar local → [`rules/05-environment.md`](rules/05-environment.md)
   - Tocar em `api/`, segredos ou dados do formulário → [`rules/06-security.md`](rules/06-security.md)
4. Antes de começar um projeto novo: [`checklists/new-landing-page.md`](checklists/new-landing-page.md).
5. Antes de abrir PR: [`checklists/before-pr.md`](checklists/before-pr.md).

O template de README que cada projeto novo deve copiar e preencher está em
[`template/PROJECT_README_TEMPLATE.md`](template/PROJECT_README_TEMPLATE.md).

## Regras inegociáveis (resumo — o detalhe está em `rules/`)

1. **Pair programming, passo a passo.** Nunca implemente várias coisas de uma vez. Explique
   o **porquê**, a **responsabilidade da camada** e como segue SOLID/Clean Code/Clean
   Architecture/DDD antes de cada etapa. Detalhe: `rules/00-workflow.md`.
2. **Não presuma decisões de negócio.** Campos obrigatórios, textos de UI, regras de
   validação, canais de entrega — pergunte antes de implementar.
3. **`domain/` nunca sabe qual tecnologia de entrega é usada.** Só conhece a abstração
   `delivery.send(request)` e decide **quais** deliveries disparar, nunca **como**.
4. **Novo canal de entrega = nova classe em `infrastructure/`**, sem alterar `domain/`
   (Open/Closed).
5. **Segredos só no backend.** Token, webhook URL, API key vivem em `process.env` dentro de
   `api/`. Nunca em código client-side.
6. **Toda rota `api/` é pública.** Validação sempre no backend, além do frontend.
7. **Nomes de código em inglês; textos de usuário em português.**
8. **`npm test` (Vitest) tem de passar antes de commitar.** Toda mudança de lógica vem com
   teste. Sem chamadas de rede reais em teste.
9. **Git:** branch a partir de `main` atualizada, prefixo semântico + número do card,
   Conventional Commits em inglês, validar em `staging` antes da PR, `rebase origin/main`
   antes de abrir a PR, `--force-with-lease` (nunca `--force` puro).
10. **Escopo.** Achou um problema fora do escopo? Registre e pergunte se corrige agora ou
    depois — não misture escopos sem avisar.

## Quando propor mudança estrutural

Se a arquitetura atual não segue boas práticas num ponto específico, é **esperado** propor a
mudança — mas sempre explicando o motivo antes de alterar, e **confirmando com o usuário**
quando a mudança for estrutural (afeta vários arquivos ou muda um contrato entre camadas).
