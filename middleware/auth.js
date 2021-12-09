const db = require("../db");

// function authorizeRequest(req, res, next) {
//   if (req.headers.authorization) {
//     const userName = req.headers.authorization;
//     if (userName === "admin") {
//       next();
//       return;
//     }
//   }

//   res.status(401).send({ message: "Unauthorized" });
// }

async function basicAuthenticateUser(req, res, next) {
  const userInfo = req.headers.authorization;

  if (!userInfo) {
    return next();
  }

  const credentials = userInfo.split(" ")[1];

  if (credentials) {
    const decoded = Buffer.from(credentials, "base64").toString();
    const [username, password] = decoded.split(":");

    if (username) {
      const user = await db("users")
        .select()
        .where("username", username)
        .first();

      if (user && user.password === password) {
        req.user = user;
      }
    }
  }

  next();
}

async function isLoggedIn(req, res, next) {
  req.user = req.user || req.session.user;

  if (req.user) {
    next();
    return;
  }

  // res.setHeader("WWW-Authenticate", "Basic");
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
  authenticateUser: basicAuthenticateUser,
  isLoggedIn,
  isOwnerOfEpic,
};
