const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require("discord.js");

module.exports = {
    deleted: true,
    name: "ban",
    description: "bans a member et cheh",
    //devOnly: Boolean,
    //testOnly: Boolean,
    options: [
        {
            name: "target-user",
            description: "The user to ban",
            required: "true",
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: "reason",
            description: "The reason",
            required: "false",
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],

    callback: (client, interaction) => {
        interaction.reply(`ban..`);
    },
};
