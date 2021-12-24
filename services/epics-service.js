const knex = require("../db");

async function getAllEpics(user) {
  const epics = await knex
    .select({
      id: "epics.id",
      name: "epics.name",
      file_name: "epics.file_name",
      created_at: "epics.created_at",
      updated_at: "epics.updated_at",
      category_id: "categories.id",
      category_name: "categories.name",
      category_created_at: "categories.created_at",
      category_updated_at: "categories.updated_at",
    })
    .from("epics")
    .leftJoin("categories", "categories.epic_id", "=", "epics.id")
    .where("owner_id", user.id);

  const results = [];

  for (let epic of epics) {
    const existing = results.find((resultEpic) => {
      return resultEpic.id === epic.id;
    });

    if (existing) {
      existing.categories.push({
        id: epic.category_id,
        name: epic.category_name,
        created_at: epic.category_created_at,
        updated_at: epic.category_updated_at,
      });
    } else {
      const temp = {
        id: epic.id,
        name: epic.name,
        file_name: epic.file_name,
        created_at: epic.created_at,
        updated_at: epic.updated_at,
        categories: [],
      };

      if (epic.category_id) {
        temp.categories.push({
          id: epic.category_id,
          name: epic.category_name,
          created_at: epic.category_created_at,
          updated_at: epic.category_updated_at,
        });
      }
      results.push(temp);
    }
  }

  return results;

  /*
  const epics = await knex('epics').select();

  for (let epic of epics) {
    epics.categories = await knex('categories')
    .select()
    .where('epic_id', epic.id);
  }

  return epics;
  */
}

async function createEpic(epicName, user) {
  const newEpic = { name: epicName, created_at: new Date(), owner_id: user.id };
  const insertedIds = await knex.insert(newEpic).into("epics");
  // return knex('epics').insert({name: epicName});
  newEpic.id = insertedIds[0];

  return newEpic;
}

function getEpicById(epicId) {
  return knex.select("*").from("epics").where("id", epicId).first();
}

async function updateEpic(id, epicInput) {
  const epic = await getEpicById(id);

  if (!epic) {
    return null;
  }

  await knex("epics")
    .update({ ...epicInput, updated_at: new Date() })
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
