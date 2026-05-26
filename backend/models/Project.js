const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User"
    },

    title: {

        type: String,

        required: true
    },

    generatedConfig: {

        aiResponse: String
    }

}, {

    timestamps: true
});

module.exports =
    mongoose.model(
        "Project",
        projectSchema
    );