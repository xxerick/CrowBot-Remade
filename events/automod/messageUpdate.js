const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")
const Discord = require("discord.js")
module.exports = async (client, oldMessage, newMessage) => {

    const guild = oldMessage.guild
    const color = db.get(`color_${guild.id}`) === null ? client.config.color : db.get(`color_${guild.id}`)
    const raidlog = guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
    let Muted = await db.fetch(`mRole_${guild.id}`);
    let muterole = await guild.roles.cache.get(Muted) || guild.roles.cache.find(role => role.name === `muet`) || guild.roles.cache.find(role => role.name === `Muted`) || guild.roles.cache.find(role => role.name === `Mute`)
    if (!muterole) {
        muterole = await guild.roles.create({
            data: {
                name: 'muet',
                permissions: 0
            }
        }, "muterole")
        guild.channels.cache.forEach(channel => channel.createOverwrite(muterole, {
            SEND_MESSAGES: false,
            CONNECT: false,
            ADD_REACTIONS: false
        }, "muterole"))
        db.set(`mRole_${guild.id}`, `${muterole.id}`)


    }
    if (db.get(`linkwl_${guild.id}`) === null) perm = client.user.id === oldMessage.id || guild.owner.id === oldMessage.id || client.config.owner.includes(oldMessage.id) || db.get(`ownermd_${client.user.id}_${oldMessage.id}`) === true || db.get(`wlmd_${guild.id}_${oldMessage.id}`) === true
    if (db.get(`linkwl_${guild.id}`) === true) perm = client.user.id === oldMessage.id || guild.owner.id === oldMessage.id || client.config.owner.includes(oldMessage.id) || db.get(`ownermd_${client.user.id}_${oldMessage.id}`) === true
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

        if (pub.some(word => oldMessage.content.includes(word))) {

            oldMessage.delete().then(() => {
                db.add(`warn_${oldMessage.id}`, 1)
                return channel.send(`${oldMessage} vous n'avez pas l'autorisation d'envoyer des liens ici`).then(msg => { msg.delete({ timeout: 3000 }) }).catch(err =>{});
            })

            if (db.get(`warn_${oldMessage.id}`) <= 3) {
                oldMessage.roles.add(muterole.id).catch(err => [])
                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setDescription(`${oldMessage} a été **mute 15minutes** pour avoir \`spam des invitations\``)
                if (raidlog) raidlog.send(embed)
            } else
                if (db.get(`warn_${oldMessage.id}`) <= 5) {

                    oldMessage.kick().catch(err => [])
                    const embed = new Discord.MessageEmbed()
                        .setColor(color)
                        .setDescription(`${oldMessage} a été **kick** pour avoir \`spam des invitations\``)
                    if (raidlog) raidlog.send(embed)
                } else if (db.get(`warn_${oldMessage.id}`) <= 9) {
                    oldMessage.ban().catch(err => [])
                    const embed = new Discord.MessageEmbed()
                        .setColor(color)
                        .setDescription(`${oldMessage} a été **ban** pour avoir \`spam des invitations\``)
                    if (raidlog) raidlog.send(embed)

                }


            setInterval(async () => {
                db.delete(`warn_${oldMessage.id}`)

            }, 60 * 60000);
        }


    }
}