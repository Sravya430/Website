# Sravya Varada — AI Engineering & Research

A warm editorial portfolio built with React, TypeScript, Vite, and Tailwind CSS, deployed on Vercel.

The site brings together selected AI engineering projects, the DiSCo arXiv preprint, experience, education, and contact links. A local cartoon portrait, Georgia headings, cream paper surfaces, and restrained rose and sage accents give it a notebook-inspired feel.

## Content and interactions

- `src/components/portfolioContent.ts` is the typed content layer shared by the page, portfolio assistant, and optional terminal. It draws existing profile, project, and experience facts from `src/data.json`.
- The assistant matches questions against published facts locally; it does not call an external AI service. Answers include sources and contextual follow-ups.
- Project details and academic scores use native expandable sections. Architecture diagrams are labeled conceptual.
- Navigation supports keyboard access and a mobile menu. Motion is restrained and respects reduced-motion preferences.
- `public/sravya-avatar.webp` is an optimized local illustration with explicit dimensions.

## Development and validation

Use Node.js 22.18+ for the native TypeScript regression tests.

```sh
npm ci
npm run dev
npm run lint
npm run build
node --test src/components/chatKnowledge.test.ts
```

Review responsive layouts at 320, 390, 768, and 1440 pixels, expanded details, long assistant answers, keyboard navigation, contrast, and zoom reflow before release. Review the Vercel preview before merging to main. Vercel deployment history retains the previous production deployment for rollback.
