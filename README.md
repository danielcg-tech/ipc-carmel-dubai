# IPC Carmel Dubai – Static Website

## ⚡ Quick Start (3 steps)

### Step 1 – Download Bootstrap (one-time)
1. Go to https://getbootstrap.com/docs/5.3/getting-started/download/
2. Click **"Download compiled CSS and JS"**
3. From the ZIP, copy:
   - `css/bootstrap.min.css`  →  paste into  `ipc_carmel/css/`
   - `js/bootstrap.bundle.min.js`  →  paste into  `ipc_carmel/js/`

### Step 2 – Open the site
Double-click `index.html` — no server or build step needed.

### Step 3 – Add your media
| What | Where | File names |
|------|--------|------------|
| Hero videos | `videos/hero/` | `hero1.mp4`, `hero2.mp4`, `hero3.mp4` |
| Gallery photos | `images/gallery/` | `gallery1.jpg` … `gallery9.jpg` |
| Event poster | `images/events/` | `event1.jpg` |
| Church logo | `images/logo/` | `logo.png` |

---

## 📝 Common Edits

### Replace YouTube video IDs
Search for `dQw4w9WgXcQ` in `index.html` and replace with your real YouTube video IDs.
Each embed looks like:
```html
<iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0" ...>
```

### Update event details (index.html)
Find the `<!-- RIGHT: Upcoming Events -->` comment block and edit:
- `src="images/events/event1.jpg"` → your poster image
- The `<p class="event-date">` text
- The `<h4>` event title and `<p>` description

### Update chatbot answers (js/chatbot.js)
All answers live in the `FAQ` object at the top of the file.
Edit the strings between the backticks for each question key.

### Update pastor info (about.html)
Find `<!-- Senior Pastor card -->` and edit the name, title, and bio text.
To add a real photo replace the `<div class="pastor-photo-placeholder">` block with:
```html
<img src="images/pastor-photo.jpg" alt="Pastor Thomas Mathew" class="pastor-photo">
```

### Add more gallery photos
1. Name the file `gallery10.jpg` (or the next number)
2. Copy it to `images/gallery/`
3. Add a new block in `gallery.html` inside the `.gallery-grid` row:
```html
<div class="col fade-up">
  <div class="gallery-item" tabindex="0" role="button" aria-label="Gallery photo 10">
    <img src="images/gallery/gallery10.jpg" alt="IPC Carmel Dubai – Gallery photo 10" loading="lazy" width="600" height="450">
    <div class="gallery-item-overlay" aria-hidden="true"><span>🔍</span></div>
  </div>
</div>
```

### Update contact / social links
- Email: search `info@ipccarmeldubai.com` → replace with real email
- Facebook: search `https://www.facebook.com/` → replace with real page URL

---

## 📁 Folder Structure
```
ipc_carmel/
├── index.html
├── about.html
├── gallery.html
├── css/
│   ├── bootstrap.min.css   ← download from getbootstrap.com
│   └── style.css
├── js/
│   ├── bootstrap.bundle.min.js  ← download from getbootstrap.com
│   ├── chatbot.js
│   └── main.js
├── fonts/                  (add local font files here if needed)
├── images/
│   ├── logo/logo.png       ← replace with real logo
│   ├── events/event1.jpg   ← replace with real event poster
│   └── gallery/            ← add gallery1.jpg … galleryN.jpg
└── videos/
    └── hero/               ← add hero1.mp4, hero2.mp4, hero3.mp4
```

---

## 🎨 Design Theme
| Variable | Value | Used for |
|----------|-------|---------|
| `--navy` | `#1B2A4A` | Navbar, backgrounds, headings |
| `--gold` | `#C9A227` | Accents, borders, hover states |
| `--serif` | Playfair Display | Headings |
| `--sans` | Inter | Body, nav, buttons |

To change the colour scheme, edit the `:root` block at the top of `css/style.css`.
