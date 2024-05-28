const { ChannelAutoReacRegistery } = require("../../index.js");

module.exports = async (client, message) => {
    // Check if message in correct channel
    //  > Channels are stored in a database, along with the reactions to put in
    // Check channel specificities (what reactions to put)
    // React to message
    console.log(message);
    ChannelAutoReacRegistery.exists({server})
}