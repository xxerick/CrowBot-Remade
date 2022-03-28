const Discord = require('discord.js')
const {MessageEmbed} = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: 'ping',
    aliases: ["speed"],

    run: async (client, message, args, prefix, color) => {
   
      
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true  ) {      
                let embeeed = new Discord.MessageEmbed()
                embeeed.addField("Ping", `Calcul en cours`, true)
                embeeed.addField("Latence", `${client.ws.ping}ms`, true)
                embeeed.setColor(color)
        
                let msg = await message.channel.send(embeeed)
                let embed = new Discord.MessageEmbed()
                embed.addField("Ping", `${msg.createdAt - message.createdAt + "ms"}`, true)
        embed.addField("Latence", `${client.ws.ping}ms`, true)
                embed.setColor(color)
                  
                return msg.edit("", embed)
        }
    }
}