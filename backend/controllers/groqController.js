const Groq = require("groq-sdk");

const MODEL_ID = "llama3-70b-8192";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Express route handler for POST /groq/analyze
exports.callGroq = async (req, res) => {
    try {
        const { product, description } = req.body;
        if (!product || !description) {
            return res.status(400).json({ error: 'Missing product or description in request body.' });
        }
        const prompt = `
        
You are an expert environmental assistant. Analyze ONLY the following product and its description, focusing on practical, actionable advice for a consumer who wants to be environmentally responsible.

Extract the carbon dioxide (CO2) footprint from the description if available. If not available, state that clearly. 

- Give clear recycling or disposal instructions for this product (e.g., is the packaging recyclable, compostable, or should it go to landfill?).
- Mention any eco-friendly features or certifications the product or its packaging has.
- If possible, provide the carbon footprint per unit (e.g., grams CO2 per can/bottle/etc). If not available, say 'Not available'.
- Give 2-3 specific tips for how a consumer can reduce the environmental impact of using or disposing of this product.
- Do NOT discuss company-wide goals or general sustainability plans unless they directly affect this product's use or disposal.
- Do not use any markdown formatting like ** in your response.
- If you are not sure about the product or its description, set the Environmental Score to 0.

Respond STRICTLY in the following format using the < tag > for headers:

<Environmental Score>
Score: [1-100]

<CO2 Footprint>
[CO2 info or 'Not available']

<Environmental Tips>
[Provide actionable tips for the user to reduce their environmental impact when using this product. Assume the user is an average consumer who semi regularly uses this product. Give recommendations for more sustainable alternatives. ]

<Explanation>
[Brief explanation for your score]

Product: ${product}

Description: ${description}`;
        
        const completion = await groq.chat.completions.create({
            model: MODEL_ID,
            messages: [
                { role: "user", content: prompt }
            ],
        });

        const result = completion.choices[0].message.content;
        console.log('Groq response:', result);
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process request.' });
    }
};

// Sends raw text and product name to Groq to keep only relevant sentences
exports.keepRelevantText = async (req, res) => {
    try {
        const { rawText, productName } = req.body;
        if (!rawText || !productName) {
            return res.status(400).json({ error: 'Missing rawText or productName in request body.' });
        }
        const prompt = `
You are a helpful assistant. Given the following text, return ONLY the sentences that are 
directly relevant to the product: "${productName}". Do not include unrelated information. 
Return the filtered sentences as a single string, preserving their original order.
\n\nText:\n${rawText}
`;
        const completion = await groq.chat.completions.create({
            model: MODEL_ID,
            messages: [
                { role: "user", content: prompt }
            ],
        });
        const relevantText = completion.choices[0].message.content;
        res.json({ relevantText });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process request.' });
    }
};