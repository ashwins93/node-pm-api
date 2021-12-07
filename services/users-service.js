const knex = require("../db");

async function createUser(user) {
  const [id] = await knex("users").insert(user);

  user.id = id;

  return user;
}

module.exports = {
  createUser,
};
