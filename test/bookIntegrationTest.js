const app = require('../app.js');
const should = require('should');
const mongoose = require('mongoose');
const request = require('supertest');
const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book CRUD Test', () => {
  it('should allow a book to be posted and return a read and _id', (done) => {
    const testBook = {
      title: 'Test Book',
      author: 'Test Author',
      genre: 'Testing'
    };

    agent.post('/api/books')
      .send(testBook)
      .expect(201)
      .end((err, results) => {
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.remove().exec();
    done();
  });
});
