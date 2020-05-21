const Database = require('better-sqlite3');



class Backend {
  constructor() {
    this.db = new Database('etymology.db', { verbose: console.log });
    this.createEngTables()
  }

  close() {//todo check with better-sqlite
    // close the database connection
    this.db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  }

  createEngTables() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS en_root (
        root TEXT UNIQUE,
        def TEX
      );
      CREATE TABLE IF NOT EXISTS en_word (
        word TEXT UNIQUE,
        def TEXT
      );
      CREATE TABLE IF NOT EXISTS en_root_to_word (
        root INTEGER,
        word INTEGER
      )
    `);
  }

  findWord(word) {
    let row =  this.db.prepare('SELECT * FROM en_word WHERE word = ?').get(word)
    return row
  }

  //pass in an array of words
  //TODO: pass in definitions
  writeManyWords(words) {
    let insert = this.db.prepare('INSERT INTO en_word (word, def) VALUES (@word, @def)');

    this.db.transaction((words_inner) => {
      for (var i = 0; i < words_inner.length; i++) {
        insert.run({"word": words_inner[i], "def": "NULL_DEF"});
      }
    })(words);
  }

}

module.exports = new Backend()


  