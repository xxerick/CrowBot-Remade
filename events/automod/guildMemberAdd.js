const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = async (client, member) => {
    const guild = member.guild
    const color = db.get(`color_${guild.id}`) === null ? client.config.color : db.get(`color_${guild.id}`)
    let ee = db.get(`mute_${member.guild.id}_${member.id}`)
    let muteRole = await db.fetch(`mRole_${member.guild.id}`);
    if (ee !== true) if (muteRole !== null) member.roles.add(muteRole, `Automod`)

}
