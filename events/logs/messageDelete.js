const axios = require('axios');         
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")

module.exports = (client,message) => {
    let guild = message.guild
   const color = db.get(`color_${guild.id}`) === null? client.config.color:db.get(`color_${guild.id}`)

          let wass = db.get(`msglog_${message.guild.id}`);
          const logschannel = message.guild.channels.cache.get(wass)
        
          if(logschannel) logschannel.send(new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}` , `${message.author.displayAvatarURL({dynamic : true })}`)
          .setColor(color)
          .setDescription(`**Message supprimé dans** <#${message.channel.id}>\n ${message.content}`)
          .setTimestamp())
         
}