# Bidesh Express

Your Gateway to International Education. International education and student services for Bangladeshi students.

This is phase 1: a static website (no build step). Next.js, Supabase login, student portal and admin dashboard are planned later phases.

## What is included
- Homepage: hero, three-field University Finder, courses, scholarships, services, roadmap, consultation form (opens WhatsApp), footer
- Tuition shown as BDT estimates using the internal rate in `data.js` (`BX_CONFIG.mytToBdt = 31.80`); the rate is never displayed.
- Demo admin panel for course data (saved in the browser only)

## Files
- `index.html` page markup
- `styles.css` styles
- `script.js` intro, finder engine, BDT rate, roadmap, forms
- `data.js` university and course database (SAMPLE data; edit here to add or update records)
- `assets/logo.png` official logo, white background made transparent and empty margin trimmed; `assets/logo-original.png` full original
- `vercel.json` Vercel settings; `favicon.svg`, `robots.txt`

## Run locally
`npx serve .` then open the address shown. Or open `index.html` through any static server (absolute paths like `/styles.css` need a server, not file://).

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. In Vercel choose Add New, Project, import the repo.
3. Framework Preset: Other. Leave Build Command and Output Directory empty. Deploy.

## Important: sample data
University and course records in `data.js` are SAMPLE data, not verified fees. Scholarships read "To be confirmed". Logos of universities are placeholder badges. Replace with verified records before launch. The internal exchange rate (31.80 BDT per MYR) is set in `data.js`.

## Contact
bideshexpress.edu@gmail.com, WhatsApp +60 11 3527 5727

## University Finder
Filters: study level, searchable subject, annual budget (BDT), plus optional type, location (multi-select), scholarship, English, intake, qualification. Strict criteria: level, subject, budget, type, location, scholarship, intake. If nothing matches exactly, the closest real alternatives are shown with reasons. Scholarship, English, entry, accommodation and ranking fields are `null` (shown as "to be confirmed") until verified. Compare up to 3, save, WhatsApp contact/apply.

## Founder section
Edit name, title, tagline, intro and the achievement figures in `data.js` (`window.BX_FOUNDER`). Portrait: `assets/founder.webp` (cut out from the supplied photo; replace with an original high-resolution photo for best quality).

