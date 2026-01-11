import { Message, PartialMessage } from "discord.js";
import config from "../config.json" with { type: "json" };

export default function checkForSuppression(
  msg: Message<boolean> | PartialMessage
) {
  if (!msg.embeds.length) return;
  if (msg.member?.roles.cache.has(process.env.MODERATION_EXCLUDED!)) return;

  const moderated_channels = process.env.MODERATED_CHANNELS?.split(",");

  if (moderated_channels?.includes(msg.channelId)) {
    for (const link of config.whitelisted_previews)
      if (msg.content?.includes(link)) return;

    msg.suppressEmbeds();
  }
}
