
config = {}

config.port = 3000

// ik we committed the database credentials to GitHub hehe 
// plz don't hax
config.database = {
    uri: "mongodb+srv://unifyd:unifyd@yeee-knb70.mongodb.net/test",
    db: "unifyddb"
}

// and the application secret key rip
// no hax plzplzplzplz
config.session = {
    secret: "unifydisbae",
    cookie: {
        maxAge: 1000 * 60 * 30,
        sameSite: true
    },
    resave: true,
    rolling: true,
    saveUninitialized: false
}

config.coordinates = [
    {
        lat: 40.29053,
        long: -74.6410546
    },
    {
        lat: 40.2894825,
        long: -74.6541009
    },
    {
        lat: 40.288173,
        long: -74.6592507
    },
    {
        lat: 40.2711482,
        long: -74.6592507
    },
    {
        lat: 40.2813636,
        long: -74.6678338
    },
    {
        lat: 40.2779587,
        long: -74.6317849
    },
    {
        lat: 40.3002188,
        long: -74.6307549
    },
    {
        lat: 40.2999569,
        long: -74.5912728
    },
    {
        lat: 40.2501887,
        long: -74.6067223
    },
    {
        lat: 40.2742916,
        long: -74.5452676
    },
    {
        lat: 40.3054554,
        long: -74.5593438
    },
]
config.saltRounds = 10

module.exports = config
