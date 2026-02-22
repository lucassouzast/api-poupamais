const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { getMe, updateMe } = require("../controllers/users.controller");

const router = express.Router();

router.use(authMiddleware);

router.get("/me", getMe);
router.put("/me", updateMe);

module.exports = router;
