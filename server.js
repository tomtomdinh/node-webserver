/*
  Nodemon doesn't look for handlebar changes so you have to use this command:
  nodemon server.js -e js,hbs
*/

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

// use partials to reuse parts of an html page. ex: footers on every page
hbs.registerPartials(__dirname + '/views/partials');
app.set('view-engine', 'hbs');


// express middleware where the application pauses until next is called
// logs the server
// middleware call order matters!!!!
app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });

  next();
});

// doesn't call next maintenance page
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear();
});

// helper function that takes in an argument
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req,res)=>{
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the web server',
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req,res)=> {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'u bad'
  });
});

app.listen(port, ()=> {
  console.log(`Server is up on port ${port}`);
});
