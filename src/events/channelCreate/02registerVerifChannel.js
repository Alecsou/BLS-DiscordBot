const { ActionRowBuilder,ButtonBuilder,ButtonStyle, EmbedBuilder } = require("discord.js");
const checkServer = require("../../utils/checkBotMode");

module.exports = (client, channel) => {
    if (channel.name === "🟡・vérifs") {
        if (checkServer(channel,["admin"])==false) {console.log("02registerVerifChannel.js : Not Admin server ");return;}
        // Send Embed with button

        const embed = new EmbedBuilder()
            .setColor(0xfffa00)
            .setTitle("Déclaration de vérif")
            .setDescription("Cliquez sur le bouton pour déclarer une vérif")
            .setFooter({ text: 'Cliquez sur le bouton en bas !'});

        const verifsend = new ButtonBuilder()
            .setLabel('✉️ Déclarer une vérif')
            .setStyle(ButtonStyle.Primary)
            .setCustomId('VerifButton');

        const row = new ActionRowBuilder()
            .addComponents(verifsend);

        channel.send({ embeds: [embed], components:[row] });
    }
};
