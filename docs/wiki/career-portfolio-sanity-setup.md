# Career Portfolio Sanity Setup

This site has an embedded Sanity Studio route at:

```text
/studio
```

The Studio is scaffolded for editing Portfolio Projects first.

## Required Environment Variables

Add these to Vercel for the Career Portfolio project:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
```

The dataset is usually:

```text
production
```

Until these values are present, `/studio` shows a setup message instead of loading the editor.

## Sanity Allowed Origins

In Sanity, add the portfolio domains as allowed origins for the Studio/API:

```text
https://career.grandmasterj.com
https://career-portfolio-git-develop-grandmasterjjs-projects.vercel.app
```

If Vercel creates different preview URLs, add those preview origins too.

## First Content Type

The first Sanity document type is:

```text
Project
```

It matches the existing project data fields:

- name
- slug
- pitch
- problem
- solution
- benefits
- tech
- tags
- githubUrl
- architecture
- lessons
- metric
- accent
- icon
- featured
- sortOrder
- published

## Suggested Workflow

1. Connect or create the Sanity project.
2. Add the env vars above to Vercel for Preview and Production.
3. Open the Vercel develop preview at `/studio`.
4. Create or import projects into Sanity.
5. In a later step, update the public Projects pages to read from Sanity.

For now, the public site still uses the existing local project data file. This keeps the first CMS step low-risk.
