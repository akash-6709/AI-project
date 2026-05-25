const Project = require("../models/Project");

exports.createProject = async (req, res) => {

    try {

        const {
            title,
            prompt,
            generatedConfig
        } = req.body;

        const project = await Project.create({

            title,

            prompt,

            generatedConfig,

            user: req.user.id
        });

        res.status(201).json({
            success: true,
            project
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Project creation failed"
        });
    }
};

exports.getProjects = async (req, res) => {

    try {

        const projects = await Project.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            projects
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Cannot fetch projects"
        });
    }
};