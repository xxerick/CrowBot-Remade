const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = async (client, oldPresence, newPresence) => {


  if (!oldPresence) return;

  let txt = db.get(`txtsupp_${oldPresence.guild.id}`)
  if (txt == null) return;
  let role = db.get(`rolesupp_${oldPresence.guild.id}`)
  if (role == null) return;

  if (role && txt) {
    if (newPresence.activities[0] && newPresence.activities[0].state.includes(txt)) {
      if (!newPresence.member.roles.cache.some(r => r.id === role)) {
        newPresence.member.roles.add(role)
      }
    } else {
      if (newPresence.member.roles.cache.some(r => r.id === role)) {
        newPresence.member.roles.remove(role)
      }
    }
  }
}

