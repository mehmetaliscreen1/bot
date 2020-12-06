const Discord = require("discord.js");
const db = require("quick.db");            
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {


    let embed = new Discord.MessageEmbed().setFooter(ayar.footer).setColor(ayar.siyah).setTimestamp();
    if(!message.member.roles.cache.has(ayar.teyitciRolu) && !message.member.roles.cache.has(ayar.sahipRolu) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.iptal);
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(embed.setDescription("Üye bilgileri yanlış!")).then(x => x.delete({timeout: 5000}));

   uye.roles.set([ayar.kizRolleri1, ayar.kizRolleri2, ayar.kizRolleri3]);
   db.add(`kizTeyit.${message.author.id}`, 1);
   message.channel.send(new Discord.MessageEmbed().setColor(ayar.siyah).setFooter(ayar.footer).setDescription(`${uye} adlı kullanıcıya ${message.guild.roles.cache.get(ayar.kizRolleri1)} adlı rol verildi.`));

};


module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["k", "woman", "bayan", "K", "Kız", "KIZ", "kadın", "Kadın", "BAYAN", "Bayan"], 
  permLevel: 0
};

module.exports.help = {
  name: "kız",
  description: '',
  usage: ''
  
};

