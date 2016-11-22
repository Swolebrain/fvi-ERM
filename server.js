const express = require('express');
const app = express();
const PORT = 2999;
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  database: 'erm',
  user: 'root',
  password: ''
});
connection.connect();
app.use(express.static('static'));

app.get('/employers', function(req, res){
  connection.query('SELECT * FROM employers', function(err, result){
    if (err) {
      console.log(err.toString());
      return res.send(500);
    }
    console.log(result);
    res.json(result);
  });
});


app.listen(PORT, function(){
  console.log("server listening on port "+PORT);
});
