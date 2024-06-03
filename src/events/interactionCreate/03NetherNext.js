const initMessage = require("../../commands/verif/initVerifChannel.js")
const { EmbedBuilder } = require("discord.js");
const { VerifRegistery } = require("../../index.js");

module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "nether-suivant") {
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
                + currentdate.getMonth()  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

        const embed = interaction.message.embeds[0];
        const newembed = EmbedBuilder.from(embed.toJSON()).addFields({name:"Fin de la vérification :white_check_mark:", value:`Vérification cloturée le ${datetime} `})
                                                          .setTitle("**VERIFICATION TERMINEE**")
                                                          .setDescription(`Vérification par <@${interaction.user.id}>`);
    
        await interaction.message.edit({ embeds: [newembed], components:[] });
        // Delete the modal
        await interaction.update({
          });

        //REGISTER THE DATE

        const newInput = new VerifRegistery({closureDate:datetime,verifier:`${interaction.user.id}`});

        await newInput.save();

        const queryResult = await VerifRegistery.find({});
        if (queryResult.length>3) {
          var oldestQueryTime = "";
          twohours = new Date(0).setHours(3); //???????
          var oldest = new Date(Number(Date.now()) + Number(twohours));
          queryResult.forEach(result => {
              spl = result.closureDate.split(/[:@/]/);
              date = new Date();
              date.setDate(spl[0]);
              date.setMonth(spl[1]);
              date.setFullYear(spl[2]);
              date.setHours(Number(spl[3])+2); //fuseau horaire
              date.setMinutes(spl[4]);
              date.setSeconds(spl[5]);
              if (date < oldest) {
                  oldest = date;
                  oldestQueryTime = result.closureDate;
              }
          });
          const documentToDelete = await VerifRegistery.findOneAndDelete({closureDate:oldestQueryTime});
          if (documentToDelete!=null){
            console.log('Successfully deleted oldest query');
            console.log(oldestQueryTime);
          }
        }

        client.channels.fetch(interaction.channelId).then(channel => initMessage.callback(client,channel));
    }
}