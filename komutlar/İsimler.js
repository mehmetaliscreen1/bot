const Discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let uye = message.guild.member(kullanici);
    let isimler = db.get(`isimler.${uye.id}`) || [];
    isimler = isimler.reverse();
    let listedPenal = isimler.length > 0 ? isimler.map((value, index) => `\`${index + 1}.\` ${value.Isim} (${message.guild.members.cache.has(value.Yetkili) ? message.guild.members.cache.get(value.Yetkili) : value.Yetkili})`).join("\n") : "Kullanıcıya ait isim verisi bulunamadı!";
    client.splitEmbedWithDesc(`<a:helios:775098557744152606> ${uye} kullanıcısına ait isim listesi!;\n\n${listedPenal}`,
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
  name: "isimler",
  description: '',
  usage: ''
  
};
