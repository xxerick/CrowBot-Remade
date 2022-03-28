const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")
const Discord = require("discord.js")

module.exports = async (client, member) => {
    const guild = member.guild
    const raidlog = guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
    const color = db.get(`color_${guild.id}`) === null ? client.config.color : db.get(`color_${guild.id}`)

    if (db.get(`antitoken_${member.guild.id}`) === true) {
        // let maxMembers = db.get(`antitokenlimmit1_${member.guild.id}`) || 10 //Nombres de membres max
        // let maxTime = ms(db.get(`antitokenlimmit2_${member.guild.id}`) || "10s"); //temps en millisecondes 1000ms = 1s
        // let last10Members = guild.members.cache.filter(member => member.joinedAt <= (Date.now() - maxTime)) //Prendre les 10 derniers membres qui sont arrivés y'a 10 secondes
        // if (last10Members.size > maxMembers) return;
        // const a = []
        // last10Members.forEach(user => {
        //     user.ban({ reason: "Antimassjoin" }).then(() => {
        //         a.push(user.id)
        //     })
        // })
        // if(!a) return undefined
        // const embed = new Discord.MessageEmbed()
        //     .setColor(color)
        //     .setDescription(`${a.map(u => `<@${u}>`).join(", ")} on été **ban** pour avoir \`rejoint le serveur en même temps\``)
        // if (raidlog) raidlog.send(embed)




    }

    if (db.get(`crealimit_${member.guild.id}`) === true) {
        const duration = ms(db.get(`crealimittemps_${member.guild.id}`) || "0s");
        let created = member.user.createdTimestamp;
        let sum = created + duration;
        let diff = Date.now() - sum;

        if (diff < 0) {

            member.kick()
        }
        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`${member} à été **kick** parce que \`sont compte à été crée trop résamment\``)
        if (raidlog) raidlog.send(embed)
    }

    if (db.get(`blmd_${client.user.id}_${member.id}`) === true) {
        member.ban().then(() => {
            if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`${member} a rejoins alors qu'il êtait blacklist, il a été **ban**`))

        }).catch(() => {
            if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`${member} a rejoins alors qu'il êtait blacklist, mais il n'a pas pu être **ban**`))

        })
    }

    if (member.user.bot) {
        const action = await guild.fetchAuditLogs({ limit: 1, type: "BOT_ADD" }).then(async (audit) => audit.entries.first())
        if ( action.executor.id) {
            let perm = ""
            if (db.get(`botwl_${guild.id}`) === null) perm = client.user.id === action.executor.id || guild.owner.id === action.executor.id || client.config.owner.includes(action.executor.id) || db.get(`ownermd_${client.user.id}_${action.executor.id}`) === true || db.get(`wlmd_${guild.id}_${action.executor.id}`) === true
            if (db.get(`botwl_${guild.id}`) === true) perm = client.user.id === action.executor.id || guild.owner.id === action.executor.id || client.config.owner.includes(action.executor.id) || db.get(`ownermd_${client.user.id}_${action.executor.id}`) === true
            if (db.get(`bot_${guild.id}`) === true && !perm) {
                if (db.get(`botsanction_${guild.id}`) === "ban") {
                    axios({
                        url: `https://discord.com/api/v9/guilds/${guild.id}/bans/${action.executor.id}`,
                        method: 'PUT',
                        headers: {
                            Authorization: `bot ${client.config.token}`
                        },
                        data: {
                            delete_message_days: '1',
                            reason: 'Antiban'
                        }
                    }).then(() => {

                        if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a inviter le bot ${member}, il a été **ban** !`))
                    }
                    ).catch(() => {

                        if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a inviter le bot ${member}, mais il n'a pas pu être **ban** !`))

                    }
                    )
                } else if (db.get(`botsanction_${guild.id}`) === "kick") {
                    guild.users.cache.get(action.executor.id).kick().then(() => {

                        if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a inviter le bot ${member}, il a été **kick** !`))
                    }).catch(() => {

                        if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a inviter le bot ${member}, mais il n'a pas pu être **kick** !`))
                    })
                } else if (db.get(`botsanction_${guild.id}`) === "derank") {

                    guild.users.cache.get(action.executor.id).roles.set([]).then(() => {


                        if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a inviter le bot ${member}, il a été **derank** !`))
                    }).catch(() => {

                        if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a inviter le bot ${member}, mais il n'a pas pu être **derank** !`))
                    })
                }

            }
        }

    } 
     


}
