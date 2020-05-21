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

  findWordsForRoot(root) {
    const stmt = this.db.prepare('SELECT * FROM en_root_to_word WHERE root = ?');
    return stmt.all(root).map((row) =>  row.word)
  }

  findRootsForWord(word) {
    const stmt = this.db.prepare('SELECT * FROM en_root_to_word WHERE word = ?');
    return stmt.all(word).map((row) =>  row.root)
  }

  findEither(datum, isRoot) {
    return isRoot ? this.findRoot(datum) : this.findWord(datum)
  }

  //todo optimize
  //FIXME recursion
  findNDegreesOutFrom(datum, isRoot) {
    let output = {
      'isRoot' :isRoot,
      'data': this.findEither(datum, isRoot),
    };
    
    let children = isRoot ? this.findWordsForRoot(datum) : this.findRootsForWord(datum);
    //depends on the parent's type
    output.children = children.map((child) => isRoot ? child.word : child.root)

    return output
  }

  maybePopulateEnTables() {
    let row = this.db.prepare('SELECT COUNT(ALL) FROM en_root').get(),
      count = Object.entries(row)[0][1]; //there has got to be a better way

    if (count > 0) return;

    let readInterface = readline.createInterface({
        input: fs.createReadStream('data/en_roots.txt'),
        console: false
      })

    let insertRoot = this.db.prepare('INSERT INTO en_root (root, def) VALUES (@root, @def)');
    let insertWord = this.db.prepare('INSERT OR IGNORE INTO en_word (word, def) VALUES (@word, @def)');
    let insertPair = this.db.prepare('INSERT INTO en_root_to_word (root, word) VALUES (@root, @word)');

    this.db.transaction(() => {
      readInterface.on('line', function(line) {
        line = JSON.parse(line)
        console.log("reading: " + line.root)
        let root = escape(line.root.trim())
        let root_def = escape(line.def.trim())
        try {
          insertRoot.run({"root": root, "def": root_def}); 
          for (var i = 0; i < line.wordList.length; i++) {
             let word = escape(line.wordList[i].trim());
             insertWord.run({"word": word, "def": "FIXME"});
             insertPair.run({"root": root, "word": word})
           } 
        } catch(err) {
            console.log(err)
        }
        
      });
    })();
  }

}

module.exports = new Backend()


  