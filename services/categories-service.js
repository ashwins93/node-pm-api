const knex = require("../db");
const epicsService = require("./epics-service");

function getAllCategories() {
  return knex("categories").select("*");
}

function getCategoryById(id) {
  return knex("categories").select("*").where("id", id).first();
}

async function createCategory(category) {
  const epicId = category.epic_id;

  const epic = await epicsService.getEpicById(epicId);

  if (!epic) {
    return null;
  }

  category.created_at = new Date();
  category.updated_at = new Date();

  const [id] = await knex("categories").insert(category);

  category.id = id;

  return category;
}

async function updateCategory(id, categoryInput) {
  const category = await getCategoryById(id);

  if (!category) {
    return null;
  }

  categoryInput.updated_at = new Date();

  await knex("categories").update(categoryInput).where("id", id);

  return getCategoryById(id);
}

async function deleteCategory(id) {
  const category = await getCategoryById(id);

  if (!category) {
    return null;
  }

  await knex("categories").del().where("id", id);

  return category;
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
