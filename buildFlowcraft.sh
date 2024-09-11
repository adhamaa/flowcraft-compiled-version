#!/usr/bin/bash
# This script is for temporary use because Adham found a bug that needs to be fixed by the React dev.

# Enable extended globbing
shopt -s extglob

# Get the current branch name and store it in a variable
CURRENT_BRANCH=$(git symbolic-ref --short HEAD)

# Prompt for the temporary branch name
read -p "Enter the name for the temporary branch: " TEMP_BRANCH

# Define the compiled remote URL as a variable
COMPILED_REMOTE_URL="https://github.com/adhamaa/flowcraft-compiled-version.git"

# Install Git LFS if not already installed
if ! command -v git-lfs &> /dev/null
then
    echo "Git LFS not found, installing..."
    git lfs install
fi

# Track large files with Git LFS
git lfs track "*.pack"
git lfs track ".next/cache/**/*"

# Add and commit the .gitattributes file
git add .gitattributes
git commit -m "Track large files with Git LFS"

# Create and switch to the temporary branch
git checkout -b $TEMP_BRANCH

# Clean and build the project
pnpm clean
pnpm build:server

# Remove all unnecessary and hidden files, but keep necessary build files and configs
rm -rfv !(.env*|package.json|dist|public|.next)
# rm -rf .env.example.prod
# rm -rf .env.example.qa
rm -rf .eslintrc.json
rm -rf .gitignore
rm -rf .husky
rm -rf .vscode

# Ensure that large cache files are handled by Git LFS
rm -rf .next/cache

# Add, commit, and push changes on the temporary branch
git add .
git commit -m "Build: push compiled code"

# Check if the 'compiled' remote already exists; if not, add it
if git remote get-url compiled > /dev/null 2>&1; then
    echo "Remote 'compiled' already exists."
else
    git remote add compiled $COMPILED_REMOTE_URL
    echo "Remote 'compiled' added."
fi

# Push compiled code to the 'compiled' remote repository with --no-verify
git push -u compiled $TEMP_BRANCH --force

# Switch back to the original branch
git checkout $CURRENT_BRANCH

# Delete the temporary branch locally and remotely
git branch -D $TEMP_BRANCH
# Uncomment the line below if you also want to delete the branch remotely
# git push origin --delete $TEMP_BRANCH

echo "Compiled code pushed to 'compiled' remote: $COMPILED_REMOTE_URL"
