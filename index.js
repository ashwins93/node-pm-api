const express = require("express");

const epicsRouter = require("./controllers/epics-controller");
const categoriesRouter = require("./controllers/categories-controller");

const app = express();

app.use(express.json());

app.use("/api/v1/epics", epicsRouter);
app.use("/api/v1/categories", categoriesRouter);

app.get("/hello", (req, res) => {
  res.send({ message: "world" });
});

app.listen(3000);
