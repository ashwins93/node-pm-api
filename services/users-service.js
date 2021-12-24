const knex = require("../db");
const bcrypt = require("bcrypt");

async function createUser(user) {
  const [newUser] = await knex("users").insert(user, [
    "id",
    "username",
    "created_at",
    "updated_at",
  ]);

  return newUser;
}

async function loginUser(username, password) {
  const user = await knex("users")
    .select()
    .where({
      username,
    })
    .first();

  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }

  return null;
}

module.exports = {
  createUser,
  loginUser,
};
