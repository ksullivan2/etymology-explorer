// const sqlite3 = require('sqlite3').verbose();


class Backend {
  constructor() {
    
  }

  test() {
    console.log('hit db')
    return "hit db"
  }
}

module.exports = new Backend()

  // init() {
  //     this.db = new sqlite3.Database(':memory:', (err) => {
  //     if (err) {
  //       return console.error(err.message);
  //     }
  //     console.log('Connected to the in-memory SQlite database.');
  //   });
  // }

  // close() {
  //   // close the database connection
  //   this.db.close((err) => {
  //     if (err) {
  //       return console.error(err.message);
  //     }
  //     console.log('Close the database connection.');
  //   });
  // }