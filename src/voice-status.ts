import { VoiceState } from "discord.js";

export default function voiceStatus(
  oldState: VoiceState,
  newState: VoiceState
) {
  if (oldState.channel) return;
  if (!newState.channel) return;
  const user = newState.member?.user;
  if (!user) return;

  const guildMember = newState.member?.guild.members.cache.get(user.id);
  if (!guildMember) return;
  const status = guildMember.presence?.status;
  if (!status) return;

  if(status === "online" || status === "dnd") {
    if(!guildMember.nickname) return;
    if(!guildMember.nickname.includes("[AFK]") && !guildMember.nickname.includes("[Offline]")) return;

    const woAfk = guildMember.nickname.replace("[AFK] ", "");
    const woOffline = woAfk.replace("[Offline] ", "");

    guildMember.setNickname(woOffline, "Reset Nickname").catch(console.error);
    return;
  }

  if(status === "idle") {
    const woAfk = guildMember.nickname?.replace("[AFK] ", "");
    const woOffline = woAfk?.replace("[Offline] ", "");

    guildMember
      .setNickname(`[AFK] ${woOffline ?? user.username}`, "Status-based nickname update")
      .catch(console.error);
    
      user.send("Hey 👋,\nAre you aware you are appearing *idle*? 🤔\nJust letting you know ☺️!\n\nLove,\nOberGru 😘").catch(console.error);
  } else if(status === "offline") {
    const woAfk = guildMember.nickname?.replace("[AFK] ", "");
    const woOffline = woAfk?.replace("[Offline] ", "");

    guildMember
      .setNickname(`[Offline] ${woOffline ?? user.username}`, "Status-based nickname update")
      .catch(console.error);
    user.send("Hey 👋,\nJoining voice while *offline*?🤔 Wow, truly a master of stealth ☺️!\n\nWas this on purpose?🫣\n\nLove,\nOberGru 😘").catch(console.error);
  } else {
    // unreachable
  }
}
