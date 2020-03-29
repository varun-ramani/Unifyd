var express = require('express')
var session = require('express-session')
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var config = require('./config')
var helmet = require('helmet')
var app = express()
var dbSetup = require('./database/setup');
var flash = require('connect-flash')
var cookieParser = require('cookie-parser')
var MongoDBStore = require('connect-mongodb-session')(session)

app.engine('handlebars', hbs({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: {
        equals: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        }
    }
}));
app.set('view engine', 'handlebars');
app.use(helmet())
app.use(bodyParser.json());
app.use(cookieParser('betajithisisvarun'));
app.use('/static', express.static('static'));

var store = new MongoDBStore(
    {
        uri: config.database.uri,
        databaseName: config.database.db,
        collection: 'sessions'
    },
    function (error) {
        console.log(error)
    });
store.on('error', function (error) {
    console.log(error)
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

app.use(flash());

app.use((req, res, next) => {
    // Use this middleware section for handling user auth and session stuff
    req.nav = {}
    console.log(req.session)
    if (req.session.email) {
        if (req.session.type == 'buyer') {
            req.nav.login = false
            req.nav.dashboard = true
            req.nav.prof = true
            req.nav.products = true
        } else if (req.session.type == 'seller') {
            req.nav.login = false
            req.nav.dashboard = true
            req.nav.prof = true
            req.nav.products = true
        } else {
            req.nav.login = true
            req.nav.dashboard = false
            req.nav.prof = false
            req.nav.products = false
        }
    }
    next()
});


app.use('/', require('./routes/index'));


app.use(function (req, res) {
    res.status(404)
    return res.send("404 oof")
});

app.use(function (error, req, res, next) {
    res.status(500)
    return res.send(error)
});

dbSetup.connectToServer(function (err, client) {
    app.listen(config.port, function () {
        console.log('Listening on port ' + config.port + '...');
    });
});
