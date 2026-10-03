# Deploying to Vercel

The site is a standard Next.js 16 app. All pages are pre-rendered at build time; the only
code that runs per request is `proxy.ts` (language routing), which Vercel runs as
Routing Middleware.

## 0. Before you start

- **Plan:** Vercel's free **Hobby** plan is for personal, non-commercial projects. A
  business website like this one should be on the **Pro** plan (check current pricing on
  vercel.com/pricing). For a quick private preview, Hobby is fine.
- **Branch:** Vercel deploys your repo's default branch to production. Rename `master`
  to `main` first (see step 1). It's optional, but `main` is the usual default.

## 1. Push the code to GitHub

1. Create a new **private** repository on GitHub (for example `hooda-enterprise`).
   Leave it empty: no README, .gitignore or licence.
2. In the project folder (`hooda_enterprise/hooda_enterprise`):

   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-user>/hooda-enterprise.git
   git push -u origin main
   ```

`.env.local` is git-ignored, so your local settings are **not** pushed. You enter them in
Vercel in step 3.

## 2. Import the project in Vercel

1. Go to vercel.com → **Add New… → Project** → import the GitHub repository.
2. Vercel detects **Next.js** automatically. Keep the defaults:
   - Root Directory: `./` (the repository root is the app)
   - Build Command: `next build` · Output: default · Install: `npm install`
   - Node.js version (Settings → General): **22.x** (Next 16 needs 20.9 or newer)
3. Don't click Deploy yet. Add the environment variables first (next step).

## 3. Environment variables

Add these under **Settings → Environment Variables**, for **Production** and **Preview**:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_PHONE_NUMBER` | `8168200335` |
| `NEXT_PUBLIC_SERVICE_AREAS` | `Rohtak,Sonipat,Jhajjar` |
| `NEXT_PUBLIC_SERVICE_AREAS_HI` | `रोहतक,सोनीपत,झज्जर` |
| `NEXT_PUBLIC_SHOW_HINDI` | `false` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | *(only if WhatsApp uses a different number)* |
| `NEXT_PUBLIC_WHATSAPP_QUERY_NUMBER` | *(only if questions go to a different number)* |
| `NEXT_PUBLIC_SITE_URL` | *(leave empty until you add a custom domain, see step 6)* |

- With `NEXT_PUBLIC_SITE_URL` empty, the site uses Vercel's production domain
  (`<project>.vercel.app`). This relies on **"Automatically expose System Environment
  Variables"**, which is on by default (Settings → Environment Variables).
- These values are **baked in at build time**. After changing any of them, go to
  **Deployments → ⋯ → Redeploy**.

## 4. Deploy

Click **Deploy**. The build takes about a minute and creates 83 static pages.

## 5. Check the live site

Open the `.vercel.app` URL and check:

- [ ] Home page loads with the dealer bar ("Independent dealer · Delivering in Rohtak, Sonipat and Jhajjar")
- [ ] `/products`: search ("zeomin", "ammonia") and filters work
- [ ] A product page: **Buy on WhatsApp** opens a chat with **+91 81682 00335**, with the message filled in
- [ ] The enquiry list (basket) adds items and sends one combined message
- [ ] Footer and Contact page show **+91 81682 00335** and the service area
- [ ] `/sitemap.xml` and `/robots.txt` load and use the live domain
- [ ] An unknown URL (e.g. `/abc`) shows the 404 page
- [ ] On a phone: header menu, two-column product grid, sticky buy bar on product pages

## 6. Custom domain (when ready)

1. Buy a domain (e.g. from GoDaddy, Hostinger or Namecheap).
2. Vercel → **Settings → Domains → Add** → enter the domain. Vercel shows the exact DNS
   records to add at your registrar (usually an `A` record for the root domain and a
   `CNAME` for `www`). HTTPS is set up automatically.
3. Set `NEXT_PUBLIC_SITE_URL` to `https://your-domain.com` and **Redeploy**. Canonical
   links, the sitemap and WhatsApp product links will then use your domain.

## 7. After launch

- **Google Search Console:** add the domain, then submit `https://your-domain.com/sitemap.xml`.
- **Google Business Profile:** create or claim the shop listing with the same phone number
  and service area, and add the website link.
- **Optional:** turn on Vercel Web Analytics (Project → Analytics) to see visits.

## Day-to-day updates

- Every push to `main` deploys to production automatically.
- Pushes to any other branch get their own **preview URL**, which is useful for checking
  changes before merging.
- Prices and products are in `data/products.ts`; push the change and Vercel rebuilds.
- To change the phone number or service area, edit the env var in Vercel, then redeploy.
  No code change is needed.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| WhatsApp opens the placeholder number `919999999999` | `NEXT_PUBLIC_PHONE_NUMBER` is missing in Vercel. Add it and redeploy |
| Links in sitemap / WhatsApp messages show `localhost` | Set `NEXT_PUBLIC_SITE_URL`, or make sure system env vars are exposed, then redeploy |
| Changed an env var but the site didn't change | `NEXT_PUBLIC_*` values are build-time only. Redeploy |
| Local build warns about `package-lock.json in C:\Users\91935` | Harmless: a stray lockfile in your user folder. Deleting it removes the warning. It doesn't affect Vercel |
