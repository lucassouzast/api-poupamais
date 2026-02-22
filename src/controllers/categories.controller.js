const Category = require("../models/Category");

async function listCategories(req, res) {
  try {
    const categories = await Category.find({ user: req.userId });
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: "erro interno" });
  }
}

async function createCategory(req, res) {
  try {
    const { title, color, expense } = req.body;

    if (!title || !color) {
      return res.status(400).json({ message: "title e color são obrigatórios" });
    }

    const category = await Category.create({
      title,
      color,
      expense: !!expense,
      user: req.userId
    });

    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: "erro interno" });
  }
}

async function updateCategory(req, res) {
  try {
    const { title, color, expense } = req.body;

    const category = await Category.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!category) {
      return res.status(404).json({ message: "categoria não encontrada" });
    }

    if (title !== undefined) category.title = title;
    if (color !== undefined) category.color = color;
    if (expense !== undefined) category.expense = expense;

    await category.save();
    return res.json(category);
  } catch (error) {
    return res.status(500).json({ message: "erro interno" });
  }
}

async function deleteCategory(req, res) {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!category) {
      return res.status(404).json({ message: "categoria não encontrada" });
    }

    return res.json({ message: "categoria deletada com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: "erro interno" });
  }
}

module.exports = {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
