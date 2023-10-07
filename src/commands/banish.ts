import {
  CommandInteraction,
  Client,
  GuildMember,
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  VoiceChannel,
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

    if (
      target.voice.channel === member.voice.channel &&
      target.voice.channel.members.size <= 2
    ) {
      interaction.reply(
        `Request succeeded! ${target.displayName} will be banished.`
      );
      target.edit({
        channel: afkChannel,
      });
      return;
    }

    const banish = new ButtonBuilder()
      .setCustomId("banish")
      .setLabel("Banish")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(banish);

    const response = await interaction.reply({
      content: `${member.displayName} wants to banish ${target.displayName} from the channel. Do you agree? (Request has 10 second timeout)`,
      components: [row],
    });

    try {
      while (true) {
        const confirmation = await response.awaitMessageComponent({
          time: 10000,
        });

        if (
          confirmation.customId === "banish" &&
          confirmation.member !== interaction.member
        ) {
          await confirmation.update({
            content: `Request succeeded! ${target.displayName} will be banished.`,
            components: [],
          });

          target.edit({
            channel: afkChannel,
          });
        }
      }
    } catch (e) {
      await interaction.editReply({
        content: `Request timed out. Won't banish ${target.displayName}`,
        components: [],
      });
    }
  },
};
