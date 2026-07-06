# Giovanni Galvez Cybersecurity Portfolio — v2

This is a static cybersecurity portfolio site built for GitHub Pages or any static host.

## What changed in v2

- Reworked the top metrics to better match the current SOC/CTI/security analyst track.
- Replaced the premature **All-in-One Cyber Handheld Concept** project card with **ESP32 HaleHound Field Toolkit**, while still keeping the all-in-one handheld as design-log evidence.
- Added an evidence gallery inside the `Read brief` modal.
- Added placeholder evidence assets under `assets/evidence/`.
- Added a `members/` placeholder page without fake password collection.

## Adding proof screenshots

PNG screenshots work well. Put them in:

```text
assets/evidence/
```

Then update the matching project inside `app.js`:

```js
evidence: [
  {
    type: 'image',
    src: 'assets/evidence/my-ctf-result.png',
    title: 'CTF Result Report',
    caption: 'Cyber Skyline result report, redacted where needed.'
  }
]
```

PDFs also work. Use `type: 'document'` and point `href` at the PDF.

## Important security note

Do not upload private keys, live flags, credentials, personal addresses, classified material, proprietary work, or anything that violates a CTF/event rule. Redact names, emails, IPs, flags, client data, and internal-only details.

## Member login note

GitHub Pages is static hosting. A page like `members/index.html` can exist, but real authentication requires an external service or a different host. Good options:

- Cloudflare Pages + Cloudflare Access
- Netlify + password protection / identity
- Vercel + Clerk/Auth0/Supabase/Firebase
- A small backend/API behind the static frontend

For a subdomain like `members.giogalvez.com`, create a dedicated Pages repo or host, add the custom domain in its Pages settings, and create a DNS CNAME from `members` to your GitHub Pages default domain.
