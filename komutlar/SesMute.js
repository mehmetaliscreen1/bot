const Discord = require("discord.js");
const ms = require('ms');
const db = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {

    if(!message.member.roles.cache.has(ayar.muteciRolleri) && !message.member.roles.cache.has(ayar.sahipRolu) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.iptal);


    let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(new Discord.MessageEmbed().setFooter(ayar.footer).setColor(ayar.siyah).setDescription(`Üye bilgileri yanlış!`));
    let sure = args[1];
    if(!sure) return message.react(ayar.iptal);
    let reason = args.splice(2).join(" ") || `Sebep belirtilmedi.`;
    if (message.member.roles.highest.position <= uye.roles.highest.position) return;

    if(uye.voice.channel) uye.voice.setMute(true).catch();
    if(!uye.voice.channel) return message.channel.send(new Discord.MessageEmbed().setFooter(ayar.footer).setTimestamp().setDescription(`${uye} adlı kullanıcıya ses mute cezası uygulanamadı. ( **Kullanıcı sesli kanalda değil.** )`));

    db.set(`sesmuteli_${uye.id}`, "sesmute")
    db.push(`ceza.${uye.id}`, {
        Yetkili: message.author.id,
        Tip: "SESMUTE",
        Sebep: reason,
        Zaman: Date.now()
      });

    client.channels.cache.get(ayar.muteLogKanali).send(new Discord.MessageEmbed().setColor(ayar.siyah).setDescription(`
${uye} (\`${uye.id}\`) adlı kullanıcı sesli kanallarda susturuldu.


• Süre: \`${sure.replace(/s/, " Saniye", /m/, " Dakika", /h/, " Saat")}\`
• Sebep: \`${reason}\`
    `))
    client.channels.cache.get(ayar.punitiveKanali).send(new Discord.MessageEmbed().setColor(ayar.siyah).setDescription(`
${uye} (\`${uye.id}\`) adlı kullanıcı sesli kanallarda susturuldu.
    
• Süre: \`${sure.replace(/s/, " Saniye", /m/, " Dakika", /h/, " Saat")}\`
• Sebep: \`${reason}\`
        `))
     message.channel.send(`${client.emojis.cache.get("778704328902443018")} ${uye} üyesi ${sure.replace(/s/, " saniye", /m/, " dakika", /h/, " saat")} boyunca ses kanallarında susturuldu!`)
      setTimeout(async () =>{
        db.delete(`sesmuteli_${uye.id}`)
        uye.voice.setMute(false);
    }, ms(sure));
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ses-mute","vmute","voicemute"], 
  permLevel: 0
};

module.exports.help = {
  name: "sesmute",
  description: '',
  usage: ''
  
};

