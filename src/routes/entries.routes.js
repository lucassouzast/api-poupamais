const express = require("express");
const Entry = require("../models/Entry");
const authMiddleware = require("../middlewares/auth.middleware");
const Category = require("../models/Category");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.userId }).populate("category");
    return res.json(entries);
  } catch (error) {
    return res.status(500).json({ message: "erro interno" });
  }
});

router.post("/", async (req, res) => {
    try {
        const { title, value, date, category, details } = req.body;

        if (!title || !value || !date || !category) {
            return res.status(400).json({ message: "title, value, date e category são obrigatórios" });
        }

        const categoryExists = await Category.findOne({
            _id: category,
            user: req.userId
        })

        if (!categoryExists) {
            return res.status(400).json({ message: "categoria não encontrada" });
        }

        const entry = await Entry.create({
            title,
            value,
            date,
            details: details || "",
            category: categoryExists._id,
            user: req.userId
        });
        const entryPopulated = await Entry.findById(entry._id).populate("category");

        return res.status(201).json(entryPopulated);

    } catch (error) {
        return res.status(500).json({ message: "erro interno" });
    }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, value, date, details, category } = req.body;

    const entry = await Entry.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!entry) {
      return res.status(404).json({ message: "lançamento não encontrado" });
    }

    if (category !== undefined) {
      const categoryExists = await Category.findOne({
        _id: category,
        user: req.userId
      });

      if (!categoryExists) {
        return res.status(404).json({ message: "categoria não encontrada" });
      }

      entry.category = categoryExists._id;
    }

    if (title !== undefined) entry.title = title;
    if (value !== undefined) entry.value = value;
    if (date !== undefined) entry.date = date;
    if (details !== undefined) entry.details = details;

    await entry.save();

    const entryPopulated = await Entry.findById(entry._id).populate("category");
    return res.json(entryPopulated);
  } catch (error) {
    console.error("Erro no PUT /entries/:id", error);
    return res.status(500).json({ message: "erro interno" });
  }
});


router.delete("/:id", async (req, res) => {
    try {
        const entry = await Entry.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!entry) {
            return res.status(404).json({ message: "lançamento não encontrado" });
        }

        return res.json({ message: "lançamento deletado com sucesso" });
    } catch (error) {
         console.error("Erro no DELETE /entries/:id", error);
         return res.status(500).json({ message: "erro interno" });
    }
});

module.exports = router;
