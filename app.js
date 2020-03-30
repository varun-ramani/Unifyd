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
var dbUsers = require('./database/users')

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
        },

        toCurrency: function(value) {
            return value.toFixed(2) + "";
        },

        addOne: function(value) {
            return Number.parseInt(value) + 1;
        }
    }
}));
app.set('view engine', 'handlebars');
app.use(helmet())
app.use(bodyParser.json({extended: false}));
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

app.use(async (req, res, next) => {
    // Use this middleware section for handling user auth and session stuff
    req.nav = {}

    if (req.session.user) {
        if (req.session.user.email) {
            dbres = await dbUsers.getUserByEmail({ 'email': req.session.user.email })
            if (dbres.res) {
                req.session.user = {
                    email: dbres.res.email,
                    name: dbres.res.name,
                    type: dbres.res.type,
                    id: dbres.res._id
                }
                if (req.session.user.type == 'buyer') {
                    req.nav.login = false
                    req.nav.dashboard = true
                    req.nav.prof = true
                    req.nav.products = true
                    return next()
                } else if (req.session.user.type == 'vendor') {
                    req.nav.login = false
                    req.nav.dashboard = true
                    req.nav.prof = true
                    req.nav.products = true
                    return next()
                }
            } else {
                req.session.user = null
            }
        }else{
            req.session.user = null
        }
    }
    req.nav.login = true
    req.nav.dashboard = false
    req.nav.prof = false
    req.nav.products = false
    return next()
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
