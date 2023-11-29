const Sequelize = require('sequelize');
const sequelize = require('../config/DBConfig');
const db = require('../config/DBConfig');

const Comments = db.define('comments', {
    commentsid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    postcommented: {
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
    }
});

module.exports = Comments;