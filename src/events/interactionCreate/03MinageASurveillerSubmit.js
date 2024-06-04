const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = async (client, interaction) => {
    if (!interaction.isModalSubmit() || interaction.customId!==`minage-a-surveiller-${interaction.user.id}`) return;

    const pseudo = interaction.fields.getTextInputValue("pseudoInput");
    const comment = interaction.fields.getTextInputValue("commentInput");

    const embed = interaction.message.embeds[0];
    const newembed = EmbedBuilder.from(embed.toJSON()).addFields({name:"Minage",value:`**A surveiller : ** \`${pseudo}\` (${comment})`});

    const minageRAS = new ButtonBuilder()
        .setLabel('Suivant')
        .setStyle(ButtonStyle.Success)
        .setCustomId('minage-suivant');

    const minageASurveiller = new ButtonBuilder()
    .setLabel('Joueurs A Surveiller Minage')
    .setStyle(ButtonStyle.Danger)
    .setCustomId('minage-a-surveiller');

    const minageBan = new ButtonBuilder()
    .setLabel('Joueurs Banni Minage')
    .setStyle(ButtonStyle.Danger)
    .setCustomId('minage-ban');

    const row = new ActionRowBuilder()
        .addComponents(minageRAS)
        .addComponents(minageASurveiller)
        .addComponents(minageBan);

    await interaction.message.edit({ embeds: [newembed], components:[row] });
    // Delete the modal
    await interaction.update({
      });
}