npm install

rimraf dist
rimraf release/**/* --glob

npm run prod_test_exit_build
zip-a-folder ./dist ./release/chrome.zip -d 'dist/'
rimraf dist

npm run prod_test_exit_build_edge
zip-a-folder ./dist ./release/edge.zip -d 'dist/'
rimraf dist

npm run prod_test_exit_build_opera
zip-a-folder ./dist ./release/opera.zip -d 'dist/'
rimraf dist

npm run prod_test_exit_build_brave
zip-a-folder ./dist ./release/brave.zip -d 'dist/'
rimraf dist

npm run prod_test_exit_build_yandex
zip-a-folder ./dist ./release/yandex.zip -d 'dist/'
rimraf dist

npm run prod_test_exit_build_firefox
zip-a-folder ./dist ./release/firefox.zip -d
rimraf dist