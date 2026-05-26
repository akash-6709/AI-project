const axios = require("axios");

const Project = require("../models/Project");

const generateAI = async (req, res) => {

    try {

        const { prompt } = req.body;

        const aiResponse =
            `AI Generated Project For: ${prompt}`;

        // SAVE TO DATABASE
        const newProject =
            await Project.create({

                user: req.user.id,

                title: prompt,

                generatedConfig: {
                    aiResponse
                }
            });

        res.status(200).json({

            success: true,

            response: aiResponse,

            project: newProject
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "AI Generation Failed"
        });
    }
};

module.exports = {
    generateAI
};