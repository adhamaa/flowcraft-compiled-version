#!/usr/bin/bash
# This script is for temporary use because Adham found a bug that needs to be fixed by the React dev.

# Enable extended globbing
shopt -s extglob

# Define the temporary branch name
TEMP_BRANCH="temp-build-branch"

# Create and switch to the temporary branch
git checkout -b $TEMP_BRANCH

# Clean and build the project
pnpm clean
pnpm build:server

# Remove all unnecessary and hidden files, but keep necessary build files and configs
rm -rfv !(.env|package.json|dist|public|.next)
rm -rf .env.example.prod
rm -rf .env.example.qa
rm -rf .eslintrc.json
rm -rf .gitignore
rm -rf .husky
rm -rf .vscode

# Check if the 'compiled' remote already exists; if not, add it
if git remote get-url compiled > /dev/null 2>&1; then
    echo "Remote 'compiled' already exists."
else
    git remote add compiled https://github.com/adhamaa/flowcraft-compiled-version.git
    echo "Remote 'compiled' added."
fi

# Add and commit changes on the temporary branch
git add .
git commit -m "Build: push compiled code"

# Push compiled code to the 'compiled' remote repository
git push -u compiled $TEMP_BRANCH --force

# Delete the temporary branch locally and remotely
git checkout main
git branch -D $TEMP_BRANCH
git push origin --delete $TEMP_BRANCH

echo "Compiled code pushed to 'compiled' remote: https://github.com/adhamaa/flowcraft-compiled-version.git"
