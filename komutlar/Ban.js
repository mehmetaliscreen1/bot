const Discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.has(ayar.sahipRolu) && !message.member.hasPermission("ADMINISTRATOR")) return;
    let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(new Discord.MessageEmbed().setFooter(ayar.footer).setTimestamp().setColor(ayar.siyah).setDescription(`Üye bilgileri yanlış!`) && message.react(ayar.iptal));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return;
    let reason = args.splice(1).join(" ") || `Sebep belirtilmedi.`;


    uye.ban({reason: reason}).then(x => message.react(client.emojiler.onay)).catch();
    db.push(`ceza.${uye.id}`, {
        Yetkili: message.author.id,
        Tip: "BAN",
        Sebep: reason,
        Zaman: Date.now()
      });
      
    client.channels.cache.get(ayar.banLogKanali).send(`${uye} adlı kullanıcı ${message.author} tarafından \`${reason}\` sebebiyle yasaklandı.`);
    client.channels.cache.get(ayar.punitiveKanali).send(`${uye} adlı kullanıcı ${message.author} tarafından \`${reason}\` sebebiyle yasaklandı.`);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yasakla", "ban", "yak", "yargı"], 
  permLevel: 0
};

module.exports.help = {
  name: "ban",
  description: '',
  usage: ''
  
};

