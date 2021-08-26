import config from "../config_dev.json";

export default function checkForSuppression(msg) {
  if (!msg.embeds.length) return;

  if (config.moderated_channels.includes(msg.channelId))
    for (const link of config.whitelisted_previews)
      if (msg.content.includes(link)) return;

  msg.suppressEmbeds().catch((err) => console.error(err));
}
