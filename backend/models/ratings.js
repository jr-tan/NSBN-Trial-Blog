const Sequelize = require('sequelize');
const sequelize = require('../config/DBConfig');
const db = require('../config/DBConfig');

const Ratings = db.define('ratings', {
    ratingsid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    postid: {
        type: Sequelize.INTEGER,
        model: 'posts',
        key: 'postid'
    },
    userrated: {
        type: Sequelize.STRING
    },
});

/*
Posts :
User :
 • Username (link to user posted)
 • email
 • password (hashed)
 • profile description
 • user role
 */

module.exports = Ratings;