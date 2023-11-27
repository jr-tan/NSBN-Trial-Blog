const Posts = require('../models/posts')
const Users = require('../models/users')
const sequelize = require('../config/DBConfig');
const bcrypt = require('bcryptjs');

async function routes(fastify, options) {
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
        const description = newPost.description;
        console.log(test);
        Posts.create({
            title:test,
            description:description,
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
        const description = newPost.description;
        const { idp } = request.query
        console.log(description);

        priorupdatePost = Posts.findOne({where: {postid: idp}})

        Posts.update({
            title: test,
            description: description,
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

    fastify.post('/createuser', async function handler(request, reply) {
        const newUser = request.body;
        const username = newUser.username;
        const bio = newUser.bio;
        const name = newUser.name;
        const emailinput = newUser.email;
        const unhashedpw = newUser.password;
        var userexists = '';
       Users.count({ where: { email: emailinput } })
            .then(count => {
                if (count != 0) {
                    userexists = false;
                }
                userexists = true;})
        console.log(userexists)
        if (userexists == false){
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(unhashedpw, salt, (err, hash) => {
                    if (err) throw err;
                    const hashedpw = hash;
                    console.log(hashedpw)
                    Users.create({
                        publicusername:username,
                        userbio:bio,
                        email:emailinput,
                        password:hashedpw,
                        role:'user'
                    })
                });
            });
        }
    })
}

module.exports = routes;