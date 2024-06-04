const initMessage = require("../../commands/verif/initVerifChannel.js")
const { EmbedBuilder } = require("discord.js");
const { VerifRegistery } = require("../../index.js");
const getTime = require("../../utils/getTime");

module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "nether-suivant") {
        var jsontime = await getTime();
        var currentdate = jsontime.datetime.substring(0,19);
        var currentdateunix = jsontime.unixtime; 

        const embed = interaction.message.embeds[0];
        const newembed = EmbedBuilder.from(embed.toJSON()).addFields({name:"Fin de la vérification :white_check_mark:", value:`Vérification cloturée le ${currentdate} `})
                                                          .setTitle("**VERIFICATION TERMINEE**")
                                                          .setDescription(`Vérification par <@${interaction.user.id}>`);
    
        await interaction.message.edit({ embeds: [newembed], components:[] });
        // Delete the modal
        await interaction.update({
          });

        //REGISTER THE DATE

        const newInput = new VerifRegistery({closureDateUnixtime:currentdateunix,verifier:`${interaction.user.id}`});

        await newInput.save();

        const queryResult = await VerifRegistery.find({});
        if (queryResult.length>3) {
          var currenttime = await getTime();
          var oldest = currenttime.unixtime;
          queryResult.forEach(result => {
            var date = result.closureDateUnixtime; 
              if (date < oldest) {
                  oldest = date;
              }
          });
          const documentToDelete = await VerifRegistery.findOneAndDelete({closureDateUnixtime:oldest});
          if (documentToDelete!=null){
            console.log('Successfully deleted oldest query');
            console.log(oldest);
          }
        }

        client.channels.fetch(interaction.channelId).then(channel => initMessage.callback(client,channel));
    }
}