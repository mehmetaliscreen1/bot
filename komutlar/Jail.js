const Discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.has(ayar.jailciRolleri) && !message.member.roles.cache.has(ayar.sahipRolu) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.iptal);
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.splice(1).join(" ") || `Sebep Belirtilmedi.`;
    if(!uye) return message.channel.send(new Discord.MessageEmbed().setFooter(ayar.footer).setTimestamp().setColor(ayar.siyah).setDescription(`Üye bilgileri yanlış!`) && message.react(ayar.iptal));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return;

    uye.roles.set([ayar.jailRolu]);
    db.set(`jailli_${uye.id}`, "jail")
    message.channel.send(new Discord.MessageEmbed().setFooter(ayar.footer).setTimestamp().setColor(ayar.siyah).setDescription(`${uye} üyesi ${message.author} tarafından cezalıya atıldı.`));
    client.channels.cache.get(ayar.jailLogKanali).send(new Discord.MessageEmbed().setFooter(ayar.footer).setTimestamp().setColor(ayar.siyah).setDescription(`${uye} üyesi ${message.author} tarafından cezalıya atıldı.`));
    client.channels.cache.get(ayar.punitiveKanali).send(new Discord.MessageEmbed().setFooter(ayar.footer).setTimestamp().setColor(ayar.siyah).setDescription(`${uye} üyesi ${message.author} tarafından cezalıya atıldı.`));
    
    db.push(`ceza.${uye.id}`, {
        Yetkili: message.author.id,
        Tip: "JAIL",
        Sebep: reason,
        Zaman: Date.now()
      });

};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["cezalı"], 
  permLevel: 0
};

module.exports.help = {
  name: "jail",
  description: '',
  usage: ''
  
};