const properties = require("./json/properties.json");
const users = require("./json/users.json");

// CONNECT TO DATABASE
// You must 'startpostgres' first?

const { Pool } = require('pg');

const pool = new Pool({
  user: 'development',
  password: 'development',
  host: 'localhost',
  database: 'lightbnb'
});

// LOG RESULTS (CONNECTION)

pool.connect()
  .then(client => {
    console.log('Connected to the database');
    client.release();
  })
  .catch(err => {
    console.log('Not connected, did you remember to \'startpostgres\'?', err.stack);
  });

//Test Conn
// pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => { console.log(response) })


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  return pool // RETURN the PROMISE
    .query(`
    select * from users
    where email = $1`, [email])
    .then((result) => {
      if (result.rows.length > 0) {
        console.log(result.rows[0])
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};

// getUserWithEmail('tristanjacobs@gmail.com');

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
  .query(`
    select * from users
    where id = $1`, [id])
    .then((result) => {
      if (result.rows.length > 0) {
        console.log(result.rows[0])
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch ((err) => {
      console.log(err.message);
      throw err;
    })
};

// getUserWithId(7)

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const { name, email, password } = user;
  return pool
    .query(`
    insert into users (name, email, password)
    values ($1, $2, $3) returning *;
    `, [name, email, password])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};

// const newUser = {
//   name: 'jon',
//   email: 'jon@jon.com',
//   password: 'password'
// }
// addUser(newUser)
/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

const getAllReservations = function(guest_id, limit = 10) {

  return pool
    .query(`
      select 
      reservations.*, properties.title, properties.number_of_bedrooms, properties.number_of_bathrooms, properties.parking_spaces, properties.thumbnail_photo_url, properties.cover_photo_url

      from reservations
      join properties
      on property_id = properties.id

      where guest_id = $1
      limit $2`, [guest_id, limit])
    .then((result) => {
      console.log(result.rows);
      return (result.rows);
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  let queryParams = []; // the options AND limit will go here. 
  
  
  // SELECT, FROM
  let queryString = `
  select properties.*, avg(property_reviews.rating) as average_rating
  from properties
  join property_reviews on properties.id = property_id
  `
  // FROM (Continued, if options exist)

  if (options.city) {
    queryParams.push(`%${options.city}%`); // queryParams = ['%CityName%']
    queryString += `WHERE city LIKE $${queryParams.length} `; // queryString = "... WHERE city LIKE $1. To simplify, WHEN THIS IS BEING CALLED, IT ADDS THE LENGTH OF THE ARRAY to the $, making it line up perfectly.
  }

// We use if / else statements here to check if an option already exists. If it does, then there is already 1 WHERE, so the rest need to be AND.

  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);
    queryString += `${queryParams.length === 1 ? 'WHERE' : 'AND'} cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night);
    queryString += `${queryParams.length === 1 ? 'WHERE' : 'AND'} cost_per_night <= $${queryParams.length} `;
  }

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `${queryParams.length === 1 ? 'WHERE' : 'AND'} rating >= $${queryParams.length} `;
  }

  // WHERE
  queryParams.push(limit)
  queryString += `
  group by properties.id
  order by cost_per_night
  limit $${queryParams.length}`
  
  //First define the same pool.query for the sql as usual, but move the actual SQL into variables that can be changed.
  return pool.query(
    queryString, queryParams)
    .then((res) => res.rows)
};

// getAllProperties({}, 1)


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
    const { title, description, number_of_bedrooms, number_of_bathrooms, parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url, street, country, city, province, post_code } = property;
    return pool
    .query(`
      INSERT INTO properties (title, description, number_of_bedrooms, number_of_bathrooms, parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url, street, country, city, province, post_code)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *;`,
      [title, description, number_of_bedrooms, number_of_bathrooms, parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url, street, country, city, province, post_code])
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
