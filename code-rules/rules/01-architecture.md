# 01 — Arquitetura

Landing page em **HTML, CSS e JavaScript puro** (sem bundler/framework), hospedada na
Vercel. ES Modules nativos nos dois lados (frontend e `api/`).

Inspirada em SOLID, Clean Code, Clean Architecture e DDD (adaptado para frontend): baixo
acoplamento, alta coesão. As regras valem **independente de qual tecnologia** está em cada
camada — a ideia é que qualquer ferramenta possa ser trocada sem quebrar o resto.

## Fluxo

```
Formulário (ui)
      |
      v
Service (domain) — decide QUAIS entregas disparar, nunca COMO cada uma funciona
      |
      v
Delivery(s) escolhido(s) (infrastructure) — um ou mais canais configurados
      |
      v
[quando o canal precisa de segredo/servidor] -> api/ (Vercel Function) -> serviço externo
```

## Camadas e responsabilidades

- **`domain/`** — regras de negócio puras. **Nunca sabe qual tecnologia de entrega está
  sendo usada** (WhatsApp, e-mail, planilha, SMS, CRM, o que for). Só conhece a abstração
  `delivery.send(request)` e decide **quais** deliveries chamar, nunca **como** cada um
  funciona por dentro.
- **`infrastructure/`** — onde vive o conhecimento de cada tecnologia específica (fetch,
  APIs, formato de mensagem, etc.). Cada delivery é uma classe própria que expõe o mesmo
  contrato (`send(request)`), então o `domain` trata todas de forma intercambiável.
- **`api/`** — Vercel Functions. Ponto de entrada para qualquer delivery que precise de um
  segredo (token, URL de webhook, chave de API) ou de lógica que não pode rodar no
  navegador. Fazem validação, formatação e envio. O frontend nunca conhece segredos nem a
  estrutura interna do serviço externo.
- **`config/`** (neste projeto: `src/config/config.js`) — configuração centralizada e
  imutável (`Object.freeze`), incluindo qual delivery é o padrão
  (`defaultSubmitMethod`).
- **`shared/`** — módulos compartilhados entre frontend (`src/`) e backend (`api/`). Usados
  quando a mesma regra de negócio (ex: lista de campos obrigatórios de um formulário)
  precisa existir nos dois lados, evitando duplicação/dessincronia. Funciona porque ambos
  suportam ES Modules nativamente, sem bundler.
- **`main.js`** — composition root. Único lugar que conhece todas as peças concretas e as
  conecta via injeção de dependência.
- **`tests/`** — pasta centralizada (não colocated), espelhando `src/` e `api/`. Ex:
  `src/domain/appointment/AppointmentService.js` →
  `tests/domain/appointment/AppointmentService.test.js`.
- **`ui/`** — comportamentos de interface (toast, observers de scroll/reveal, links de
  contato). Sem regra de negócio.

## Princípios aplicados

- **Dependency Injection** — classes recebem dependências via construtor. Nunca importam
  `config` nem dependências externas diretamente dentro de si.
- **Open/Closed** — um novo canal de entrega deve poder ser adicionado criando uma nova
  classe em `infrastructure/`, sem alterar o código do service em `domain/`.
- **Single Responsibility** — cada função/classe faz uma coisa. Validação separada de
  formatação de mensagem, separada de envio.
- **Lazy initialization** — dependências externas com efeito colateral nunca rodam no
  escopo top-level de um módulo; só dentro da função que realmente as usa. Importar uma
  função pura não pode exigir variável de ambiente nem acionar serviço externo.
- **DRY entre camadas** — regras de negócio duplicadas em frontend e backend (ex: campos
  obrigatórios) são extraídas para `shared/`, com um teste dedicado travando o valor
  esperado, para prevenir dessincronia silenciosa.
- **Propagação de erro** — erros lançados na infraestrutura (qualquer delivery) propagam
  sem tratamento através do `domain`. Só a camada de UI (via `main.js`) decide o que
  mostrar ao usuário em caso de erro.
- **Validação em camadas independentes** — HTML nativo (`required`), JavaScript no
  `domain`, e backend (`api/`) sempre que houver rota pública. Nunca confiar só no
  frontend.

## Adicionar um novo canal de entrega (passo a passo)

1. Criar `src/infrastructure/delivery/<Nome>Delivery.js` expondo `async send(request)`.
2. Se precisar de segredo, criar/estender a rota em `api/` que fala com o serviço externo;
   o delivery só chama `fetch('/api/...')`.
3. Registrar o delivery no `main.js` (composition root) e, se for o caso, torná-lo
   selecionável via `config`.
4. Testes: `tests/infrastructure/delivery/<Nome>Delivery.test.js` (mockando `fetch`) e, se
   a rota for nova, `tests/api/<rota>.test.js`.
5. **Não** alterar `AppointmentService` (`domain/`) para isso.
