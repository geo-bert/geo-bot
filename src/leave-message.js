import config from "../config.json";

export default function onLeave(client, member) {
  const channel = client.guilds.cache
    .get(config.server)
    .channels.cache.get(config.leave_channel);
  channel.send(`Goodbye, ${member.toString()}!`);
}
