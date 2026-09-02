# Checklist — Antes de abrir a PR

## Código

- [ ] Escopo da branch é uma coisa só; nada de correção "de passagem" fora do escopo.
- [ ] `domain/` não passou a conhecer nenhuma tecnologia de entrega.
- [ ] Canal novo (se houver) foi adicionado só em `infrastructure/` + `main.js`, sem tocar
      no service do `domain/`.
- [ ] Nenhum segredo em código client-side, log ou resposta de erro.
- [ ] Rotas `api/` novas/alteradas validam a entrada por conta própria.
- [ ] Nomes de código em inglês; textos de usuário em português.
- [ ] Sem efeito colateral no top-level de módulo (lazy init respeitado).

## Testes

- [ ] `npm test` passa localmente.
- [ ] Toda mudança de lógica tem teste novo/atualizado.
- [ ] Regras em `shared/` têm teste travando o valor esperado.
- [ ] Nenhum teste faz chamada de rede real.

## Git

- [ ] Branch partiu da `main` atualizada, com prefixo semântico + número do card.
- [ ] Commits em inglês, Conventional Commits.
- [ ] Validado em `staging` (deploy automático rodou e foi conferido).
- [ ] `git fetch origin && git rebase origin/main` feito, conflitos resolvidos.
- [ ] Push com `--force-with-lease` (nunca `--force`) se reescreveu histórico publicado.

## Descrição da PR (em inglês)

- [ ] **What changed**
- [ ] **Why**
- [ ] **Changed files**
- [ ] **Tests**
- [ ] **Follow-up** (se houver pontos deixados para depois)
