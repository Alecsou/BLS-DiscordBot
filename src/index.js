require("dotenv").config();
fs = require("fs");
const { Client, IntentsBitField } = require("discord.js");
const mongoose = require('mongoose');
const eventHandler = require("./handlers/eventHandler");
const { Int32 } = require("mongodb");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

(async () => {
  try  {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    eventHandler(client);
  } catch (error) {
    console.log(`Error while connecting to DB : ${error}`);
  }
}) ()

const HDVregisterSchema = new mongoose.Schema({
    pseudo: String
});

const HDVRegistery = mongoose.model('HDVRegistery',HDVregisterSchema);

const ChannelAutoReacRegisterySchema = new mongoose.Schema({
    channelID:Number,
    serverID:Number,
    reactions:[String]
})

const ChannelAutoReacRegistery = mongoose.model('ChannelAutoReacRegistery',ChannelAutoReacRegisterySchema);

module.exports={
  HDVRegistery:HDVRegistery,
  ChannelAutoReacRegistery:ChannelAutoReacRegistery
}

if (process.argv[2] && process.argv[2] === '-DEV') {
  console.log("DEV ENVIRONNEMENT")
  client.login(process.env.DEVTOKEN);
  var configGlobalName = "config.json";
  var devConfigName = "./configs/devconfig.json";
  var configGlobal = JSON.parse(fs.readFileSync(configGlobalName).toString());
  var devConfig = JSON.parse(fs.readFileSync(devConfigName).toString());
  configGlobal.adminServer = devConfig.adminServer;
  configGlobal.playerServer = devConfig.playerServer;
  fs.writeFileSync(configGlobalName,JSON.stringify(configGlobal));
} else {
  console.log("PROD ENVIRONNEMENT")
  client.login(process.env.TOKEN);
  var configGlobalName = "config.json";
  var prodConfigName = "./configs/prodconfig.json";
  var configGlobal = JSON.parse(fs.readFileSync(configGlobalName).toString());
  var prodConfig = JSON.parse(fs.readFileSync(prodConfigName).toString());
  configGlobal.adminServer = prodConfig.adminServer;
  configGlobal.playerServer = prodConfig.playerServer;
  fs.writeFileSync(configGlobalName,JSON.stringify(configGlobal));
}

