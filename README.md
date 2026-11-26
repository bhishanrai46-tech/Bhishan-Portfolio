# Bhishan Rai: Portfolio

A Next.js 16 portfolio with two modes:

- **Visitor mode**: the normal read-only site.
- **Creator mode**: log in at `/creator` and edit the live site in place, WordPress-style.

## What you can edit in creator mode

- **Any text**: click it and type. Press Enter to finish a single line.
- **Any image**: hover it and use *Upload image* (images are shrunk in the browser first, 4 MB max).
- **Colours, fonts, text size**: *Design* panel.
- **Sections**: *Sections* panel. Rename, reorder, hide, or hide from the menu.
- **Items in lists**: move up or down, delete, or add (projects, roles, skills, interests and more).
- **Pages**: *Pages* panel. Add projects, articles and custom pages. New ones start as drafts; Publish when ready.
- **Site settings**: name, email, LinkedIn, GitHub, SEO description, CV file.

Press **Save** (or Ctrl/Cmd+S). **Visitor view** previews the site without editing tools. Drafts and placeholder items are never shown to visitors.

## Set up on Vercel

1. Connect the Vercel project to this GitHub repo (`Bhishan-Portfolio`, branch `main`).
2. **Storage tab**: create a **Blob** store with **Public** access and connect it to the project. This adds `BLOB_READ_WRITE_TOKEN`.
3. **Settings → Environment Variables**: add `CREATOR_PASSWORD` (long and unique) and optionally `SESSION_SECRET`.
4. Redeploy, then open `/creator` and log in.

## Local development

```bash
npm install
cp .env.example .env.local   # set CREATOR_PASSWORD
npm run dev
```

Without a Blob token, edits are saved to `.data/` locally (git-ignored).

## Notes

- Last save wins if you edit from two devices at once.
- The last 8 saves are kept in Blob storage.
- Contact form needs the Resend variables in `.env.example`.
