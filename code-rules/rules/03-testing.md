# 03 — Testes

## Framework

- **Vitest**. `npm test` roda `vitest run`.
- **Sempre rodar `npm test` antes de commitar.**

## Estrutura

- Pasta centralizada `tests/`, **espelhando** `src/` e `api/`.
  - `src/domain/appointment/AppointmentService.js` →
    `tests/domain/appointment/AppointmentService.test.js`
  - `api/send-email.js` → `tests/api/send-email.test.js`
  - `shared/appointmentFields.js` → `tests/shared/appointmentFields.test.js`

## Regras

- Mock de dependências externas via `vi.fn()`, `vi.stubGlobal()` /
  `vi.unstubAllGlobals()` (para `fetch`).
- **Nunca** fazer chamadas de rede reais em teste.
- Toda mudança de lógica de negócio vem acompanhada de teste (novo ou atualizado).
- Regras duplicadas entre frontend e backend extraídas para `shared/` têm um **teste
  dedicado travando o valor esperado** (ex: a lista de campos obrigatórios), para pegar
  dessincronia.
- Teste comportamento observável, não detalhes de implementação.

## O que cobrir por camada

- **`domain/`** — decisões: quais deliveries dispara, o que faz quando um campo obrigatório
  falta, como propaga erro da infraestrutura.
- **`infrastructure/`** — formata a requisição certa, chama o endpoint certo, propaga erro
  quando a resposta não é ok (com `fetch` mockado).
- **`api/`** — valida entrada, monta o payload/template, responde com o status correto;
  rejeita entrada inválida (rota é pública).
- **`shared/`** — o contrato (ex: lista de campos) é exatamente o esperado.
