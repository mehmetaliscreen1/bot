const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayar = require("../ayarlar.json");
const client = new Discord.Client();

var prefix = ayar.prefix;


module.exports = client => {
client.user.setActivity(ayar.footer);
client.on('ready', () => console.log("Helios için kılıcımı çektim."));
client.on('ready', () => { client.channels.cache.get("778315975459209286").join(); });
};

