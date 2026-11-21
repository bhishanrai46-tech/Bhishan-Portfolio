# Bhishan Rai – Portfolio template

Plain HTML, CSS and JavaScript. No build step, no install needed.

```
index.html         Home page (about, journey, engineering, beyond work, thoughts, contact)
thoughts.html      Writing page
gallery.html       Photo gallery
page-template.html Copy this to make a new page
styles.css         All colours, fonts and layout
site.js            Menu, footer and theme button (edit SITE at the top)
images/            Put your photos here
Bhishan_Rai_Resume.docx
```

## Insert an image
1. Put the photo in the `images` folder, for example `images/office.jpg`.
   Use `.jpg`, `.png` or `.webp`, and keep each file under about 500 KB (resize large photos first).
2. In the page where you want it, add:
   ```html
   <figure class="figure">
     <img src="images/office.jpg" alt="Describe the photo">
     <figcaption>Optional caption</figcaption>
   </figure>
   ```
3. File names are case sensitive and should avoid spaces: `office-photo.jpg`, not `Office Photo.JPG`.

**Your profile photo:** save it as `images/me.jpg`, then in `index.html` change `images/me.svg` to `images/me.jpg`.

**Gallery:** open `gallery.html`, copy one `<figure>…</figure>` block and change the file name and caption.

## Add a page
1. Copy `page-template.html` and rename it, for example `travel.html`.
2. Change the title, heading and text.
3. Add it to the menu: open `site.js` and add `{ label: "Travel", href: "travel.html" }` to the `pages` list.

## Edit text
Open any `.html` file in a text editor (VS Code, Notepad) and change the words between the tags. Save, then redeploy.

## Deploy on Vercel
- **Easiest:** push this folder to a GitHub repo and import it at vercel.com (framework preset "Other"). Every time you add or edit files on GitHub, Vercel redeploys automatically. On github.com you can drag and drop new images straight into the `images` folder.
- **CLI:** `npm i -g vercel`, then run `vercel --prod` inside this folder.
