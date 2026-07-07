# Giovanni Galvez Cybersecurity Portfolio — v3 Operator Vault

This is a static cybersecurity portfolio site with a built-in CTF-style Operator Vault.

## What changed in v3

- Added an **Operator Vault** section to the homepage.
- Added a CTF-style username/password gate.
- Added a `/vault/` proof locker page.
- Added placeholder report pages for:
  - CTF result reports and field notes
  - ESP32 HaleHound build log
  - Safe dark web threat-intelligence training material
  - TSS homelab evidence checklist
  - Creator Shield proof of concept
- Removed the fake `members/` page so the site does not pretend to have real backend authentication.

## CTF credentials

The credentials are intentionally hidden across the source, CSS, and JavaScript.

- Username: `tss_operator`
- Password: `receipts_or_it_didnt_happen`

The clues are placed in:

- `index.html` source comments
- `style.css` comments
- browser console via `vault_hint()`

## Important security warning

This is **not real authentication**. GitHub Pages is static hosting. Anyone determined enough can inspect files, source code, scripts, or direct paths.

Use the vault only for:

- Redacted proof
- Sanitized screenshots
- CTF score reports you are comfortable making public
- Safe, legal training material
- Portfolio storytelling

Do **not** place private files, credentials, real sensitive data, or anything illegal inside this repo.

For real private member access later, use Cloudflare Access, Netlify Identity, Firebase Auth, Supabase Auth, Clerk, Auth0, or a custom backend.

## Where to add screenshots

Put image evidence here:

```text
assets/evidence/
```

Then update links in:

```text
app.js
vault/index.html
vault/reports/*.html
```

## How to preview locally

Open `index.html` in your browser.

For the cleanest local preview, run:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## How to deploy on GitHub Pages

Upload the full contents of this folder to your GitHub Pages repository. Your vault will be available at:

```text
/vault/
```

Example:

```text
https://giiogalvez.github.io/gio.gvz-site/vault/
```


## v3.1 note

This version patches the lab diagram responsiveness so the branch cards wrap cleanly instead of forcing four columns inside a narrow grid area.

## v3.2: Adding CTF result screenshots

CTF screenshots belong in:

```text
assets/evidence/ctf/ncl/
```

The current package includes these public-safe Cyber Skyline / NCL result screenshots:

```text
assets/evidence/ctf/ncl/ncl-fall-2024-team.png
assets/evidence/ctf/ncl/ncl-fall-2024-individual.png
assets/evidence/ctf/ncl/ncl-spring-2025-team.png
assets/evidence/ctf/ncl/ncl-spring-2025-individual.png
assets/evidence/ctf/ncl/ncl-fall-2025-team.png
assets/evidence/ctf/ncl/ncl-fall-2025-individual.png
assets/evidence/ctf/ncl/ncl-spring-2026-team.png
assets/evidence/ctf/ncl/ncl-spring-2026-individual.png
```

The homepage CTF modal references the strongest screenshots in `app.js` under `modalData['ctf-notes'].evidence`.

The full vault page is:

```text
vault/reports/ctf-results.html
```

GitHub Pages is public static hosting. Do not upload unredacted flags, private writeups, sensitive tooling output, private IPs, customer data, or anything you would not want indexed or inspected.
