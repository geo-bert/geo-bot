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
    for(let i = 0; i < allowed.length; i++){
        if(msg.content.includes(allowed[i])){
            return;
        }
    }
    msg.suppressEmbeds(true);
});

bot.on('ready', () =>{
    function scheduledMessage(){
        bot.channels.cache.get('303288155124269056').send('noob')
            .then(sentMessage => {
                sentMessage.delete()
            })
            .catch(console.error);
    }

    setInterval(scheduledMessage, 300000);
});

bot.login(token);