require("dotenv").config();

module.exports = {
    host: '127.0.0.1',
    database: 'nsbn-trial-blog',
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD
}