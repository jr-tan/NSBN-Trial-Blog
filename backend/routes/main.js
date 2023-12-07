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

    //POSTS
    fastify.post('/createpost', async function handler(request, reply){
        const newPost = request.body;
        const title = newPost.title;
        const description = newPost.description;
        const userPosted = newPost.userposted
        Posts.create({
            title: title,
            description:description,
            userPosted: userPosted,
            views:0,
            ratings:0,
            datePosted: sequelize.fn('NOW'),
            isedited: 0,
        })
    })

    fastify.get('/getpost', async function handler(request, reply){
        //posts are sorted by date first in descending order, then by views in ascending order
        let postset = await Posts.findAndCountAll({order: [['postid','DESC'],['views','ASC'], ]});
        postset = JSON.stringify(postset);
        postset = JSON.parse(postset);
        const { idp } = request.query;
        const { paginatefive } = request.query
        const {username} = request.query
        const postsetdata = postset.rows
        const postsetcount = postset.count
        if (!idp){
            //paginate by 5
            if (!username){
                //throw all lists back
                return {
                    count: postsetcount, 
                    rows: postsetdata.slice(((paginatefive - 1) * 5), (paginatefive * 5))
                };
            }
            else{
                //throw only the specific username back
                const filteredposts = postsetdata.filter((postsetdata) => postsetdata.userPosted == username)
                const paginatedandfilteredposts = filteredposts.slice(((paginatefive - 1) * 5), (paginatefive * 5))               
                return {
                    count: filteredposts.length,
                    rows: paginatedandfilteredposts
                }
            }
        }else{
            //throw only the one id back
            const filteredposts = postsetdata.filter((postsetdata) => postsetdata.postid == idp);
            console.log(filteredposts);
            return filteredposts;
        }
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
            userPosted: priorupdatePost.userPosted,
            views: priorupdatePost.views,
            ratings: priorupdatePost.ratings,
            datePosted: sequelize.fn('NOW'),
            isedited: 1,
        },
        {where: {postid: idp}}
        )
    })
    
    fastify.post('/deletePost', async function handler(request, reply) {
        const { idp } = request.query;
        //Comments.destroy({ where: { postcommented: idp } });
        //Ratings.destroy({ where: { linktopostid: idp } })
        Posts.destroy({ where: { postid: idp } }) 
    })

    //RATINGS
    fastify.post('/ratepost', async function handler(request, reply) {
        const { idp } = request.query;
        const userid = request.session.userid;
        //checks if user has rated on the post before 
        checkifrated = await Ratings.findOne({ where: { linktopostid: idp, userrated: userid } })
        if (checkifrated) {
            return "user rated";
        }
        else {
            Ratings.create({ linktopostid: idp, userrated: userid });
        }
    })

    //REVIEWS
    fastify.post('/updateviews', async function handler(request, reply) {
        const { idp } = request.query;
        try{
            posttoget = await Posts.findOne({ where: { postid: idp } });
            const originalviewcount = posttoget.views;
            Posts.update({ views: originalviewcount + 1 },  { where: { postid: idp } })
        }
        catch{reply.send('no posts')};
    })      

    fastify.post('/createuser', async function handler(request, reply) {
        const newUser = request.body;
        const usernameI = newUser.username;
        const bio = newUser.bio;
        const emailinput = newUser.email;
        const unhashedpw = newUser.password;
        //checks if username has been used prior
        const findIfExists = await Users.findOne({ where: { publicusername: usernameI } });
        if (findIfExists) {
            return "username existed";
        }
        else {
            //checks if email has been used prior
            const findEmailExists = await Users.findOne({ where: { email: emailinput } });
            if (findEmailExists) {
                return "email existed";
            }
            else {
                //hashes password using bcrypt
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

                //sends email
                let transporter = nodemailer.createTransport({
                    host: "smtp-mail.outlook.com", 
                    port: 587, 
                    secure: false,
                    auth: {
                        user: process.env.OUTLOOKUSERNAME, 
                        pass: process.env.OUTLOOKPASSWORD, 
                    },
                });
                
                let info = await transporter.sendMail({
                    from: '"NS SBN Trial Blog" <' + process.env.OUTLOOKUSERNAME + '>',
                    to: emailinput,
                    subject: "Welcome to NS SBN Trial Blog!",
                    html: `<p> Dear ${usernameI}, </p> <br> <p>We are thrilled to have you here! <br> Welcome to our blog community. We are committed to providing you with engaging, informative, and inspiring content. Our blog covers a wide range of topics and we're confident you'll find plenty of articles that will pique your interest. </p><br> <p>Once again, welcome to our blog. We can't wait to share our content with you. <br> Best Regards,<br>NS SBN Trial Blog`
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
        //checks if user exists
        if (dbusertocheck) {
            //compare password using bcrypt
            const comapre = await bcrypt.compare(passwordinput, dbusertocheck.password)
            if (comapre == true) {
                //signing of jsonwebtoken (not implemented in the end, session used in favor)
                const payload = { user_id: topinputtocheck };
                const token = jwt.sign({ payload }, 'fsesbn');
                request.session.authenticated = true
                //request.session.token = token //=> unimplemented but working
                request.session.userid = dbusertocheck.publicusername
                request.session.userrole = dbusertocheck.role
                return { outcome: 'success', value: token }
            }
            else {
                //wrong password
                return { outcome: 'wrong password', value: '' }
            }
        }
        else {
            //wrong username
            return { outcome: 'wrong username', value: '' }
        }
    })

    //gets session info
    fastify.get('/getsessioninfo', async function handler(request, reply) {
        if (request.session.authenticated) {
            return { outcome: 'authenticated', userid: request.session.userid, role: request.session.userrole }
        } else {
            console.log('nth')
            return { outcome: 'no perms', userid: '', role: 'not logged in' }
        }
    })

    fastify.get('/getuser', async function handler(request, reply) {
        const { internalid } = request.query
        const { publicusername } = request.query
        //*id meaning the id called by the database, not the public username
        //this is used specifically for the reset password page to get information

        if (!internalid){
            let userobject = null
            if (!publicusername){
                userobject = await Users.findAll({ order: [['userid', 'DESC']] });}
            else{
                userobject = await Users.findOne({where: {publicusername : publicusername}});
            }
            reply.send(userobject);          
        }
        else{
            const userobject = await Users.findOne({ where: { userid: internalid } });
            console.log(userobject)
            if (userobject) {
                //sends back user information
                reply.send(userobject)
            }
            else {
                reply.send('no user')
            }
        }
    })

    //request to change password email
    fastify.post('/changepasswordrequest', async function handler(request, reply) {
        const usernametosendemail = request.body.userid;
        // checks if user already exists
        const dbusertocheck = await Users.findOne({ where: { publicusername: usernametosendemail } })
        if (dbusertocheck) {
            const useremail = dbusertocheck.email
            const userinternalid = dbusertocheck.userid
            //sends email
            let transporter = nodemailer.createTransport({
                host: "smtp-mail.outlook.com",
                port: 587, 
                secure: false, 
                auth: {
                    user: process.env.OUTLOOKUSERNAME, 
                    pass: process.env.OUTLOOKPASSWORD, 
                },
            });
            console.log(process.env.OUTLOOKUSERNAME)
            let info = await transporter.sendMail({
                from: '"NS SBN Trial Blog" <' + process.env.OUTLOOKUSERNAME + '>',
                to: useremail,
                subject: "Reset your password",
                html: `<p>Dear ${usernametosendemail},</p> <br> <p> We recently received a request to reset the password for your account ${usernametosendemail}. To reset your password, please click on the following link : http://localhost:8080/resetpassword/${userinternalid} </p> <br> <p> Thank you for your attention to this matter. </p> <br> <p>Best regards,</p> <p> NS SBN Trial Blog</p>`
            });
            //updates flag to set such that the user had requested the password reset
            //if this flag is not updated (ie. its still 0), the link would redirect to error page
            Users.update({ hasrequestedtoreset: 1 }, { where: { publicusername: usernametosendemail } })
            reply.send('message sent')
        }
        else {
            reply.send('no user')
        }
    })

    fastify.post('/updatepassword', async function handler(request, reply) {
        const username = request.body.username;
        //console.log(request.body);
        const newpassword = request.body.newpassword;
        //rehash password using bcrypt
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newpassword, salt, (err, hash) => {
                if (err) throw err;
                const hashedpw = hash;
                //flag sets back to 0, and updates password
                Users.update({ password: hashedpw, hasrequestedtoreset: 0 }, { where: { publicusername: username } })
            })
        })
        reply.send('update done')
    })

    fastify.post('/logout', async function handler(request, reply) {
        if (request.session.authenticated) {
            //deletes session
            request.session.destroy((err) => {
                if (err) {
                    reply.status(500)
                    reply.send('Internal Server Error')
                } else {
                    reply.redirect("/")
                }
            })
        } else {
            reply.redirect("/")
        }
    });

    fastify.post('/updatebio', async function handler(request, reply){
        const requestbody = request.body;
        const publicusernametoupdate = requestbody.publicusername;
        const newbio = requestbody.newbio;
        Users.update({ userbio: newbio }, { where: { publicusername: publicusernametoupdate }});
    })

    // COMMWENTS
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
}

module.exports = routes;