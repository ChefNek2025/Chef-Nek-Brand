# Chef Nek — personal brand site

Premium personal site for Chef Nek: chef, food educator (Ingrediology) and developer.
Separate from **chefnekpro.com** (the Chef Nek Pro product site), which is untouched.

**Stack:** Next.js 16 (App Router, fully static) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lucide · Firebase (contact form only)

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages prerendered)
```

## Editing content — no code needed

Everything visible on the site lives in `content/`:

| File | What it controls |
|---|---|
| `content/site.ts` | Name, tagline, roles, **portrait**, **contact email**, **social links**, stats |
| `content/timeline.ts` | About-page milestones (`draft: true` = placeholder) |
| `content/dishes.ts` | Culinary portfolio (all current entries are **samples**) |
| `content/ingredients.ts` | Ingrediology explorer + explainer cards (+ Amharic names) |
| `content/projects.ts` | Tech projects, case studies, skills |
| `content/videos.ts` | YouTube / TikTok videos (gallery shows "coming soon" while empty) |

Images go in `public/images/` (e.g. `public/images/portrait.jpg` → `portrait: '/images/portrait.jpg'`).
Anything marked **draft / Sample / Placeholder** on the site still needs real content.

## Contact form → Firestore

The form writes to the existing Chef Nek Pro Firebase project, collection `inquiries`
(plus a best-effort admin notification in `notifications`, like the staff-request form on chefnekpro.com).
**Add this to the Firestore security rules before going live** so visitors can only *create*, never read:

```
match /inquiries/{id} {
  allow create: if request.resource.data.keys().hasOnly(['name','email','type','organization','message','source','status','createdAt'])
                && request.resource.data.name is string && request.resource.data.name.size() < 120
                && request.resource.data.email is string && request.resource.data.email.size() < 200
                && request.resource.data.message is string && request.resource.data.message.size() < 4000;
  allow read, update, delete: if request.auth != null && request.auth.token.email == '<admin email>';
}
```

## Deploy (Vercel)

1. Push this repo to GitHub and import it as a **new** Vercel project (do not reuse the chefnekpro.com project).
2. Set env var `NEXT_PUBLIC_SITE_URL` to the personal domain (used for canonical URLs, sitemap, Open Graph).
3. Add the domain in Vercel → Domains (add both apex and `www`, redirect `www` → apex).

## Plain HTML version (any static host)

```bash
npm run export     # writes static HTML/CSS/JS to /out
```

Upload the contents of `out/` to any static host (Vercel, Netlify drop, GitHub Pages, cPanel `public_html`).
The files must be served by a web server: double-clicking `index.html` won't load the styles and scripts, because they use site-root paths.
To preview locally: `npx serve out`.
