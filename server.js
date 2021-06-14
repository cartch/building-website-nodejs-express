const express = require('express');
const path = require('path');

// defaults to the index.js file
// it is the module.exports function we created in index.js
const routes = require('./routes');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './static')));

app.use('/', routes()); // catch all for all routes under /

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
