const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = async (client, member, channel) => {
 const color = db.get(`color_${member.guild.id}`) === null ? client.config.prefix : db.get(`color_${member.guild.id}`)

  if (member.user.bot) return;
  const guild = member.guild

  let inter = setInterval(async () => {
    db.add(`vocalrank_${member.guild.id}_${member.user.id}`, 1000)

  }, 1000)

  client.inter.push({
    interval: inter,
    id: member.user.id,
    guild: member.guild.id,
  })


}

