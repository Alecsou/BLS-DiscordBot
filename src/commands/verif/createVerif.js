const {
    ActionRowBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const { VerifRegistery } = require("../../index.js");

module.exports = {
    callback: async (client, interaction) => {
        // Calculer le temps de vérification à rentrer
        // Afficher 3 boutons :
        //  > RAS Minage
        //  > Ban Minage
        //      > Ouvrir un embed pour donner le/les pseudos et un commentaire
        //  > A surveiller Minage
        //      > Ouvrir un embed pour donner le/les pseudos et un commentaire
        // Afficher 3 boutons : 
        //  > RAS Nether
        //  > Ban Nether
        //      > Ouvrir un embed pour donner le/les pseudos et un commentaire
        //  > A surveiller Nether
        //      > Ouvrir un embed pour donner le/les pseudos et un commentaire
        // Logguer la vérif avec date de complétion

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
        const embed = new EmbedBuilder()
            .setColor(0x000000)
            .setTitle(`**VERIFICATION EN COURS**`)
            .setDescription(`Vérification par <@${interaction.user.id}>\n\n*Vérification du monde Minage en cours*\n\n\`/co l include:deepslate_diamond_ore action:-block time:${lookupTime}h\``)

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

        await interaction.message.edit({ embeds: [embed], components:[row] });
        await interaction.update({});
    },
    name: "createverif",
    description: "Creates a verification",
};
