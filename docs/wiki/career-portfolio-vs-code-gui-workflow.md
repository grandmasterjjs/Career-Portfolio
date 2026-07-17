# Career Portfolio Workflow: VS Code GUI

Use this when you want to make edits, commit them, push to `develop`, and review the Vercel Preview without using Git commands.

## 1. Open the Project Folder

Open VS Code.

Choose:

```text
File -> Open Folder
```

Select:

```text
/Volumes/Personal-Drive/Development/github/Career-Portfolio
```

## 2. Confirm You Are on the Develop Branch

Look at the bottom-left corner of VS Code.

You should see:

```text
develop
```

If it shows another branch:

1. Click the branch name in the bottom-left corner.
2. Choose `develop`.
3. Wait for VS Code to switch branches.

## 3. Make Your Edits

Edit the site files in VS Code.

Common content files:

```text
src/data/profile.ts
src/data/projects.ts
src/data/homelab.ts
src/data/experience.ts
src/data/milestones.ts
src/content/blog/*.mdx
README.md
```

Save your changes:

```text
File -> Save
```

Or press:

```text
Command + S
```

## 4. Review Changed Files

Click the Source Control icon in the left sidebar.

It looks like a branching line.

You will see a list of changed files.

Click each changed file to review the diff:

```text
Left side = old version
Right side = new version
```

Make sure only the files you expected are changed.

## 5. Stage the Changes

In the Source Control panel:

- Click the `+` next to each file you want to include.
- Or click the `+` beside "Changes" to stage everything.

Staged files move into the "Staged Changes" section.

## 6. Commit the Changes

In the message box at the top of Source Control, type a short commit message.

Examples:

```text
Update portfolio copy
Revise homelab content
Sanitize public infrastructure details
```

Click the Commit button.

If VS Code asks whether to stage all changes, only say yes if you reviewed them and want all of them included.

## 7. Push to GitHub

After committing, click:

```text
Sync Changes
```

or:

```text
Push
```

VS Code may show this near the Source Control panel or in the bottom status bar.

This pushes your commit to GitHub's `develop` branch.

## 8. Open the Vercel Preview

After the push, Vercel should automatically build a Preview deployment.

Open:

```text
https://career-portfolio-git-develop-grandmasterjjs-projects.vercel.app
```

If Vercel asks you to sign in, use your Vercel account.

## 9. Review the Preview

Click through the site like a visitor would.

Check:

```text
Home
About
Projects
Homelab
Blog
Resume
Contact
```

Pay special attention to any page you changed.

## 10. If Something Is Wrong

Go back to VS Code.

Make the correction.

Then repeat:

```text
Save -> Source Control -> Review Diff -> Stage -> Commit -> Sync/Push -> Review Vercel Preview
```

## 11. When Preview Looks Good

Stop here until you are ready to update production.

This workflow keeps production safer because every change is reviewed on the `develop` preview first.
