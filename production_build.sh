cd client
npm run build
cd ..
rm -rf server/build
mv client/build server/
cd server
docker-compose up --build -d