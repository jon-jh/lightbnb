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
    console.log('Connection success');
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
  return getAllProperties(null, 2);
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
// const getAllProperties = function (options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// };

const getAllProperties = (options, limit = 10) => {

  pool
    .query(`
      select * from properties
      limit $1`, [limit])
    .then((result) => {
      console.log(result.rows);
      return (result.rows);
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};

// getAllProperties({}, 1) // call the function with limit 1 instead of the default (10)


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
