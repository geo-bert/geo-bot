import { CommandInteraction, Client, ApplicationCommandType, GuildMember, PermissionsBitField } from "discord.js";
import { Command } from "../Command";

export const ChannelLock: Command = {
  name: "lock",
  description: "Provides information about the user.",
  type: ApplicationCommandType.ChatInput,

  run: async (client: Client, interaction: CommandInteraction) => {
    const member = interaction.member
    if (!(member instanceof GuildMember)) return;

    const channel = member.voice.channel;
    const canConnect = channel?.permissionsFor(channel?.guild.roles.everyone).has(PermissionsBitField.Flags.Connect)

    if (channel?.members.has(interaction.user.id)) {
      await interaction.reply(
        { content: `<@!${interaction.user.id}> ${!canConnect ? "un" : ""}locked <#${channel.id}>`,
        allowedMentions: { users: [] } }
      )
      
      channel?.permissionOverwrites.create(channel?.guild.roles.everyone, {
        Connect: !canConnect,
      });

    } else {
      await interaction.reply(
        `User ${interaction.user.username} is not in Voice Channel => can't lock this channel`
      );
    }
  }
}
