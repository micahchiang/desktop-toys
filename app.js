var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//serve static client
app.use(express.static(path.join(__dirname, 'client')));
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

app.listen(8000, () => {
    console.log('listening at 8000');
});