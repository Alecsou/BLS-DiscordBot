const { REST, Routes } = require('discord.js');
const { clientId, testServer} = require('../../config.json');
require("dotenv").config();
const rest = new REST().setToken(process.env.TOKEN);

function unregisterCommand(clientId,guildId,commandId,guildRelated=true) {

    if (guildRelated) {
        rest.delete(Routes.applicationGuildCommand(clientId, guildId, commandId))
        .then(() => console.log('Successfully deleted guild command'))
        .catch(console.error);
    } else {
        rest.delete(Routes.applicationCommand(clientId, commandId))
        .then(() => console.log('Successfully deleted application command'))
        .catch(console.error);
    }
}

unregisterCommand(clientId,testServer,'1219698352447422574')