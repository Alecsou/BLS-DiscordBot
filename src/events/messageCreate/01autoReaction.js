const { ChannelAutoReacRegistery } = require("../../index.js");
const { adminServer,playerServer } = require("../../../config.json");

module.exports = async (client, message) => {
    // Check if message in correct channel
    //  > Channels are stored in a database, along with the reactions to put in
    // Check channel specificities (what reactions to put)
    // React to message

    const queryResult = await ChannelAutoReacRegistery.find({
        channelID: message.channelId,
        serverID: message.guildId,
    });

    if (queryResult.length>0) {
        for (var reaction of queryResult[0].reactions) {
            message.react(reaction);
        }
    }
}