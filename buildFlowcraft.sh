#! /usr/bin/bash
#this script is for temporary use because Adham found a bug that need to be fixed by react dev

# Enable extended globbing
shopt -s extglob

nvm use 18.17.1
cp .env.example.qa .env
# checking for the build all etender
if [ "$select" != "skipenv" ]; then
    nano .env
fi

pnpm clean
# pnpm i
pnpm build:server
rm -rfv !(.env|package.json|dist|public|.next)
rm -rf .env.example.prod
rm -rf .env.example.qa
rm -rf .eslintrc.json
# rm -rf .git
# rm -rf .gitignore
rm -rf .husky
rm -rf .vscode
pnpm i

# pm=$(pm2 ls -m | grep "+--\|status" | grep "flowcraft")
# # checking to create new pm2 or use old pm2
# if [ "$pm" == "+--- flowcraft" ]; then
#     # checking if there are already have pm2 for flowcraft
#     pm2 restart flowcraft --time
# else
#     # create new pm2 for flowcraft
#     pm2 start pnpm --name flowcraft -- start:server
#     pm2 restart flowcraft --time
# fi

# nvm use 16.15.1