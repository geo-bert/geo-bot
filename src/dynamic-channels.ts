import { ChannelType, VoiceState } from "discord.js";
import config from "../config.json" with { type: "json" };

export default function updateChannel(
  oldState: VoiceState,
  newState: VoiceState
) {
  if (!oldState.channel) {
    connected(newState);
    return;
  }

  if (!newState.channel) {
    disconnected(oldState);
    return;
  }

  if (oldState.channel !== newState.channel) moved(oldState, newState);
}

function connected(newState: VoiceState) {
  const channel = newState.channel;
  const guild = newState.guild;
  const category = channel?.parent;
  const cache = category?.children.cache!;

  if (
    channel?.members.size === 1 &&
    channel?.parentId === process.env.DYNAMIC_CATEGORY
  ) {
    for (const c of cache.values()) if (c.members.size === 0) return;

    guild.channels.create({
      name:
        randomElement(config.channel_name_prefix) +
        randomElement(config.channel_name_suffix),
      type: ChannelType.GuildVoice,
      parent: category?.id,
    });
  }
}

function disconnected(oldState: VoiceState) {
  const channel = oldState.channel;
  const category = channel?.parent;
  const cache = category?.children.cache!;

  let count = 0;
  for (const c of cache.values()) if (c.members.size === 0) count++;
  if (count === 1) return;

  if (
    cache.size > 1 &&
    channel?.members.size === 0 &&
    channel?.parentId === process.env.DYNAMIC_CATEGORY
  ) {
    channel.delete();
  } else if (
    channel?.members.size === 0 &&
    channel?.parentId === process.env.DYNAMIC_CATEGORY
  ) {
    channel?.permissionOverwrites.create(channel?.guild.roles.everyone, {
      Connect: true,
    });
  }
}

function moved(oldState: VoiceState, newState: VoiceState) {
  connected(newState);
  disconnected(oldState);
}

function randomElement(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}
