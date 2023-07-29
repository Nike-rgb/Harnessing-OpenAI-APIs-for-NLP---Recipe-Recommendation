const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const query = req.body;
  const completion = await openai.createChatCompletion({
    model: process.env.MODEL_NAME,
    messages: [
      {
        role: "system",
        content: `Recipe including: ${query}. Less than 150 words. Return html with proper tags for ingredients and instructions `,
      },
    ],
  });
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(completion.data.choices[0].message.content);
}
