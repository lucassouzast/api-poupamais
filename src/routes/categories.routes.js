const expreess = require('express');
const Category = require('../models/Category');
const authMiddleware = require('../middlewares/auth.middleware');

const router = expreess.Router();

router.use(authMiddleware);

router.get ('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar categorias' });
    }
});

router.post('/', async (req, res) => {
    try {
        const {title, color, expense} = req.body;
        if (!title || !color) {
            return res.status(400).json({ message: 'title e color são obrigatórios' });
        }

        const category = await Category.create({
            title,
            color,
            expense: !!expense,
            user: req.userId
        });

        return res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar categoria' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {title, color, expense} = req.body;

        const category = await Category.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!category) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        if (title !== undefined) category.title = title;
        if (color !== undefined) category.color = color;
        if (expense !== undefined) category.expense = !!expense;

        await category.save();
        return res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar categoria' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!category) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }
        return res.json({ message: 'Categoria deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar categoria' });
    }
});

module.exports = router;