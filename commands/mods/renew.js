const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');

module.exports = {
    name: 'renew',
    aliases: ["nuke","purge"],

    run: async (client, message, args, prefix, color) => {
    
            if(args[0] === "all") {
             
                if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true ) {    
                const channels = message.channel.guild.channels.cache.filter(ch => ch.type !== 'category');
    
                channels.forEach(async channele => {
                    await channele.clone({
                        name: channele.name,
                        permissions: channele.permissionsOverwrites,
                        type: channele.type,
                        topic: channele.withTopic,
                        nsfw: channele.nsfw,
                        birate: channele.bitrate,
                        userLimit: channele.userLimit,
                        rateLimitPerUser: channele.rateLimitPerUser,
                        permissions: channele.withPermissions,
                        position: channele.rawPosition,
                        reason:  `Tout les salon recréé par ${message.author.tag} (${message.author.id})`
                    })
                    .catch(err => {})
                    channele.delete().catch(err => {})  })
                
    
            
                }
               
            } else {
                let perm = ""
                message.member.roles.cache.forEach(role => {
                    if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
                if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
                })
                if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {    
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel 
    if(channel === message.channel) {
        try {
            let ee =    await channel.clone({
                name: channel.name,
                permissions: channel.permissionsOverwrites,
                type: channel.type,
                topic: channel.withTopic,
                nsfw: channel.nsfw,
                birate: channel.bitrate,
                userLimit: channel.userLimit,
                rateLimitPerUser: channel.rateLimitPerUser,
                permissions: channel.withPermissions,
                position: channel.rawPosition,
                reason:  `Salon recréé par ${message.author.tag} (${message.author.id})`
            })
            channel.delete() 
            ee.send(`${message.author} salon recréé`)
        } catch (error) {
            return;
        }
    } else {
    
        try {
          let ee =  await channel.clone({
                name: channel.name,
                permissions: channel.permissionsOverwrites,
                type: channel.type,
                topic: channel.withTopic,
                nsfw: channel.nsfw,
                birate: channel.bitrate,
                userLimit: channel.userLimit,
                rateLimitPerUser: channel.rateLimitPerUser,
                permissions: channel.withPermissions,
                position: channel.rawPosition,
                reason:  `Salon recréé par ${message.author.tag} (${message.author.id})`
            })
            channel.delete() 
            ee.send(`${message.author} salon recréé`)
    
        } catch (error) {
            return;
        }
       
        message.channel.send("Salon recréé : "+channel.name)
    }
           
    
    }
    }
    }
}