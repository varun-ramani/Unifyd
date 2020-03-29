
config = {}

config.port = 3000
config.database = {
    uri: "mongodb+srv://unifyd:unifyd@yeee-knb70.mongodb.net/test",
    db: "unifyddb"
}
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
config.saltRounds = 10

module.exports = config