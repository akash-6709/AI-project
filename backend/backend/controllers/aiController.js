const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

exports.chatWithAI = async (req, res) => {

    try {

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });

        const prompt = req.body.prompt;

        console.log(process.env.GEMINI_API_KEY);

        const result = await model.generateContent(prompt);

        const response = result.response.text();

        res.json({
            response
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "AI Error"
        });
    }
};