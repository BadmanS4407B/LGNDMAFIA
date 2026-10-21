# LGNDMAFIA private API — reference setup

This API is separate from GitHub Pages. GitHub Pages cannot run this Node server. Deploy this folder to a Node host with HTTPS, persistent storage and environment secrets.

## Important limitations
- This is a starter reference, not a production security audit.
- `data.json` is a simple file store; use a managed database for production and ensure it survives deploys. The default admin is intentionally absent: you must provision one safely before enabling admin login.
- Never commit `data.json`, real access codes, password hashes, TOTP seeds, or `.env` files to a public repository.
- The private-world frontend currently requires `/api/access`. Set `window.API_BASE` before `worlds.js` if API is on a different origin, and set `ALLOWED_ORIGIN` on the backend to the exact Pages origin.
- The browser's `sessionStorage` token is only a UI session in this prototype. Protected private content should be served by an API after checking the token; don't place truly confidential text in public HTML/JS.

## Install
1. Install Node.js 20+.
2. In this folder run `npm install`.
3. Set `ALLOWED_ORIGIN=https://YOUR-USERNAME.github.io` and `PORT=8787` (adjust for your hosting provider).
4. Create `data.json` with `{"identities":[],"admins":[]}` and secure file permissions. Do not commit it.
5. Create an administrator record using a secure one-time provisioning script: username `THE UNKNOWN`, `passwordHash` generated with `bcrypt.hash(password, 12)`, and `totpSecret` generated with `speakeasy.generateSecret({length:20}).base32`. Keep the TOTP secret out of source control and configure it in an authenticator app. Do not send credentials in chat.
6. Deploy on a persistent Node host and verify `/health` over HTTPS.
7. Configure `API_BASE` in the frontend to your API origin. The `ALLOWED_ORIGIN` value must exactly match the deployed website origin.

## Supported starter API
- `POST /api/access` with `{ "code": "...", "world": "her" | "unknown" }`. Access codes are stored as SHA-256 hashes and bound to a world.
- `POST /api/admin/login` with username, password, and authenticator TOTP.
- `POST /api/admin/command` with an authenticated bearer token. Starter commands: `CREATE [LABEL]`, `STATUS [ID_OR_LABEL]`, `VEIL [ID_OR_LABEL]`, `UNSEAL [ID_OR_LABEL]`.

## Before real use
Add persistent database transactions, server-side visitor sessions, CSRF/origin review, audit/security monitoring, permission enforcement, a safe code-reveal flow, proper admin setup/rotation, and tests. `ALTER` and `ECHO` intentionally fail closed in this starter. The admin command `CREATE` currently creates an `unknown` identity; update it to choose the world and permissions before issuing real private codes. The private-world letter is a front-end placeholder and is not protected content until moved behind the API.
