const { Query } = require("mongoose");
const { OPRegistery } = require("../../index.js");
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const getTime = require("../../utils/getTime");

module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "OPDispatchButton") {
        var jsontime = await getTime();
        var currentdate = jsontime.datetime.substring(0,19);
        var currentdateunix = jsontime.unixtime;

        const embed = interaction.message.embeds[0];

        const result = embed.fields.find((ele) => ele.value==`<@${interaction.user.id}>`)

        if (result !=null) {
            try {
                await interaction.update({
                });
            } catch {}
            return;
        }

        const newInput = new OPRegistery({
            entryDateUnixtime:currentdateunix,
            entryDatetime:currentdate,
            staffMember:`${interaction.user.id}`
        });

        await newInput.save();

        const newembed = EmbedBuilder.from(embed.toJSON())
                                     .addFields({value:`<@${interaction.user.id}>`, name:`\`${currentdate}\``});
    
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
        
        await interaction.message.edit({ embeds: [newembed], components:[row] });

        try {
            await interaction.update({
            });
        } catch {}
    }

    if (interaction.customId === "OPUndispatchButton") {
        // const queryResults = await OPRegistery.find({staffMember:`${interaction.user.id}`})
        // const queryResult = queryResults[0];

        const documentToDelete = await OPRegistery.findOneAndDelete({staffMember:`${interaction.user.id}`});

        const embed = interaction.message.embeds[0].toJSON();

        newfields = []

        for (const field of embed.fields) {
            if ((field.value)!=`<@${documentToDelete.staffMember}>`) {
                newfields += field;
            }
        }

        embed.fields = newfields;

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

        var jsontime = await getTime();
        var currentdate = jsontime.datetime.substring(0,19);
        var currentdateunix = jsontime.unixtime;
        

        await interaction.message.edit({ content: `## Staff : <@${interaction.user.id}>\n### Début d'OP : ${documentToDelete.entryDatetime}\n### Fin d'OP : ${currentdate}`, embeds:[], components:[] });
        client.channels.fetch(interaction.channelId).then(
            channel => channel.send({ embeds: [EmbedBuilder.from(embed)], components:[row] })
        )

        try {
            await interaction.update({
            });
        } catch {}
    }
}