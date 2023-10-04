# geo-bot

This is a custom-made bot for the [Weinfeinschmecker](https://discord.gg/g8y3CpE). It
uses [discord.js](https://discord.js.org/) for the interaction with the Discord API. These are the current features of
the bot, which are explained further after the introduction:

- Removing most link previews
- Dynamic channel creation
- Commands for channel moderation
- Auto-role
- Leave Message

## Removing most link previews

Almost all link previews are not informative and exist only for the sole purpose of cluttering up a text channel. The
bot inspects the content of the message and allows only whitelisted websites to display their previews.

The whitelisted URL subexpressions can be found in the `"whitelisted_previews"` field and the moderated channel IDs in
the `"moderated-channels"` field.

On the Weinfeinschmecker server the moderated channels are: `#schwarzes-brett`, `#küchenpass` and `#feldstüberl`. The
whitelisted URL subexpressions are:

- youtube.com/watch
- youtu.be
- redd.it
- imgur.com
- tenor.com/view

Additionally, the following suffixes to an url are allowed:

- .png
- .jpg
- .gif

Furthermore, you can specify a role, that is not affected by the embed suppression.

## Dynamic channel creation

This feature allows the number of voice channels to grow dynamically. There will always be exactly one empty channel.
This means, channels are created and deleted as needed.

The new channel names are chosen randomly from a set of prefixes and suffixes. They can be defined in
the `"channel_name_prefix"` and `"channel_name_suffix"` field. For the Weinfeinschmecker server, they are themed around
the names of Austrian inn rooms.

The channels are created in a defined category to alloy for static channels to exist. The category-id for the dynamic
channels is defined in the `"dynamic_category"` field. In the case of Weinfeinschmecker, it is the `RÄUMLICHKEITEN`
category.

## Command for custom vanity role

This feature will ___not___ be ported from the [OberGru](https://github.com/Pasgru/OberGru) partner bot.

## Lock Command

Command that allows for full lockdown of the channel you currently reside in. Usage `/lock` to lock and `/lock` to
unlock

## Banish

Command that allows for a user to be moved to a dedicated channel if enough people vote. Votes needed are one person if
two people are in a voice channel, and two people if there are more than two users connected. Usage: `\banish <user>` to
start the vote.

## Auto-role

When a user firsts join the server, it automatically assigns a role. Its ID is defined in the `"autorole"` field. In
the case of Weinfeinschmecker, it is the "Gast" role.

## Leave Message

When a user leaves the server, a notification is sent. The channel-id it is sent to is defined in the `"leave_channel"`
field. In the case of Weinfeinschmecker, it is `"#privat"`.

### Needed Environment Variables

* `BOT_TOKEN`: self-explanatory
* `SERVER`: ID of server bot is on
* `DYNAMIC_CATEGORY`: ID of channel category containing dynamic channels
* `ADMIN_ROLE`: ID of admin role
* `LEAVE_CHANNEL`: ID of channel user-leaves messages are sent to
* `AUTO_ROLE`: ID of automatically assigned role
* `MODERATED_CHANNELS`: comma separated list of IDs of channels where embeds should be suppressed