var cradle = require('cradle');
var connection = new(cradle.Connection)();

var db = connection.database('maze-data');

db.exists(function (err, exists) {
	if(err) {
		console.log('error');
	} else if(exists) {
		db.destroy();
	}
	db.create();
	console.log('create maze-data db');
});

db.save('five-by-five', {
  cells : {
    cell0:[1,1,1,0],
    cell1:[1,1,1,0],
    cell2:[1,1,0,0],
    cell3:[0,1,0,1],
    cell4:[0,1,1,0],
    cell5:[1,0,1,0],
    cell6:[1,0,0,1],
    cell7:[0,0,1,0],
    cell8:[1,1,0,0],
    cell9:[0,0,1,1],
    cell10:[1,0,0,1],
    cell11:[0,1,1,0],
    cell12:[1,0,1,1],
    cell13:[1,0,0,1],
    cell14:[0,1,1,0],
    cell15:[1,1,1,0],
    cell16:[1,0,1,0],
    cell17:[1,1,0,0],
    cell18:[0,1,0,1],
    cell19:[0,0,1,0],
    cell20:[1,0,0,1],
    cell21:[0,0,0,1],
    cell22:[0,0,1,1],
    cell23:[1,1,0,1],
    cell24:[0,0,1,1]    
  }
}, function(err, res){
	if(err) {
		console.log('error inserting cells' + res.toJSON());
	}
});

db.save('_design/example', {
  views : {
    foo : {
      map : function(doc){emit('cells',doc.cells)}
    }
  },

  shows : {
    cells : function(doc,req){    return {body : doc.cells, headers : {'content-type':'application/json'}}    }
  },
    
  validate_doc_update : function(newDoc, oldDoc, userCtx){    throw {forbidden : 'read-only'}  }
}, function(err, res){
	if(err) {
		console.log('error creating views/validation')
	}
});

