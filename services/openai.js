const { Configuration, OpenAIApi } = require("openai");

const openaikey = process.env.openaikey;

const configuration = new Configuration({
    apiKey: openaikey,
});

const openai = new OpenAIApi(configuration);

async function doService(rulesRAW,inputTxt) {
  console.log("processing")
  var rules = rulesRAW;
  let limit = 4000 - rules.length;
  let promptTXT = inputTxt.slice(0, limit);

  var prompt = rules + promptTXT;

  console.log("processing rules",rules.length,"original",inputTxt.length,"modified",promptTXT.length,"final",prompt.length)
  try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}]
      });

      if (!response.data) {
        throw new Error("Invalid response from OpenAI API (response.data)");
      }
  
      if (!response.data.choices) {
        throw new Error("Invalid response from OpenAI API (response.choices)");
      }

      if (!response.data.choices[0].message.content) {
        throw new Error("Invalid response from OpenAI API (response.choices.message.content)");
      }

      console.log(response.data.choices[0].message.content)
      const regex = /{.*}/s; // Match the JSON string surrounded by curly braces
      const text = response.data.choices[0].message.content.match(regex);
      
      if (!text) {
        throw new Error("Invalid response text from OpenAI API (response.choices[0].message)");
      }
      return text;
    } catch (err) {
      console.error("Error in getDialog:", err);
      throw err;
    }
  }

module.exports = { doService };