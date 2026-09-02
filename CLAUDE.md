# CLAUDE.md

## Leia primeiro — sempre

**Antes de criar, modificar ou revisar qualquer código neste projeto**, leia
[`code-rules/AGENTS.md`](code-rules/AGENTS.md) por completo e depois os arquivos de
[`code-rules/rules/`](code-rules/rules/) relevantes à tarefa.

`code-rules/` contém o contexto obrigatório: modo de trabalho, arquitetura, convenções de
código, testes, fluxo de Git e regras de segurança desta landing page. Nenhuma alteração
deve começar antes dessa leitura.

## Regras inegociáveis (o detalhe está em `code-rules/`)

- **Pair programming, passo a passo.** Explique o porquê e a responsabilidade da camada
  antes de cada etapa. Nunca implemente várias coisas de uma vez.
- **Não presuma decisões de negócio** (campos obrigatórios, textos de UI, validações,
  canais de entrega). Pergunte antes.
- **`domain/` nunca sabe qual tecnologia de entrega é usada.** Novo canal = nova classe em
  `infrastructure/`, sem alterar `domain/`.
- **Segredos só no backend** (`process.env`, dentro de `api/`). Toda rota `api/` é pública:
  valide no backend.
- **Nomes de código em inglês; textos de usuário em português.**
- **`npm test` (Vitest) tem de passar antes de commitar.** Sem rede real em teste.
- **Git:** branch a partir da `main` atualizada, prefixo semântico + número do card,
  Conventional Commits em inglês, validar em `staging` antes da PR, `rebase origin/main`
  antes de abrir a PR, `--force-with-lease` nunca `--force`.
- **Não misture escopos.** Achou algo fora do escopo? Registre e pergunte se corrige agora
  ou depois.
