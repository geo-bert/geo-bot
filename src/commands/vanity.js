import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("vanity")
  .setDescription("Modifies your vanity role")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("add")
      .setDescription("Adds new vanity role")
      .addStringOption((option) =>
        option
          .setName("name")
          .setDescription("Name of the role")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("color")
          .setDescription("Color of the role")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("remove")
      .setDescription("Removes vanity role")
      .addUserOption((option) =>
        option
          .setName("user")
          .setDescription("User to remove role of (admin only)")
          .setRequired(false)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("name")
      .setDescription("Edit vanity role name")
      .addStringOption((option) =>
        option
          .setName("name")
          .setDescription("New name of the role")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("color")
      .setDescription("Edit vanity role color")
      .addStringOption((option) =>
        option
          .setName("color")
          .setDescription("New color of the role")
          .setRequired(true)
      )
  );

export async function execute(interaction) {
  await interaction.reply("WIP");
}
