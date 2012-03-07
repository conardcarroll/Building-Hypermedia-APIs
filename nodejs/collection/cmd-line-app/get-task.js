/* 2012-03-06 (cpc) : get-task.js */
/* Designing Hypermedia APIs by Mike Amundsen (2011) */

var http = require('http');
var util = require('util');

// set teh vars
var client,
host,
port,
path,
args,
help;
host = 'localhost';
port = 3000;
path = '/collection/tasks/';
hdrs = {};
args = {};

help = '*** Usage:\n' +
'node get-task.js list | "<query-name>" ["<query-parameters>"]\n' +
'  Where:\n' +
'    list shows available queries\n' +
'    <query-name> is the name of a query returned from list\n' +
'    <query-parameter> is a parameter for the specified query';

// check args and fire off processing
if (process.argv.length < 3) {
    console.log(help);
}
 else {
    client = http.createClient(port, host);

    if (process.argv[2] == 'list') {
        showQueries();
    }
    else {
        args.queryName = process.argv[2];

        args.queryParameters = [];
        for (var i = 3, j = 0; i < process.argv.length; i++, j++) {
            args.queryParmeters[j] = process.	argv[i];
        }

        showResults();
    }
}

// show the results of the query
function showResults() {
    var query = {};
    getQueries(function(data) {
        for (var i = 0; i < data.length; i++) {
			if(data[i].prompt == args.queryName) {
			  console.log('Found query ' + args.queryName);	
				query.rel = data[i].rel;
				query.href = data[i].href
				
				console.log('href ' + query.href);
				
				
				var reqq = client.request('GET',
					query.href.replace('http://localhost:3000',''), {
			        'host': host + ':' + port
			    });
				reqq.on('response',
				function(response) {
					 var body = '';
				        response.on('data',
				        function(chunk) {
				            body += chunk;
				        });
				        response.on('error',
				        function(error) {
				            console.log(error);
				        });
				        response.on('end',
				        function() {
				            var data = JSON.parse(body);
							console.log('items ' + JSON.stringify(data.collection.items));
				        });
				});
				reqq.on('error',
			    function(error) {
			        console.log(util.inspect(error));
			    });
				
			    reqq.end();
			}
		}
		
		if(query.href === undefined) {
	    	console.log(args.queryName + ' is not an available query. Try ');
			showQueries();
		}
    });
}

// parse the collection+json document for queries
function showQueries() {
    getQueries(function(data) {
        for (var i = 0; i < data.length; i++) {
            console.log('Query Name: ' + data[i].prompt);
            if (data[i].data) {
                for (var j = 0; j < data[i].data.length; j++) {
                    console.log('  Parameter: ' + data[i].data[j].prompt);
                }
            }
        }
        console.log(JSON.stringify(data));
    });
}

// get the server's write template
function getQueries(cb) {
    // request root document
    var req = client.request('GET', path, {
        'host': host + ':' + port
    });

    // event handlers
    req.on('response',
    function(response) {
        var body = '';
        response.on('data',
        function(chunk) {
            body += chunk;
        });
        response.on('error',
        function(error) {
            console.log(error);
        });
        response.on('end',
        function() {
            var data = JSON.parse(body);
            cb(data.collection.queries);
        });
    });

    req.on('error',
    function(error) {
        console.log(error);
    });

    req.end();
}

// send the data to the server for storage
function showTasks(tasks) {
    console.log("# All Tasks #");
    console.log(JSON.stringify(tasks));
}

// eof
