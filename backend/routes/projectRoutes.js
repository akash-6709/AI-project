const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    getProjects
} = require("../controllers/projectController");

router.get(
    "/",
    authMiddleware,
    getProjects
);

module.exports = router;