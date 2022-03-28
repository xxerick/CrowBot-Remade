const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
function unban(message, user, authorcooldown) {
    message.guild.members.unban(user.id, {reason: `Debannis par ${message.author.tag}`}).then(r => {
    authorcooldown.limit++
    setTimeout(() => {
        authorcooldown.limit = authorcooldown.limit - 1
        }, 120000);
    })
};
module.exports = {
    name: 'addrole',
    aliases: [],
    run: async (client, message, args, prefix, color) => {
   
                let perm = ""
            message.member.roles.cache.forEach(role => {
            if(db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
            if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
            if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
            })
            if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {    
                let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
                if (!rMember) return
            
            
            
                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) 
            
            
                if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[1]|| "rien"}\``)
                if (!client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === null  && role.permissions.has("KICK_MEMBERS") || role.permissions.has("BAN_MEMBERS") ||  role.permissions.has("MANAGE_WEBHOOKS") ||role.permissions.has("ADMINISTRATOR") || role.permissions.has("MANAGE_CHANNELS") || role.permissions.has("MANAGE_GUILD") || role.permissions.has("MENTION_EVERYONE") || role.permissions.has("MANAGE_ROLES")) {
                return message.channel.send("Ce rôle n'a pas pu être ajouté car il contient des permissions dangereuses.")
                }
            

            
                if (rMember.roles.cache.has(role.id)) return message.channel.send(`1 rôle ajouté à 0 membre`)
            
                if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id, `Rôle ajouté par ${message.author.tag}`).then(() => {
             
                message.channel.send(`Rôle ajouté !`)
                }).catch(() => {

                    message.channel.send(`Je n'est pas pu ajouté ce rôle à **${rMember.tag}** !`)

                })
        }
    }
}