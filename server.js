const express = require('express');
const app = express();
const PORT = 2998;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/erm');
mongoose.connection.once('open', ()=>console.log('Connected to DB!'));
const Employer = require('./Employer.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("static"));


app.post('/api/employers', function(req, res){
  console.log("Received request to create new Employer!");
  console.log(req.body);
  if (!req.body || !req.body.name) return res.status(400).send("You need to at least send a name");
  let employerInstance = new Employer(req.body);
  employerInstance.save()
  .catch(err=>{
    console.log(err.toString());
    res.status(500).send(err.toString());
  })
  .then(dbres=>{
    console.log(dbres);
    res.json(dbres);
  })
});

app.get('/api/employers', function(req, res){
  Employer.find()
  .catch(err=>{
    console.log(err.toString());
    res.status(500).send(err.toString());
  })
  .then(dbres=>{
    console.log(dbres);
    res.json(dbres);
  });
});

app.delete('/api/employers/:id', function(req, res){
  let idToDelete = req.params.id;
  Employer.findByIdAndRemove( idToDelete)
  .catch(err=>{
    console.log(err.toString());
    res.status(500).send(err.toString());
  })
  .then(dbres=>{
    console.log(dbres);
    if (dbres) res.json(dbres);
    else res.status(404).send("ID doesnt exist");
  });
});

app.put('/api/employers/:id', function(req, res){
  let idToDelete = req.params.id;
  Employer.findByIdAndUpdate( idToDelete, req.body)
  .catch(err=>{
    console.log(err.toString());
    res.status(500).send(err.toString());
  })
  .then(dbres=>{
    console.log(dbres);
    res.json(dbres);
  });
});


app.listen(PORT, function(){
  console.log("Server listening on port "+PORT);
});
