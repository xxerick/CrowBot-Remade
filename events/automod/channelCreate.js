const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = async (client, channel) => {
    const guild = channel.guild
    const color = db.get(`color_${guild.id}`) === null ? client.config.color : db.get(`color_${guild.id}`)

    let Muted = await db.fetch(`mRole_${channel.guild.id}`);
    let muteRole = await channel.guild.roles.cache.get(Muted) || channel.guild.roles.cache.find(role => role.name === `muet`) || channel.guild.roles.cache.find(role => role.name === `Muted`) || channel.guild.roles.cache.find(role => role.name === `Mute`)

    if (!muteRole) {

    } else {
        await channel.createOverwrite(muteRole, {
            SEND_channelS: false,
            CONNECT: false,
            ADD_REACTIONS: false
        })
    }


};
