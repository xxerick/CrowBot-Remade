const Discord = require("discord.js");
const disbut = require("discord-buttons")
const db = require("quick.db")

module.exports = (client) => {
    console.log(`- Conecter ${client.user.username}`)
    client.guilds.cache.map(async guild => {
        await guild.members.fetch().catch(e => { })
    })
}
