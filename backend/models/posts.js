 const Sequelize = require('sequelize');
const sequelize = require('../config/DBConfig');
const db = require('../config/DBConfig'); 
const Users = require('./users')

const Posts = db.define('posts', {
    postid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    userPosted: {
        type: Sequelize.STRING
    },
    datePosted: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
    },
    views: {
        type: Sequelize.INTEGER
    },
    ratingscount: {
        type: Sequelize.INTEGER
    },
    commentscount: {
        type: Sequelize.INTEGER
    },
    isedited: {
        type: Sequelize.INTEGER
    }
});

Users.hasMany(Posts, {
    foreignKey: 'userPosted',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Posts.belongsTo(Users, {
    foreignKey: 'userPosted'
});

/*
Posts :
 • Title
 • description
 • user posted
 • datetime
 • views
 • ratings (no of likes)
 */

module.exports = Posts;