# 06 — Segurança e conformidade

## Regras a lembrar sempre

- **Toda rota em `api/` é pública.** Validação sempre no backend — nunca confiar só no
  frontend. HTML `required` e validação no `domain` são camadas extras, não substitutas.
- **Segredos só no backend.** URLs de webhook e qualquer token/chave de serviço externo
  ficam apenas em `process.env`, dentro de `api/`. Nunca em código client-side (URL de
  Google Apps Script, API key, webhook do Sheets, etc. — o nome muda conforme o canal, a
  regra não).
- **`catch` sem parâmetro** quando o erro não faz parte da resposta, para não vazar detalhe
  técnico ao cliente.
- **Dados do formulário não são armazenados em banco próprio.** Só passam pelo sistema e
  chegam ao(s) destino(s) configurado(s) — viram linha numa planilha, mensagem de WhatsApp,
  e-mail, etc., conforme os deliveries ativos no momento.

## LGPD / compliance

`[ajustar por projeto]` — exigências legais, texto de consentimento, política de
privacidade, retenção de dados, e quaisquer particularidades do negócio.

## Checklist rápido antes de mexer em `api/` ou em entrega de lead

- [ ] Nenhum segredo apareceu em arquivo client-side, log ou resposta de erro.
- [ ] A rota valida a entrada por conta própria (não assume que o frontend validou).
- [ ] Resposta de erro não expõe stack trace nem detalhe do serviço externo.
- [ ] Se há coleta de dado pessoal novo, o consentimento/privacidade cobre esse dado.
