

const fastify = require('fastify')({
    logger: true
})

//links to external js routing file
fastify.register(require('../backend/models/routes/main'), { prefix: '/site' });


// Run the server!
const startServer = async() => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

startServer();