/* Create columns with the database and columns string provided. 
 * Example of how to create a column:
 * createTable(db, "Persons (PersonID int, LastName varchar(255)""))
 */
const createTable = function (db, columns) {
    sql = "CREATE TABLE " + columns

    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            console.log(result);
            console.log("Table create...");
        }
    });
}

module.exports = {
    createTable
}