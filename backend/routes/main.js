const Posts = require('../models/posts')
const sequelize = require('../config/DBConfig');

async function routes(fastify, options) {
    fastify.get('/', async function handler(request, reply) {
        return {balls:'partty'}
    })

    fastify.get('/test', async function handler(request, reply) {
        const fs = require ('fs');
        const postjson = fs.readFileSync(__dirname+'/testData_toremove/posts.json')
        const psotsend = JSON.parse(postjson);

        // https://www.youtube.com/watch?v=k4FG29N8wg8 (16:00)
        //param

        const {paramid} = request.query
        if (!paramid) return psotsend

        const paramedposts = psotsend.filter((psotsend) => psotsend.id == paramid)
        return paramedposts
    })

    fastify.get('/test/:id', async function handler(request, reply) {
        const fs = require('fs');
        const postjson = fs.readFileSync(__dirname + '/testData_toremove/posts.json')
        const psotsend = JSON.parse(postjson);
        reply.send(psotsend)
    })

    // Add more route handlers as needed
    fastify.post('/createpost', async function handler(request, reply){
        const newPost = request.body;
        const test = newPost.title;
        console.log(test);
        Posts.create({
            title:test,
            description:"test",
            userPosted:"test",
            views:0,
            ratings:0,
            datePosted: sequelize.fn('NOW')
        })
    })

    fastify.get('/getpost', async function handler(request, reply){
        let postset = await Posts.findAll();
        postset = JSON.stringify(postset);
        postset = JSON.parse(postset);
        //console.log(postset);

        const { idp } = request.query
        if (!idp) return postset
        const paramedposts = postset.filter((postset) => postset.postid == idp)
        return paramedposts
    })

    fastify.post('/updatePost', async function handler(request, reply) {
        const newPost = request.body;
        const test = newPost.title;
        const { idp } = request.query
        console.log(test);

        priorupdatePost = Posts.findOne({where: {postid: idp}})

        Posts.update({
            title: test,
            description: "test updated",
            userPosted: "test",
            views: priorupdatePost.views,
            ratings: priorupdatePost.ratings,
            datePosted: sequelize.fn('NOW')
        },
        {where: {postid: idp}}
        )
    })
    
    fastify.post('/deletePost', async function handler(request, reply) {
        const { idp } = request.query
        Posts.destroy({where: {postid: idp}})
    })
}

module.exports = routes;