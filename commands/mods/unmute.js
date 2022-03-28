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
    name: 'unmute',
    aliases: [],
    run: async (client, message, args, prefix, color) => {
        let chx = db.get(`logmod_${message.guild.id}`);
        const logschannel = message.guild.channels.cache.get(chx)
            if(args[0] == "all") {
                let perm = ""
            message.member.roles.cache.forEach(role => {
            if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
            if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
            })
            if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {    
                let Muted = await db.fetch(`mRole_${message.guild.id}`);
                      let muteRole = await message.guild.roles.cache.get(Muted) || message.guild.roles.cache.find(role => role.name === `muet`) || message.guild.roles.cache.find(role => role.name === `Muted`) || message.guild.roles.cache.find(role => role.name === `Mute`)
                    if(!muteRole) return message.channel.send(`Je ne trouve pas le rôle **muet**`)
                    if(muteRole.members.size === 0 || undefined || false || null) return message.channel.send(`Tous les membres ont été unmute`)
                  message.channel.send(`Tous les membres ont été unmute`)
                      muteRole.members
                      .forEach((m,i) => {m.send(`Vous avez été **unmute** de ${message.guild.name}`)
                    m.roles.remove(muteRole.id)
                    db.set(`mute_${message.guild.id}_${m.user.id}`, false)

                    
                    })
            }
            } else if(args[0]) {
                let perm = ""
                message.member.roles.cache.forEach(role => {
                    if(db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
                    if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
                if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
                })
                if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {  
                    const user = message.mentions.members.first()|| message.guild.members.cache.get(args[0])
                
                    if (!user) {
                      return message.channel.send(`Aucun membre trouvé pour \`${args[0]}\``);
                    }
                    let Muted = await db.fetch(`mRole_${message.guild.id}`);
                    let muterole = await message.guild.roles.cache.get(Muted) || message.guild.roles.cache.find(role => role.name === `muet`) || message.guild.roles.cache.find(role => role.name === `Muted`) || message.guild.roles.cache.find(role => role.name === `Mute`)
                    
                if(!muterole) return message.channel.send(`Erreur : aucun rôle muet enregistré`)
                    if (user.roles.cache.has(muterole)) {
                      return message.channel.send(`${user} n'était pas mute`);
                    }
                
                    user.roles.remove(muterole, `Unmute par ${message.author.tag}`)
                
                    message.channel.send(`${user} a été **unmute**`);
                    db.set(`mute_${message.guild.id}_${user.id}`, null)

                    user.send(`Vous avez été **unmute** sur ${message.guild.name}`);
          
              
                    logschannel.send(new Discord.MessageEmbed()
                    .setColor(color)
                    
                    .setDescription(`${message.author} a **unmute** ${user}`)
                    )
            }
        }
    }
}