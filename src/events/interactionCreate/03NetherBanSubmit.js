const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = async (client, interaction) => {
    if (!interaction.isModalSubmit() || interaction.customId!==`nether-ban-${interaction.user.id}`) return;

    const pseudo = interaction.fields.getTextInputValue("pseudoInput");
    const comment = interaction.fields.getTextInputValue("commentInput");

    const embed = interaction.message.embeds[0];
    console.log(embed);
    const newembed = EmbedBuilder.from(embed.toJSON()).addFields({name:"Nether",value:`**Ban : ** \`${pseudo}\` (${comment})`});

    const netherRAS = new ButtonBuilder()
        .setLabel('Suivant')
        .setStyle(ButtonStyle.Success)
        .setCustomId('nether-suivant');

    const netherASurveiller = new ButtonBuilder()
    .setLabel('Joueurs A Surveiller Nether')
    .setStyle(ButtonStyle.Danger)
    .setCustomId('nether-a-surveiller');

    const netherBan = new ButtonBuilder()
    .setLabel('Joueurs Banni Nether')
    .setStyle(ButtonStyle.Danger)
    .setCustomId('nether-ban');

    const row = new ActionRowBuilder()
        .addComponents(netherRAS)
        .addComponents(netherASurveiller)
        .addComponents(netherBan);

    await interaction.message.edit({ embeds: [newembed], components:[row] });
    // Delete the modal
    await interaction.update({
      });
}