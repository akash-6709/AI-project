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
        type: Object
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.models.Project ||
    mongoose.model("Project", projectSchema);