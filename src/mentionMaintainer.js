const DEBUG_CHANNEL_ID = '746568285323133001';
const DEBUG_MENTION_MAINTAINER = '<@246852441696370689>';

function mentionMe(bot, msg) {
    return bot.createMessage(DEBUG_CHANNEL_ID, `${DEBUG_MENTION_MAINTAINER} ${msg}`);
}

module.exports = mentionMe;
