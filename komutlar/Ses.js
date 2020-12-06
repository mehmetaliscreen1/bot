const Discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
  let uye =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  if (!uye) return message.react(ayar.iptal);
  if (!uye.voice.channel)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("010000")
        .setFooter(ayar.footer)
        .setDescription(
          `Bu kullanıcı (\`${uye.displayName}\`) şu anda bir ses kanalında değil.`
        )
    );
  let selfMt = uye.voice.selfMute
    ? "mikrofonu **kapalı**"
    : "mikrofonu **açık**";
  let selfDf = uye.voice.selfDeaf
    ? "kulaklığı **kapalı.**"
    : "kulaklığı **açık**.";
  let embed = new Discord.MessageEmbed()
    .setColor("010000")
    .setFooter(ayar.footer)
    .setDescription(
      `${uye} adlı kullanıcı şu anda \`${
        message.guild.channels.cache.get(uye.voice.channelID).name
      }\` adlı ses kanalında ayrıca ${selfMt}, ${selfDf}`
    );
  message.channel.send(embed);
};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["voice"], 
  permLevel: 0
};

module.exports.help = {
  name: "ses",
  description: '',
  usage: ''
  
};

