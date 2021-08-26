import { Client, Intents } from "discord.js";
import token from "./secrets.json";
import checkForSuppression from "./src/suppress.js";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once("ready", () => {
  client.user.setActivity("the fiddle like an Irish man", { type: "PLAYING" });
  console.log(`This bot is online! ${new Date()}`);
});

client.on("messageCreate", (msg) => checkForSuppression(msg));

client.login(token);
