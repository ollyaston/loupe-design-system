# Git setup – push to a private GitHub repo

Your local repo is ready: git is initialized and the initial commit is done.

## Option A: Using GitHub CLI (recommended)

1. **Log in to GitHub** (run this in your terminal; it will open a browser):

   ```bash
   gh auth login
   ```

   Follow the prompts and choose GitHub.com, HTTPS, and complete the browser flow.

2. **Create the private repo and push:**

   ```bash
   cd /Users/olly/Downloads/loupe_design_system
   gh repo create loupe-design-system --private --source=. --remote=origin --push
   ```

   This creates a private repo on GitHub, adds `origin`, and pushes your code.

---

## Option B: Create the repo on GitHub manually

1. Open [github.com/new](https://github.com/new).

2. Set the repository name to `loupe-design-system` (or another name).

3. Choose **Private**.

4. Do **not** add a README, .gitignore, or license (they are already in your project).

5. Click **Create repository**.

6. Add the remote and push:

   ```bash
   cd /Users/olly/Downloads/loupe_design_system
   git remote add origin https://github.com/YOUR_USERNAME/loupe-design-system.git
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your GitHub username.

---

## Repo status

- Git initialized
- Initial commit created (356 files)
- `.gitignore` updated (removed merge conflict markers)
- Ready to push to a remote
