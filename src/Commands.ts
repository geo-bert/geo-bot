import { Command } from "./Command";
import { ChannelLock } from "./commands/channel-lock.js";
import { Banish } from "./commands/banish.js";

export const Commands: Command[] = [ChannelLock, Banish];
