import { VoiceState } from "discord.js";
import { notifyAdmins } from "./message-admins.js";

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

  if (status === "online" || status === "dnd") {
    if (!guildMember.nickname) return;
    if (
      !guildMember.nickname.includes("Konrad") &&
      !guildMember.nickname.includes("Friederich")
    )
      return;

    guildMember.setNickname(user.username, "Reset Nickname");
    return;
  }

  if (status === "idle") {
    guildMember.setNickname(`Konrad`, "Status-based nickname update");

    user
      .send(
        "Hey 👋,\nAre you aware you are appearing *idle*? 🤔\nJust letting you know ☺️!\n\nLove,\nOberGru 😘"
      )
      .catch(); // ignore people who block the bot;
  } else if (status === "offline") {
    guildMember.setNickname(`Friederich`, "Status-based nickname update");

    user
      .send(
        "Hey 👋,\nJoining voice while *offline*?🤔 Wow, truly a master of stealth ☺️!\n\nWas this on purpose?🫣\n\nLove,\nOberGru 😘"
      )
      .catch(); // ignore people who block the bot
  } else {
    // unreachable
  }
}
