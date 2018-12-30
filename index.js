const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');

const app = express();

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 1000

app.set('port', port);

// setup app
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// expand routes
routes(app);

app.listen(port, () => {
  console.log("API SERVER");
  console.log(`Running on port ${port}`);
  console.log("Enter Ctrl + C to stop");
});
