import config from "../config.json";

export default function updateChannel(oldState, newState) {
  if (!oldState.channel) {
    connected(newState);
    return;
  }

  if (!newState.channel) {
    disconnected(oldState);
    return;
  }

  if (oldState.channel != newState.channel) moved(oldState, newState);
}

function connected(newState) {
  const channel = newState.channel;
  const category = channel.parent;

  if (
    channel.members.size === 1 &&
    channel.parentId === config.dynamic_category_id
  ) {
    for (const c of category.children) if (c[1].members.size === 0) return;

    channel.clone({
      name:
        randomElement(config.channel_name_prefix) +
        randomElement(config.channel_name_suffix),
    });
  }
}

function disconnected(oldState) {
  const channel = oldState.channel;
  const category = channel.parent;

  let count = 0;
  for (const c of category.children) if (c[1].members.size === 0) count++;
  if (count == 1) return;

  if (
    category.children.size > 1 &&
    channel.members.size == 0 &&
    channel.parentId === config.dynamic_category_id
  )
    channel.delete();
}

function moved(oldState, newState) {
  connected(newState);
  disconnected(oldState);
}

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
