import { ActivityType, Client, GatewayIntentBits } from "discord.js";
import token from "./secrets.json" assert { type: "json" };
import checkForSuppression from "./src/suppress.js";
import updateChannel from "./src/dynamic-channels.js";
import onLeave from "./src/leave-message.js";
import autorole from "./src/autorole.js";
import { initCommands, handleCommand } from "./src/commands.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once("ready", () => {
  client.user.setActivity("the sky and slacking off", {
    type: ActivityType.Watching,
  });
  console.log(`This bot is online! ${new Date()}`);

  initCommands(client);
});

client.on("messageCreate", (msg) => checkForSuppression(msg));

client.on("voiceStateUpdate", (oldState, newState) =>
  updateChannel(oldState, newState)
);

client.on("guildMemberAdd", (member) => autorole(client, member));

client.on("guildMemberRemove", (member) => onLeave(client, member));

client.on("interactionCreate", async (interaction) =>
  handleCommand(client, interaction)
);

client.login(token);
