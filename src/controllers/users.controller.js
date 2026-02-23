const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function getMe(req, res) {
  try {
    const user = await User.findById(req.userId).select("_id name email");
    if (!user) {
      return res.status(404).json({ message: "usuario nao encontrado" });
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
      return res.status(404).json({ message: "usuario nao encontrado" });
    }

    if (email !== undefined || password !== undefined) {
      return res.status(400).json({
        message: "para atualizar email/senha use os endpoints especificos"
      });
    }

    if (name !== undefined) user.name = name;

    await user.save();

    return res.json({
      message: "usuario atualizado com sucesso",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Erro ao atualizar usuario", error);
    return res.status(500).json({ message: "erro interno" });
  }
}

async function updateMyEmail(req, res) {
  try {
    const { email, password, passwordConfirmation } = req.body;

    if (!email || !password || !passwordConfirmation) {
      return res.status(400).json({
        message: "email, password e passwordConfirmation sao obrigatorios"
      });
    }

    if (password !== passwordConfirmation) {
      return res.status(400).json({ message: "confirmacao de senha invalida" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "usuario nao encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "senha invalida" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    if (!normalizedEmail) {
      return res.status(400).json({ message: "email invalido" });
    }

    if (normalizedEmail === user.email) {
      return res.status(400).json({ message: "novo email deve ser diferente" });
    }

    const emailEmUso = await User.findOne({ email: normalizedEmail, _id: { $ne: user._id } });
    if (emailEmUso) {
      return res.status(409).json({ message: "email ja em uso" });
    }

    user.email = normalizedEmail;
    await user.save();

    return res.json({
      message: "email atualizado com sucesso",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Erro ao atualizar email", error);
    return res.status(500).json({ message: "erro interno" });
  }
}

async function updateMyPassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "oldPassword e newPassword sao obrigatorios" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "nova senha deve ter no minimo 6 caracteres" });
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({ message: "nova senha deve ser diferente da antiga" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "usuario nao encontrado" });
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(401).json({ message: "senha antiga invalida" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.json({ message: "senha atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar senha", error);
    return res.status(500).json({ message: "erro interno" });
  }
}

module.exports = { getMe, updateMe, updateMyEmail, updateMyPassword };
