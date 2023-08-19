const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const query = req.body;
  if (query.length === 0) {
    res.status(404).send("Error");
    return;
  }
  if (query.length > 100) return res.status(404).send("Error");
  const completion = await openai.createChatCompletion({
    model: process.env.MODEL_NAME,
    messages: [
      {
        role: "system",
        content: `Recipe including ingredients: ${query}. Should be json. When doing JSON.parse() on content, it should work. Json structure should be {title: [STRING], courseType: [STRING], calorieCount: [number], difficulty: [string among beginner, intermediate and expert], time: [string],ingredients: [ARRAY], instructions: [ARRAY]}. Each element in instruction should be at least 3 sentences.`,
      },
    ],
  });
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(completion.data.choices[0].message.content);
}
