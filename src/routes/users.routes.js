const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getMe,
  updateMe,
  updateMyEmail,
  updateMyPassword
} = require("../controllers/users.controller");

const router = express.Router();

router.use(authMiddleware);

router.get("/me", getMe);
router.put("/me", updateMe);
router.patch("/me/email", updateMyEmail);
router.patch("/me/password", updateMyPassword);

module.exports = router;
