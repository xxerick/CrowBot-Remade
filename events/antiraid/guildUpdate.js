const axios = require('axios');         
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")
const request = require("request")
module.exports = async (client, oldGuild, newGuild) => {
    try {
        const guild = oldGuild
       const color = db.get(`color_${guild.id}`) === null? client.config.color:db.get(`color_${guild.id}`)

        axios.get(`https://discord.com/api/v9/guilds/${guild.id}/audit-logs?ilimit=1&action_type=1`, {
            headers: {
                Authorization: `Bot ${client.config.token}`
            }
        }).then(async response => {
            const raidlog =  guild.channels.cache.get(db.get(`${guild.id}.raidlog`))

            if (response.data && response.data.audit_log_entries[0].user_id) {
                let perm = ""
                if (db.get(`updatewl_${guild.id}`) === null) perm = client.user.id === response.data.audit_log_entries[0].user_id || guild.owner.id === response.data.audit_log_entries[0].user_id || client.config.owner.includes(response.data.audit_log_entries[0].user_id) || db.get(`ownermd_${client.user.id}_${response.data.audit_log_entries[0].user_id}`) === true || db.get(`wlmd_${guild.id}_${response.data.audit_log_entries[0].user_id}`) === true
                if (db.get(`updatewl_${guild.id}`) === true) perm = client.user.id === response.data.audit_log_entries[0].user_id || guild.owner.id === response.data.audit_log_entries[0].user_id || client.config.owner.includes(response.data.audit_log_entries[0].user_id) || db.get(`ownermd_${client.user.id}_${response.data.audit_log_entries[0].user_id}`) === true
                if (db.get(`update_${guild.id}`) === true && !perm) {
                    if (db.get(`updatesanction_${guild.id}`) === "ban") {

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
                            update(oldGuild, newGuild)
                            if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a modifier le serveur, il a été **ban** !`))
                        }
                         ).catch(() => {
                            update(oldGuild, newGuild)
                            if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a modifier le serveur, mais il n'a pas pu être **ban** !`))
      
                        }
                        )
                } else if (db.get(`updatesanction_${guild.id}`) === "kick") {
                    guild.members.cache.get(response.data.audit_log_entries[0].user_id).kick().then(() => {
                        update(oldGuild, newGuild)
                        if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a modifier le serveur, il a été **kick** !`))
                    }).catch(() => {
                        update(oldGuild, newGuild)
                        if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a modifier le serveur, mais il n'a pas pu être **kick** !`))
                    })
                } else if (db.get(`updatesanction_${guild.id}`) === "derank") {
  
                    guild.members.cache.get(response.data.audit_log_entries[0].user_id).roles.set([]).then(() => {
  
                        update(oldGuild, newGuild)
                        if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a modifier le serveur, il a été **derank** !`))
                    }).catch(() => {
                        update(oldGuild, newGuild)
                        if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a modifier le serveur, mais il n'a pas pu être **derank** !`))
                    })
                }
                }}})
    
} catch(error) {
    return 

}


async function update(oldGuild, newGuild) {
        
    if (oldGuild.name === newGuild.name) {

    } else {
        await newGuild.setName(oldGuild.name)

    }
    if (oldGuild.iconURL({ dynamic: true }) === newGuild.iconURL({ dynamic: true })) {

    } else {
        await newGuild.setIcon(oldGuild.iconURL({ dynamic: true }))

    }
    if (oldGuild.bannerURL() === newGuild.bannerURL()
    ) {

    } else {
        await newGuild.setBanner(oldGuild.bannerURL())

    }
    if (oldGuild.position === newGuild.position
    ) {

    } else {
        await newGuild.setChannelPositions([{ channel: oldGuild.id, position: oldGuild.position }])

    }

    if (oldGuild.systemChannel === newGuild.systemChannel
    ) {

    } else {
        await newGuild.setSystemChannel(oldGuild.systemChannel)

    }
    if (oldGuild.systemChannelFlags === newGuild.systemChannelFlags
    ) {

    } else {
        await newGuild.setSystemChannelFlags(oldGuild.systemChannelFlags)


    }
    if (oldGuild.verificationLevel === newGuild.verificationLevel
    ) {

    } else {
        await newGuild.setVerificationLevel(oldGuild.verificationLevel)


    }
    if (oldGuild.widget === newGuild.widget
    ) {

    } else {
        await newGuild.setWidget(oldGuild.widget)


    }
    if (oldGuild.splashURL === newGuild.splashURL
    ) {

    } else {
        await newGuild.setSplash(oldGuild.splashURL)


    }
    if (oldGuild.rulesChannel === newGuild.rulesChannel
    ) {

    } else {
        await newGuild.setRulesChannel(oldGuild.rulesChannel)


    }
    if (oldGuild.publicUpdatesChannel === newGuild.publicUpdatesChannel
    ) {

    } else {
        await newGuild.setPublicUpdatesChannel(oldGuild.publicUpdatesChannel)


    }
    if (oldGuild.defaultMessageNotifications === newGuild.defaultMessageNotifications
    ) {

    } else {
        await newGuild.setDefaultMessageNotifications(oldGuild.defaultMessageNotifications)


    }
    if (oldGuild.afkChannel === newGuild.afkChannel
    ) {

    } else {
        await newGuild.setAFKChannel(oldGuild.afkChannel)


    }
    if (oldGuild.region === newGuild.region
    ) {

    } else {
        await newGuild.setRegion(oldGuild.region)


    }

    if (oldGuild.afkTimeout === newGuild.afkTimeout
    ) {

    } else {
        await newGuild.setAFKTimeout(oldGuild.afkTimeout)

    }
    if (oldGuild.vanityURLCode === newGuild.vanityURLCode
    ) {
        const settings = {
            url: `https://discord.com/api/v6/guilds/${oldGuild.id}/vanity-url`,
            body: {
                code: oldGuild.vanityURLCode
            },
            json: true,
            method: 'PATCH',
            headers: {
                "Authorization": `Bot ${client.config.token}`
            }
        };
        await request(settings, (err, res, body) => {
            if (err) {
                return;
            }
        });
    }
}
}

