export default function autorole(client, member) {
  const role = client.guilds.cache
    .get(process.env.SERVER)
    .roles.cache.get(process.env.AUTO_ROLE);
  member.roles.add(role);
}
