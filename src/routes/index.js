const express = require("express");

const authRoutes = require("./auth.routes");
const categoriesRoutes = require("./categories.routes");
const entriesRoutes = require("./entries.routes");
const userRoutes = require("./users.routes");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("API online");
});

router.use("/auth", authRoutes);
router.use("/entries", entriesRoutes);
router.use("/categories", categoriesRoutes);
router.use("/users", userRoutes);

module.exports = router;
