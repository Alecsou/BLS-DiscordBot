const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { default: mongoose } = require("mongoose");
const { HDVRegistery } = require("../../index.js");

module.exports = async (client, interaction) => {
    if (!interaction.isModalSubmit() || interaction.customId!==`myModal-${interaction.user.id}`) return;

    const pseudo = interaction.fields.getTextInputValue("pseudoInput");

    recidives = 0;

    async function registerDB() {

        const newInput = new HDVRegistery({pseudo:`${pseudo}`});

        await newInput.save();

        const queryResult = await HDVRegistery.find({ pseudo: `${pseudo}`});

        console.log(queryResult);

        recidives = queryResult.length;
    }

    await registerDB();

    color = ""

    switch (recidives) {
        case 1:
            color="#118811";
            break;
        case 2:
            color="#FFFF00";
            break;
        case 3:
            color="#FF0000";
            break;
        default:
            color="#900000";
            break;
    }

    const embed = new EmbedBuilder()
    .setTitle(`Mail envoyé à ${pseudo}`)
    .setDescription(`Membre du staff assigné : <@${interaction.user.id}>`)
    .addFields({ name: 'Nombre de récidives', value: "**"+recidives.toString()+"**"})
    .setColor(color)
    .setFooter({ text: "Veuillez déposer le screen de l'item dans l'HDV dans le thread corrrespondant !"});

    const mailsend = new ButtonBuilder()
			.setCustomId('mail-declare')
			.setLabel('✉️ Déclarer un nouveau mail')
			.setStyle(ButtonStyle.Primary)
            .setCustomId('HDVbutton');
    
    const row = new ActionRowBuilder()
			.addComponents(mailsend);

    const message = await interaction.channel.send({
        embeds:[embed],
        components:[row],
    });

    const thread = await message.startThread({
        name:"Screen de l'HDV",
    })

    // Delete the modal
    await interaction.update({
        components: []
      });
}