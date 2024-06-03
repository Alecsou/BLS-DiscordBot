const showModal = require("../../commands/verif/showMinageASurveillerModal");
const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { VerifRegistery } = require("../../index.js");

module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "minage-suivant") {

        const queryResult = await VerifRegistery.find({});

        var lookupTime = 24;
        var earliest = 0;
        queryResult.forEach(result => {
            spl = result.closureDate.split(/[:@/]/);
            date = new Date();
            date.setDate(spl[0]);
            date.setMonth(spl[1]);
            date.setFullYear(spl[2]);
            date.setHours(Number(spl[3])+2); //fuseau horaire
            date.setMinutes(spl[4]);
            date.setSeconds(spl[5]);
            if (date > earliest) {
                earliest = date;
            }
        })
        if (earliest!=0) {
            twohours = new Date(0).setHours(2);
            lookupTime = new Date(Number(Date.now()+twohours)-Number(earliest)).getHours()+1+(new Date(Number(Date.now()+twohours)-Number(earliest)).getDate()-1)*24;
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