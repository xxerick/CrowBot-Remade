const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
const axios = require('axios')

module.exports = {
    name: 'serverinfo',
    aliases: ['si'],
    run: async (client, message, args, prefix, color) => {

        let perm = ""
        message.member.roles.cache.forEach(role => {
        if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) { 
              const guild = client.guilds.cache.get(args[0]) || message.guild
            let Boosters = 0;
            guild.members.cache.forEach((m) => {
                if (m.premiumSince) i++;
            })

            let NoRoles = 0;
            guild.members.cache.forEach((m) => {
                if (m.roles.cache.size == 0) i++; 
            })
            //console.log(NoRoles)
            const ServerInfo = new Discord.MessageEmbed()
            .setTitle(`${guild.name} `)
            .addField(`ID`, `${guild.id}`, true)
            .addField(`Nombre de membres`, `${guild.memberCount}`, true)
            .addField(`Nombre de membres actifs`, `${guild.members.cache.filter(m => m.presence?.status === 'online' || m.presence?.status === 'dnd' || m.presence?.status === 'streaming' || m.presence?.status === 'idle').size}`, true)
            .addField(`Nombre d'humains`, `${guild.members.cache.filter((m) => !m.user.bot).size}`, true)
            .addField(`Nombre de bots`, `${guild.members.cache.filter((m) => m.user.bot).size}`, true)
            .addField(`Nombre d'utilisateurs en vocal`, `${guild.members.cache.filter(m => m.voice.channel).size}`, true)
            .addField(`Nombre d'utilisateurs sans rôle`, `${NoRoles}`, true)
            .addField(`Nombre de boosts`, `${guild.premiumSubscriptionCount}`, true)
            .addField(`Nombre de boosters`, `${Boosters}`, true)
            .addField(`Nombre de rôles`, `${guild.roles.cache.size}`, true)
            .addField(`Nombre de salons`, `${guild.channels.cache.size}`, true)
            .addField(`Nombre d'émojis`, `${guild.emojis.cache.size}`, true)
            .setFooter("Création du serveur")
            .setTimestamp(guild.createdAt)
    
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setColor(color)

         if (guild.icon) ServerInfo.setURL(guild.iconURL({ dynamic: true }))
             
            message.channel.send(ServerInfo)
    }
    }
}