const express = require("express");

const authRoutes = require("./auth.routes");
const categoriesRoutes = require("./categories.routes");
const entriesRoutes = require("./entries.routes");

const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("API online");
});

router.post("/teste", (req, res) => {
  const dados = req.body;
  res.json({
    message: "Dados recebidos",
    data: dados,
  });
});

router.use("/auth", authRoutes);
router.use("/entries", entriesRoutes);
router.use("/categories", categoriesRoutes);
router.get("/privada", authMiddleware, (req, res) => {
  res.json({ message: "Acesso autorizado", userId: req.userId });
});

module.exports = router;
