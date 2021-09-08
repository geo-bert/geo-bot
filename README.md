# geo-bot

This is a custom made bot for the [Weinfeinschmecker](https://discord.gg/g8y3CpE). It uses [discord.js](https://discord.js.org/) for the interaction with the Discord API. These are the current features of the bot, which are explained further after the introduction:

- Removing most link previews
- Dynamic channel creation
- Command for custom vanity role (NYI)
- Autorole
- Leave Message

Template files are provided in the repository. They are aptly marked with the prefix `template_`. The `secrets.son` file contains the bot token and the `config.json` contains the varying parameters. The `"server"` field should contain the server-id.

## Removing most link previews

Almost all link previews are not informative and exist only for the sole purpose of cluttering up a text channel. The bot inspects the content of the message and allows only whitelisted websites to display their previews.

The whitelisted URL subexpressions can be found in the `"whitelisted_previews"` field and the moderated channel IDs in the `"moderated-channels"` field.

On the Weinfeinschmecker server the moderated channels are: `#schwarzes-brett`, `#küchenpass` and `#feldstüberl`. The whitelisted URL subexpressions are:

- youtube.com/watch
- youtu.be
- redd.it
- imgur.com
- tenor.com/view

Additionally the following suffixes to an url are allowed:

- .png
- .jpg
- .gif

This feature does not seem to work correctly and is not very reliable.

## Dynamic channel creation

This feature allows the number of voice channels to grow dynamically. There will always be exactly one empty channel. This means, channels are created and deleted as needed.

The new channel names are chosen randomly from a set of prefixes and suffixes. They can be defined in the `"channel_name_prefix"` and `"channel_name_suffix"` field. For the Weinfeinschmecker server, they are themed around the names of Austrian inn rooms.

The channels are created in a defined category to alloy for static channels to exist. The category-id for the dynamic channels is defined in the `"dynamic_category"` field. In the case of Weinfeinschmecker, it is the `RÄUMLICHKEITEN` category.

## Command for custom vanity role

This feature has yet to be ported from the [OberGru](https://github.com/Pasgru/OberGru) partner bot.

## Autorole

When a user firsts join the server, it automatically assigns a role. It's ID is defined in the `"autorole"` field. In the case of Weinfeinschmecker, it is the "Gast" role.

## Leave Message

When a user leaves the server, a notification is sent. The channel-id it is sent to is defined in the `"leave_channel"` field. In the case of Weinfeinschmecker, it is `"#privat"`.
