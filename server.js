require('./db');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const main = require('./routes/main');
const path = require('path');
const session = require('express-session');



var app = express();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 12 * 60 * 60 * 100}
  }));
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs',exphbs({extname:'hbs', defaultLayout:'mainLayout', layoutsDir:__dirname+'/views/layouts/'}));
app.set('view engine', 'hbs');
app.use('/static', express.static(path.join(__dirname,'static')));
var port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log('Express server started at port : 3000');
});

app.use('/', main);
