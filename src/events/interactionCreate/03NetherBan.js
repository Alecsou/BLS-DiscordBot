const showModal = require("../../commands/verif/showNetherBanModal");

module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "nether-ban") {
        showModal.callback(client,interaction);
        console.log("Nether ban");
    }
}