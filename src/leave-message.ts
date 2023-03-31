import { Client, GuildMember, PartialGuildMember, TextChannel } from "discord.js";

export default function onLeave(client: Client<boolean>, member: GuildMember | PartialGuildMember) {
  const channel = client.guilds.cache?.get(process.env.SERVER!)?.channels.cache.get(process.env.LEAVE_CHANNEL!);
  if (channel instanceof TextChannel) channel?.send(`Goodbye, ${member.toString()}!`);
}
