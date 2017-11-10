const bookController = (Book) => {
  const post = (req, res) => {
    console.log('here1');
    const book = new Book(req.body);
    book.save();
    res.status(201).send(book);
  };

  const get = (req, res) => {
    let query = {};
    if (req.query.title) {
      query.title = req.query.title;
    }

    if (req.query.author) {
      query.author = req.query.author;
    }

    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    if (req.query.read) {
      query.read = req.query.read;
    }

    Book.find(query, (err, books) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(books);
      }
    });
  };

  return {
    post: post,
    get: get
  }
};

module.exports = bookController;
