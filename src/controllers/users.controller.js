const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function getMe(req, res) {
  try {
    const user = await User.findById(req.userId).select("_id name email");
    if (!user) {
      return res.status(404).json({ message: "usuário não encontrado" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "erro interno" });
  }
}

async function updateMe(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "usuário não encontrado" });
    }

    if (email && email !== user.email) {
      const emailEmUso = await User.findOne({ email });
      if (emailEmUso) {
        return res.status(409).json({ message: "email já em uso" });
      }
      user.email = email;
    }

    if (name !== undefined) user.name = name;

    if (password !== undefined) {
      if (password.length < 6) {
        return res.status(400).json({ message: "senha deve ter no mínimo 6 caracteres" });
      }
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    return res.json({
      message: "usuário atualizado com sucesso",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário", error);
    return res.status(500).json({ message: "erro interno" });
  }
}

module.exports = { getMe, updateMe };
