const knex = require("../db");

function getAllEpics() {
  return knex.select("*").from("epics");
}

async function createEpic(epicName) {
  const newEpic = { name: epicName, created_at: new Date() };
  const insertedIds = await knex.insert(newEpic).into("epics");
  // return knex('epics').insert({name: epicName});
  newEpic.id = insertedIds[0];

  return newEpic;
}

async function getEpicById(epicId) {
  return knex.select("*").from("epics").where("id", epicId).first();
}

async function updateEpic(id, epicName) {
  const epic = await getEpicById(id);

  if (!epic) {
    return null;
  }

  await knex("epics")
    .update({ name: epicName, updated_at: new Date() })
    .where("id", id);

  return getEpicById(id);
}

async function deleteEpic(id) {
  const epic = await getEpicById(id);

  if (!epic) {
    return null;
  }

  await knex("epics").del().where("id", id);

  return epic;
}

module.exports = {
  getAllEpics,
  createEpic,
  updateEpic,
  getEpicById,
  deleteEpic,
};
