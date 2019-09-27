#!/usr/bin/env sh

set -e

yarn run build

cd ./dist

git init
git add -A
git commit -m 'deploy'

# git push -f git@github.com:tiantong-tech/tiantong-tech.github.io.git master

cd -
