const Database = require('better-sqlite3');
const fs = require('fs');
const readline = require('readline');



class Backend {
  constructor() {
    this.db = new Database('etymology.db', { verbose: console.log });
    this.createEngTables()
    this.maybePopulateEnTables()
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

  findRoot(root) {
    let row =  this.db.prepare('SELECT * FROM en_root WHERE root = ?').get(root)
    return row
  }

  maybePopulateEnTables() {
    let row = this.db.prepare('SELECT COUNT(ALL) FROM en_root').get(),
      count = Object.entries(row)[0][1]; //there has got to be a better way

    if (count > 0) return;

    let readInterface = readline.createInterface({
        input: fs.createReadStream('data/en_roots.txt'),
        console: false
      })

    let insert = this.db.prepare('INSERT INTO en_root (root, def) VALUES (@root, @def)');

    this.db.transaction(() => {
      readInterface.on('line', function(line) {
        line = JSON.parse(line)
        console.log("reading: " + line.root)
        try {
          insert.run({"root": line.root, "def": line.def});  
        } catch(err) {
            console.log(err)
        }
        
      });
    })();
  }

}

module.exports = new Backend()


  