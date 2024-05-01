const {
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} = require("discord.js");

module.exports = {
    callback: async (client, interaction) => {
        const modal = new ModalBuilder({
            customId: `myModal-${interaction.user.id}`,
            title: "MyModal",
        });

        const pseudoInput = new TextInputBuilder({
            custom_id: "pseudoInput",
            label: "Pseudo du Joueur",
            style: TextInputStyle.Short,
        })
        .setRequired(true)
        .setPlaceholder("Pseudo");

        const firstActionRow = new ActionRowBuilder().addComponents(
            pseudoInput
        );

        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);
    },
    name: "showmodal",
    description: "Shows a modal",
};
