const { SlashCommand, CommandOptionType } = require('slash-create');
const gifGenerator = require('frinkiac-gif-generator');

module.exports = class MorbotronCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'morbo',
            description: 'Searches Morbotron for Futurama gifs',
            options: [{
                type: CommandOptionType.STRING,
                name: 'quote',
                description: 'Search keywords',
                required: true,
            }],
        });

        // Not required initially, but required for reloading with a fresh file.
        this.filePath = __filename;
    }

    async run(ctx) {
        ctx.defer();
        console.log('morbo query for "%s"', ctx.options.quote);
        const gifUrl = await gifGenerator(ctx.options.quote, 'morbotron');
        console.log('sending', gifUrl);
        ctx.send(gifUrl);
    }

    async onError(err, ctx) {
        console.log(err);
        ctx.send(`Couldn't find a gif for "${ctx.options.quote}" ... I thought you knew your Futurama quotes!`);
    }
};
