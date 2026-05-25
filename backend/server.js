const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const mongoose = require("mongoose");

const aiRoutes = require("./routes/aiRoutes");

const projectRoutes = require("./routes/projectRoutes");

const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/ai", aiRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running On ${PORT}`);
});