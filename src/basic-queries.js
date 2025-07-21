const knex = require('./knex');

const selectAllBooks = async () => {
  return await knex('books').select('*');
};

const selectAllTitlesAndGenres = async () => {
  return await knex('books').select('title', 'genre');
};

const selectAllBooksOver250Pages = async () => {
  return await knex('books').where('pages', '>', 250);
};

const insertDuneBook = async () => {
  return await knex('books')
    .insert({
      title: 'Dune',
      genre: 'Sci Fi',
      pages: 500,
      is_movie: false
    })
    .returning('*');
};

const updateShortBooksToMovies = async () => {
  return await knex('books')
    .where('pages', '<', 100)
    .update({ is_movie: true })
    .returning('*');
};

const deleteDuneBook = async () => {
  const rowCount = await knex('books')
    .where('title', 'Dune')
    .del();
  return { rowCount };
};

module.exports = {
  selectAllBooks,
  selectAllTitlesAndGenres,
  selectAllBooksOver250Pages,
  insertDuneBook,
  updateShortBooksToMovies,
  deleteDuneBook,
};
