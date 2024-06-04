const showModal = require("../../commands/verif/showMinageASurveillerModal");
const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { VerifRegistery } = require("../../index.js");
const getTime = require("../../utils/getTime");

module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "minage-suivant") {

        const queryResult = await VerifRegistery.find({});

        var lookupTime = 24;
        var latest = 0;
        queryResult.forEach(result => {
            var date = result.closureDateUnixtime;

            if (date > latest) {
                latest = date;
            }
        })
        if (latest!=0) {
            var currenttime = await getTime();
            lookupTime = Math.ceil((currenttime.unixtime-latest)/3600);
        } else {
            lookupTime = 24;
        }

        const embed = interaction.message.embeds[0];
        const newembed = EmbedBuilder.from(embed.toJSON()).setDescription(`Vérification par <@${interaction.user.id}>\n\n*Vérification du monde Nether en cours*\n\n\`/co l include:ancients_debris action:-block time:${lookupTime}h\``);
    
        const netherRAS = new ButtonBuilder()
            .setLabel('Finaliser')
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
}