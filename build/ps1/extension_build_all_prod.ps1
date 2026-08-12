npm install

rimraf dist
rimraf store/**/* --glob

npm run prod_exit_build
zip-a-folder ./dist ./store/chrome.zip -d 'dist/'
rimraf dist

npm run prod_exit_build_edge
cross-env env=ext browser=edge exit_build=true vite build --mode production
zip-a-folder ./dist ./store/edge.zip -d 'dist/'
rimraf dist

npm run prod_exit_build_firefox
cross-env env=ext browser=firefox exit_build=true vite build --mode production
zip-a-folder ./dist ./store/firefox.zip
rimraf dist
