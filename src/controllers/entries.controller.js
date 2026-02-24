const Entry = require("../models/Entry");
const Category = require("../models/Category");

async function listEntries(req, res) {
  try {
    const entries = await Entry.find({ user: req.userId }).populate("category");
    return res.json(entries);
  } catch (error) {
    return res.status(500).json({ message: "erro interno" });
  }
}

async function createEntry(req, res) {
  try {
    const { description, value, date, category } = req.body;

    if (value === undefined || !date || !category) {
      return res.status(400).json({ message: "value, date e category sao obrigatorios" });
    }

    const categoryExists = await Category.findOne({
      _id: category,
      user: req.userId
    });

    if (!categoryExists) {
      return res.status(400).json({ message: "categoria nao encontrada" });
    }

    const entry = await Entry.create({
      description: description || "",
      value,
      date,
      category: categoryExists._id,
      user: req.userId
    });

    const entryPopulated = await Entry.findById(entry._id).populate("category");
    return res.status(201).json(entryPopulated);
  } catch (error) {
    console.error("Erro no POST /entries:", error);
    return res.status(500).json({ message: "erro interno" });
  }
}

async function updateEntry(req, res) {
  try {
    const { description, value, date, category } = req.body;

    const entry = await Entry.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!entry) {
      return res.status(404).json({ message: "lancamento nao encontrado" });
    }

    if (category !== undefined) {
      const categoryExists = await Category.findOne({
        _id: category,
        user: req.userId
      });

      if (!categoryExists) {
        return res.status(404).json({ message: "categoria nao encontrada" });
      }

      entry.category = categoryExists._id;
    }

    if (description !== undefined) entry.description = description;
    if (value !== undefined) entry.value = value;
    if (date !== undefined) entry.date = date;

    await entry.save();

    const entryPopulated = await Entry.findById(entry._id).populate("category");
    return res.json(entryPopulated);
  } catch (error) {
    console.error("Erro no PUT /entries/:id", error);
    return res.status(500).json({ message: "erro interno" });
  }
}

async function deleteEntry(req, res) {
  try {
    const entry = await Entry.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!entry) {
      return res.status(404).json({ message: "lancamento nao encontrado" });
    }

    return res.json({ message: "lancamento deletado com sucesso" });
  } catch (error) {
    console.error("Erro no DELETE /entries/:id", error);
    return res.status(500).json({ message: "erro interno" });
  }
}

module.exports = {
  listEntries,
  createEntry,
  updateEntry,
  deleteEntry
};
