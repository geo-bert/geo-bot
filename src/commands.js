import config from "../config.json";
import { initVanity, vanityRole, unvanityRole } from "./commands/vanity.js";

export function initCommands(client) {
  const guild = client.guilds.cache.get(config.server);
  const commands = guild.commands;

  guild.commands.set([]).catch(console.error);

  initVanity(commands);
}

export function handleCommand(client, interaction) {
  if (!interaction.isCommand()) return;

  switch (interaction.commandName) {
    case "vanity":
      vanityRole(client, interaction);
      break;
    case "unvanity":
      unvanityRole(client, interaction);
    default:
      console.log(`Invalid command: ${commandName}`);
  }
}
