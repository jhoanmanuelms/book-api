const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/bookModel');

const app = express();
const port = process.env.PORT || 3000;
const db = mongoose.connect('mongodb://localhost/bookAPI', { useMongoClient: true });

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
