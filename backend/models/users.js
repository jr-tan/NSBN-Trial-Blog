const Sequelize = require('sequelize');
const sequelize = require('../config/DBConfig');
const db = require('../config/DBConfig'); 

const Users = db.define('users', {
    userid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    publicusername: {
        type: Sequelize.STRING,
    },
    userbio: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING //to be hashed
    },
    role: {
        type: Sequelize.STRING,
        enum: ['admin', 'user'],
        defaultValue:'user',
        allowNull:false
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

module.exports = Users;