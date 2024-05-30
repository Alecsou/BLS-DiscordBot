const createVerif = require("../../commands/verif/createVerif");

module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "VerifButton") {
        createVerif.callback(client,interaction);
        console.log('Bouton Verif cliqué!')
    }
}