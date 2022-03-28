const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
const axios = require('axios')

module.exports = {
    name: 'channelinfo',
    aliases: ['channel', 'ci'],
    description: 'channel <salon>',
    run: async (client, message, args, prefix, color) => {

        let perm = ""
        message.member.roles.cache.forEach(role => {
        if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) { 


            if (!args[0]) {
                var channel = message.channel;
            } else {
                var channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
            }

            if (!channel) {
                return;
            };

            if (channel.type === 'text' || channel.type === 'news' || channel.type === 'store') {

            const ChannelInfo = new Discord.MessageEmbed()

            .setTitle(channel.name)
            .addField(`Nom`, `${channel.name}`, true)
            .addField(`Description`, `${channel.topic !== null ? channel.topic : 'Aucune Description'}`, true)
            .addField(`ID`, `${channel.id}`, true)
            .addField(`NSFW`, `${channel.nsfw ? `Oui` : `Non`}`, true)
            .addField(`Catégorie`, `${channel.parent !== null ? channel.parent : 'Non Catégorisé'}\n${channel.parentID !== null ? `(${channel.parentID})` : ''}`, true)
            .addField(`Position dans la catégorie`, `${channel.position + 1}`, true)
            .addField(`Date de création`, `<t:${Date.parse(channel.createdAt) / 1000}:d> (<t:${Date.parse(channel.createdAt) / 1000}:f>)`, true)
            .setColor(color)
            
            message.channel.send(ChannelInfo)

            }
            if (channel.type === 'category') {


            const CategoryInfo = new Discord.MessageEmbed()
            
            .setTitle(channel.name)
            .addField(`Nom`, `${channel.name}`, true)
            .addField(`ID`, `${channel.id}`, true)
            .addField(`Salons`, `${channel.children.size}`, true)
            .addField(`Position`, `${channel.rawPosition}`, true)
            .addField(`Date de création`, `<t:${Date.parse(channel.createdAt) / 1000}:d> (<t:${Date.parse(channel.createdAt) / 1000}:f>)`, true)
            .setColor(color)

            message.channel.send(CategoryInfo)

            }

            if (channel.type === 'voice') {

            const VoiceInfo = new Discord.MessageEmbed()

            .setTitle(channel.name)
            .addField(`Nom`, `${channel.name}`, true)
            .addField(`ID`, `${channel.id}`, true)
            .addField(`Débit binaire (bitrate)`, `${channel.bitrate / 1000 + 'kbps'}`, true)
            .addField(`Membres connectés`, `${channel.members.size}`, true)
            .addField(`Limite d'utilisateur`, `${channel.userLimit === 0 ? 'Aucune Limite' : channel.userLimit}`, true)
            .addField(`Date de création`, `<t:${Date.parse(channel.createdAt) / 1000}:d> (<t:${Date.parse(channel.createdAt) / 1000}:f>)`, true)
            .setColor(color)


            message.channel.send(VoiceInfo)

            }
    }
    }
}