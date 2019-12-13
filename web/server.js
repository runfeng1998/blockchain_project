var express=require('express');
var bodyParser=require('body-parser')

var app=express();
app.use(bodyParser.urlencoded({extended:false}));

app.set('views', './views')
app.set('view engine', 'ejs')

var indexRouter=require('./routes/index')

app.use('/', indexRouter)

app.listen(3000)
console.log('listen to port 3000');