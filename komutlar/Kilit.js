const { MessageEmbed } = require("discord.js");
const ayar = require('../ayarlar.json');

module.exports.run = async (client, message, args) => {
  
  let embed = new MessageEmbed().setFooter(ayar.footer).setColor(ayar.siyah).setTimestamp();
  if(!message.member.roles.cache.has(ayar.sahipRolu) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.iptal);
  let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
  let permObjesi = {};
  let everPermleri = message.channel.permissionOverwrites.get(everyone.id);
  everPermleri.allow.toArray().forEach(p => {
    permObjesi[p] = true;
  });
  everPermleri.deny.toArray().forEach(p => {
    permObjesi[p] = false;
  });
  if(message.channel.permissionsFor(everyone).has('SEND_MESSAGES')) {
    permObjesi["SEND_MESSAGES"] = false;
    message.channel.createOverwrite(everyone, permObjesi);
    message.channel.send(embed.setDescription("Kanal kilitlendi!"))
  } else {
    permObjesi["SEND_MESSAGES"] = null;
    message.channel.createOverwrite(everyone, permObjesi);
    message.channel.send(embed.setDescription("Kanal kilidi açıldı!"));
  };
};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [], 
  permLevel: 0
};

module.exports.help = {
  name: "kilit",
  description: '',
  usage: ''
  
};

