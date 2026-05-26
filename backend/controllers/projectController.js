const Project = require("../models/Project");

const getProjects = async (req, res) => {

    try {

        const projects =
            await Project.find({

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

            message: "Project Fetch Failed"
        });
    }
};

module.exports = {
    getProjects
};