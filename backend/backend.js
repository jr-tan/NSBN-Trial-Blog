const fastify = require('fastify')({
    logger: true
})
const mysql = require('mysql');
const database = require('./helpers/database')
const DB = require('./config/DBConnection');
const db = require('./config/db');

DB.setUpDB(false);


//links to external js routing file
fastify.register(require('../backend/routes/main'), { prefix: '/site' });
//above pathing is a bit weird, will fix if have time



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