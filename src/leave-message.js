export default function onLeave(client, member) {
  const channel = client.guilds.cache
    .get(process.env.SERVER)
    .channels.cache.get(process.env.LEAVE_CHANNEL);
  channel.send(`Goodbye, ${member.toString()}!`);
}
