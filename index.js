const Discord = require('discord.js');
const bot = new Discord.Client();
require("dotenv").config();

const general = process.env.GENERAL;
const trusted_general = process.env.TRUSTEDGENERAL;
const admin_role = process.env.ADMINROLE;
const owner = process.env.OWNER;
const date = new Date();

const allowed = [
    "youtube.com/watch",
    "youtu.be",
    "redd.it",
    "imgur.com"
];

bot.on('ready', () => {
    bot.user.setActivity('over link previews', { type: 'WATCHING' });
    console.log(`This bot is online! ${date}`);
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

bot.login(process.env.TOKEN);