const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NzIyMTMzNDE5MTE0NjI3MjAz.XuepJw.xJl73SmUfVsG0JmofhU71y25LFI';

bot.on('ready', () => {
    console.log('This bot is online!');
    bot.user.setActivity('over link previews', { type: 'WATCHING' });
});

bot.on('message', msg => {
    if (msg.channel == "547000766779490304" || msg.channel == "784923413663580160") {
        msg.suppressEmbeds(true).then().catch(console.error);
    }
});

bot.login(token);