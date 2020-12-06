const Discord = require("discord.js");
const db = require("quick.db");            
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
  
  let tag = ayar.tag
  
  const embed = new Discord.MessageEmbed().setTimestamp().setColor(ayar.siyah).setFooter(ayar.footer);
  message.channel.send(embed.setDescription(`
<a:helios:772754394843185152> Sunucumuzda toplam ${client.emojiSayi(`${message.guild.memberCount}`)} adet üye bulunmaktadır.
<a:helios:772754394843185152> Sunucumuzda toplam ${client.emojiSayi(`${message.guild.members.cache.filter(u => u.presence.status != "offline").size}`)} adet aktif üye bulunmaktadır.
<a:helios:772754394843185152> Sunucumuzda toplam ${client.emojiSayi(`${message.guild.members.cache.filter(m => m.user.username.includes(tag)).size}`)} adet taglı üye bulunmaktadır.
<a:helios:772754394843185152> Sunucumuzda toplam ${client.emojiSayi(`${message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b)}`)} adet sesli üye bulunmaktadır.
`));


};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["Say", "SAY", "sya"], 
  permLevel: 0
};

module.exports.help = {
  name: "say",
  description: '',
  usage: ''
  
};

