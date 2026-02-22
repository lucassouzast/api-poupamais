const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  listEntries,
  createEntry,
  updateEntry,
  deleteEntry
} = require("../controllers/entries.controller");

const router = express.Router();

router.use(authMiddleware);

router.get("/", listEntries);
router.post("/", createEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

module.exports = router;
