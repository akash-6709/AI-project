const axios = require("axios");

const Project = require("../models/abc123");

exports.chatWithAI = async (req, res) => {

    try {

        const prompt = req.body.prompt;

        const response = await axios.post(

            "https://openrouter.ai/api/v1/chat/completions",

            {
                model: "openai/gpt-3.5-turbo",

                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },

            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const aiText =
            response.data.choices[0].message.content;

        const project = await Project.create({

            title: prompt,

            prompt: prompt,

            generatedConfig: {
                aiResponse: aiText
            }
        });

        res.json({
            response: aiText,
            project
        });

    } catch (error) {

        console.log(error.response?.data || error);

        res.status(500).json({
            error: "AI Error"
        });
    }
};