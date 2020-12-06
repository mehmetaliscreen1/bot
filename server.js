const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const ayar = require('./ayarlar.json');
const chalk = require('chalk');
const ms = require("parse-ms");
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');

const app = express();
app.get("/", (request, response) => {
  console.log("Helios için kılıcımı çektim.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});


client.emoji = function(x) {
  return client.emojis.cache.get(client.emojiler[x]);
};
const emoji = global.emoji;

const sayiEmojiler = {
  0: "<a:helios_0:743478016176554037>",
  1: "<a:helios_1:743478058979164222>",
  2: "<a:helios_2:743478074397425705>",
  3: "<a:helios_3:743478075194605689>",
  4: "<a:helios_4:743478074523385996>",
  5: "<a:helios_5:743478072447205528>",
  6: "<a:helios_6:743478076108701807>",
  7: "<a:helios_7:743478074687094825>",
  8: "<a:helios_8:743478077295689888>",
  9: "<a:helios_9:743478076117352520>"
};

client.emojiSayi = function(sayi) {
  var yeniMetin = "";
  var arr = Array.from(sayi);
  for (var x = 0; x < arr.length; x++) {
    yeniMetin += (sayiEmojiler[arr[x]] === "" ? arr[x] : sayiEmojiler[arr[x]]);
  }
  return yeniMetin;
};

client.emojiler = {
  onay: "775098581950529536",
  iptal: "772540868996759643",
  cevrimici: "757603722431037560",
  rahatsizetmeyin: "757603898503594176",
  bosta: "757603948747030578",
  gorunmez: "757603772632662027",
  erkekEmoji: "776534266896449566",
  kizEmoji: "776534550993436683",
  gif1: "760777329055760424",
  gif2: "743466799236120626",
  gif3: "743466738250809404",
  gif4: "758010034260148255"
};

global.emoji = client.emoji = function(x) {
  return client.emojis.cache.get(client.emojiler[x]);
};

client.sayilariCevir = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


client.splitEmbedWithDesc = async function(description, author = false, footer = false, features = false) {
  let embedSize = parseInt(`${description.length/2048}`.split('.')[0])+1
  let embeds = new Array()
  for (var i = 0; i < embedSize; i++) {
    let desc = description.split("").splice(i*2048, (i+1)*2048)
    let x = new Discord.MessageEmbed().setDescription(desc.join(""))
    if (i == 0 && author) x.setAuthor(author.name, author.icon ? author.icon : null)
    if (i == embedSize-1 && footer) x.setFooter(footer.name, footer.icon ? footer.icon : null)
    if (i == embedSize-1 && features && features["setTimestamp"]) x.setTimestamp(features["setTimestamp"])
    if (features) {
      let keys = Object.keys(features)
      keys.forEach(key => {
        if (key == "setTimestamp") return
        let value = features[key]
        if (i !== 0 && key == 'setColor') x[key](value[0])
        else if (i == 0) {
          if(value.length == 2) x[key](value[0], value[1])
          else x[key](value[0])
        }
      })
    }
    embeds.push(x)
  }
  return embeds
};

Date.prototype.toTurkishFormatDate = function (format) {
  let date = this,
    day = date.getDate(),
    weekDay = date.getDay(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
  let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");

  if (!format) {
    format = "dd MM yyyy | hh:ii:ss";
  };
  format = format.replace("mm", month.toString().padStart(2, "0"));
  format = format.replace("MM", monthNames[month]);
  
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  };
  
  format = format.replace("dd", day.toString().padStart(2, "0"));
  format = format.replace("DD", dayNames[weekDay]);

  if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("hh") > -1) {
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
  };
  if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
  return format;
};

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};


client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
//Date.Now().format("HHMM") === "0000"


client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

Date.prototype.toTurkishFormatDate = function (format) {
  let date = this,
    day = date.getDate(),
    weekDay = date.getDay(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
  let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");

  if (!format) {
    format = "dd MM yyyy | hh:ii:ss";
  };
  format = format.replace("mm", month.toString().padStart(2, "0"));
  format = format.replace("MM", monthNames[month]);
  
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  };
  
  format = format.replace("dd", day.toString().padStart(2, "0"));
  format = format.replace("DD", dayNames[weekDay]);

  if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("hh") > -1) {
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
  };
  if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
  return format;
};

client.tarihHesapla = (date) => {
  const startedAt = Date.parse(date);
  var msecs = Math.abs(new Date() - startedAt);

  const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
  msecs -= years * 1000 * 60 * 60 * 24 * 365;
  const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
  msecs -= months * 1000 * 60 * 60 * 24 * 30;
  const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
  msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
  const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
  msecs -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(msecs / (1000 * 60 * 60));
  msecs -= hours * 1000 * 60 * 60;
  const mins = Math.floor((msecs / (1000 * 60)));
  msecs -= mins * 1000 * 60;
  const secs = Math.floor(msecs / 1000);
  msecs -= secs * 1000;

  var string = "";
  if (years > 0) string += `${years} yıl ${months} ay`
  else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
  else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
  else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
  else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
  else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
  else if (secs > 0) string += `${secs} saniye`
  else string += `saniyeler`;

  string = string.trim();
  return `\`${string} önce\``;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

client.on("guildMemberAdd", async member => {
    let a = db.fetch(`jailli_${member.id}`)
    if(a == "jail") {
      
 member.roles.set([ayar.jailRolu])
    }})
client.on("guildMemberAdd", async member => {
  let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
client.channels.cache.get(ayar.teyitKanali).send(`
${member} (\`${member.id}\`) Helios'a hoşgeldin! Seninle beraber **${member.guild.memberCount}** kişiyiz. ${guvenilirlik ? ":no_entry_sign:" : ""}

Sunucuya erişebilmek için "V. Confirmed" kanallarında kayıt olup isim yaş belirtmen gereklidir.

<@&782728307497631744>, <@&782728489207726130>, <@&782728985200295946> rolündeki arkadaşlarımız seninle ilgilenecektir.

Hesabını ${client.tarihHesapla(member.user.createdAt)} açmışsın ve bu seni ${guvenilirlik ? "olumsuz" : "olumlu"} yönde etkiliyor.
`)
member.roles.add(ayar.teyitsizRolu);
    })
client.on('ready', ()=>{
client.channels.cache.get('782982074968965160').join()
})

client.on("userUpdate", async (oldUser, newUser) => {
  let sunucu = `782716097522696192`;
  let kanal = `785134457496797204`;
  let taglı = `782722688606797834`;

  let tag = ayar.tag;
  let untag = ayar.ikinciTag;

  let channel = client.guilds.cache.get(sunucu).channels.cache.get(kanal);

  if (oldUser.username !== newUser.username) {
    if (
      newUser.username.includes(tag) &&
      !client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.cache.has(taglı)
    ) {
      await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.add(taglı);

      await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .setNickname(
          client.guilds.cache
            .get(sunucu)
            .members.cache.get(newUser.id)
            .displayName.replace(untag, tag)
        );

 
      channel.send(`${newUser} adlı kullanıcı "${tag}" sembolünü kullanıcı adına ekleyerek ailemize katıldı.`);
    }
    if (
      !newUser.username.includes(tag) &&
      client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.cache.has(taglı)
    ) {
      await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.remove(taglı);

      await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .setNickname(
          client.guilds.cache
            .get(sunucu)
            .members.cache.get(newUser.id)
            .displayName.replace(tag, untag)
        );
      channel.send(`${newUser} adlı kullanıcı "${tag}" sembolünü kullanıcı adından kaldırarak ailemizden ayrıldı.`);
    }
  }
});


client.on("guildMemberAdd", async member => {
    let a = db.fetch(`muteli_${member.id}`)
    if(a == "mute") {
 member.roles.add([ayar.muteRolu])
    
    }
});

client.on("message", async message => {




  client.on("userUpdate", async(oldCAD, newCAD) => {
  if(oldCAD.avatarURL({dynamic: true}) === newCAD.avatarURL({dynamic: true})) return;
  let cadNORMAL = "778984449748631552";
  let cadGIF = "778984449748631552"; 
  let cadPP = (newCAD.avatarURL({dynamic: true})).split("?")[0];
  if((cadPP).endsWith(".gif")) {
    client.channels.cache.get(cadGIF).send(new Discord.MessageEmbed().setFooter(ayar.footer).setColor(ayar.random).setImage(cadPP));
  } else {
    client.channels.cache.get(cadNORMAL).send(new Discord.MessageEmbed().setFooter(ayar.footer).setColor(ayar.random).setImage(cadPP));
  };
});


client.on("message", async message => {
  let links = message.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
if(message.member.hasPermission("ADMINISTRATOR")) return;
  if (!links) return;
  message.delete();
  message.channel.send(`<a:helios:772540868996759643> ${message.author}, bu sunucuda link paylaşılması yasaklanmıştır.`)
});