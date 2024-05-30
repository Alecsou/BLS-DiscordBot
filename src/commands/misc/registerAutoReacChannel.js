const { ApplicationCommandOptionType } = require("discord.js");
const { ChannelAutoReacRegistery } = require("../../index.js");

module.exports = {
    name: "autoreacconfig",
    description:
        "Enregistre le channel courant comme recepteur de réaction automatique",
    options: [
        {
            name: "reaction1",
            description: "Une reaction a placer a chaque message",
            required: "true",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "reaction2",
            description: "Une reaction a placer a chaque message",
            required: "false",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "reaction3",
            description: "Une reaction a placer a chaque message",
            required: "false",
            type: ApplicationCommandOptionType.String,
        },
    ],
    deleted: false,
    playerServer: true,
    adminServer: true,

    callback: async (client, interaction) => {
        var reactions = [];
        reactions.push(interaction.options.get("reaction1").value);
        if (interaction.options.data.length >= 2) {
            reactions.push(interaction.options.get("reaction2").value);
        }
        if (interaction.options.data.length >= 3) {
            reactions.push(interaction.options.get("reaction3").value);
        }
        const queryResult = await ChannelAutoReacRegistery.find({
            channelID: interaction.channelId,
            serverID: interaction.guildId,
        });

        if (queryResult.length>0) {
            interaction.reply({
                content: `Ce channel est déjà configuré avec les réactions suivantes : ${queryResult[0].reactions}`,
                ephemeral: true,
            });
            return;
        }

        const newInput = new ChannelAutoReacRegistery({
            channelID: interaction.channelId,
            serverID: interaction.guildId,
            reactions: reactions,
        });
        await newInput.save();

        var string = "";
        for (var reac of reactions) {
            string += reac + " ";
        }
        interaction.reply({
            content: `Channel enregistré pour l'auto-réaction avec les réactions suivantes :  ${string}`,
            ephemeral: true,
        });
    },
};
