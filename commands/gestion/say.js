const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');

module.exports = {
    name: 'say',
    aliases: [],

    run: async (client, message, args, prefix, color) => {
        message.delete();

                let perm = ""
                message.member.roles.cache.forEach(role => {
                    if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
                if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
                })
                if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {    
                    let tosay = args.join(" ")
                    if(!tosay) return 
                    if(tosay.includes("discord.gg/")|| tosay.includes("https://discord.gg/")) return
                    if(tosay.includes("@everyone")&& !message.member.hasPermission("MENTION_EVERYONE")|| tosay.includes("@here")&& !message.member.hasPermission("MENTION_EVERYONE")) return

                    message.channel.send(tosay)
           
    
    
    }
    }
}