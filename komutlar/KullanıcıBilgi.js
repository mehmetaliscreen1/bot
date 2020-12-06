const Discord = require("discord.js");
const db = require("quick.db");            
const ayar = require("../ayarlar.json");
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (client, message, args) => {
  
let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
if (!uye) return message.react(ayar.iptal);

  var msecs = Math.abs(new Date() - uye.createdAt);
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
  
  var giris = Math.abs(new Date() - uye.joinedAt);
  const girisyears = Math.floor(giris / (1000 * 60 * 60 * 24 * 365));
  giris -= girisyears * 1000 * 60 * 60 * 24 * 365;
  const girismonths = Math.floor(giris / (1000 * 60 * 60 * 24 * 30));
  giris -= girismonths * 1000 * 60 * 60 * 24 * 30;
  const girisweeks = Math.floor(giris / (1000 * 60 * 60 * 24 * 7));
  giris -= girisweeks * 1000 * 60 * 60 * 24 * 7;
  const girisdays = Math.floor(giris / (1000 * 60 * 60 * 24));
  giris -= girisdays * 1000 * 60 * 60 * 24;
  const girishours = Math.floor(giris / (1000 * 60 * 60));
  giris -= girishours * 1000 * 60 * 60;
  const girismins = Math.floor((giris / (1000 * 60)));
  giris -= girismins * 1000 * 60;
  const girissecs = Math.floor(giris / 1000);
  giris -= girissecs * 1000;

  var girisstring = "";
  if (years > 0) girisstring += `${girisyears} yıl ${girismonths} ay`
  else if (girismonths > 0) girisstring += `${girismonths} ay ${weeks > 0 ? weeks+" hafta" : ""}`
  else if (girisweeks > 0) girisstring += `${girisweeks} hafta ${days > 0 ? days+" gün" : ""}`
  else if (girisdays > 0) girisstring += `${girisdays} gün ${hours > 0 ? hours+" saat" : ""}`
  else if (girishours > 0) girisstring += `${girishours} saat ${mins > 0 ? mins+" dakika" : ""}`
  else if (girismins > 0) girisstring += `${girismins} dakika ${secs > 0 ? secs+" saniye" : ""}`
  else if (girissecs > 0) girisstring += `${girissecs} saniye`
  else girisstring += `saniyeler`;

let p = Object.keys(uye.presence.clientStatus).join(',')
let cihazisim = p
.replace(`mobile`,`Mobil Telefon`)
.replace(`desktop`,`Bilgisayar`)
.replace(`web`,`Tarayıcı (Google, Yandex vb.)`)

let k = Object.values(uye.presence.clientStatus).join(',')
let durum = k
.replace(`online`,`${client.emojis.cache.get(ayar.online)} Çevrimiçi`)
.replace(`idle`,`${client.emojis.cache.get(ayar.idle)} Boşta`)
.replace(`dnd`,`${client.emojis.cache.get(ayar.dnd)} Rahatsız Etmeyin`)
.replace(`offline`,`${client.emojis.cache.get(ayar.offline)} Çevrimdışı/Görünmez`)

let j = moment(uye.createdAt).format('DD MM')
let kurulus = j
.replace(`01`, `Ocak`)
.replace(`02`, `Şubat`)
.replace(`03`, `Mart`)
.replace(`04`, `Nisan`)
.replace(`05`, `Mayıs`)
.replace(`06`, `Haziran`)
.replace(`07`, `Temmuz`)
.replace(`08`, `Ağustos`)
.replace(`09`, `Eylül`)
.replace(`10`, `Ekim`)
.replace(`11`, `Kasım`)
.replace(`12`, `Aralık`)

let x = moment(uye.joinedAt).format('DD MM')
let katılım = x
.replace(`01`, `Ocak`)
.replace(`02`, `Şubat`)
.replace(`03`, `Mart`)
.replace(`04`, `Nisan`)
.replace(`05`, `Mayıs`)
.replace(`06`, `Haziran`)
.replace(`07`, `Temmuz`)
.replace(`08`, `Ağustos`)
.replace(`09`, `Eylül`)
.replace(`10`, `Ekim`)
.replace(`11`, `Kasım`)
.replace(`12`, `Aralık`)
  // message.channel.send(new Discord.MessageEmbed().setColor(ayar.aqua).setFooter(ayar.footer).setDescription(
//`
//❯ Kullanıcı Bilgisi\n\nID: ${uye.id}\nProfil: ${uye}\nDurum: ${durum}\nCihaz: ${cihazisim}\nOluşturulma: ${moment(uye.createdAt).format('DD/MM/YYYY | HH:mm')}\n❯ Üyelik Bilgisi\n\nSunucu takma adı: ${uye.displayName.replace("`", "")} ${uye.nickname ? "" : "[Yok]"}\nSunucuya katılma: ${moment(uye.joinedAt).format(`DD/MM/YYYY | HH:mm`)}\n\nBazı rolleri: ${message.guild.member(uye).roles.filter(b => b.name !== "@everyone").map(a => a).join(', ')}\n❯ Booster\n\neklenck
//`))
                      
//message.channel.send(`❯ Kullanıcı Bilgisi\n\nID: ${uye.id}\nDurum: ${durum}\nCihaz: ${cihazisim}\nOluşturulma: ${kurulus} ${moment(uye.createdAt).format('YYYY')}\n\n❯ Üyelik Bilgisi\n\nSunucuya katılma: ${katılım} ${moment(uye.joinedAt).format('YYYY')}\nBazı rolleri: ${message.guild.member(uye).roles.cache.filter(memet => memet.name !== "@everyone").map(a => a).join(', ')} `)
message.channel.send(new Discord.MessageEmbed()
.addField('Kullanıcı Bilgisi', `ID: ${uye.id}\nDurum: ${durum}\nCihaz: ${cihazisim}\nOluşturulma: ${kurulus} ${moment(uye.createdAt).format('YYYY')} (${string} önce)`)                   
.addField('Üyelik Bilgisi', `Sunucuya katılma: ${katılım} ${moment(uye.joinedAt).format('YYYY')} (${girisstring} önce)\nBazı rolleri: ${message.guild.member(uye).roles.cache.filter(memet => memet.name !== "@everyone").map(a => a).join(', ')}`)                    
.setColor(ayar.siyah)                
                    )
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i", "info", "kb", "kullanıcı", "userinfo"], 
  permLevel: 0
};

module.exports.help = {
  name: "kullanıcıBilgi",
  description: '',
  usage: ''
  
};
