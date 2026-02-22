const express = require("express");

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

module.exports = router;
