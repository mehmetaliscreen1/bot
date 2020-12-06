const Discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {

    let embed = new Discord.MessageEmbed().setFooter(ayar.footer).setColor(ayar.siyah).setTimestamp();
    if(!message.member.roles.cache.has(ayar.teyitciRolu) && !message.member.roles.cache.has(ayar.sahipRolu) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.iptal);
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(embed.setDescription("Üye bilgileri yanlış!")).then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return;
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let yazilacakIsim;
      let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
      let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
      if(!isim || !yaş) return message.channel.send(embed.setDescription("Üye/İsim bilgileri yanlış!")).then(x => x.delete({timeout: 5000}));
      yazilacakIsim = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim} | ${yaş}`;
    uye.setNickname(`${yazilacakIsim}`).catch();
      db.push(`isimler.${uye.id}`, {
      Yetkili: message.author.id,
      Tip: "ISIM",
      Isim: yazilacakIsim,
      Zaman: Date.now()
    });
    message.channel.send(new Discord.MessageEmbed().setColor(ayar.random).setFooter(ayar.footer).setTimestamp().setDescription(`
  Kullanıcının ismi \`${yazilacakIsim}\` olarak ayarlandı.
    `)).catch();
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["name","nick"], 
  permLevel: 0
};

module.exports.help = {
  name: "isim",
  description: '',
  usage: ''
  
};

