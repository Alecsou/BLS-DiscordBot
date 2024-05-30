const showModal = require("../../commands/verif/showMinageASurveillerModal");

module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "minage-a-surveiller") {
        showModal.callback(client,interaction);
        console.log("Minage a surveiller");
    }
}