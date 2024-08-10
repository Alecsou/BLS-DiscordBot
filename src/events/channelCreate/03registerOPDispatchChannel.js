const { ActionRowBuilder,ButtonBuilder,ButtonStyle, EmbedBuilder } = require("discord.js");
const checkServer = require("../../utils/checkBotMode");

module.exports = (client, channel) => {
    if (channel.name === "🚨・dispatch-op") {
        if (checkServer(channel,["builder"])==false) {console.log("03registerOPDispatchChannel.js : Not Builder server");return;}
        // Send Embed with button

        const embed = new EmbedBuilder()
            .setColor(0xff9300)
            .setTitle("Dispatch opérateur")
            .setDescription("Cliquez sur le bouton pour vous déclarer en /op!")
            .setFooter({ text: 'Cliquez sur le bouton en bas !'});

        const declareOP = new ButtonBuilder()
            .setLabel('🔺 Se déclarer opérateur')
            .setStyle(ButtonStyle.Success)
            .setCustomId('OPDispatchButton');

        const declaredeOP = new ButtonBuilder()
            .setLabel('🔻 Se déclarer non-opérateur')
            .setStyle(ButtonStyle.Danger)
            .setCustomId('OPUndispatchButton');

        const row = new ActionRowBuilder()
            .addComponents(declareOP)
            .addComponents(declaredeOP);

        channel.send({ embeds: [embed], components:[row] });
    }
};
