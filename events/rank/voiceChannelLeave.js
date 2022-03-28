const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = async (client, member, voiceChannel) => {
 const color = db.get(`color_${member.guild.id}`) === null ? client.config.prefix : db.get(`color_${member.guild.id}`)

  if (client.inter.find(c => c.id === member.user.id && c.guild === member.guild.id)) {

    clearInterval(client.inter.find(c => c.id === member.user.id && c.guild === member.guild.id).interval)
    let index = client.inter.indexOf({
      interval: client.inter.find(c => c.id === member.user.id && c.guild === member.guild.id).interval,
      id: member.user.id,
      guild: member.guild.id,
    })
    client.inter.splice(index)

  }




}

