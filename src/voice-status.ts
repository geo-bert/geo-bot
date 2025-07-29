import { ChannelType, GuildMember, VoiceState } from "discord.js";

export default function voiceStatus(state: VoiceState) {
  return
  // if (!state.channel) return;
  // const user = state.member?.user;
  // if (!user) return;

  // const guildMember = state.member?.guild.members.cache.get(user.id);
  // if (!guildMember) return;
  // const status = guildMember.presence?.status;
  // if (!status) return;

  // if (
  //   guildMember.nickname?.startsWith("[AFK]") ||
  //   guildMember.nickname?.startsWith("[Offline]")
  // )
  //   return;

  // let newNickname: string | undefined;

  // if (status === "idle") {
  //   newNickname = `[AFK] ${guildMember.nickname}`;
  // } else if (status === "offline") {
  //   newNickname = `[Offline] ${guildMember.nickname}`;
  // } else {
  //   // Don't change nickname for online or dnd
  //   return;
  // }

  // guildMember
  //   .setNickname(newNickname, "Status-based nickname update")
  //   .catch(console.error);
}
