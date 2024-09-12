#!/bin/bash

# Input branches
FROM_BRANCH=$1
TO_BRANCH=$2

# Check if both branches were provided
if [ -z "$FROM_BRANCH" ] || [ -z "$TO_BRANCH" ]; then
  echo "Usage: ./merge-and-remove-branch.sh [from_branch] [to_branch]"
  exit 1
fi

# Fetch the latest changes
echo "Fetching the latest changes..."
git fetch --all

# Switch to the target branch (TO_BRANCH)
echo "Switching to branch $TO_BRANCH..."
git checkout "$TO_BRANCH"
if [ $? -ne 0 ]; then
  echo "Failed to switch to branch $TO_BRANCH"
  exit 1
fi

# Pull the latest changes on the target branch
echo "Pulling the latest changes on $TO_BRANCH..."
git pull origin "$TO_BRANCH"
if [ $? -ne 0 ]; then
  echo "Failed to pull the latest changes on branch $TO_BRANCH"
  exit 1
fi

# Try to merge the FROM_BRANCH into the TO_BRANCH
echo "Merging branch $FROM_BRANCH into $TO_BRANCH..."
git merge "$FROM_BRANCH"
MERGE_RESULT=$?

# Check if there are conflicts
if [ $MERGE_RESULT -ne 0 ]; then
  echo "Merge conflicts detected."

  # Prompt the user to choose a merge strategy
  echo "Choose a merge conflict resolution strategy:"
  echo "1) Use 'theirs' strategy (keep changes from $TO_BRANCH)"
  echo "2) Use 'ours' strategy (keep changes from $FROM_BRANCH)"
  read -p "Enter your choice (1 or 2): " STRATEGY_CHOICE

  # Abort the current merge
  git merge --abort

  # Apply the chosen strategy
  if [ "$STRATEGY_CHOICE" == "1" ]; then
    echo "Using 'theirs' strategy to resolve conflicts..."
    git merge -X theirs "$FROM_BRANCH"
  elif [ "$STRATEGY_CHOICE" == "2" ]; then
    echo "Using 'ours' strategy to resolve conflicts..."
    git merge -X ours "$FROM_BRANCH"
  else
    echo "Invalid choice. Please choose 1 or 2."
    exit 1
  fi

  if [ $? -ne 0 ]; then
    echo "Merge with selected strategy failed. Please resolve manually."
    exit 1
  fi
fi

# Push the merged changes to the remote
echo "Pushing the merged changes to $TO_BRANCH..."
git push origin "$TO_BRANCH"
if [ $? -ne 0 ]; then
  echo "Failed to push changes to branch $TO_BRANCH"
  exit 1
fi

# Remove the merged branch locally
echo "Deleting the local branch $FROM_BRANCH..."
git branch -d "$FROM_BRANCH"
if [ $? -ne 0 ]; then
  echo "Failed to delete local branch $FROM_BRANCH"
  exit 1
fi

# Remove the merged branch from the remote
echo "Deleting the remote branch $FROM_BRANCH..."
git push origin --delete "$FROM_BRANCH"
if [ $? -ne 0 ]; then
  echo "Failed to delete remote branch $FROM_BRANCH"
  exit 1
fi

echo "Branch $FROM_BRANCH has been successfully merged into $TO_BRANCH and deleted."
