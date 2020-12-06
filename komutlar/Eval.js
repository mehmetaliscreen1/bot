const Discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
  if(!ayar.sahip.some(id => message.author.id === id)) return;
  if(!ayar.sahip.some(id => message.author.id === id)) return;
  if(!ayar.sahip.some(id => message.author.id === id)) return;
  if (!args[0] || args[0].includes('token')) return message.react(ayar.iptal);
  
	const code = args.join(' ');
	function clean(text) {
		if (typeof text !== 'string')
			text = require('util').inspect(text, { depth: 0 })
		text = text
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203))
		return text;
	};
    try {
		  var evaled = clean(await eval(code));
      if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace("token", "Yasaklı komut").replace(client.token, "Yasaklı komut").replace(process.env.PROJECT_INVITE_TOKEN, "Yasaklı komut");
		  message.channel.send(`${evaled.replace(client.token, "Yasaklı komut").replace(process.env.PROJECT_INVITE_TOKEN, "Yasaklı komut")}`, {code: "js", split: true});
    } catch(err) { message.channel.send(err, {code: "js", split: true}) }
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [], 
  permLevel: 0
};

module.exports.help = {
  name: "eval",
  description: '',
  usage: ''
  
};
