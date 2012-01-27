# Maze game (xml hypermedia)

# Setup
cd /nodejs/maze; npm install express cradle ejs

brew install couchdb

cd /couchdb/maze; ./maze-data.sh


# Run
use two shells or throw one to the background

cd /nodejs/maze; node app.js

and then

cd /nodejs/maze/public; python -m SimpleHTTPServer 8888