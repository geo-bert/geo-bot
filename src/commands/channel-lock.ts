import { CommandInteraction, Client, ApplicationCommandType, GuildMember } from "discord.js";
import { Command } from "../Command";

export const ChannelLock: Command = {
  name: "lock",
  description: "Provides information about the user.",
  type: ApplicationCommandType.ChatInput,

  run: async (client: Client, interaction: CommandInteraction) => {
    const user = interaction.user
    const guild = interaction.guild
    const member = interaction.member
    if (!(member instanceof GuildMember)) return;

    const channel = member.voice.channel;

    if (channel?.members.has(interaction.user.id)) {
      await interaction.reply(
        `This command was run by ${interaction.user.username}, who is allowed to lock the channel.`
      );
      channel?.permissionOverwrites.create(channel?.guild.roles.everyone, {
        Connect: false,
      });
    } else {
      await interaction.reply(
        `User ${interaction.user.username} can't lock this channel`
      );
    }
  }
}
