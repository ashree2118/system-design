import "dotenv/config";
import readline from "readline";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
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