const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
const axios = require('axios')

module.exports = {
    name: 'roleinfo',
    aliases: ['role'],
    description: 'role <rôle>',
    run: async (client, message, args, prefix, color) => {

        let perm = ""
        message.member.roles.cache.forEach(role => {
        if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) { 
       

                function roleperm(role) {
                    if (role.permissions.has("ADMINISTRATOR")) {
                        return `Administrateur`
                    } else {
                        return role.permissions.toArray().map(p =>
                            p.replace("CREATE_INSTANT_INVITE", "")
                                .replace("MENTION_EVERYONE", `Mentionner @everyone, @here et tous les rôles\n`)
                                .replace("MANAGE_ROLES", `Gérer les rôles\n`)
                                .replace("MANAGE_WEBHOOKS", `Gérer les webhooks\n`)
                                .replace("MANAGE_EMOJIS", `Gérer les émojis\n`)
                                .replace("ADMINISTRATOR", `Administrateur\n`)
                                .replace("KICK_MEMBERS", `Expulser des membres\n`)
                                .replace("BAN_MEMBERS", `Bannir des membres\n`)
                                .replace("MANAGE_CHANNELS", `Gérer les salons\n`)
                                .replace("MANAGE_GUILD", `Gérer le serveur\n`)
                                .replace("ADD_REACTIONS", "")
                                .replace("VIEW_AUDIT_LOG", "")
                                .replace("PRIORITY_SPEAKER", "")
                                .replace("STREAM", "")
                                .replace("VIEW_CHANNEL", "")
                                .replace("SEND_MESSAGES", "")
                                .replace("SEND_TTS_MESSAGES", "")
                                .replace("MANAGE_MESSAGES", "")
                                .replace("EMBED_LINKS", "")
                                .replace("ATTACH_FILES", "")
                                .replace("READ_MESSAGE_HISTORY", "")
                                .replace("USE_EXTERNAL_EMOJIS", "")
                                .replace("VIEW_GUILD_INSIGHTS", "")
                                .replace("CONNECT", "")
                                .replace("SPEAK", "")
                                .replace("MUTE_MEMBERS", "Mute des membres")
                                .replace("DEAFEN_MEMBERS", "")
                                .replace("MOVE_MEMBERS", "Move des membres")
                                .replace("USE_VAD", "")
                                .replace("CHANGE_NICKNAME", "Gerer les pseudos")
                                .replace("MANAGE_NICKNAMES", "")
                                .replace(",", "")).join(" ")
                    }
                }

                const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

                let roleEmbed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle(role.name)
                    .addField("Nom ", `<@&${role.id}>`)
                    .addField("Membres possédant le rôle", `${role.members.size}`)
                    .addField("Couleur", `${role.hexColor === "#000000" ? "Classique" : role.hexColor}`)
                    .addField("ID", `${role.id}`, true)
                    .addField("Affiché séparément", `${role.hoist ? "Oui" : "Non"}`, true)
                    .addField("Mentionable", `${role.mentionable ? "Oui" : "Non"}`, true)
                    .addField("Géré par une intégration", `${role.managed ? "Oui" : "Non"}`, true)
                    .addField("Permissions principales", `${roleperm(role)}`, true)
                    .addField(`Création du rôle`, `<t:${Date.parse(role.createdAt) / 1000}:d> (<t:${Date.parse(role.createdAt) / 1000}:f>)`, true)
                    //.setFooter(`Création du rôle`)
                    //.setTimestamp(role.createdAt);

                message.channel.send(roleEmbed)

        
    }
    }
}