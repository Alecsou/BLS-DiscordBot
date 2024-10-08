require("dotenv").config();
fs = require("fs");
const { Client, IntentsBitField } = require("discord.js");
const mongoose = require("mongoose");
const eventHandler = require("./handlers/eventHandler");
const getTime = require("./utils/getTime");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");

        eventHandler(client);
    } catch (error) {
        console.log(`Error while connecting to DB : ${error}`);
    }
})();

const HDVregisterSchema = new mongoose.Schema({
    pseudo: String,
});

const HDVRegistery = mongoose.model(
    "HDVRegistery",
    HDVregisterSchema
);

const ChannelAutoReacRegisterySchema = new mongoose.Schema({
    channelID: Number,
    serverID: Number,
    reactions: [String],
});

const ChannelAutoReacRegistery = mongoose.model(
    "ChannelAutoReacRegistery",
    ChannelAutoReacRegisterySchema
);

const VerifRegisterySchema = new mongoose.Schema({
    closureDateUnixtime: String,
    verifier: String,
});

const VerifRegistery = mongoose.model(
    "VerifRegistery",
    VerifRegisterySchema
);

const OPRegisterySchema = new mongoose.Schema({
    entryDateUnixtime: String,
    entryDatetime: String,
    staffMember: String,
});

const OPRegistery = mongoose.model(
    "OPRegistery",
    OPRegisterySchema
);

module.exports = {
    HDVRegistery: HDVRegistery,
    ChannelAutoReacRegistery: ChannelAutoReacRegistery,
    VerifRegistery: VerifRegistery,
    OPRegistery: OPRegistery,
};

if (process.argv[2] && process.argv[2] === "-DEV") {
    console.log("DEV ENVIRONNEMENT");
    client.login(process.env.DEVTOKEN);
    var configGlobalName = "config.json";
    var devConfigName = "./configs/devconfig.json";
    var configGlobal = JSON.parse(fs.readFileSync(configGlobalName).toString());
    var devConfig = JSON.parse(fs.readFileSync(devConfigName).toString());
    configGlobal.adminServer = devConfig.adminServer;
    configGlobal.playerServer = devConfig.playerServer;
    configGlobal.builderServer = devConfig.builderServer;
    fs.writeFileSync(configGlobalName, JSON.stringify(configGlobal));
} else {
    console.log("PROD ENVIRONNEMENT");
    client.login(process.env.TOKEN);
    var configGlobalName = "config.json";
    var prodConfigName = "./configs/prodconfig.json";
    var configGlobal = JSON.parse(fs.readFileSync(configGlobalName).toString());
    var prodConfig = JSON.parse(fs.readFileSync(prodConfigName).toString());
    configGlobal.adminServer = prodConfig.adminServer;
    configGlobal.playerServer = prodConfig.playerServer;
    configGlobal.builderServer = prodConfig.builderServer;
    fs.writeFileSync(configGlobalName, JSON.stringify(configGlobal));
}


// (async () => {
// await VerifRegistery.deleteOne({});
// await VerifRegistery.deleteOne({});
// await VerifRegistery.deleteOne({});
// const queryResult = await VerifRegistery.find({});
// console.log(queryResult.length); })()


(async () => {
await console.log(getTime()) })()