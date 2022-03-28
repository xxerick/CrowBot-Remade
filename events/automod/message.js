const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")
const Discord = require("discord.js")
let random_string = require("randomstring");

module.exports = async (client, message) => {

    const guild = message.guild
    const color = db.get(`color_${guild.id}`) === null ? client.config.color : db.get(`color_${guild.id}`)
    const raidlog = guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
    let Muted = await db.fetch(`mRole_${message.guild.id}`);
    let muterole = await message.guild.roles.cache.get(Muted) || message.guild.roles.cache.find(role => role.name === `muet`) || message.guild.roles.cache.find(role => role.name === `Muted`) || message.guild.roles.cache.find(role => role.name === `Mute`)
    if (!muterole) {
        muterole = await message.guild.roles.create({
            data: {
                name: 'muet',
                permissions: 0
            }
        }, "muterole")
        message.guild.channels.cache.forEach(channel => channel.createOverwrite(muterole, {
            SEND_MESSAGES: false,
            CONNECT: false,
            ADD_REACTIONS: false
        }, "muterole"))
        db.set(`mRole_${message.guild.id}`, `${muterole.id}`)


    }
    if (db.get(`linkwl_${guild.id}`) === null) perm = client.user.id === message.author.id || guild.owner.id === message.author.id || client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || db.get(`wlmd_${guild.id}_${message.author.id}`) === true
    if (db.get(`linkwl_${guild.id}`) === true) perm = client.user.id === message.author.id || guild.owner.id === message.author.id || client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true
    if (db.get(`link_${guild.id}`) === true && !perm) {
        let pub;
        if (db.get(`linktype_${guild.id}`) === null || db.get(`linktype_${guild.id}`).toLowerCase() === "Invite") {
            pub = [
                "discord.me",
                "discord.io",
                "discord.gg",
                "invite.me",
                "discordapp.com/invite",
                ".gg"
            ];


        }
        if (db.get(`typelink_${guild.id}`) === " all") {
            pub = [
                "discord.me",
                "discord.com",
                "discord.io",
                "discord.gg",
                "invite.me",
                "discord.gg/",
                "discord.",
                "discordapp.com/invite",
                ".gg",
                "https",
                "http",
                "https:"

            ];
        }

        if (pub.some(word => message.content.includes(word))) {

            message.delete().then(() => {
                db.add(`warn_${message.author.id}`, 1)
                let warnID =  random_string.generate({
                    charset: 'numeric',
                    length: 8
                });



            db.push(`info.${message.guild.id}.${message.author.id}`, { moderator: `Moi`, reason: "Message Contenant un lien", date: Date.parse(new Date) / 1000, id: warnID })
            db.add(`number.${message.guild.id}.${message.author.id}`, 1)
                return message.channel.send(`${message.author} vous n'avez pas l'autorisation d'envoyer des liens ici`).then(msg => { msg.delete({ timeout: 3000 }) }).catch(err => message.delete());
            })

            if (db.get(`warn_${message.author.id}`) <= 3) {
                message.member.roles.add(muterole.id).catch(err => [])
                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setDescription(`${message.author} a été **mute** pour avoir \`spam des invitations\``)
                if (raidlog) raidlog.send(embed)
            } else
                if (db.get(`warn_${message.author.id}`) <= 5) {

                    message.member.kick().catch(err => [])
                    const embed = new Discord.MessageEmbed()
                        .setColor(color)
                        .setDescription(`${message.author} a été **kick** pour avoir \`spam des invitations\``)
                    if (raidlog) raidlog.send(embed)
                } else if (db.get(`warn_${message.author.id}`) <= 9) {
                    message.member.ban().catch(err => [])
                    const embed = new Discord.MessageEmbed()
                        .setColor(color)
                        .setDescription(`${message.author} a été **ban** pour avoir \`spam des invitations\``)
                    if (raidlog) raidlog.send(embed)

                }


            setInterval(async () => {
                db.delete(`warn_${message.author.id}`)

            }, 60 * 60000);
        }


    }
}