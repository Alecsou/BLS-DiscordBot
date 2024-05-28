const { adminServer,playerServer } = require("../../config.json");

module.exports = (interaction,expectedServer) => {
    if (interaction.guild) {
        const guildId = interaction.guild.id;
        if (guildId == adminServer && expectedServer.includes("admin")) {console.log("found adminserver");return true}
        if (guildId == playerServer && expectedServer.includes("player")) {console.log("found playerserver");return true}
    }
    return false;
}