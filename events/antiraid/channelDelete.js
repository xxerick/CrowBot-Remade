const axios = require('axios');         
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = (client, channel) => {

    const guild = channel.guild
   const color = db.get(`color_${guild.id}`) === null? client.config.color:db.get(`color_${guild.id}`)

    try {

        // -- Audit Logs
        axios.get(`https://discord.com/api/v9/guilds/${guild.id}/audit-logs?ilimit=1&action_type=12`, {
            headers: {
                Authorization: `Bot ${client.config.bot.master}`
            }
        }).then(response => {
            if (response.data && response.data.audit_log_entries[0].user_id) {
                let perm = ""
                if (db.get(`channelsdelwl_${guild.id}`) === null) perm = client.user.id === response.data.audit_log_entries[0].user_id || guild.owner.id === response.data.audit_log_entries[0].user_id || client.config.owner.includes(response.data.audit_log_entries[0].user_id) || db.get(`ownermd_${client.user.id}_${response.data.audit_log_entries[0].user_id}`) === true || db.get(`wlmd_${guild.id}_${response.data.audit_log_entries[0].user_id}`) === true
                if (db.get(`channelsdelwl_${guild.id}`) === true) perm = client.user.id === response.data.audit_log_entries[0].user_id || guild.owner.id === response.data.audit_log_entries[0].user_id || client.config.owner.includes(response.data.audit_log_entries[0].user_id) || db.get(`ownermd_${client.user.id}_${response.data.audit_log_entries[0].user_id}`) === true
              
               if (db.get(`channelsdel_${guild.id}`) === true && !perm) {
                    const raidlog =  guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
                    if (db.get(`channelsdelsanction_${guild.id}`) === "ban") {
                        axios({
                            url: `https://discord.com/api/v9/guilds/${guild.id}/bans/${response.data.audit_log_entries[0].user_id}`,
                            method: 'PUT',
                            headers: {
                                Authorization: `Bot ${client.config.bot.master}`
                            },
                            data: {
                                delete_message_days: '1',
                                reason: 'Antichannel'
                            }
                        }).then(() => {
                            channel.clone({
                                name: channel.name,
                                permissions: channel.permissionsOverwrites,
                                type: channel.type,
                               //  parent: channel.parent,
                                topic: channel.withTopic,
                                nsfw: channel.nsfw,
                                birate: channel.bitrate,
                                userLimit: channel.userLimit,
                                rateLimitPerUser: channel.rateLimitPerUser,
                                permissions: channel.withPermissions,
                                position: channel.rawPosition,
                                reason: `Antichannel`
                            })
                            if(raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a supprimé le salon \`${channel.name}\`, il a été **ban** !`))
                        }
                        ).catch(() => {
                            channel.clone({
                                name: channel.name,
                                permissions: channel.permissionsOverwrites,
                                type: channel.type,
                               //  parent: channel.parent,
                                topic: channel.withTopic,
                                nsfw: channel.nsfw,
                                birate: channel.bitrate,
                                userLimit: channel.userLimit,
                                rateLimitPerUser: channel.rateLimitPerUser,
                                permissions: channel.withPermissions,
                                position: channel.rawPosition,
                                reason: `Antichannel`
                            })
                           if(raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a supprimé le salon \`${channel.name}\`, mais il n'a pas pu être **ban** !`))

                        }
                        )
                    } else if (db.get(`channelsdelsanction_${guild.id}`) === "kick") {
                        guild.members.cache.get(response.data.audit_log_entries[0].user_id).kick().then(() => {
channel.clone({
        name: channel.name,
        permissions: channel.permissionsOverwrites,
        type: channel.type,
       //  parent: channel.parent,
        topic: channel.withTopic,
        nsfw: channel.nsfw,
        birate: channel.bitrate,
        userLimit: channel.userLimit,
        rateLimitPerUser: channel.rateLimitPerUser,
        permissions: channel.withPermissions,
        position: channel.rawPosition,
        reason: `Antichannel`
    })
                           if(raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a supprimé le salon \`${channel.name}\`, il a été **kick** !`))
                        }).catch(() => {channel.clone({
        name: channel.name,
        permissions: channel.permissionsOverwrites,
        type: channel.type,
       //  parent: channel.parent,
        topic: channel.withTopic,
        nsfw: channel.nsfw,
        birate: channel.bitrate,
        userLimit: channel.userLimit,
        rateLimitPerUser: channel.rateLimitPerUser,
        permissions: channel.withPermissions,
        position: channel.rawPosition,
        reason: `Antichannel`
    })
                           if(raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a supprimé le salon \`${channel.name}\`, mais il n'a pas pu être **kick** !`))
                        })
                    } else if (db.get(`channelsdelsanction_${guild.id}`) === "derank") {

guild.members.cache.get(response.data.audit_log_entries[0].user_id).roles.set([]).then(() => {

  channel.clone({
        name: channel.name,
        permissions: channel.permissionsOverwrites,
        type: channel.type,
       //  parent: channel.parent,
        topic: channel.withTopic,
        nsfw: channel.nsfw,
        birate: channel.bitrate,
        userLimit: channel.userLimit,
        rateLimitPerUser: channel.rateLimitPerUser,
        permissions: channel.withPermissions,
        position: channel.rawPosition,
        reason: `Antichannel`
    })
   if(raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a supprimé le salon \`${channel.name}\`, il a été **derank** !`))
}).catch(() => {
  channel.clone({
        name: channel.name,
        permissions: channel.permissionsOverwrites,
        type: channel.type,
       //  parent: channel.parent,
        topic: channel.withTopic,
        nsfw: channel.nsfw,
        birate: channel.bitrate,
        userLimit: channel.userLimit,
        rateLimitPerUser: channel.rateLimitPerUser,
        permissions: channel.withPermissions,
        position: channel.rawPosition,
        reason: `Antichannel`
    })
   if(raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a supprimé le salon \`${channel.name}\`, mais il n'a pas pu être **derank** !`))
})
                    }



                }


            }


        });

    } catch (error) {
        return
    }



};
