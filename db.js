const sqlite3 = require('sqlite3').verbose();


class Backend {
  constructor() {
    this.db = new sqlite3.Database(':memory:', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
    })
    this.createEngTables()
  }

  close() {
    // close the database connection
    this.db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  }

  createEngTables() {
    let self = this;
    self.db.serialize(function() {
      self.db.run(`CREATE TABLE IF NOT EXISTS en_root (
        root TEXT UNIQUE,
        def TEX
      )`);
      self.db.run(`CREATE TABLE IF NOT EXISTS en_word (
        word TEXT UNIQUE,
        def TEXT
      )`);
      self.db.run(`CREATE TABLE IF NOT EXISTS en_root_to_word (
        root INTEGER,
        word INTEGER
      )`);
    });
  }

  writeWord(word, def) {
    let wordID = null;
    this.db.run(`INSERT INTO en_word (word, def) VALUES (?,?)`, [
      word, def
    ], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
      wordID = this.lastID;
    });

    return wordID;
  }

  //pass in an array of words
  //TODO: pass in definitions
  writeManyWords(words) {
    let placeholders = words.map((words) => '(?)').join(',');
    let sql = 'INSERT INTO en_word(word) VALUES ' + placeholders;

    this.db.run(sql, words, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Rows inserted ${this.changes}`);
    });
  }

}

module.exports = new Backend()


  