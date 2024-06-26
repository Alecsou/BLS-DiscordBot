const { ActionRowBuilder,ButtonBuilder,ButtonStyle, EmbedBuilder } = require("discord.js");
const checkServer = require("../../utils/checkBotMode");

module.exports = (client, channel) => {
    if (channel.name === "🟢・mails-hdv") {
        if (checkServer(channel,["admin"])==false) {console.log("01registerHDVChannel.js : Not Admin server ");return;}
        // Send Embed with button

        const embed = new EmbedBuilder()
            .setColor(0x179c00)
            .setTitle("✉️  Gestion des mails de l'HDV")
            .setDescription("Cliquez sur le bouton pour déclarer un envoi de mail")
            .setFooter({ text: 'Cliquez sur le bouton en bas !'});

        const mailsend = new ButtonBuilder()
            .setLabel('✉️ Déclarer un mail')
            .setStyle(ButtonStyle.Primary)
            .setCustomId('HDVbutton');

        const row = new ActionRowBuilder()
            .addComponents(mailsend);

        channel.send({ embeds: [embed], components:[row] });
    }
};
