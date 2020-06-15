const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NzIyMTMzNDE5MTE0NjI3MjAz.XueqlQ.h-4pt4Kbk2voAt_5k0MXwUyQaH8';

bot.on('ready', () =>{
    console.log('This bot is online!');
    bot.user.setActivity('over link previews', {type: 'WATCHING'});
});

var allowed = [
    "youtube.com/watch",
    "youtu.be",
    "redd.it",
    "imgur.com"
];

bot.on('message', msg =>{
    if(
        msg.content.includes("youtube.com/watch") ||
        msg.content.includes("youtu.be") ||
        msg.content.includes("redd.it") ||
        msg.content.includes("imgur.com")){
        return;
    }
    msg.suppressEmbeds(true);
});

bot.login(token);