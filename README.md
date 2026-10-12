# Akshit Sharma — portfolio

Static site: plain HTML, one stylesheet (`public/styles.css`) and one script (`public/app.js`) for the canvas visuals. No build step.

- `public/index.html` home
- `public/projects.html`, `public/experience.html`
- `public/projects/*.html` one case study per project
- `public/Akshit_Sharma_Resume.pdf` linked from every page

Deployed on Vercel; `vercel.json` tells it to serve `public/` as-is.
To preview locally: `python3 -m http.server -d public 8000`.

The previous Next.js version is kept on the `nextjs-old` branch.
