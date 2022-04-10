cd client
npm install
npm run build
cd ..

cd server
npm install
npm run build
cd ..

rm -rf deployment_build
mkdir deployment_build

mv client/build deployment_build
mv server/output/* deployment_build

cp server/node_modules deployment_build
cp server/package.json deployment_build
cp server/package-lock.json deployment_build

