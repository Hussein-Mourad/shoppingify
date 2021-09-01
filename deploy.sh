npm run build --prefix client;
cp -r client/out/ ./public;
npm run build:webpack;
git add .;
git commit -am "heroku release" 
git push heroku main;