const gifGenerator = require('frinkiac-gif-generator');
const Eris = require('eris');

const bot = new Eris(process.env.BOT_TOKEN);

// When the bot is ready
bot.on('ready', () => { console.log('Ready!'); });

// handle error-ish events
bot.on('error', console.error);

// When a message is created
bot.on('messageCreate', async (msg) => {
    // don't respond to other bots
    if (msg.author.bot) return;

    // frinkiac queries
    if (msg.content.startsWith('.frink ')) {
        // add "loading" indicator reaction
        msg.addReaction('⌛');

        const frinkiacQuery = msg.content.substring(7);
        console.log('got .frink query: "%s" in channel %s.', frinkiacQuery, msg.channel.id);

        try {
            const gifUrl = await gifGenerator(frinkiacQuery);
            bot.createMessage(msg.channel.id, gifUrl);
            console.log('sent', gifUrl);
        } catch (e) {
            console.error('no gif result found');
            msg.addReaction('🤷‍♀️');
        } finally {
            // remove "loading" indicator reaction
            msg.removeReaction('⌛');
        }
    }
});

bot.connect(); // connect to Discord
