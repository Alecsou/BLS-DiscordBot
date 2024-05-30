const showModal = require("../../commands/verif/showNetherASurveillerModal");

module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "nether-a-surveiller") {
        showModal.callback(client,interaction);
        console.log("Nether a surveiller");
    }
}