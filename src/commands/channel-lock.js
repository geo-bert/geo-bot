import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("lock")
  .setDescription("Provides information about the user.");

export async function execute(interaction) {
  // console.log(interaction);
  const channel = interaction.channel;
  if (!channel.isVoiceBased()) {
    await interaction.reply(
      `Bro trying to lock a text channel. 💀💀💀💀💀💀💀`
    );
  } else if (channel.members.has(interaction.user.id)) {
    await interaction.reply(
      `This command was run by ${interaction.user.username}, who is allowed to lock the channel.`
    );
    channel.permissionOverwrites.create(channel.guild.roles.everyone, {
      Connect: false,
    });
  } else {
    await interaction.reply(
      `User ${interaction.user.username} can't lock this channel`
    );
  }
}
