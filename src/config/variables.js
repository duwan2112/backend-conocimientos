const Config = {
    appConfig:{
        port: process.env.PORT
    },
  mongoUrl:{
        url: process.env.URL
    },
    jwtConfig:{
        secreta: process.env.SECRETA
    },
    cloudinaryConfig:{
        name: process.env.CLOUD_NAME,
        key: process.env.CLOUD_KEY,
        secret: process.env.CLOUD_SECRET,

    }
}

module.exports = Config