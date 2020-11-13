#!/bin/bash
npm install
npm run build:prod
cd server
npm install --production

cd ../
rm -rf output
mkdir output

cp  -r server   ./output
cp dist/index.html  ./output/server/views/
cp -r dist/*   ./output/server/public/









