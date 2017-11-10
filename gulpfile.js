const gulp = require('gulp');
const env = require('gulp-env');
const supertest = require('supertest');
const nodemon = require('gulp-nodemon');
const gulpMocha = require('gulp-mocha');

gulp.task('default', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 8000
    },
    ignore: [
      './node_modules'
    ]
  }).on('restart', () => {
    console.log('Restarting');
  });
});

gulp.task('test', () => {
  env({
    vars: {
      ENV: 'Test'
    }
  });

  gulp.src('test/*.js', {read: false})
    .pipe(gulpMocha({reporter: 'nyan'}));
});
