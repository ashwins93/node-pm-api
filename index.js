const express = require("express");

const epicsRouter = require("./controllers/epics-controller");
const categoriesRouter = require("./controllers/categories-controller");
const itemsRouter = require("./controllers/items-controller");
const usersRouter = require("./controllers/users-controller");

const app = express();

app.use(express.json());

app.use("/api/v1/epics", epicsRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/items", itemsRouter);
app.use("/api/v1/auth", usersRouter);

app.get("/hello", (req, res) => {
  res.send({ message: "world" });
});

app.listen(3000);
