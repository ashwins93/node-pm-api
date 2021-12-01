const express = require("express");

const epicsRouter = require("./controllers/epics-controller");

const app = express();

app.use(express.json());

app.use("/api/v1/epics", epicsRouter);

app.get("/hello", (req, res) => {
  res.send({ message: "world" });
});

app.listen(3000);
