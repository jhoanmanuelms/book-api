const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');

const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const db = mongoose.connect('mongodb://localhost/bookAPI', { useMongoClient: true });

bookRouter.route('/books')
  .get((req, res) => {
    Book.find((err, books) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(books);
      }
    });
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!!!');
});

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
