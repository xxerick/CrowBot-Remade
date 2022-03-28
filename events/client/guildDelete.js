const axios = require('axios');         
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = async (client, guild) => {

   console.log(`J'ai quitter le serveur ${guild.name} [${guild.memberCount}]`)
   client.config.owner.forEach(u => client.users.cache.get(u).send(`Je viens de quitter ${guild.name} (${guild.memberCount} membres, propriétaire : <@${guild.owner.id}>)`))
 
   let own = db.all().filter(data => data.ID.startsWith(`ownermd_${client.user.id}`)).sort((a, b) => b.data - a.data) 
   own.filter(x => client.users.cache.get(x.ID.split('_')[2])).map((m, i) => {
     client.users.cache.get(m.ID.split('_')[2]).send(`Je viens de quitter ${guild.name} (${guild.memberCount} membres, propriétaire : <@${guild.owner.id}>)`)
    })
  
}