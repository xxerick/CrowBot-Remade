const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'raidlog',
    aliases: [],
    run: async (client, message, args, prefix, color) => {

        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true) {
 
            let ss = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(args[0] === "on") {
            const channel = message.channel

            db.set(`${message.guild.id}.raidlog`, channel.id)
            message.channel.send(`Le salon ${channel} sera maintenant utilisé pour envoyer les logs de raid`)
        }

        else if(args[0] === "off") {
            db.set(`${message.guild.id}.raidlog`,null)
            message.channel.send(`Logs de raid désactivés`)
            
        } else 
             if(ss) {
            db.set(`${message.guild.id}.raidlog`, ss.id)
            message.channel.send(`Le salon ${ss} sera maintenant utilisé pour envoyer les logs de raid`)
        }

        } else {

        }
    }
}