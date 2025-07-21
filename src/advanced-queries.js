const knex = require('./knex');

const countNumberOfBooks = async () => {
  const result = await knex('books').count('* as count');
  console.log('Number of books:', result);
  return result;
};

const selectAllLongOrMovieBooks = async () => {
  const result = await knex('books')
    .where('pages', '>', 250)
    .orWhere('is_movie', true);
  console.log('Long or movie books:', result);
  return result;
};

const selectBooksBetween150And300Pages = async () => {
  const result = await knex('books')
    .where('pages', '>', 150)
    .andWhere('pages', '<', 300);
  console.log('150-300:', result);
  return result;
};

const orderBooksByPages = async () => {
  const result = await knex('books').orderBy('pages');
  console.log('Short to long:', result);
  return result;
};

const selectLongestBook = async () => {
  const result = await knex('books')
    .orderBy('pages', 'desc')
    .limit(1);
  console.log('Longest Book:', result);
  return result;
};

const aliasIsMovie = async () => {
  const result = await knex('books').select('title', 'is_movie');
  return result.map(row => ({
    title: row.title,
    'Already Filmed': !!row.is_movie
  }));
};

const countBooksInGenres = async () => {
  const result = await knex('books')
    .select('genre')
    .count('* as book_count')
    .groupBy('genre');
  return result.map(row => ({
    genre: row.genre,
    book_count: Number(row.book_count)
  }));
};

module.exports = {
  countNumberOfBooks,
  selectAllLongOrMovieBooks,
  selectBooksBetween150And300Pages,
  orderBooksByPages,
  selectLongestBook,
  aliasIsMovie,
  countBooksInGenres,
};
