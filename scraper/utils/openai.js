const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = openai;

// Chat Completion Example
/* const chatCompletion = await openai.createChatCompletion({
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'user',
      content: 'Give me an interesting fact about dogs.',
    },
  ],
});
const interestingFact = chatCompletion.data.choices[0].message.content; */
