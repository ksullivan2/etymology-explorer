const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db')


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  let input = req.body.post
  db.writeManyWords([input])
  let output = db.findWord(input).word


  res.send(
    `I received your POST request. This is what you sent me: ${output}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));