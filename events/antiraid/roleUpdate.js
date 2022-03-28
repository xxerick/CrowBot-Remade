const axios = require('axios');         
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = async (client, oldRole, newRole) => {
    console.log(oldRole.name)
    const guild = oldRole.guild
   const color = db.get(`color_${guild.id}`) === null? client.config.color:db.get(`color_${guild.id}`)
   const arabe= await guild.fetchAuditLogs({ limit: 1, type: "ROLE_UPDATE" }).then(async (audit) => audit.entries.first());
 if( arabe.executor.id) {
    console.log(newRole.id)

   let perm = ""
   if (db.get(`rolesmodwl_${guild.id}`) === null) perm = client.user.id === arabe.executor.id  || guild.owner.id === arabe.executor.id  || client.client.config.owner.includes(arabe.executor.id ) || db.get(`ownermd_${client.user.id}_${arabe.executor.id }`) === true || db.get(`wlmd_${guild.id}_${arabe.executor.id }`) === true
   if (db.get(`rolesmodwl_${guild.id}`) === true) perm = client.user.id === arabe.executor.id  || guild.owner.id === arabe.executor.id  || client.client.config.owner.includes(arabe.executor.id ) || db.get(`ownermd_${client.user.id}_${arabe.executor.id }`) === true
   if (db.get(`rolesmod_${guild.id}`) === true && !perm) {
    console.log(newRole.name)

       const raidlog =  guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
 
       if (db.get(`rolesmodsanction_${guild.id}`) === "ban") {
                 
 
           axios({
               url: `https://discord.com/api/v9/guilds/${guild.id}/bans/${arabe.executor.id }`,
               method: 'PUT',
               headers: {
                   Authorization: `bot ${client.config.token}`
               },
               data: {
                   delete_message_days: '1',
                   reason: 'Antirole'
               }
            }).then(() => {
           newRole.edit({
               data: {
                   name: oldRole.name,
                   color: oldRole.hexColor,
                   permissions: oldRole.permissions,
                   hoist: oldRole.hoist,
                   mentionable: oldRole.mentionable,
                   position: oldRole.rawPosition,
                   highest: oldRole.highest,
                   reason: `Antirole`
               }
 
           })
            //    if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${arabe.executor.id }> a modifier le rôle ${oldRole}, il a été **ban** !`))
           }
            ).catch(() => {
           newRole.edit({
               data: {
                   name: oldRole.name,
                   color: oldRole.hexColor,
                   permissions: oldRole.permissions,
                   hoist: oldRole.hoist,
                   mentionable: oldRole.mentionable,
                   position: oldRole.rawPosition,
                   highest: oldRole.highest,
                   reason: `Antirole`
               }
 
           })
            //    if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${arabe.executor.id }> a modifier le rôle ${oldRole}, mais il n'a pas pu être **ban** !`))
 
           }
           )
   } else if (db.get(`rolesmodsanction_${guild.id}`) === "kick") {
       guild.members.cache.get(arabe.executor.id ).kick().then(() => {
       newRole.edit({
               data: {
                   name: oldRole.name,
                   color: oldRole.hexColor,
                   permissions: oldRole.permissions,
                   hoist: oldRole.hoist,
                   mentionable: oldRole.mentionable,
                   position: oldRole.rawPosition,
                   highest: oldRole.highest,
                   reason: `Antirole`
               }
 
           })
        //    if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${arabe.executor.id }> a modifier le rôle ${oldRole}, il a été **kick** !`))
       }).catch(() => {
       newRole.edit({
               data: {
                   name: oldRole.name,
                   color: oldRole.hexColor,
                   permissions: oldRole.permissions,
                   hoist: oldRole.hoist,
                   mentionable: oldRole.mentionable,
                   position: oldRole.rawPosition,
                   highest: oldRole.highest,
                   reason: `Antirole`
               }
 
           })
        //    if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${arabe.executor.id }> a modifier le rôle ${oldRole}, mais il n'a pas pu être **kick** !`))
       })
   } else if (db.get(`rolesmodsanction_${guild.id}`) === "derank") {
 
       guild.members.cache.get(arabe.executor.id ).roles.set([]).then(() => {
 
       newRole.edit({
               data: {
                   name: oldRole.name,
                   color: oldRole.hexColor,
                   permissions: oldRole.permissions,
                   hoist: oldRole.hoist,
                   mentionable: oldRole.mentionable,
                   position: oldRole.rawPosition,
                   highest: oldRole.highest,
                   reason: `Antirole`
               }
 
           })
        //    if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${arabe.executor.id }> a modifier le rôle ${oldRole}, il a été **derank** !`))
       }).catch(() => {
       newRole.edit({
               data: {
                   name: oldRole.name,
                   color: oldRole.hexColor,
                   permissions: oldRole.permissions,
                   hoist: oldRole.hoist,
                   mentionable: oldRole.mentionable,
                   position: oldRole.rawPosition,
                   highest: oldRole.highest,
                   reason: `Antirole`
               }
 
           })
        //    if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${arabe.executor.id }> a modifier le rôle ${oldRole}, mais il n'a pas pu être **derank** !`))
       })
   }
   
 
 }
     
 
   }


}