import {
  ActivityType,
  Client,
  Collection,
  GatewayIntentBits,
  Events,
  CommandInteraction,
} from "discord.js";
import { Commands } from "./src/Commands.js";
import checkForSuppression from "./src/suppress.js";
import updateChannel from "./src/dynamic-channels.js";
import onLeave from "./src/leave-message.js";
import autorole from "./src/autorole.js";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import fs from "node:fs";
import path from "node:path";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once(Events.ClientReady, async () => {
  client?.user?.setActivity("the sky and slacking off", {

    type: ActivityType.Watching,
  });
  await client?.application?.commands.set(Commands);
  console.log(`This bot is online! ${new Date()}`);
});

client.on(Events.MessageUpdate, (_, msg) => checkForSuppression(msg));

client.on(Events.MessageCreate, (msg) => checkForSuppression(msg));

client.on(Events.VoiceStateUpdate, (oldState, newState) =>
  updateChannel(oldState, newState)
);

client.on(Events.GuildMemberAdd, (member) => autorole(client, member));

client.on(Events.GuildMemberRemove, (member) => onLeave(client, member));

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = Commands.find(c => c.name === interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.run(client, interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.BOT_TOKEN);
