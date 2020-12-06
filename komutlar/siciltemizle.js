const Discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {

let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
if(!uye) return;
if(!message.member.roles.cache.has(ayar.jailciRolleri) && !message.member.roles.cache.has(ayar.sahipRolu) && !message.member.hasPermission("ADMINISTRATOR")) return;

    db.delete(`ceza.${uye.id}`)
    message.react(ayar.onay);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [], 
  permLevel: 0
};

module.exports.help = {
  name: "siciltemizle",
  description: '',
  usage: ''
  
};

