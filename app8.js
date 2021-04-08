const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

//Check connection
db.once('open',function(){
  console.log('Connected to MongoDB');
});

//Check for DB Errors:
db.on('error',function(err){
  console.log(err);
});

//Init App
const app = express();

//Bring the models
let Article = require('./models/article');

//Load View Engine
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Home Route
//Pass values to the templates or views
app.get('/',function(req, res){
  Article.find({},function(err, articles){
    if(err){
      console.log(err);
    } else {
      res.render('index4',{
        title:'Articles',
        articles: articles
    });
  }
  });
});

//Add Route
app.get('/articles/add', function(req, res){
  res.render('add_article2',{
    title:'Add Articles'
  });
});

// Add Submit POST Route
app.post('/articles/add', function(req, res){
  console.log('Form is Submitted!!');
  return;
});

//Start Server
app.listen(3000, function(){
  console.log('Server Started on port 3000...')
});
