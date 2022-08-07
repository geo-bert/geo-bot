import fs from "fs";
import path from "path";
import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";
import token from "./secrets.json" assert { type: "json" };
import config from "./config.json" assert { type: "json" };

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { server, guild_id } = config;

const commands = [];
const commandsPath = path.join(__dirname, "src", "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = await import(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(config.client_id, server), {
    body: commands,
  })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
