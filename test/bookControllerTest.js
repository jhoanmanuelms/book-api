const sinon = require('sinon');
const should = require('should');

describe('Book Controller Tests', () => {
  describe('Given a book with no title', () => {
    const Book = class {
      constructor(book) {
        this.save = () => {};
      }
    };

    const req = {
      body: {
        author: 'Dan Brown'
      }
    };

    const res = {
      status: sinon.spy(),
      send: sinon.spy()
    };

    beforeEach('When the user tries to save a book with no title', () => {
      const bookController = require('../controllers/bookController')(Book);
      bookController.post(req, res);
    });

    it('then it should not be saved', () => {
      res.status.calledWith(400).should.equal(true, `Not expected status: ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
