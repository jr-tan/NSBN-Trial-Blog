const fastify = require('fastify')({
    logger: true
})
const mysql = require('mysql');
const database = require('./helpers/database')
const DB = require('./config/DBConnection');
const db = require('./config/db');

const fastifySession = require('@fastify/session');
const fastifyCookie = require('@fastify/cookie');

DB.setUpDB(false);


//links to external js routing file
fastify.register(require('../backend/routes/main'), { prefix: '/api' });
//above pathing is a bit weird, will fix if have time

fastify.register(fastifyCookie);
fastify.register(fastifySession, { secret: 'asdfghjklzserfbhuilmnhgvfcdsxerg', expires: 1800000, cookie: { secure: false }});

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