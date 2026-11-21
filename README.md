# Bhishan Rai – Personal Portfolio

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide icons

## Edit your content
Everything you will want to change is in **`src/data/site.ts`**: name, headline, About, journey, experience, education, projects, skills, interests, achievements, blog notes and contact links. Save the file and the site updates.

Items marked `placeholder: true` show a dashed "add your own" style until you replace them.

## Add images
1. Put photos in **`public/images/`** (JPG, PNG or WebP; keep each under about 1 MB).
2. In `src/data/site.ts`, set the path, for example `portrait: "/images/portrait.jpg"` or `image: "/images/project-1.jpg"`.
3. If an image is empty or the file is missing, a clean placeholder is shown, so nothing breaks.

Images used: `site.portrait`, `about.image`, each `journey[].image`, each `projects[].image`, each `interests[].image`.

## Add a project or a note
Copy an object in `projects` or `notes` in `src/data/site.ts`, give it a new unique `slug`, and edit the text. A page is created automatically at `/projects/<slug>` or `/notes/<slug>`.

## Change the CV
Replace `public/Bhishan_Rai_Resume.docx` (keep the same file name, or change `site.cv`).

## Colours and fonts
Design tokens are at the top of `src/app/globals.css` (`--color-ink`, `--color-paper`, `--color-bronze`, fonts).

## Contact form
The form posts to `/api/contact`. To make it send email:
1. Create a free account at https://resend.com and get an API key.
2. In Vercel: Project → Settings → Environment Variables, add `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (see `.env.example`). Redeploy.

Until then the form shows a friendly message pointing people to your email address.

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy on Vercel
1. Go to https://vercel.com/new and import this GitHub repo.
2. Framework is detected as **Next.js**. Leave all defaults and click **Deploy**.
3. Optional: set `NEXT_PUBLIC_SITE_URL` to your live URL (used for SEO and the sitemap).

Every push to `main` redeploys automatically.
