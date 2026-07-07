# Giovanni Galvez Cybersecurity Portfolio

Static portfolio site for GitHub Pages or any basic web host.

## Structure

```text
index.html
style.css
app.js
vault.js
assets/
  favicon.svg
  evidence/
    ctf/ncl/
vault/
  index.html
  reports/
```

## GitHub Pages deployment

Upload the contents of this folder to the root of your GitHub Pages repository.

The repo root should look like this:

```text
index.html
style.css
app.js
vault.js
assets/
vault/
README.md
```

Then commit and push:

```bash
git add .
git commit -m "Update cybersecurity portfolio"
git push
```

## CTF / NCL evidence

The NCL screenshots live on the homepage project modal for **Cyber Skyline / NCL Competition Record**.

Files are stored here:

```text
assets/evidence/ctf/ncl/
```

Current filenames:

```text
ncl-fall-2024-team.png
ncl-fall-2024-individual.png
ncl-spring-2025-team.png
ncl-spring-2025-individual.png
ncl-fall-2025-team.png
ncl-fall-2025-individual.png
ncl-spring-2026-team.png
ncl-spring-2026-individual.png
```

To change the captions or add more CTF evidence, edit the `ctf-notes` entry in `app.js`.

## Operator Vault

The vault is a CTF-style gate for deeper research material, not normal portfolio proof. Keep standard proof like CTF scores on the homepage. Use the vault for advanced research cases, hardware notes, threat-intel simulations, adversary-lab material, and proof-of-concept work.

Current test credentials:

```text
username: tss_operator
password: receipts_or_it_didnt_happen
```

The credentials are intentionally discoverable in the static files because this is a portfolio challenge, not real authentication.
