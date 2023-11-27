const Posts = require('../models/posts')
const Users = require('../models/users')
const sequelize = require('../config/DBConfig');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
require("dotenv").config();

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
        const usernameI = newUser.username;
        const bio = newUser.bio;
        const emailinput = newUser.email;
        const unhashedpw = newUser.password;
        console.log(usernameI);
        const findIfExists = await Users.findOne({where: {publicusername : usernameI}})
        if (findIfExists){
            console.log("not create");
            return "username existed"
        }
        else{
          const findEmailExists = await Users.findOne({where: {email : emailinput}})
          if (findEmailExists){
             return "email existed";
          }
          else{
              bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(unhashedpw, salt, (err, hash) => {
                      if (err) throw err;
                      const hashedpw = hash;
                      Users.create({
                          publicusername: usernameI,
                          userbio: bio,
                          email: emailinput,
                          password: hashedpw,
                          role: 'user'
                      });
                  });
              });
          }
        }


       /* if (userexists == false){
            
            });
        }*/
    })

    fastify.post('/login', async function handler(request, reply) {
        const Usertocheck = request.body;
        const topinputtocheck = Usertocheck.topinput;
        const passwordinput = Usertocheck.passwordinput;
        const allow = false;

        const dbusertocheck = await Users.findOne({ where: { publicusername: topinputtocheck } })
        if (dbusertocheck){
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(passwordinput, salt, (err, hash) => {
                    if (err) throw err;
                    const hashedpw = hash;
                });
            });
            const comapre = await bcrypt.compare(passwordinput, dbusertocheck.password)
            if (comapre == true){
                const payload = { user_id: topinputtocheck };
                const token = jwt.sign({ payload }, 'fsesbn');
                return token;
            }
            else{
                //wrong passqword
                return "wrong password";
            }
        }
        else{
            //nothing
        }
    })

    fastify.get('/getprofileinfo', async function handler(request, reply) {
        try {
            const token = request.headers.authorization.split(" ")[1];
            const { payload } = jwt.verify(token, 'fsesbn');
            console.log(payload)
            const singleuser = await Users.findOne({ where: { publicusername: payload.user_id } });
            console.log(singleuser)
            reply.send({ singleuser }).status(200);
        } catch (error) {
            reply.status(401).send("unAuthorized");
        }
    })
}

module.exports = routes;