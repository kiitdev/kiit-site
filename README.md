# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

**Note**: feel free to use the package manager of your choice.

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

This site deploys to GitHub Pages via GitHub Actions, using the modern artifact-based
Pages deployment — **not** the older `gh-pages` branch approach, and not the `npm run
deploy` script above (that script only knows how to push to a `gh-pages` branch, so it
isn't used here).

On every push to `main`:

1. A workflow (`.github/workflows/deploy.yml`) runs `npm ci && npm run build`.
2. The `build/` output is uploaded as a Pages artifact via
   [`actions/upload-pages-artifact`](https://github.com/actions/upload-pages-artifact).
3. [`actions/deploy-pages`](https://github.com/actions/deploy-pages) publishes that
   artifact directly to GitHub Pages.

No `gh-pages` branch exists, and `build/` is never committed anywhere — not on `main`,
not on any other branch. It's a `.gitignore`d, CI-only artifact, generated fresh on
every deploy.

**One-time repo setup** (done once in GitHub, not via a local command):
in the repo's **Settings → Pages → Build and deployment**, the source must be set to
**"GitHub Actions"** (not "Deploy from a branch"). Without this, `actions/deploy-pages`
has nothing to publish to.

**Custom domain**: the site's `CNAME` file (`www.kiit.dev`) lives in `static/CNAME`, so
Docusaurus copies it into `build/CNAME` automatically as part of every build, and it
gets published to Pages along with everything else — no separate step needed.

> **Status**: this describes the target setup. As of this writing, the workflow file,
> the `CNAME` move into `static/`, and the repo's Pages source setting are all still
> pending — none of the actual deployment plumbing exists yet.
