const knex = require('./knex');

/* The knex object above has a knex.raw method that
can be used to execute SQL queries. It will return an
object with a .rows property which will ALWAYS be an
Array containing the requested data (even if only 1 row
was returned).
*/

const selectAllBooks = async () => {
  const query = `SELECT * FROM books;`;

  const { rows } = await knex.raw(query);
  return rows;
};

const selectAllTitlesAndGenres = async () => {
  const query = `SELECT Titles, Genres FROM books;`;

  const { rows } = await knex.raw(query);
  return rows;
};

const selectAllBooksOver250Pages = async () => {
  const query = `SELECT * FROM books Where pages > 250;`;

  const { rows } = await knex.raw(query);
  return rows;
};

const insertDuneBook = async () => {
  const query = `
    INSERT INTO books (title, author, pages, genres, is_movie)
    VALUES ('Dune', 'Frank Herbert', 412, 'Science Fiction', true)
    RETURNING *;
  `;

  const { rows } = await knex.raw(query);
  return rows;
};

const updateShortBooksToMovies = async () => {
  const query = `
    UPDATE books
    SET is_movie = true
    WHERE pages < 100
    RETURNING *;
  `;

  const { rows } = await knex.raw(query);
  return rows;
};

const deleteDuneBook = async () => {
  const query = `
    DELETE FROM books
    WHERE title = 'Dune';
  `;

  const { rowCount } = await knex.raw(query);
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
