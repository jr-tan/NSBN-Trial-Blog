const Sequelize = require('sequelize');
const sequelize = require('../config/DBConfig');
const db = require('../config/DBConfig');
const Posts = require('./posts');
const Users = require('./users');

const Ratings = db.define('ratings', {
    ratingsid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    linktopostid: {
        //fk in posts table
        type: Sequelize.INTEGER,
        model: 'posts',
        key: 'postid'
    },
    userrated: {
        type: Sequelize.STRING
    },
});

Posts.hasMany(Ratings, {
    foreignKey: 'linktopostid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Ratings.belongsTo(Posts, {
    foreignKey: 'linktopostid'
});

Users.hasMany(Ratings, {
    foreignKey: 'userrated',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Ratings.belongsTo(Users, {
    foreignKey: 'userrated'
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