const { SlashCommand, CommandOptionType } = require('slash-create');
const gifGenerator = require('frinkiac-gif-generator');

module.exports = class FrinkiacCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'frink',
            description: 'Searches Frinkiac for Simpsons gifs',
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
        console.log('frink query for "%s"', ctx.options.quote);
        const gifUrl = await gifGenerator(ctx.options.quote);
        console.log('sending', gifUrl);
        ctx.send(gifUrl);
    }

    async onError(err, ctx) {
        console.log(err);
        ctx.send(`Couldn't find a gif for "${ctx.options.quote}" ... I thought you knew your Simpsons quotes!`);
    }
};
