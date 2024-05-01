const showmodal = require("../../commands/misc/showHDVmodal");

module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "HDVbutton") {
        showmodal.callback(client,interaction);
        console.log('Bouton HDV cliqué!')
    }
}