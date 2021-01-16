const Discord = require('discord.js');
const bot = new Discord.Client();

const general = "547000766779490304";
const trusted_general = "784923413663580160";
const admin_role = "143709645213663232";
const owner = "143703794306383872";

bot.login("NzIyMTMzNDE5MTE0NjI3MjAz.XuepJw.xJl73SmUfVsG0JmofhU71y25LFI");

const allowed = [
    "youtube.com/watch",
    "youtu.be",
    "redd.it",
    "imgur.com"
];

bot.on('ready', () => {
    bot.user.setActivity('over link previews', { type: 'WATCHING' });
    console.log(`This bot is online! ${new Date()}`);
});

bot.on('message', msg => {
    if(!msg.member.roles.cache.find(r => r.id === admin_role) && !msg.member.id === owner){
        return;
    }

    if (msg.channel == general) {
        msg.suppressEmbeds(true).catch(err => console.error(err));
        return;
    }

    if (msg.channel == trusted_general) {
        for (let i = 0; i < allowed.length; i++) {
            if (msg.content.includes(allowed[i])) {
                return;
            }
        }
        msg.suppressEmbeds(true).catch(err => console.error(err));
    }
});
