var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
	    case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: 'Welcome to the Cephalon Lune Eidolon Manager by the SolBound Alliance!'
                });
            break;
	    case 'eidolon':
                bot.sendMessage({
                    to: channelID,
                    message: 'To start off, visit https://tithen-firion.github.io/warframe/poe.html and decide which time you would like to sign up for.  Once you have finished that, type !time yyyyMMdd HHmm using the 24 hour date format.'
                });
            break;
	    case 'time':
		message.substring(7, 8)
                bot.sendMessage({
                    to: channelID,
                    message: 'You are registered for an Eidolon hunt on ' + message.substring(6, 14) + ' at ' + message.substring(16, 19)
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});

