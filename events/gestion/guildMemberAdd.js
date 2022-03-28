const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = async (client, member) => {
    const guild = member.guild
    const color = db.get(`color_${guild.id}`) === null ? client.config.color : db.get(`color_${guild.id}`)
    let rr = member.guild.roles.cache.get(db.get(`autorole_${member.guild.id}`))
    if(rr) member.roles.add(rr.id)
    

    let joindm = db.get(`joindmee_${member.guild.id}`)
    if (joindm) member.send(joindm.replace("{user}", member)
        .replace("{user:username}", member.username)
        .replace("{user:tag}", member.tag)
        .replace("{user:id}", member.id)
        .replace("{guild:name}", member.guild.name)
        .replace("{guild:member}", member.guild.memberCount)
    )

    

}
