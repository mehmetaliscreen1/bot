const Discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {

    if(!message.member.roles.cache.has(ayar.sahipRolu) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.iptal);
    let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.react(ayar.iptal);

    db.delete(`not.${uye.id}`);
    message.react(ayar.onay);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["notsil"], 
  permLevel: 0
};

module.exports.help = {
  name: "nottemizle",
  description: '',
  usage: ''
  
};

