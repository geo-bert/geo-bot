import { Client, GuildMember } from "discord.js";

export default function autorole(client: Client<boolean>, member: GuildMember) {
  const role = client.guilds.cache
    ?.get(process.env.SERVER!)
    ?.roles.cache.get(process.env.AUTO_ROLE!);
  member.roles.add(role!);
}
