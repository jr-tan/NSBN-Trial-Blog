const mySQLDB = require('./DBConfig');

/* Models of sql data. */
const user = require('../models/users');
const inventory = require('../models/posts');

// If drop is true, all existing tables are dropped and recreated
const setUpDB = (drop) => {
    mySQLDB.authenticate()
        .then(() => {
            console.log('Database connected...');
        })
        .then(() => {
            mySQLDB.sync({ // Creates table if none exists
                force: drop
            }).then(() => {
                console.log('Create tables if none exists')
            }).catch(err => console.log(err));
        })
        .catch(err => console.log('Error: ' + err));
};

module.exports = { setUpDB };