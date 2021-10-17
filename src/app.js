const server = require('./server')


server.then(hapi => {
    console.log(`${process.env.HOST}:${process.env.PORT}`)
    hapi.start()
})