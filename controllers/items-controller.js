const express = require("express");
const router = express.Router();
const itemsService = require("../services/items-service");

router.get("/", async (req, res) => {
  const epicId = req.query.epic_id;

  res.send(await itemsService.getItems(Number(epicId)));
});

router.get("/:id", async (req, res) => {
  const item = await itemsService.getItemById(Number(req.params.id));

  if (!item) {
    res.status(404).send({ message: "Item not found" });
    return;
  }

  res.send(item);
});

router.post("/", async (req, res) => {
  const item = await itemsService.createItem(req.body);

  if (!item) {
    res.status(400).send({ message: "Invalid input" });
    return;
  }

  res.status(201).send(item);
});

router.put("/:id", async (req, res) => {
  const updatedItem = await itemsService.updateItem(
    Number(req.params.id),
    req.body
  );

  if (!updatedItem) {
    res.status(400).send({ message: "Invalid input" });
    return;
  }

  res.send(updatedItem);
});

router.delete("/:id", async (req, res) => {
  const item = await itemsService.deleteItem(Number(req.params.id));

  if (!item) {
    res.status(404).send({ message: "Item not found" });
    return;
  }

  res.send(item);
});

module.exports = router;
