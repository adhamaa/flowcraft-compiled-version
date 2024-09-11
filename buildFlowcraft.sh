#!/usr/bin/bash
# This script is for temporary use because Adham found a bug that needs to be fixed by the React dev.

# Enable extended globbing
shopt -s extglob

# Clean and build in Repo A
pnpm clean
pnpm build:server

# Remove unnecessary files after build
rm -rfv !(.env|package.json|dist|public|.next)
rm -rf .env.example.prod
rm -rf .env.example.qa
rm -rf .eslintrc.json
rm -rf .husky
rm -rf .vscode

# Install dependencies after cleanup
# pnpm i

# Check if the 'compiled' remote already exists; if not, add it
if git remote get-url compiled > /dev/null 2>&1; then
    echo "Remote 'compiled' already exists."
else
    git remote add compiled https://github.com/adhamaa/flowcraft-compiled-version.git
    echo "Remote 'compiled' added."
fi

# Push compiled code to the 'compiled' remote repository
git add .
git commit -m "Build: push compiled code"
git push -u compiled main --force

echo "Compiled code pushed to 'compiled' remote: https://github.com/adhamaa/flowcraft-compiled-version.git"
