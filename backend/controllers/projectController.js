const Project = require("../models/abc123");

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
            generatedConfig
        });

        res.status(201).json(project);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Project creation failed"
        });
    }
};

exports.getProjects = async (req, res) => {

    try {

        const projects = await Project.find();

        res.json(projects);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Failed to fetch projects"
        });
    }
};