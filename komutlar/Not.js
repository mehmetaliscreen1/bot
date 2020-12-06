const Discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {


    if(!message.member.roles.cache.has(ayar.sahipRolu) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.iptal);
    let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let reason = args.splice(1).join(" ");
    if(!reason) return message.react(ayar.iptal);
    if(!uye) return message.react(ayar.iptal);


    db.push(`not.${uye.id}`, {
        Yetkili: message.author.id,
        Tip: "NOT",
        Not: reason,
        Zaman: Date.now()
      });
      message.react(ayar.onay);
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [], 
  permLevel: 0
};

module.exports.help = {
  name: "not",
  description: '',
  usage: ''
  
};
