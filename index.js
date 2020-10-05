const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NzIyMTMzNDE5MTE0NjI3MjAz.XueqlQ.h-4pt4Kbk2voAt_5k0MXwUyQaH8';

var allowed = [
    "youtube.com/watch",
    "youtu.be",
    "redd.it",
    "imgur.com"
];

bot.on('ready', () => {
    console.log('This bot is online!');
    bot.user.setActivity('over link previews', { type: 'WATCHING' });
});

bot.on('message', msg => {
    if (msg.channel == "547000766779490304" && msg.embeds.length > 0) {
        msg.suppressEmbeds(true)
            .then(() => console.log(`Supressing message by: ${msg.author.username}`))
            .catch(console.error);

        for (let i = 0; i < allowed.length; i++) {
            if (msg.content.includes(allowed[i])) {
                msg.suppressEmbeds(false)
                    .then(() => console.log(`Message by ${msg.author.username} cleared`))
                    .catch(console.error);;
            }
        }

    }
});

bot.login(token);