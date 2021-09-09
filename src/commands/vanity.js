import { Constants } from "discord.js";

export function initVanity(commands) {
  commands.create({
    name: "vanity",
    description: "Add or edit vanity role.",
    options: [
      {
        name: "name",
        description: "This is the name of the role",
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: "color",
        description: "This is the color of the role",
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: "user",
        description: "Target for vanity role (Admin only).",
        required: false,
        type: Constants.ApplicationCommandOptionTypes.USER,
      },
    ],
  });

  commands.create({
    name: "unvanity",
    description: "Remove vanity role.",
    options: [
      {
        name: "user",
        description: "Target for removal (Admin only).",
        required: false,
        type: Constants.ApplicationCommandOptionTypes.USER,
      },
      {
        name: "reason",
        description: "Reason for removal (Admin only)",
        required: false,
        type: Constants.ApplicationCommandOptionTypes.STRING,
      },
    ],
  });
}

export function vanityRole(client, interaction) {
  interaction.reply("This is WIP");
}

export function unvanityRole(client, interaction) {
  interaction.reply("This is WIP");
}
