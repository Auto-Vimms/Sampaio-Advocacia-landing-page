# code-rules

Contexto, arquitetura, padrão de código e boas práticas desta landing page — para humanos e
para agentes de IA.

## Por que existe

Toda landing page da marca segue a **mesma** arquitetura, as mesmas convenções e o mesmo
fluxo de Git. Este diretório reúne essas regras num único lugar, versionado junto do
projeto, para que:

- qualquer pessoa (ou IA) que entre no projeto tenha o contexto completo antes de mexer;
- as decisões estruturais fiquem explícitas e revisáveis, não na cabeça de uma pessoa;
- o padrão não dependa de qual tecnologia está em cada camada — a ferramenta pode trocar,
  a regra continua.

## Cópia por projeto (importante)

Esta pasta é **copiada para dentro de cada projeto** de landing page, não compartilhada
entre eles. Assim o agente lê apenas as regras do projeto em que está trabalhando.

Ao começar uma landing page nova:

1. Copie `code-rules/` inteira para o novo repositório.
2. Copie [`template/PROJECT_README_TEMPLATE.md`](template/PROJECT_README_TEMPLATE.md) para o
   `README.md` do projeto e preencha as seções marcadas com `[ajustar]`.
3. Siga [`checklists/new-landing-page.md`](checklists/new-landing-page.md).

## Estrutura

```
code-rules/
├── AGENTS.md          # ponto de entrada: leia antes de qualquer coisa
├── README.md          # este arquivo
├── rules/
│   ├── 00-workflow.md         # modo de trabalho (pair programming / mentor)
│   ├── 01-architecture.md     # camadas, responsabilidades, princípios SOLID/DDD
│   ├── 02-code-conventions.md # nomes, idioma, estilo
│   ├── 03-testing.md          # Vitest, estrutura de testes, mocks
│   ├── 04-git-flow.md         # branches, commits, staging, PR, rebase
│   ├── 05-environment.md      # .env, Vercel, rodar localmente
│   └── 06-security.md         # rotas públicas, segredos, LGPD
├── template/
│   └── PROJECT_README_TEMPLATE.md
└── checklists/
    ├── new-landing-page.md
    └── before-pr.md
```

## Para agentes de IA

Comece por [`AGENTS.md`](AGENTS.md). Ele define a ordem de leitura e as regras
inegociáveis. Nenhuma alteração de código deve começar antes dessa leitura.
