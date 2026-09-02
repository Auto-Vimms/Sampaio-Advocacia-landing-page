# 02 — Convenções de código

## Idioma

- Nomes de **função, classe, variável, arquivo** em **inglês**.
- Textos voltados ao **usuário final** (UI, mensagens, toasts, e-mails) em **português**.

## Comentários

- **Não escreva comentários no código.** O código deve se explicar sozinho por meio de
  nomes claros de função/variável e funções pequenas com uma responsabilidade.
- Se um trecho só fica compreensível com um comentário, refatore (extraia função com nome
  descritivo, simplifique a lógica) em vez de comentar.
- Exceções permitidas: `TODO:`/`FIXME:` com referência ao card, ou uma anotação legal/de
  licença exigida por terceiros.

## Estilo

- **`catch` sem parâmetro** (`catch { ... }`) quando o erro capturado não é usado na
  resposta — por segurança, para não vazar detalhes técnicos.
- **Funções puras** (sem efeito colateral) são preferidas. Quando fizer sentido para
  testes, exporte-as mesmo sendo "auxiliares" de um módulo maior.
- Sem efeito colateral no escopo top-level de um módulo (ver *lazy initialization* em
  [`01-architecture.md`](01-architecture.md)).
- Uma responsabilidade por função/classe: separe validação, formatação de mensagem e envio.
- Classes recebem dependências pelo construtor; não importam `config` por dentro.

## Nomes de teste

- `describe` por função/unidade testada.
- Nomes de `it` em **inglês**, descrevendo **comportamento**, não implementação.
  - Bom: `returns false when a required field is empty`
  - Ruim: `testa o isValid`
- Dados de teste (mocks) podem estar em português quando refletem o domínio real
  (ex: `nome: 'João'`, `mensagem: 'Preciso de uma consulta'`).

## HTML / CSS

- HTML semântico; `required` nos campos obrigatórios do formulário (primeira camada de
  validação).
- CSS dividido por responsabilidade dentro de `style/`.
- Sem framework CSS nem bundler.
