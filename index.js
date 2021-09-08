import { Client, Intents } from "discord.js";
import token from "./secrets.json";
import checkForSuppression from "./src/suppress.js";
import updateChannel from "./src/dynamic-channels.js";
import onLeave from "./src/leave-message.js";
import autorole from "./src/autorole.js";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.once("ready", () => {
  client.user.setActivity("the fiddle like an Irish man", { type: "PLAYING" });
  console.log(`This bot is online! ${new Date()}`);
});

client.on("messageCreate", (msg) => checkForSuppression(msg));

client.on("voiceStateUpdate", (oldState, newState) =>
  updateChannel(oldState, newState)
);

client.on("guildMemberAdd", (member) => autorole(client, member));

client.on("guildMemberRemove", (member) => onLeave(client, member));

client.login(token);
