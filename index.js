const express = require("express");

const epicsRouter = require("./controllers/epics-controller");
const categoriesRouter = require("./controllers/categories-controller");
const itemsRouter = require("./controllers/items-controller");

const app = express();

app.use(express.json());

app.use("/api/v1/epics", epicsRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/items", itemsRouter);

app.get("/hello", (req, res) => {
  res.send({ message: "world" });
});

app.listen(3000);
