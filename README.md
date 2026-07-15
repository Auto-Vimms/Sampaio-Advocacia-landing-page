# Sampaio Advocacia Landing Page

Institutional landing page built with modular HTML, CSS, and JavaScript.

## Structure

- `index.html`: main page markup.
- `assets/`: brand images and icons.
- `style/`: styles split by responsibility.
- `src/config/`: contact and delivery configuration.
- `src/domain/`: business rules for the appointment form.
- `src/infrastructure/`: external deliveries (WhatsApp and e-mail).
- `src/ui/`: interface behaviors.
- `api/`: Vercel Functions (Resend integration for sending e-mails).
- `tests/`: automated tests, mirroring the structure of `src/` and `api/`.

## Architecture

The project follows a separation inspired by Clean Code and DDD adapted for frontend:
- `domain` only knows the "delivery" abstraction (`send(appointmentRequest)`), never the underlying sending technology.
- `infrastructure` knows the sending technology (fetch, WhatsApp, Resend), but contains no business rules.
- `api/send-email.js` validates the data, builds the e-mail template, and sends it via Resend.

The default submit channel (`whatsapp` or `email`) is defined in `src/config/config.js`, under `appointment.defaultSubmitMethod`.

## Running locally

There are two setups, depending on what you need to do.

### Option A — Just testing locally (no Vercel account needed)

If you only need to run the project on your machine to test features, including e-mail sending, you don't need a Vercel login or to be added to the team.

1. Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd sampaio-advocacia-landing-page
npm install
```

2. Ask the project owner for the current `.env.local` values (shared through a secure channel, never through Git) and create a `.env.local` file in the project root with:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL`

3. Run the development environment:

```bash
vercel dev
```

The site will be available at `http://localhost:3000`, with the `/api/send-email` function working against the shared Resend credentials.

> Note: `vercel dev` may prompt you to link the folder to a Vercel project on first run. You can skip this by keeping the `.env.local` file in place — the local dev server reads environment variables from it regardless of any team link.

### Option B — Managing the project on Vercel (deploys, env vars, domains)

This is only needed for whoever manages deployments and environment variables in the Vercel dashboard.

1. Log in and link the project:

```bash
vercel login
vercel link
```

Select the corresponding project when prompted.

2. Pull the environment variables managed in the Vercel dashboard:

```bash
vercel env pull .env.local
```

3. Run `vercel dev` as usual.

The `.vercel/` folder created by `vercel link` is not versioned (it's in `.gitignore`), since it contains account-specific identifiers.

### Static-only mode (no Functions)

To serve only the static files, without `/api` routes (e-mail sending won't work in this mode):

```bash
npm run start
```

## Automated tests

The project uses [Vitest](https://vitest.dev). Tests live under `tests/`, mirroring the structure of `src/` and `api/`.

```bash
npm test
```

## Syntax check

```bash
npm run check:js
```