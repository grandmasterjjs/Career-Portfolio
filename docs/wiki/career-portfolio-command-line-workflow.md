# Career Portfolio Workflow: Command Line

Use this when you want to edit the Career Portfolio site locally, push changes to the `develop` branch, and review the Vercel Preview deployment before production.

## 1. Open the Project

In Terminal:

```bash
cd /Volumes/Personal-Drive/Development/github/Career-Portfolio
```

Confirm you are on `develop`:

```bash
git branch --show-current
```

Expected result:

```text
develop
```

If needed:

```bash
git switch develop
```

## 2. Make Sure You Are Starting Clean

```bash
git status
```

A clean start looks like:

```text
On branch develop
Your branch is up to date with 'origin/develop'.
nothing to commit, working tree clean
```

## 3. Open the Project in VS Code

```bash
code .
```

Make your edits in VS Code, then save the files.

## 4. Review What Changed

Back in Terminal:

```bash
git status
```

See the actual edits:

```bash
git diff
```

Use this step as your sanity check before committing.

## 5. Stage the Changes

To stage all changed files:

```bash
git add .
```

Or stage specific files:

```bash
git add path/to/file
```

Check staged files:

```bash
git status
```

## 6. Commit the Changes

Use a short message describing what changed:

```bash
git commit -m "Update portfolio content"
```

Examples:

```bash
git commit -m "Revise homelab page copy"
git commit -m "Update project case studies"
git commit -m "Sanitize public infrastructure details"
```

## 7. Push to GitHub Develop

```bash
git push origin develop
```

This sends your committed changes to GitHub. Vercel should automatically start a Preview deployment for the `develop` branch.

## 8. Find the Vercel Preview Link

List recent deployments:

```bash
npx --yes vercel@latest ls
```

Look for:

```text
Project: career-portfolio
Environment: Preview
Status: Ready
```

The stable `develop` preview URL is:

```text
https://career-portfolio-git-develop-grandmasterjjs-projects.vercel.app
```

Open that link in your browser.

## 9. Review the Preview

Check the pages you changed.

Recommended review list:

```text
/
/about
/homelab
/projects
/blog
/resume
/contact
```

If the preview asks you to sign in, use your Vercel account. Preview deployments may be protected.

## 10. If Something Is Wrong

Make more edits in VS Code, then repeat:

```bash
git status
git diff
git add .
git commit -m "Fix preview issue"
git push origin develop
```

Vercel will create a new Preview deployment automatically.

## 11. When Preview Looks Good

Stop here unless you are intentionally updating production.

The normal flow is:

```text
develop branch -> Vercel Preview -> review -> production later
```
