var express = require('express');
var superagent = require('superagent');
var func = require('./functions');

var _PORT = 3333;

app = express();
app.configure ( function () {
    
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
    app.set("port", _PORT);
    
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(logErrors);
    
})
app.listen( _PORT );

console.log ( "Starting server on port: " + _PORT )

app.get ( "/*", function (req, res, next ) {
    console.log ( req.method + " " + req.url + " -> "+ req.headers["user-agent"] );
    next();
})

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

count = 0
app.get('/',function(req, res){
    
    res.send("Hello Dolly" + count++ );
});


app.get('/list',function(req, res){
    
    console.log ( "hit" )
    res.send("Hello Dolly");
});