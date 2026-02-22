const express = require("express");

const authRoutes = require("./auth.routes");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("API online");
});

router.post("/teste", (req, res) => {
  const dados = req.body;
  res.json({
    message: "Dados recebidos",
    data: dados
  });
});

router.post("/register", authRoutes);

module.exports = router;
