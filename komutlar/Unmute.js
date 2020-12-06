const Discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {

if(!message.member.roles.cache.has(ayar.muteciRolleri) && !message.member.roles.cache.has(ayar.sahipRolu) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.iptal);


let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
if(!uye) return message.channel.send(new Discord.MessageEmbed().setFooter(ayar.footer).setColor(ayar.siyah).setDescription(`Üye bilgileri yanlış!`));
let reason = args.splice(1).join(" ") || `Sebep belirtilmedi.`;


uye.roles.add([ayar.muteRolu]);
db.delete(`muteli_${uye.id}`)
message.channel.send(new Discord.MessageEmbed().setFooter(ayar.footer).setTimestamp().setColor(ayar.siyah).setDescription(`${uye} üyesinin mutesi ${message.author} tarafından kaldırıldı.`));
client.channels.cache.get(ayar.muteLogKanali).send(new Discord.MessageEmbed().setFooter(ayar.footer).setTimestamp().setColor(ayar.siyah).setDescription(`${uye} üyesinin mutesi ${message.author} tarafından kaldırıldı.`));

};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [], 
  permLevel: 0
};

module.exports.help = {
  name: "unmute",
  description: '',
  usage: ''
  
};
