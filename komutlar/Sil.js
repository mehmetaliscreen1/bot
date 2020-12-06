const Discord = require("discord.js");
const db = require("quick.db");            
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
  
  let embed = new Discord.MessageEmbed().setFooter(ayar.footer).setColor(ayar.gold).setTimestamp();
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
  if (message.member.roles.cache.has(ayar.komutCezasi)) return;
  await message.delete().catch();
  message.channel.bulkDelete(Number(args[0])).then(msjlar => message.channel.send(embed.setDescription(`Başarıyla **${msjlar.size}** adet mesaj silindi!`)).then(x => x.delete({timeout: 5000}))).catch()


};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["Sil", "SİL", "sli", "temizle", "Temizle"], 
  permLevel: 0
};

module.exports.help = {
  name: "sil",
  description: '',
  usage: ''
  
};

