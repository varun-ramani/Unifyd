var express = require('express')
var session = require('express-session')
var hbs = require('express-handlebars');
var config = require('./config')
var helmet = require('helmet')
var app = express()
var routes = require('./routes/index')
var dbSetup = require('./database/setup');
var flash = require('connect-flash')
var cookieParser = require('cookie-parser');
var MongoDBStore = require('connect-mongodb-session')(session);

app.engine('handlebars', hbs({
    defaultLayout: 'default',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));

app.set('view engine', 'handlebars');
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser('betajithisisvarun'));

app.use(express.static('static'))

var store = new MongoDBStore(
    {
        uri: config.database.uri,
        databaseName: config.database.db,
        collection: 'sessions'
    },
    function (error) {
        // console.log(error)
    });
store.on('error', function (error) {
    // console.log(error)
});

app.use(session({
    secret: config.session.secret,
    cookie: {
        maxAge: config.session.cookie.maxAge,
        sameSite: config.session.cookie.sameSite
    },
    store: store,
    resave: config.session.resave,
    rolling: config.session.rolling,
    saveUninitialized: config.session.saveUninitialized
}));
app.use(cookieParser())
app.use(flash())
app.use((req, res, next) => {
    //Use this middleware section for handling user auth and session stuff

})
app.use('/', routes)

app.use(function (req, res) {
    res.status(404)
    return res.send("404 oof")
});

app.use(function (error, req, res, next) {
    res.status(500)
    res.send(error)
});

dbSetup.connectToServer(function (err, client) {
    app.listen(config.express.port, function () {
        console.log('Listening on port ' + config.express.port + '...')
    })
});
