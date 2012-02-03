#! /bin/bash

clear
echo '2012-02-02 (cpc) project-data for couchdb'

echo 'creating db...'
curl -vX DELETE http://localhost:5984/project-data
curl -vX PUT http://localhost:5984/project-data

echo 'adding design document...'
curl -vX PUT http://localhost:5984/project-data/_design/example -d @project-design-doc.json

echo 'adding collection data...'
curl -vX PUT http://localhost:5984/project-data/project1 -d @project1.json
curl -vX PUT http://localhost:5984/project-data/project2 -d @project2.json
curl -vX PUT http://localhost:5984/project-data/project3 -d @project3.json

echo 'testing views...'
curl -v http://localhost:5984/collection-data-tasks/_design/example/_view/all
curl -v http://localhost:5984/collection-data-tasks/_design/example/_view/open
curl -v http://localhost:5984/collection-data-tasks/_design/example/_view/closed
# curl -v http://localhost:5984/collection-data-tasks/_design/example/_view/due_date?startkey=\"2011-12-30\"
# curl -v http://localhost:5984/collection-data-tasks/_design/example/_view/due_date?endkey=\"2011-12-30\"
# curl -v http://localhost:5984/collection-data-tasks/_design/example/_view/due_date?startkey=\"2011-12-30\"&endkey=\"2011-12-31\"
# curl -v http://localhost:5984/collection-data-tasks/_design/example/_view/due_date

echo 'testing shows...'
curl -v -H accept:application/json http://localhost:5984/collection-data-tasks/_design/example/_show/projects
echo '.'

echo 'testing validator...'
# curl -vX PUT http://localhost:5984/collection-data-tasks/task2 -d @task1.json

echo '*** all passed ***'
