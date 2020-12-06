const Discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let uye = message.guild.member(kullanici);
    let sicil = db.get(`ceza.${uye.id}`) || [];
    sicil = sicil.reverse();
    let listedPenal = sicil.length > 0 ? sicil.map((value, index) => `\`${index + 1}.\` **[${value.Tip}]** ${new Date(value.Zaman).toTurkishFormatDate()} tarihinde **${value.Sebep}** nedeniyle ${message.guild.members.cache.has(value.Yetkili) ? message.guild.members.cache.get(value.Yetkili) : value.Yetkili} tarafından cezalandırıldı.`).join("\n") : "Temiz!";
    client.splitEmbedWithDesc(`${uye} adlı kullancınının ceza listesi aşağıda gösterilmiştir. Yetkili alım ve tartışma durumunda sicil gözden geçirilecektir.\n\n\n${listedPenal}`,
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
  name: "sicil",
  description: '',
  usage: ''
  
};

