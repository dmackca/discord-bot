const gifGenerator = require('frinkiac-gif-generator');
const Eris = require('eris');

const bot = new Eris(process.env.BOT_TOKEN);

const DEBUG_CHANNEL_ID = '746568285323133001';

function sendErrorMessage() {
    return bot.createMessage(DEBUG_CHANNEL_ID, '<@246852441696370689> go check the error log!');
}

// When the bot is ready
bot.on('ready', () => {
    console.log('Ready!');
});

// handle error-ish events
bot.on('disconnect', async (msg) => {
    console.error('disconnect happened', msg);
    sendErrorMessage(bot);
});

bot.on('error', async (err, id) => {
    console.error('error happened', err, id);
    sendErrorMessage(bot);
});

bot.on('shardDisconnect', async (err, id) => {
    console.error('shardDisconnect happened', err, id);
    sendErrorMessage(bot);
});

// When a message is created
bot.on('messageCreate', async (msg) => {
    // don't respond to other bots
    if (msg.author.bot) return;

    // frinkiac queries
    if (msg.content.startsWith('.frink ')) {
        const frinkiacQuery = msg.content.substring(7);
        console.log('got .frink query: "%s" in channel %s.', frinkiacQuery, msg.channel.id);

        try {
            const gifUrl = await gifGenerator(frinkiacQuery);
            bot.createMessage(msg.channel.id, gifUrl);
            console.log('sent', gifUrl);
        } catch (e) {
            console.error('no gif result found');
            msg.addReaction('🤷‍♀️');
        }
    }
});

bot.connect(); // Get the bot to connect to Discord
