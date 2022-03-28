const Discord = require("discord.js");
const db = require('quick.db')
const canvacord = require("canvacord");
module.exports = {
  name: 'level',
  aliases: ["rank"],
  run: async (client, message, args, prefix, color) => {
    let perm = ""
    message.member.roles.cache.forEach(role => {
   if(db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
    if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
    if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
    })
    if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm || db.get(`channelpublic_${message.guild.id}_${message.channel.id}`) === true ) { 

      const use = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
      const member = client.users.cache.get(use.id)
      const members = message.guild.members.cache
        .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
        .array();
      const position = new Promise((ful) => {
        for (let i = 1; i < members.length + 1; i++) {
          if (members[i - 1].id === member.id) ful(i);
        }
      });
      var level = db.get(`guild_${message.guild.id}_level_${member.id}`) || 0
      let xp = db.get(`guild_${message.guild.id}_xp_${member.id}`) || 0
      var xpNeeded = level * 500 + 500

      const rank = new canvacord.Rank()
        .setUsername(member.username)
        .setDiscriminator(member.discriminator)
        .setStatus(member.presence.status)
        .setCurrentXP(xp)
        .setRequiredXP(xpNeeded)
        .setLevel(level)
        .setRank(await position)
        .setAvatar(member.displayAvatarURL({ format: 'png' }))
        .setRankColor('white')
      rank.build()
        .then(async datae => {
          const attachment = new Discord.MessageAttachment(datae, "AxelRank.png");
          const embed = new Discord.MessageEmbed()
          embed.setAuthor(member.username, member.displayAvatarURL({ dynamic: true }))
          embed.setColor(color)
          embed.setDescription(`${member}
**Vocal:** \`${duration(db.get(`vocalrank_${message.guild.id}_${member.id}`) || 0)}\`
**Message:** \`${db.get(`msg_${message.guild.id}_${member.id}`) || 0}\``)
          embed.setImage("attachment://AxelRank.png")
          embed.attachFiles(attachment)
          message.channel.send(embed);
        })
      }

  }
}


function duration(mss) {
  const sec = Math.floor((mss / 1000) % 60).toString()
  const min = Math.floor((mss / (1000 * 60)) % 60).toString()
  const hrs = Math.floor((mss / (1000 * 60 * 60)) % 60).toString()
  const days = Math.floor(mss / (1000 * 60 * 60 * 24)).toString()
  return `${days.padStart(2, '') == "0" ? "" : `${days.padStart(2, '')} jours, `}${hrs.padStart(2, '') == "0" ? "" : `${hrs.padStart(2, '')} heures, `}${min.padStart(2, '') == "0" ? "" : `${min.padStart(2, '')} minutes et `}${sec.padStart(2, '')} secondes`
}