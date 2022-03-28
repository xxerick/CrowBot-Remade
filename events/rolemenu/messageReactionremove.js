const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = async (client, reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    const { guild } = reaction.message;
    if (!guild) return;
    if (!guild.me.hasPermission("MANAGE_ROLES")) return;
    const member = guild.members.cache.get(user.id);
    if (!member) return;
    const data = db.get(`reactions_${guild.id}`)
    if (!data) return;
    const reaction2 = data.find(
        (r) => r.emoji === reaction.emoji.toString() && r.msg === reaction.message.id
    );
    if (!reaction2) return;
    member.roles.remove(reaction2.roleId).catch(err => undefined);

}