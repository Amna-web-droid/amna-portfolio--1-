# Amna — Portfolio (Notebook Edition)

Built with Next.js (App Router) + Tailwind CSS + Framer Motion.
Design concept: a personal notebook — grid-paper background, everything
presented as pinned newspaper clippings.

## Run it locally

```
npm install
npm run dev
```

Open http://localhost:3000

## Adding projects

Open `data/projects.js` — there are three arrays: `frontendProjects`,
`backendProjects`, `fullstackProjects`. Add your project to whichever list
it belongs in:

```js
{
  title: "My App",
  description: "A short sentence on what it does.",
  tags: ["React", "Tailwind CSS"],
  screenshot: "/clippings/my-app.png",
  github: "https://github.com/your-username/my-app",
  live: "https://my-app.vercel.app", // leave "" if none yet
},
```

Drop the matching screenshot into `public/clippings/` first. Save the file
and the right section on the homepage updates automatically.

## Adding Figma / design work

Same pattern, in `data/designs.js`. Screenshots go in `public/designs/`.

## Adding a journey entry

Open `data/journey.js` and add a new object at the **top** of the array
(newest first):

```js
{
  date: "2026-08-01",
  title: "What you learned",
  note: "A sentence or two about it.",
  code: `const x = 1;`, // optional — leave as null to skip
  language: "javascript", // optional label shown on the snippet
},
```

This shows up on the `/journey` page.

## Before you go live

Search and replace the placeholder text in:

- `components/Contact.jsx` — set `FORMSPREE_ENDPOINT` to your own form
  (sign up free at formspree.io, create a form, paste the endpoint URL)
- `components/Footer.jsx` — your real email, GitHub, LinkedIn, Instagram
- `data/projects.js` — remove the sample project once you have real ones

## Deploying

Easiest option is Vercel:

1. Push this folder to a GitHub repo
2. vercel.com → New Project → import the repo → Deploy (defaults are fine)

No database needed — everything lives in the `data/` files.
