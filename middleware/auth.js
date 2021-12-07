const db = require("../db");

function authorizeRequest(req, res, next) {
  if (req.headers.authorization) {
    const userName = req.headers.authorization;
    if (userName === "admin") {
      next();
      return;
    }
  }

  res.status(401).send({ message: "Unauthorized" });
}

async function authenticateUser(req, res, next) {
  const userId = Number(req.headers.authorization);

  if (userId) {
    const user = await db("users").select().where("id", userId).first();

    req.user = user;
  }

  next();
}

async function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
    return;
  }

  res.status(401).send({ message: "Unauthorized" });
}

async function isOwnerOfEpic(req, res, next) {
  const epicId = Number(req.body.epic_id);

  const epic = await db("epics")
    .select("id", "owner_id")
    .where({
      id: epicId,
      owner_id: req.user.id,
    })
    .first();

  if (epic) {
    next();
    return;
  }

  res.status(401).send({ message: "Unauthorized" });
}

module.exports = {
  authorizeRequest,
  authenticateUser,
  isLoggedIn,
  isOwnerOfEpic,
};
