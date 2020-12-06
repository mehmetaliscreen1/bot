const Discord = require("discord.js");
const db = require("quick.db");            
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {

	let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let embed = new Discord.MessageEmbed().setFooter(ayar.footer).setColor(ayar.siyah).setTimestamp();
  if (!uye) return message.channel.send(embed.setDescription("Üye bilgileri yanlış!")).then(x => x.delete({timeout: 5000}));
  if (!message.member.voice.channel || !uye.voice.channel || message.member.voice.channelID == uye.voice.channelID) return message.react(client.emojiler.iptal);
  if (message.member.hasPermission("ADMINISTRATOR")) {
    await message.member.voice.setChannel(uye.voice.channelID);
    message.react(client.emojiler.onay).catch();
  } else {
    const reactionFilter = (reaction, user) => {
      return [ayar.onay].includes(reaction.emoji.id) && user.id === uye.id;
    };
    message.channel.send(`${uye}`, {embed: embed.setAuthor(uye.displayName, uye.user.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author} adlı kişi sizin odanıza (\`${message.guild.channels.cache.get(uye.voice.channelID).name}\`) girmek istiyor, onaylamak için tepkiye basmalısınız.`)}).then(async msj => {
      await msj.react(ayar.onay);
      msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
	let cevap = c.first();
	if (cevap) {
	  message.member.voice.setChannel(uye.voice.channelID);
          msj.delete();
          message.react(client.emojiler.onay).catch();
	};
      });
    });
  };
};


module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["go"], 
  permLevel: 0
};

module.exports.help = {
  name: "git",
  description: '',
  usage: ''
  
};

