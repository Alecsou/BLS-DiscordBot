require("dotenv").config();
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
    channelName:String,
    serverName:Number,
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
} else {
  console.log("PROD ENVIRONNEMENT")
  client.login(process.env.TOKEN);
}

