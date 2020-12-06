const Discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {

if(!message.member.roles.cache.has(ayar.muteciRolleri) && !message.member.roles.cache.has(ayar.sahipRolu) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.iptal);


let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
if(!uye) return message.channel.send(new Discord.MessageEmbed().setFooter(ayar.footer).setColor(ayar.siyah).setDescription(`Üye bilgileri yanlış!`));
let reason = args.splice(1).join(" ") || `Sebep belirtilmedi.`;
if (message.member.roles.highest.position <= uye.roles.highest.position) return;

uye.roles.add([ayar.muteRolu]);
db.set(`muteli_${uye.id}`, "mute")
message.channel.send(new Discord.MessageEmbed().setFooter(ayar.footer).setTimestamp().setColor(ayar.siyah).setDescription(`${uye} üyesi ${message.author} tarafından mutelendi.`));
client.channels.cache.get(ayar.muteLogKanali).send(new Discord.MessageEmbed().setFooter(ayar.footer).setTimestamp().setColor(ayar.siyah).setDescription(`${uye} üyesi ${message.author} tarafından \`${reason}\` sebebiyle mutelendi.`));
client.channels.cache.get(ayar.punitiveKanali).send(new Discord.MessageEmbed().setFooter(ayar.footer).setTimestamp().setColor(ayar.siyah).setDescription(`${uye} üyesi ${message.author} tarafından \`${reason}\` sebebiyle mutelendi.`));
db.push(`ceza.${uye.id}`, {
    Yetkili: message.author.id,
    Tip: "MUTE",
    Sebep: reason,
    Zaman: Date.now()
  });

};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sustur"], 
  permLevel: 0
};

module.exports.help = {
  name: "mute",
  description: '',
  usage: ''
  
};
