require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const mongoose = require('mongoose');
const eventHandler = require("./handlers/eventHandler");

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

async function main() {

  const biteSchema = new mongoose.Schema({
    name: String
  });
  
  const Bite = mongoose.model('Bite', biteSchema);
  
  const silence = new Bite({name:"grossebeuteu"});
  
  await silence.save();
  
  const bites = await Bite.find();
  console.log(bites);
  
  await Bite.find({ name: /^grossebeu/ });
}

const HDVregisterSchema = new mongoose.Schema({
    pseudo: String
});

const HDVRegistery = mongoose.model('HDVRegistery',HDVregisterSchema);

module.exports={
  HDVRegistery:HDVRegistery
}

client.login(process.env.TOKEN);
