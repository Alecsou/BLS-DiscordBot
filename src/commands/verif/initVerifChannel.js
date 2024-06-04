const {
    ActionRowBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");

module.exports = {    
    name: "initverif",
    description: "Initialise un channel de vérifs",
    deleted: false,
    playerServer: false,
    adminServer: true,
    callback: async (client,interaction) => {
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

        if (interaction.channel == undefined) {
            await interaction.send({ embeds: [embed], components:[row] });
        } else {
            await interaction.channel.send({ embeds: [embed], components:[row] });
        }
    }
}