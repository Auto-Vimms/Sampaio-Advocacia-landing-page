# 05 — Ambiente e configuração

## Versionamento

- `.gitignore` cobre: `.DS_Store`, `node_modules/`, `dist/`, `build/`, `coverage/`,
  `*.log`, `.vercel`, `.env*`.
- `.vercel/` e `.env.local` **nunca** são versionados — cada pessoa gera o seu.

## Rodar localmente

### Só testar localmente (sem acesso à Vercel)

1. Clonar, `npm install`.
2. Criar `.env.local` manualmente, com valores recebidos por **canal seguro** (nunca pelo
   Git).
3. `vercel dev`.

### Gerenciar deploy / env vars (dono do projeto)

```bash
vercel login
vercel link
vercel env pull .env.local
```

### Estático puro (sem Functions)

`npm run start` — serve só os arquivos estáticos; rotas `/api` não funcionam nesse modo.

## Variáveis de ambiente

`[ajustar por projeto — liste as variáveis específicas]`

Neste projeto (Sampaio Advocacia), o canal de e-mail usa Resend:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL`

Toda variável de ambiente é lida via `process.env` **dentro de `api/`**, nunca no
client-side.
