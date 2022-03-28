const axios = require('axios');         
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = (client, channel) => {
    const guild = channel.guild
    if(!guild) return;
    
   const color = db.get(`color_${guild.id}`) === null? client.config.color:db.get(`color_${guild.id}`)

    try {    // -- Audit Logs
        axios.get(`https://discord.com/api/v9/guilds/${guild.id}/audit-logs?ilimit=1&action_type=10`, {
            headers: {
                Authorization: `Bot ${client.config.token}`
            }
        }).then(response => {
            if (response.data && response.data.audit_log_entries[0].user_id) {
                let perm = ""
                if (db.get(`channelscreatewl_${guild.id}`) === null) perm = client.user.id === response.data.audit_log_entries[0].user_id || guild.owner.id === response.data.audit_log_entries[0].user_id || client.config.owner.includes(response.data.audit_log_entries[0].user_id) || db.get(`ownermd_${client.user.id}_${response.data.audit_log_entries[0].user_id}`) === true || db.get(`wlmd_${guild.id}_${response.data.audit_log_entries[0].user_id}`) === true
                if (db.get(`channelscreatewl_${guild.id}`) === true) perm = client.user.id === response.data.audit_log_entries[0].user_id || guild.owner.id === response.data.audit_log_entries[0].user_id || client.config.owner.includes(response.data.audit_log_entries[0].user_id) || db.get(`ownermd_${client.user.id}_${response.data.audit_log_entries[0].user_id}`) === true
             if (db.get(`channelscreate_${guild.id}`) === true && !perm) {
                    const raidlog =  guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
                    if (db.get(`channelscreatesanction_${guild.id}`) === "ban") {
                        axios({
                            url: `https://discord.com/api/v9/guilds/${guild.id}/bans/${response.data.audit_log_entries[0].user_id}`,
                            method: 'PUT',
                            headers: {
                                Authorization: `Bot ${client.config.token}`
                            },
                            data: {
                                delete_message_days: '1',
                                reason: 'Antichannel'
                            }
                        }).then(() => {
                             axios({
                                url: `https://discord.com/api/v9/channels/${channel.id}`,
                                method: `DELETE`,
                                headers: {
                                    Authorization: `Bot ${client.config.token}`
                                }
                            })
                            if(raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a crée le salon \`${channel.name}\`, il a été **ban** !`))
                        }
                        ).catch(() => {
                             axios({
                                url: `https://discord.com/api/v9/channels/${channel.id}`,
                                method: `DELETE`,
                                headers: {
                                    Authorization: `Bot ${client.config.token}`
                                }
                           })
                           if(raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a crée le salon \`${channel.name}\`, mais il n'a pas pu être **ban** !`))

                        }
                        )
                    } else if (db.get(`channelscreatesanction_${guild.id}`) === "kick") {
                        guild.members.cache.get(response.data.audit_log_entries[0].user_id).kick().then(() => {

                            axios({
                                url: `https://discord.com/api/v9/channels/${channel.id}`,
                                method: `DELETE`,
                                headers: {
                                    Authorization: `Bot ${client.config.token}`
                                }
                           })
                           if(raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a crée le salon \`${channel.name}\`, il a été **kick** !`))
                        }).catch(() => {
                            axios({
                                url: `https://discord.com/api/v9/channels/${channel.id}`,
                                method: `DELETE`,
                                headers: {
                                    Authorization: `Bot ${client.config.token}`
                                }
                           })
                           if(raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a crée le salon \`${channel.name}\`, mais il n'a pas pu être **kick** !`))
                        })
                    } else if (db.get(`channelscreatesanction_${guild.id}`) === "derank") {

guild.members.cache.get(response.data.audit_log_entries[0].user_id).roles.set([]).then(() => {

    axios({
        url: `https://discord.com/api/v9/channels/${channel.id}`,
        method: `DELETE`,
        headers: {
            Authorization: `Bot ${client.config.token}`
        }
   })
   if(raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a crée le salon \`${channel.name}\`, il a été **derank** !`))
}).catch(() => {
    axios({
        url: `https://discord.com/api/v9/channels/${channel.id}`,
        method: `DELETE`,
        headers: {
            Authorization: `Bot ${client.config.token}`
        }
   })
   if(raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a crée le salon \`${channel.name}\`, mais il n'a pas pu être **derank** !`))
})
                    }



                }


            }


        });

    } catch (error) {
        return
    }



};
