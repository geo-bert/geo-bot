import {
  CommandInteraction,
  Client,
  GuildMember,
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  VoiceChannel,
  EmbedBuilder,
} from "discord.js";
import { Command } from "../Command";

const description = new SlashCommandBuilder()
  .setName("banish")
  .setDescription("Banishes user to AFK channel.")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("User to be banished.")
      .setRequired(true)
  )
  .toJSON();

export const Banish: Command = {
  ...JSON.parse(JSON.stringify(description)),
  run: async (client: Client, interaction: CommandInteraction) => {
    const member = interaction.member;
    const target = interaction.options.get("user")?.member!;
    const afkChannel = interaction.guild?.channels.cache.get(
      process.env.AFK_CHANNEL!
    );

    if (!(afkChannel instanceof VoiceChannel)) return;
    if (!(member instanceof GuildMember)) return;
    if (!(target instanceof GuildMember)) return;

    if (!target.voice.channel) {
      interaction.reply({
        content: `${target.displayName} is not connected to a voice channel`,
        ephemeral: true,
      });
      return;
    }

    if (target.voice.channel !== member.voice.channel) {
      interaction.reply({
        content: `You and ${target.displayName} are not in the same channel`,
        ephemeral: true,
      });
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle("Banish Request")
      .setColor(0xff69b4)
      .setAuthor({
        name: member.displayName,
        iconURL: member.displayAvatarURL(),
      });

    const undeafenedMembers = member.voice.channel.members.filter(
      (member) => !member.voice.deaf && !member.voice.mute
    ).size;

    const isInstaBanishable = target.voice.channel === member.voice.channel && (undeafenedMembers === 1 || (undeafenedMembers === 2 && !target.voice.mute))
    if (isInstaBanishable) {
      embed.setDescription(`The user ${member.displayName} banished ${target.displayName}.`);
      interaction.reply({ embeds: [embed] });
      target.edit({ channel: afkChannel });
      return;
    }

    const banish = new ButtonBuilder()
      .setCustomId("banish")
      .setLabel("Banish")
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(banish);

    embed
      .setDescription(`${member.user.tag} wants to banish ${target.user.tag} from the channel. Do you agree?`)
      .setFields({ name: "Timeout", value: "Request will time out in 10 seconds" });

    const response = await interaction.reply({ embeds: [embed], components: [row] });

    try {
      while (true) {
        const confirmation = await response.awaitMessageComponent({
          time: 10000,
        });

        if (
          confirmation.customId === "banish" &&
          confirmation.member !== interaction.member &&
          confirmation.member instanceof GuildMember &&
          confirmation.member.voice.channel
        ) {
          embed
            .setFields({
              name: "Accomplice",
              value: confirmation.member.user.tag,
            })
            .setDescription(
              `Banish request succeeded! ${target.user.tag} will be banished.`
            );
          await confirmation.update({
            embeds: [embed],
            components: [],
          });

          target.edit({
            channel: afkChannel,
          });

          return;
        } else if (
          confirmation.customId === "banish" &&
          confirmation.member === interaction.member
        ) {
          // Case if initiator clicks button
          await confirmation.update({});
        }
      }
    } catch (e) {
      embed
        .setDescription(null)
        .setFields({ name: "Timeout", value: `Request has timed out.` });
      await interaction.editReply({
        embeds: [embed],
        components: [],
      });
    }
  },
};
