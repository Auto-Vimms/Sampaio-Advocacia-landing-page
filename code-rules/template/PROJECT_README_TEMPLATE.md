# [Nome do Projeto] — Landing Page: Instruções do Projeto

> README-padrão usado em todas as landing pages da [sua empresa/marca]. Copie este arquivo
> para o `README.md` de um novo projeto e ajuste apenas as seções marcadas com `[ajustar]`.
> O resto (arquitetura, convenções, fluxo de Git) é o mesmo em todos os projetos e está
> detalhado em `code-rules/`.

## Sobre o projeto

Landing page em HTML, CSS e JavaScript puro (sem bundler/framework), hospedada na Vercel.

`[ajustar: descreva rapidamente o objetivo desta landing page específica e quais canais de
entrega de leads ela usa hoje — ex: WhatsApp, e-mail, planilha, CRM, etc.]`

## Contexto e regras de desenvolvimento

Antes de mexer em qualquer código, leia [`code-rules/AGENTS.md`](code-rules/AGENTS.md).
Ele é o ponto de entrada para o modo de trabalho, a arquitetura, as convenções de código,
os testes, o fluxo de Git e as regras de segurança.

## Modo de trabalho (OBRIGATÓRIO)

Pair programming, no papel de mentor sênior. Passo a passo, explicando o porquê e a
responsabilidade de cada camada antes de implementar. Não presumir decisões de negócio —
perguntar antes. Detalhe completo em
[`code-rules/rules/00-workflow.md`](code-rules/rules/00-workflow.md).

## Arquitetura (resumo)

```
Formulário (ui) -> Service (domain) -> Delivery(s) (infrastructure) -> [api/ -> serviço externo]
```

- `domain/` — regras de negócio puras; só conhece `delivery.send(request)`, decide **quais**
  deliveries disparar, nunca **como**.
- `infrastructure/` — conhecimento de cada tecnologia (fetch, APIs, formato de mensagem).
- `api/` — Vercel Functions; ponto de entrada de qualquer canal que precise de segredo.
- `config/` — configuração centralizada e imutável (`Object.freeze`), incl.
  `defaultSubmitMethod`.
- `shared/` — regras de negócio usadas por `src/` e `api/` (evita dessincronia).
- `main.js` — composition root; único lugar que conecta as peças concretas via DI.
- `tests/` — centralizada, espelhando `src/` e `api/`.

Detalhe completo em
[`code-rules/rules/01-architecture.md`](code-rules/rules/01-architecture.md).

## Testes

- Vitest. `npm test` roda `vitest run`. Sempre rodar antes de commitar.
- `tests/` espelha `src/` e `api/`. Mock de externos via `vi.fn()` / `vi.stubGlobal()`;
  nunca rede real.

Detalhe em [`code-rules/rules/03-testing.md`](code-rules/rules/03-testing.md).

## Git

Branch a partir da `main` atualizada, prefixo semântico + número do card, Conventional
Commits em inglês, validar em `staging` antes da PR, `rebase origin/main` antes de abrir a
PR, `--force-with-lease` (nunca `--force`). Detalhe em
[`code-rules/rules/04-git-flow.md`](code-rules/rules/04-git-flow.md).

## Rodar localmente

- **Só testar** (sem Vercel): clonar, `npm install`, criar `.env.local` manualmente com
  valores recebidos por canal seguro, `vercel dev`.
- **Gerenciar deploy/env** (dono): `vercel login`, `vercel link`,
  `vercel env pull .env.local`.
- **Estático puro**: `npm run start` (rotas `/api` não funcionam).

`[ajustar: liste as variáveis de ambiente específicas deste projeto — ex: SHEETS_WEBHOOK_URL,
RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL, etc.]`

## Contexto de negócio

`[ajustar — preencha para cada projeto:]`

- Empresa/marca:
- Canais de entrega de lead ativos hoje:
- Campos do formulário e quais são obrigatórios:
- Outras particularidades do negócio (ex: exigências legais, compliance, LGPD):

## Segurança e conformidade

- Toda rota em `api/` é pública — validação sempre no backend.
- URLs de webhook e qualquer token/segredo ficam só no backend (`process.env`), nunca em
  código client-side.
- Dados do formulário não são armazenados em banco próprio — só passam pelo sistema e
  chegam ao(s) destino(s) configurado(s).

Detalhe em [`code-rules/rules/06-security.md`](code-rules/rules/06-security.md).
