const Discord = require("discord.js");
const db = require("quick.db");            
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {

message.channel.send(ayar.tag);
message.react("778977270513139732");
};


module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["Tag", "TAG", "tga"], 
  permLevel: 0
};

module.exports.help = {
  name: "tag",
  description: '',
  usage: ''
  
};

