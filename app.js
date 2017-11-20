const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/bookModel');

const app = express();
const port = process.env.PORT || 3000;
let db;
if (process.env.ENV === 'Test') {
  console.log('Starting in test mode');
  db = mongoose.connect('mongodb://localhost/bookAPI_test', { useMongoClient: true });
} else {
  mongoose.connect('mongodb://localhost/bookAPI', { useMongoClient: true });
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!!!');
});

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});

module.exports = app;
