import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to the GenAI CLI!");

const chat = () => {
    rl.question('Enter you input (type "quit" to exit): ', (input) => {
        if(input === "quit"){
            console.log("Exiting GenAI CLI. Goodbye!");
            rl.close();
        } else {
            console.log(`You entered: ${input}`);
            chat();
        }
    });
};

chat();