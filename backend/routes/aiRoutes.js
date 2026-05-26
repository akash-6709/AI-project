const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    generateAI
} = require("../controllers/aiController");

router.post(
    "/chat",
    authMiddleware,
    generateAI
);

module.exports = router;