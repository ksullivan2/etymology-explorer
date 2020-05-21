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
  let input = req.body
  let output = db.findNDegreesOutFrom(input.datum, input.isRoot)

  res.send(
    output
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));