import "dotenv/config";
import readline from "readline";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
});

const askModel = async (input: string) => {
  const prompt = ChatPromptTemplate.fromMessages([
    new SystemMessage("You're a helpful assistant"),
    new HumanMessage(input),
  ]);

  const parser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(parser);

  return await chain.invoke(input);
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to the GenAI CLI!");

const chat = () => {
    rl.question('Enter you input (type "quit" to exit): ', async (input) => {
        if(input === "quit"){
            console.log("Exiting GenAI CLI. Goodbye!");
            rl.close();
        } else {
            const result = await askModel(input);
            console.log(`Model response: ${result}`);
            chat();
        }
    });
};

chat();