const express = require('express');

const routes = (Book) => {
  const bookRouter = express.Router();
  const bookController = require('../controllers/bookController')(Book);

  bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);

  bookRouter.use('/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        res.status(500).send(err);
      } else if(book) {
        req.book = book;
        next();
      } else {
        res.status(404).send('No Book was found with the given id');
      }
    });
  });

  bookRouter.route('/:bookId')
    .get((req, res) => {
      const documentedBook = req.book.toJSON();
      documentedBook.links = {};
      documentedBook.links.allBooks = `http://${req.headers.host}/api/books`;
      documentedBook.links.filteredByThisGenre =
        encodeURI(`http://${req.headers.host}/api/books?genre=${documentedBook.genre}`);

      res.json(documentedBook);
    })
    .put((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;
        saveBook(req, res);
      });
    })
    .patch((req, res) => {
      if (req.body._id) {
        delete req.body._id;
      }

      for (const key in req.body) {
        req.book[key] = req.body[key];
      }

      saveBook(req, res);
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('Book removed');
        }
      });
    });

    const saveBook = (req, res) => {
      req.book.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.book);
        }
      });
    };

  return bookRouter;
};

module.exports = routes;
