const gifGenerator = require('frinkiac-gif-generator');
const Eris = require('eris');

const bot = new Eris(process.env.BOT_TOKEN);

bot.on('ready', () => { // When the bot is ready
    console.log('Ready!'); // Log "Ready!"
});

bot.on('messageCreate', async (msg) => { // When a message is created
    if (msg.content.startsWith('.frink ')) {
        const frinkiacQuery = msg.content.substring(7);
        console.log('got .frink command:', frinkiacQuery);

        const gifUrl = await gifGenerator(frinkiacQuery);
        bot.createMessage(msg.channel.id, gifUrl);
        console.log('sent', gifUrl);
    }
});

bot.connect(); // Get the bot to connect to Discord
