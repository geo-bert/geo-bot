import { REST, Routes } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();
import { Commands } from "./src/Commands.js";

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN!);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${Commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    await rest.put(
    
      Routes.applicationCommands(process.env.APPLICATION_ID!),
      { body: Commands.map((command) => JSON.parse(JSON.stringify(command))) }
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
