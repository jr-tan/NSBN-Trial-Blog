const Sequelize = require('sequelize');
const sequelize = require('../config/DBConfig');
const db = require('../config/DBConfig');
const Posts = require('./posts');
const Users = require('./users');

const Comments = db.define('comments', {
    commentsid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    postcommented: {
        //fk in posts table
        type: Sequelize.INTEGER,
        model: 'posts',
        key: 'postid'
    },
    usercommented: {
        type: Sequelize.STRING
    },
    commenttext: {
        type: Sequelize.TEXT
    },
    isedited:{
        type: Sequelize.INTEGER,
        //0 - No, 1 - Yes
    },
    datecommented:{
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
    }
});



Posts.hasMany(Comments, {
    foreignKey : 'postcommented',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Comments.belongsTo(Posts, {
    foreignKey: 'postcommented'
});

Users.hasMany(Comments, {
    foreignKey: 'usercommented',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Comments.belongsTo(Users, {
    foreignKey: 'usercommented'
});

module.exports = Comments;
