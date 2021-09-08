import config from "../config.json";

export default function autorole(client, member) {
  const role = client.guilds.cache
    .get(config.server_id)
    .roles.cache.get(config.autorole);
  member.roles.add(role);
}
