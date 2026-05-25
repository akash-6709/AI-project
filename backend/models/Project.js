const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    prompt: {
        type: String,
        required: true
    },

    generatedConfig: {
        type: Object,
        required: true
    },

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User"
    }

}, {
    timestamps: true
});

module.exports =
    mongoose.model("Project", projectSchema);