# Tunevo (`tunevo.si`) — Official Website & CubeFit Store Compliance Hub

Official studio website for **Tunevo** (`https://tunevo.si`) featuring a dedicated flagship showcase for **CubeFit** (`com.tunevo.cubefit`), bilingual English / Français UI, GDPR & Cookie consent center, Google Play & App Store compliance pages, and `app-ads.txt`.

---

## Store URLs Ready to Copy-Paste / URLs officielles pour les Stores

### Google Play Console (`com.tunevo.cubefit`)
| Field / Champ | Official URL |
|---|---|
| **Developer Website / Site développeur** | `https://tunevo.si` |
| **Marketing / Game Page** | `https://tunevo.si/cubefit` |
| **Privacy Policy URL / Politique de confidentialité** | `https://tunevo.si/privacy` |
| **Data Deletion URL / Suppression des données** | `https://tunevo.si/data-deletion` |
| **Support Email** | `support@tunevo.si` |
| **Authorized Sellers (`app-ads.txt`)** | `https://tunevo.si/app-ads.txt` |

### Apple App Store Connect (`com.tunevo.cubefit`)
| Field / Champ | Official URL |
|---|---|
| **Marketing URL** | `https://tunevo.si/cubefit` |
| **Support URL** | `https://tunevo.si/support` |
| **Privacy Policy URL** | `https://tunevo.si/privacy` |
| **Terms of Use (EULA) URL** | `https://tunevo.si/terms` |

### In-App CubeFit Legal & Consent Links
| Control | Official URL |
|---|---|
| **Terms of Service** | `https://tunevo.si/terms` |
| **Privacy Policy** | `https://tunevo.si/privacy` |
| **Support** | `https://tunevo.si/support` |
| **GDPR Center** | `https://tunevo.si/gdpr` |

> Both clean URLs (`/privacy`, `/privacy/`) and `.html` URLs (`/privacy.html`) are included and resolve identically on any static host.

---

## Pre-Launch Checklist / Vérifications avant mise en ligne

1. **Update `app-ads.txt`**: Open `app-ads.txt` and replace `pub-0000000000000000` (AdMob) and `YOUR_UNITY_ORG_ID` (Unity Ads) with your live publisher IDs before enabling live ad mediation.
2. **Email Routing (`tunevo.si`)**: Configure forwarding or mailboxes for `support@tunevo.si` and `privacy@tunevo.si` (via Cloudflare Email Routing, Zoho Mail, Google Workspace, or your registrar).
3. **Store Link Check**: Once CubeFit is live on Google Play and the App Store, update the App Store link inside `index.html` and `cubefit/index.html` with your Apple App Store ID URL (`https://apps.apple.com/app/idXXXXXXXXXX`).

---

## Deploy / Publier le dépôt

This repository is zero-build pure HTML/CSS/JS—ready to host for free on GitHub Pages, Cloudflare Pages, Netlify, or Vercel.

### Option 1: GitHub Pages (with `tunevo.si` custom domain via `CNAME`)
```bash
git remote add origin https://github.com/<YOUR_ORG>/tunevo-website.git
git branch -M main
git push -u origin main
```
Then in GitHub **Settings → Pages**:
- Source: **GitHub Actions** (uses `.github/workflows/deploy.yml`) or **Deploy from branch `main`**.
- Custom domain: `tunevo.si` (already configured via `CNAME`).
- Point your `tunevo.si` DNS A/CNAME records to GitHub Pages and enable **Enforce HTTPS**.

### Option 2: Cloudflare Pages / Netlify / Vercel
- Simply drag-and-drop or connect the Git repository—`netlify.toml` and `vercel.json` are preconfigured with security headers and clean URLs.
