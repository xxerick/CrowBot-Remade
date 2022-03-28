const axios = require('axios');         
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = async (client, oldChannel, newChannel) => {
    const guild = oldChannel.guild
    const color = db.get(`color_${guild.id}`) === null? client.config.color:db.get(`color_${guild.id}`)
    const raidlog =  guild.channels.cache.get(db.get(`${guild.id}.raidlog`))

    axios.get(`https://discord.com/api/v9/guilds/${oldChannel.guild.id}/audit-logs?ilimit=1&action_type=11`, {
        headers: {
            Authorization: `Bot ${client.config.token}`
        }
    }).then(response => {
        if (response.data && response.data.audit_log_entries[0].user_id) {
            let perm = ""
            if (db.get(`channelsmodwl_${guild.id}`) === null) perm = client.user.id === response.data.audit_log_entries[0].user_id || guild.owner.id === response.data.audit_log_entries[0].user_id || client.config.owner.includes(response.data.audit_log_entries[0].user_id) || db.get(`ownermd_${client.user.id}_${response.data.audit_log_entries[0].user_id}`) === true || db.get(`wlmd_${guild.id}_${response.data.audit_log_entries[0].user_id}`) === true
            if (db.get(`channelsmodwl_${guild.id}`) === true) perm = client.user.id === response.data.audit_log_entries[0].user_id || guild.owner.id === response.data.audit_log_entries[0].user_id || client.config.owner.includes(response.data.audit_log_entries[0].user_id) || db.get(`ownermd_${client.user.id}_${response.data.audit_log_entries[0].user_id}`) === true
            if (db.get(`channelsmod_${guild.id}`) === true && !perm) {
                if (db.get(`channelsmodsanction_${guild.id}`) === "ban") {
                    axios({
                        url: `https://discord.com/api/v9/guilds/${guild.id}/bans/${response.data.audit_log_entries[0].user_id}`,
                        method: 'PUT',
                        headers: {
                            Authorization: `bot ${client.config.token}`
                        },
                        data: {
                            delete_message_days: '1',
                            reason: 'Antichannel'
                        }
                    }).then(() => {
                        
                        if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a modifier le salon ${oldChannel}, il a été **ban** !`))
                    }
                    ).catch(() => {
                        
                        if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a modifier le salon ${oldChannel}, mais il n'a pas pu être **ban** !`))

                    }
                    )
                } else if (db.get(`channelsmodsanction_${guild.id}`) === "kick") {
                    guild.members.cache.get(response.data.audit_log_entries[0].user_id).kick().then(() => {
                        
                        if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a modifier le salon ${oldChannel}, il a été **kick** !`))
                    }).catch(() => {
                        
                        if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a modifier le salon ${oldChannel}, mais il n'a pas pu être **kick** !`))
                    })
                } else if (db.get(`channelsmodsanction_${guild.id}`) === "derank") {

                    guild.members.cache.get(response.data.audit_log_entries[0].user_id).roles.set([]).then(() => {

                        
                        if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a modifier le salon ${oldChannel}, il a été **derank** !`))
                    }).catch(() => {
                        
                        if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a modifier le salon ${oldChannel}, mais il n'a pas pu être **derank** !`))
                    })
                }

                newChannel.edit({
                    name: oldChannel.name,
                    permissions: oldChannel.permissionsOverwrites,
                    type: oldChannel.type,
                    topic: oldChannel.withTopic,
                    nsfw: oldChannel.nsfw,
                    birate: oldChannel.bitrate,
                    userLimit: oldChannel.userLimit,
                    rateLimitPerUser: oldChannel.rateLimitPerUser,
                    position: oldChannel.rawPosition,
                    reason: `Antichannel`
                })
                newChannel.overwritePermissions(oldChannel.permissionOverwrites)
        }
    
    }

    });



}





