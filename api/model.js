const sql = require( __dirname + "/db.js");

// constructor
const Database = function( data ) {
  this.id = data.id;
  this.doc = data.doc;
};

Database.create = (table, id, doc, result) => {
  var obj = Object.keys( doc ).map(function (head) {
        var obj = doc[head];
        return `'${head}','${obj}'`;
    }).join(',');
  sql.query("INSERT INTO "+ table +" ( id, doc ) VALUES ( "+ id +", '"+ JSON.stringify(doc) +"')", [], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created");
    result(null, { id: res.insertId, message: "created"});
  });
};

Database.read = (table, id, result) => {
  sql.query("SELECT * FROM "+ table +" ", [], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { message: res});
  });
};

module.exports = Database;