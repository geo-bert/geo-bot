import {
  CommandInteraction,
  Client,
  GuildMember,
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
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
    const target = interaction.options.get("user")?.user!;
    if (!(member instanceof GuildMember)) return;

    const confirm = new ButtonBuilder()
      .setCustomId("confirm")
      .setLabel("Confirm Ban")
      .setStyle(ButtonStyle.Danger);

    const cancel = new ButtonBuilder()
      .setCustomId("cancel")
      .setLabel("Cancel")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      cancel,
      confirm
    );

    const response = await interaction.reply({
      content: `Are you sure you want to ban ${target} for reason: none?`,
      components: [row],
    });

    const collectorFilter = (i: any) => i.user.id === interaction.user.id;

    try {
      const confirmation = await response.awaitMessageComponent({
        filter: collectorFilter,
        time: 10000,
      });
      if (confirmation.customId === "confirm") {
        await confirmation.update({
          content: `${target.username} has been banned for reason: asd`,
          components: [],
        });
      } else if (confirmation.customId === "cancel") {
        await confirmation.update({
          content: "Action cancelled",
          components: [],
        });
      }
    } catch (e) {
      await interaction.editReply({
        content: "Confirmation not received within 1 second, cancelling",
        components: [],
      });
    }
  },
};
