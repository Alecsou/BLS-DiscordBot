const { adminServer,playerServer,builderServer } = require("../../config.json");

module.exports = (interaction,expectedServer) => {
    if (interaction.guild) {
        const guildId = interaction.guild.id;
        if (guildId == adminServer && expectedServer.includes("admin")) {return true}
        if (guildId == playerServer && expectedServer.includes("player")) {return true}
        if (guildId == builderServer && expectedServer.includes("builder")) {return true}
    }
    return false;
}