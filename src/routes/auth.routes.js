const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

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

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "email e password são obrigatórios" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "credenciais inválidas" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "credenciais inválidas" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        return res.status(200).json({
            token: token,
            user: {
                _id: user._id,
                nome: user.nome,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "erro interno", error: error.message });
    }
})

module.exports = router;
