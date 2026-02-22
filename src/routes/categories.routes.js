const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categories.controller");

const router = express.Router();

router.use(authMiddleware);

router.get("/", listCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
