// routesIndex.js
async function routes(fastify, options) {
    fastify.get('/', async function handler(request, reply) {
        return {balls:'partty'}
    })
    // Add more route handlers as needed
}

module.exports = routes;