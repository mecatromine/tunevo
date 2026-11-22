# tunevo — Official Studio Website & CubeFit Store Compliance Hub

Minimalist studio website for **tunevo** featuring **CubeFit** on Google Play, bilingual English / Français UI, GDPR & Cookie consent center, Google Play compliance pages, and `app-ads.txt`.

---

## Google Play Console URLs (`com.tunevo.cubefit`)

| Field / Champ | Official URL |
|---|---|
| **Developer Website / Site développeur** | `https://tunevo.si` |
| **Game Showcase / Page CubeFit** | `https://tunevo.si/cubefit` |
| **Privacy Policy URL / Politique de confidentialité** | `https://tunevo.si/privacy` |
| **Terms of Use (EULA) URL** | `https://tunevo.si/terms` |
| **GDPR & Consent Center** | `https://tunevo.si/gdpr` |
| **Data Deletion URL / Suppression des données** | `https://tunevo.si/data-deletion` |
| **Support URL / Support Email** | `https://tunevo.si/support` (`support@tunevo.si`) |
| **Authorized Sellers (`app-ads.txt`)** | `https://tunevo.si/app-ads.txt` |

> Both clean URLs (`/privacy`, `/privacy/`) and `.html` URLs (`/privacy.html`) are included and resolve identically on any static host.

---

## Pre-Launch Checklist / Vérifications avant mise en ligne

1. **Update `app-ads.txt`**: Replace `pub-0000000000000000` (AdMob) and `YOUR_UNITY_ORG_ID` (Unity Ads) with your live publisher IDs before enabling live ad mediation.
2. **Email Routing (`tunevo.si`)**: Configure forwarding or mailboxes for `support@tunevo.si` and `privacy@tunevo.si`.

---

## Deploy / Publier le dépôt

This repository is pure static HTML/CSS/JS—ready to host on GitHub Pages, Cloudflare Pages, Netlify, or Vercel:

```bash
git remote add origin https://github.com/<YOUR_ORG>/tunevo-website.git
git branch -M main
git push -u origin main
```
Point your domain `tunevo.si` to the host (`CNAME` file is preconfigured for GitHub Pages).
