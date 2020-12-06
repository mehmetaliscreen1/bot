const Discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.has(ayar.teyitciRolu) && !message.member.roles.cache.has(ayar.sahipRolu) && !message.member.hasPermission("ADMINISTRATOR")) return;
    let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let uye = message.guild.member(kullanici);
    let notlar = db.get(`not.${uye.id}`) || [];
    notlar = notlar.reverse();
    let listedPenal = notlar.length > 0 ? notlar.map((value, index) => `\`${index + 1}.\` ${new Date(value.Zaman).toTurkishFormatDate()} tarihinde **${value.Not}** notu ile ${message.guild.members.cache.has(value.Yetkili) ? message.guild.members.cache.get(value.Yetkili) : value.Yetkili} tarafından not listesine eklendi.`).join("\n") : "Not bulunamadı!";
    client.splitEmbedWithDesc(`${uye} kullanıcısına ait listelenmiş notlar:\n\n\n${listedPenal}`,
                             {name: "", icon: false},
                             {name: ayar.footer, icon: false},
                             {setColor: [ayar.random], setTimestamp: [Date.now()]}).then(list => {
      list.forEach(item => {
        message.channel.send(item);
      });
    });
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [], 
  permLevel: 0
};

module.exports.help = {
  name: "notlar",
  description: '',
  usage: ''
  
};

