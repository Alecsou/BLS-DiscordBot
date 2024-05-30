const {
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRow,
} = require("discord.js");

module.exports = {
    callback: async (client, interaction) => {
        const modal = new ModalBuilder({
            customId: `nether-a-surveiller-${interaction.user.id}`,
            title: "Joueurs à surveiller (Nether)",
        });

        const pseudoInput = new TextInputBuilder({
            custom_id: "pseudoInput",
            label: "Pseudo du/des joueurs",
            style: TextInputStyle.Short,
        })
        .setRequired(true)
        .setPlaceholder("Pseudo");

        const commentInput = new TextInputBuilder({
            custom_id: "commentInput",
            label: "Commentaire supplémentaire",
            style: TextInputStyle.Paragraph,
        })
        .setRequired(false)
        .setPlaceholder("Commentaire supplémentaire à ajouter");

        const firstActionRow = new ActionRowBuilder().addComponents(
            pseudoInput,
        );

        const secondActionRow = new ActionRowBuilder().addComponents(
            commentInput,
        )

        modal.addComponents(firstActionRow).addComponents(secondActionRow);

        await interaction.showModal(modal);
    },
    name: "showNetherASurveillerModal",
    description: "Shows a modal",
};
