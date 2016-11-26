const express = require('express');
const app = express();
const PORT = 2998;

app.use(express.static("static"));



app.listen(PORT, function(){
  console.log("Server listening on port "+PORT);
});
