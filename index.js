const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NzIyMTMzNDE5MTE0NjI3MjAz.XueqlQ.h-4pt4Kbk2voAt_5k0MXwUyQaH8';

bot.on('ready', () =>{
    console.log('This bot is online!');
});

var allowed = [
    "youtube.com/watch",
    "youtu.be",
    "redd.it",
    "imgur.com"
];

bot.on('message', msg =>{
    for(let i = 0; i < allowed.length; i++){
        if(msg.content.includes(allowed[i])){
            console.log(msg.content + " is apparently in allowed, allowed by: " + allowed[i]);
            return;
        }
    }
    msg.suppressEmbeds(true);
});

bot.user.setActivity('the screams of the removed link previews', { type: 'LISTENING' });
bot.login(token);