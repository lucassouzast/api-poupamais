const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { getJwtSecret } = require("../config/env");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
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

    const user = await User.create({ name, email, password: hash });

    return res.status(201).json({
      message: "usuário criado com sucesso",
      user: { _id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    return res.status(500).json({ message: "erro interno", error: error.message });
  }
}

async function login(req, res) {
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

    const token = jwt.sign({ userId: user._id }, getJwtSecret(), { expiresIn: "30d" });

    return res.status(200).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    return res.status(500).json({ message: "erro interno", error: error.message });
  }
}

module.exports = { register, login };
