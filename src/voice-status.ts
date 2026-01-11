import { VoiceState } from "discord.js";

export default function voiceStatus(
  oldState: VoiceState,
  newState: VoiceState
) {
  if (oldState.channel) return;
  if (!newState.channel) return;

  const guildMember = newState.member;
  if (!guildMember) return;
  const status = guildMember.presence?.status;
  if (!status) return;

  switch (status) {
    case "online":
    case "dnd":
      if (!guildMember.nickname) return;
      if (
        !guildMember.nickname.includes("Konrad") &&
        !guildMember.nickname.includes("Friederich")
      )
        return;

      guildMember.setNickname(guildMember.user.username, "Reset Nickname");
      return;
    case "idle":
      guildMember.setNickname("Konrad", "Status-based nickname update");

      guildMember
        .send(
          "Hey 👋,\nAre you aware you are appearing *idle*? 🤔\nJust letting you know ☺️!\n\nLove,\nOberGru 😘"
        )
        .catch(); // ignore people who block the bot;
      return;
    case "invisible":
    case "offline":
      guildMember.setNickname("Friederich", "Status-based nickname update");

      guildMember
        .send(
          "Hey 👋,\nJoining voice while *offline*?🤔 Wow, truly a master of stealth ☺️!\n\nWas this on purpose?🫣\n\nLove,\nOberGru 😘"
        )
        .catch(); // ignore people who block the bot
      return;
  }
}
