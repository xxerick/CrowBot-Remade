const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
const {MessageEmbed} = require("discord.js")

module.exports = {
    name: 'muterole',
    aliases: [],

    run: async (client, message, args, prefix, color) => {
        let perm = ""
        message.member.roles.cache.forEach(role => {
            if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
        if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {    
            let Muted = await db.fetch(`mRole_${message.guild.id}`);

            let muterole = await message.guild.roles.cache.get(Muted) || message.guild.roles.cache.find(role => role.name === `muet`) || message.guild.roles.cache.find(role => role.name === `Muted`) || message.guild.roles.cache.find(role => role.name === `Mute`)
        if(muterole) {
            const embed = new Discord.MessageEmbed()
            embed.setColor(color)
            embed.setDescription(`**Il existe déjà un rôle muet : <@&${muterole.id}>**\nVérification des permissions du rôles muet en cours`)
             message.channel.send(embed).then(async mm => {
                 const embed2= new Discord.MessageEmbed()
                 embed2.setTitle("Les permissions du rôle muet ont été mises à jour")
                 embed2.setColor(color)

                const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
channels.forEach(channel => {


                channel.createOverwrite(muterole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false
            }, "Muterole")
            embed2.setDescription(`**__D'autres permission déjà existantes peuvent rendre innefficace le mute pour certains rôles dans les salons suivants :__**\n\n**${channel.name}**\n- ${muterole.name}\n`, true)
            embed2.setFooter("Tous les rôles ayant la permissons \"envoyer des messages\" en vert seront insensible au mute")
    
        })
       
message.channel.send(embed2)
        })
            return;
    }
        if(!muterole) {
            const embed = new Discord.MessageEmbed()
            embed.setColor(color)
            embed.setTitle(`Création d'un rôle muet`)
             message.channel.send(embed).then(async m => {
            muterole = await message.guild.roles.create({
                data: {
                     name: 'muet',
                    permissions: 0
                }
            })
            message.guild.channels.cache.forEach(channel => channel.createOverwrite(muterole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false
            }, "Muterole"))
            db.set(`mRole_${message.guild.id}`, `${muterole.id}`)
            const e = new Discord.MessageEmbed()
            e.setColor(color)
            e.setDescription(`***Rôle muet créé :*** ${muterole}`)
            return m.edit("",e)
             })}
    }
    }
}