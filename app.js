var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var routes = require('./routes/routes');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//serve static client
app.use(express.static(path.join(__dirname, 'client')));
// app.use('/', routes);
app.use('/generate', routes);
//catch 404s
app.use((req,res,next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err,req,res,next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

let port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('listening at ' + port);
});
