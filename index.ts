import {
  ActivityType,
  Client,
  GatewayIntentBits,
  Events,
  VoiceState,
  Message,
  PartialMessage,
} from "discord.js";
import { Commands } from "./src/Commands.js";
import checkForSuppression from "./src/suppress.js";
import updateChannel from "./src/dynamic-channels.js";
import onLeave from "./src/leave-message.js";
import autorole from "./src/autorole.js";
import * as dotenv from "dotenv";
import voiceStatus from "./src/voice-status.js";
import { notifyAdmins } from "./src/message-admins.js";

dotenv.config();

process.on("unhandledRejection", (reason, promise) => {
  notifyAdmins(
    client.users.cache,
    `Unhandled Rejection at: ${JSON.stringify(promise, null, 2)} reason: ${JSON.stringify(reason, null, 2)}`
  );
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.DirectMessages,
  ],
});

client.once(Events.ClientReady, async () => {
  client?.user?.setActivity("Running version 2.6.0", {
    type: ActivityType.Custom,
  });
  await client?.application?.commands.set(Commands);
  console.log(`This bot is online! ${new Date()}`);
});

client.on(Events.MessageUpdate, (_, msg: Message<boolean> | PartialMessage) =>
  checkForSuppression(msg)
);

client.on(Events.MessageCreate, (msg) => checkForSuppression(msg));

client.on(
  Events.VoiceStateUpdate,
  (oldState: VoiceState, newState: VoiceState) => {
    voiceStatus(oldState, newState);
    updateChannel(oldState, newState);
  }
);

client.on(Events.GuildMemberAdd, (member) => autorole(client, member));

client.on(Events.GuildMemberRemove, (member) => onLeave(client, member));

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.channelId !== process.env.COMMAND_CHANNEL) {
    interaction.reply({
      content: "Wrong channel.",
      ephemeral: true,
    });
    return;
  }

  const command = Commands.find((c) => c.name === interaction.commandName);

  if (!command) {
    notifyAdmins(
      client.users.cache,
      `No command matching ${interaction.commandName} was found.`
    );
    return;
  }

  try {
    command.run(client, interaction);
  } catch (error) {
    notifyAdmins(client.users.cache, error);
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
