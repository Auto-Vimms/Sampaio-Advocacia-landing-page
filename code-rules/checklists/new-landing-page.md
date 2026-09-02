# Checklist — Nova landing page

## Setup do repositório

- [ ] Criar o repositório novo (a partir do padrão da marca).
- [ ] Copiar a pasta `code-rules/` inteira para o novo repositório.
- [ ] Copiar `code-rules/template/PROJECT_README_TEMPLATE.md` para o `README.md` do projeto.
- [ ] Preencher todas as seções `[ajustar]` do `README.md`.
- [ ] Criar/adaptar o `CLAUDE.md` na raiz apontando para `code-rules/AGENTS.md`.
- [ ] `.gitignore` cobre: `.DS_Store`, `node_modules/`, `dist/`, `build/`, `coverage/`,
      `*.log`, `.vercel`, `.env*`.
- [ ] `package.json` com `"type": "module"` e script `test` = `vitest run`.

## Estrutura mínima

- [ ] `src/config/config.js` com `Object.freeze` e `defaultSubmitMethod`.
- [ ] `src/domain/<feature>/` — service + form/validação, sem conhecer tecnologia de entrega.
- [ ] `src/infrastructure/delivery/` — uma classe por canal, contrato `send(request)`.
- [ ] `src/ui/` — comportamentos de interface, sem regra de negócio.
- [ ] `src/main.js` — composition root, injeta dependências.
- [ ] `shared/` — regras duplicadas entre `src/` e `api/`, se houver.
- [ ] `api/` — uma função por canal que precise de segredo/servidor.
- [ ] `tests/` espelhando `src/` e `api/`.

## Decisões de negócio a confirmar antes de codar

- [ ] Quais canais de entrega de lead ativos no lançamento.
- [ ] Campos do formulário e quais são obrigatórios.
- [ ] Textos de UI, mensagens de sucesso/erro, tom.
- [ ] Exigências de LGPD / consentimento / política de privacidade.
- [ ] Variáveis de ambiente necessárias e quem as fornece.

## Antes do primeiro deploy

- [ ] `npm test` passa.
- [ ] `.env.local` criado localmente (não versionado).
- [ ] Validado em `staging` antes de qualquer PR para `main`.
