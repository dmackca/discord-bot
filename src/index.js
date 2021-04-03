const { SlashCreator, GatewayServer } = require('slash-create');
const Eris = require('eris');

const path = require('path');

const bot = new Eris(process.env.BOT_TOKEN);
const slashCreator = new SlashCreator({
    applicationID: process.env.APPLICATION_ID,
    publicKey: process.env.PUBLIC_KEY,
    token: process.env.BOT_TOKEN,
});

// When the bot is ready
bot.on('ready', () => {
    console.log('Ready!');
});

// handle error-ish events
bot.on('error', console.error);

// When a message is created
bot.on('messageCreate', async (msg) => {
    // don't respond to other bots
    if (msg.author.bot) return;

    // old-style frinkiac/morbo queries: send a message about slash commands
    if (msg.content.startsWith('.frink ') || msg.content.startsWith('.morbo ')) {
        bot.createMessage(msg.channel.id, 'Use `/frink` and `/morbo` now!');
    }
});

// register slash commands in ./commands
slashCreator
    .withServer(
        new GatewayServer((handler) => bot.on('rawWS', (event) => {
            if (event.t === 'INTERACTION_CREATE') handler(event.d);
        })),
    )
    .registerCommandsIn(path.join(__dirname, 'commands'))
    .syncCommands();

bot.connect(); // connect to Discord
