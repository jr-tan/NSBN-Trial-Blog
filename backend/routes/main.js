const Posts = require('../models/posts')
const Users = require('../models/users')
const Ratings = require('../models/ratings')
const Comments = require('../models/comments')
const sequelize = require('../config/DBConfig');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fastifySession = require('@fastify/session');
const fastifyCookie = require('@fastify/cookie');
require("dotenv").config();
const nodemailer = require("nodemailer");


async function routes(fastify, options) {
    // Add more route handlers as needed
    fastify.post('/createpost', async function handler(request, reply){
        const newPost = request.body;
        const title = newPost.title;
        const description = newPost.description;
        const userPosted = newPost.userposted
        //console.log(title);
        Posts.create({
            title: title,
            description:description,
            userPosted: userPosted,
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
        Comments.destroy({ where: { postcommented: idp } })
        console.log('all comments deleted')
        setTimeout(() => { Posts.destroy({ where: { postid: idp } }) }, 2000);
    })

    fastify.post('/updateviews', async function handler(request, reply) {
        const { idp } = request.query
        try{
        posttoget = await Posts.findOne({ where: { postid: idp } })
        const originalviewcount = posttoget.views
        Posts.update({ views: originalviewcount + 1 },
            { where: { postid: idp } })}
        catch{reply.send('no posts')}
    })  

    fastify.post('/ratepost', async function handler (request, reply){
        const {idp} = request.query;
        const userid = request.session.userid;
        //checks if user has rated on the post before 
        checkifrated = await Ratings.findOne({ where: { postid: idp, userrated: userid } })
        if (checkifrated){
            return "user rated"
        }
        else{
            Ratings.create({postid: idp, userrated:userid})
        }

        /*posttoget = await Posts.findOne({ where: { postid: idp } })
        const originalratingcount = posttoget.ratings
        Posts.update({ ratings: originalratingcount + 1 },
            { where: { postid: idp } })*/
    })

    fastify.post('/createcomment', async function handler(request, reply){
        const newreply = request.body;
        const usercommented = newreply.usercommented;
        const postcommented = newreply.postcommented;
        const commenttext = newreply.commenttext;
        Comments.create({postcommented: postcommented, usercommented:usercommented, commenttext:commenttext})
    })

    fastify.get('/getcomment', async function handler(request, reply){
        const {idp} = request.query;
        const {commentid} = request.query;
        if (idp!=null){
        let commentsjson = await Comments.findAll({where: {postcommented : idp}});
        return commentsjson}
        else{
            let commentsjson = await Comments.findAll({ where: { commentsid: commentid } });
            return commentsjson      
        }
    })

    fastify.post('/updatecomment', async function handler (request, reply){
        const {idp} = request.query;
        const updatedcomment = request.body.newcomment
        //above is COMMENTS ID not POST ID
        Comments.update({ commenttext: updatedcomment, isedited:1}, 
            {where: {commentsid:idp}})
    })

    fastify.post('/deletecomment', async function handler(request, reply){
        const {idp} = request.body
        console.log(idp);
        Comments.destroy({where: {commentsid : idp}})
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

              let transporter = nodemailer.createTransport({
                  host: "smtp-mail.outlook.com", // SMTP server address (usually mail.your-domain.com)
                  port: 587, // Port for SMTP (usually 465)
                  secure: false, // Usually true if connecting to port 465
                  auth: {
                      user: process.env.OUTLOOKUSERNAME, // Your email address
                      pass: process.env.OUTLOOKPASSWORD, // Password (for gmail, your app password)
                  },
              });
              console.log(process.env.OUTLOOKUSERNAME)
              // Define and send message inside transporter.sendEmail() and await info about send from promise:
              let info = await transporter.sendMail({
                  from: '"NS SBN Trial Blog" <' + process.env.OUTLOOKUSERNAME + '>',
                  to: emailinput,
                  subject: "Welcome to NS SBN Trial Blog!",
                  html: "<h1>Hello " + usernameI +"! </h1> <br> <p> Welcome! </p>"
              });
              console.log('message sent')
          }
        }
    })

    fastify.post('/login', async function handler(request, reply) {
        const Usertocheck = request.body;
        const topinputtocheck = Usertocheck.topinput;
        const passwordinput = Usertocheck.passwordinput;
        const allow = false;
        const dbusertocheck = await Users.findOne({ where: { publicusername: topinputtocheck } })
        if (dbusertocheck){
            const comapre = await bcrypt.compare(passwordinput, dbusertocheck.password)
            if (comapre == true){
                const payload = { user_id: topinputtocheck };
                const token = jwt.sign({ payload }, 'fsesbn');
                request.session.authenticated = true
                request.session.token = token //fallback?
                request.session.userid = dbusertocheck.publicusername
                request.session.userrole = dbusertocheck.role
                return { outcome: 'success', value: token }
            }
            else{
                //wrong passqword
                console.log('a')
                return {outcome : 'wrong password', value : ''}
            }
        }
        else{
            //nothing
            return { outcome: 'wrong username', value: '' }
        }
    })

    fastify.get('/getprofileinfo', async function handler(request, reply) {
        if (request.session.authenticated) {
            console.log('logged in')
            console.log(request.session.userrole)
            return {outcome: 'authenticated', userid: request.session.userid, role: request.session.userrole}
        } else {
            console.log('nth')
            return {outcome: 'no perms', userid: '', role: ''}
        }
    })

    fastify.get('/getuserbyid', async function handler(request, reply) {
        const { idp } = request.query
        console.log('idp as'+ idp)
        const userobject = await Users.findOne({ where: { userid: idp } });
        console.log(userobject)
        if (userobject) {
            reply.send(userobject)
        }
        else {
            reply.send('no user')
        }
    })

    fastify.post('/changepasswordrequest', async function handler(request, reply) {
        const usernametosendemail = request.body.userid;
        const dbusertocheck = await Users.findOne({ where: { publicusername: usernametosendemail }})
        if (dbusertocheck) {
        const useremail = dbusertocheck.email
        const userinternalid = dbusertocheck.userid
        
        let transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // SMTP server address (usually mail.your-domain.com)
            port: 587, // Port for SMTP (usually 465)
            secure: false, // Usually true if connecting to port 465
            auth: {
                user: process.env.OUTLOOKUSERNAME, // Your email address
                pass: process.env.OUTLOOKPASSWORD, // Password (for gmail, your app password)
            },
        });
        console.log(process.env.OUTLOOKUSERNAME)
        // Define and send message inside transporter.sendEmail() and await info about send from promise:
        let info = await transporter.sendMail({
            from: '"NS SBN Trial Blog" <' + process.env.OUTLOOKUSERNAME + '>',
            to: useremail,
            subject: "Reset your password",
            html: `<p>Dear ${usernametosendemail}, <br> We recently received a request to reset the password for your account ${usernametosendemail}. To reset your password, please click on the following link : http://localhost:8080/resetpassword?id=${userinternalid} </p> <br> <p> Thank you for your attention to this matter. </p> <br> <p>Best regards,</p> <p> NS SBN Trial Blog</p>`
        });
            Users.update({ hasrequestedtoreset: 1 }, { where: { publicusername: usernametosendemail } })
        reply.send('message sent')}
        else{
            reply.send('no user')
        }
    })

    fastify.post('/logout', async function handler(request, reply) {
        if (request.session.authenticated) {
            request.session.destroy((err) => {
                if (err) {
                    reply.status(500)
                    reply.send('Internal Server Error')
                } else {
                    reply.redirect('/')
                }
            })
        } else {
            reply.redirect('/')
        }
    });

    
    fastify.post('/updatepassword', async function handler(request, reply) {
        const username = request.body.username;
        console.log(request.body);
        const newpassword = request.body.newpassword;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newpassword, salt, (err, hash) => {
                if (err) throw err;
                const hashedpw = hash;
                Users.update({ password: hashedpw, hasrequestedtoreset :1}, {where: {publicusername:username}})
            })
        })
        reply.send('update done')
    })
    

    fastify.get('/getsessioninfo', async function handler(request, reply) {
        return {login: request.session.authenticated, 
        token: request.session.token}
    })

    //PURELY TESTING PURPOSES
    fastify.get('/test', async function handler(request, reply) {
        console.log('hello')
        console.log('ab' + request.session.token)
        console.log('cd' + request.session.authenticated)
        reply.send('hello')
    })

    fastify.get('/locked', async function handler(request, reply) {
        console.log('cd' + request.session.authenticated)
        if (request.session.authenticated != true){
            reply.send('no perms')
        }
        else{
        console.log('hello')
        console.log('ab' + request.session.token)
        reply.send('nice')}
    })


}

module.exports = routes;