const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { nome, email, password } = req.body;

    if (!nome || !email || !password) {
      return res.status(400).json({ message: "nome, email e password são obrigatórios" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "senha precisa ter pelo menos 6 caracteres" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "email já cadastrado" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      nome,
      email,
      password: hash
    });

    return res.status(201).json({
      message: "usuário criado com sucesso",
      user: {
        _id: user._id,
        nome: user.nome,
        email: user.email
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "erro interno", error: error.message });
  }
});

module.exports = router;
