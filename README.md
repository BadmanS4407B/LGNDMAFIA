# LGNDMAFIA — Complete Starter Package

A multi-page cinematic front-end for the main LGNDMAFIA site, HER WORLD, THE UNKNOWN and an admin-terminal interface. Designed for a dark silver / icy-blue aesthetic and mobile screens.

## Files
- `index.html`, `style.css`, `script.js`: main site, scroll scenes, particle field, copy buttons.
- `lgndmafia-config.js`: ordinary main-site text and profile values in one place.
- `her-world.html`: private romantic experience prototype.
- `unknown.html`: separate mysterious dimension prototype.
- `world-config.js`, `worlds.js`, `worlds.css`: shared private-world presentation and text settings.
- `admin.html`, `admin.js`, `admin.css`: minimal terminal interface.
- `backend/`: Node API reference for server-side code validation and admin authentication.

## Important before uploading
**Do not publish this package as if the private worlds are already secure.** GitHub Pages is static hosting and cannot protect codes or admin credentials by itself. The two private entry pages intentionally fail with “ACCESS SERVICE UNAVAILABLE” until a backend is deployed and configured. Do not put working codes, passwords, API keys, or TOTP secrets into any public JS file.

## Test the public site locally
Open `index.html` in a browser or use GitHub Pages after uploading the front-end files. The main public site works without a backend. Copy buttons and animations are active. Sound is shown as off; no audio files are bundled yet.

## GitHub Pages
Upload the front-end files to the repository root. Keep the Google verification HTML file if Google Search Console still uses it. GitHub Pages can host the public pages, but the backend folder must be deployed separately to a Node host. Don't expect `backend/server.js` to run on Pages.

## Editing normal text
Edit `lgndmafia-config.js` for the main site's profile and brand values. Edit `world-config.js` for the romantic letter, her name, signature, and world messages. Do not put access-control secrets in either config file. Some visual copy is currently in the HTML and can be edited there.

## Known prototype limits
- HER WORLD sequence is a front-end experience, not a fully protected private-content system yet. Move the letter and identity-specific content behind the backend before using it for genuinely private content.
- Admin login needs a securely provisioned admin record in backend storage. No default credentials are included.
- `ALTER` and `ECHO` commands deliberately return a disabled message in this starter. The initial backend supports CREATE, STATUS, VEIL, and UNSEAL, but CREATE needs world-selection and a safe one-time code handoff before real use.
- No music, external character artwork, or paid assets are bundled. The hooded figure is CSS art, keeping the package lightweight.
- The API JSON file is for a private test only; use a persistent database and review security before production.

## Motto
“I was never meant to fit inside your rules.”
