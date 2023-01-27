import config from "../config.json" assert { type: "json" };

export default function autorole(client, member) {
  const role = client.guilds.cache
    .get(config.server)
    .roles.cache.get(config.autorole);
  member.roles.add(role);
}
