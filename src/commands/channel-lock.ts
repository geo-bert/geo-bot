import {
  CommandInteraction,
  Client,
  GuildMember,
  PermissionsBitField,
  SlashCommandBuilder,
} from "discord.js";
import { Command } from "../Command";

const description = new SlashCommandBuilder()
  .setName("lock")
  .setDescription("Locks and unlocks current voice channel")
  .toJSON();

export const ChannelLock: Command = {
  ...JSON.parse(JSON.stringify(description)),
  run: async (client: Client, interaction: CommandInteraction) => {
    const member = interaction.member;
    if (!(member instanceof GuildMember)) return;

    const channel = member.voice.channel;
    const canConnect = channel
      ?.permissionsFor(channel?.guild.roles.everyone)
      .has(PermissionsBitField.Flags.Connect);

    if (channel?.members.has(interaction.user.id)) {
      await interaction.reply({
        content: `<@!${interaction.user.id}> ${
          !canConnect ? "un" : ""
        }locked <#${channel.id}>`,
        allowedMentions: { users: [] },
      });

      if(canConnect) {
        channel.permissionOverwrites.create(channel.guild.roles.everyone, {
          Connect: false,
        });
      } else {
        channel?.permissionOverwrites.delete(channel.guild.roles.everyone)
      }
    } else {
      await interaction.reply({
        content: `You are not in a channel, nothing can be locked`,
        ephemeral: true,
      });
    }
  },
};
