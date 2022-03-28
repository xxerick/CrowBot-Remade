const axios = require('axios');         
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")

module.exports = (client, oldChannel,newChannel) => {
    let wass = db.get(`${oldChannel.guild.id}.logvc`);
   const color = db.get(`color_${member.guild.id}`) === null? client.config.color:db.get(`color_${member.guild.id}`)
      const logschannel = oldChannel.guild.channels.cache.get(wass)
      if(logschannel) logschannel.send(new Discord.MessageEmbed()
      .setAuthor(member.user.username, member.user.displayAvatarURL({dynamic : true }))
      .setColor(color)
      .setDescription(`**${member}** a changer de salon vocal, il a quitter ${oldChannel.name} 
      et a rejoint ${newChannel.name}`)
    
      )

}