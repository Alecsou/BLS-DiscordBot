const showModal = require("../../commands/verif/showMinageBanModal");

module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "minage-ban") {
        showModal.callback(client,interaction);
        console.log("Minage ban");
    }
}