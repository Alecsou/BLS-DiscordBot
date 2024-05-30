const { ChannelAutoReacRegistery } = require("../../index.js");

module.exports = {
    name: "autoreacdisable",
    deleted:false,
    description: "Supprime le channel courant comme recepteur de réaction automatique",
    playerServer: true,
    adminServer: true,

    callback: async (client, interaction) => {
        const queryResult = await ChannelAutoReacRegistery.find({
            channelID: interaction.channelId,
            serverID: interaction.guildId,
        });

        if (queryResult.length>0) {
            await ChannelAutoReacRegistery.deleteOne({
                channelID: interaction.channelId,
                serverID: interaction.guildId,
            })
            interaction.reply({
                content: `Ce channel n'a plus de réactions automatiques !`,
                ephemeral: true,
            });
            return;
        }
    },
};
