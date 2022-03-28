const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const embed = require('../../commands/gestion/embed');

module.exports = async (client, member) => {

    if(member.partial) member = await member.fetch();
    const color = db.get(`color_${member.guild.id}`) === null ? client.config.color : db.get(`color_${member.guild.id}`)

if(db.get(`joinmessageembed_${member.guild.id}`) !== null) {
  let welcomeChannel = await client.channels.fetch(db.get(`joinchannelmessage_${member.guild.id}`)).catch(err => {});
  if(member.user.bot && welcomeChannel) return welcomeChannel.send(new MessageEmbed().setColor(color).setDescription(`Le bot ${member.toString()} nous a rejoint en utilisant ***l'api OAuth2***`)).catch(err => {});
  const cachedInvites = client.guildInvites.get(member.guild.id);
  const newInvites = await member.guild.fetchInvites();
  if(member.guild.vanityURLCode) newInvites.set(member.guild.vanityURLCode, await member.guild.fetchVanityData());
  client.guildInvites.set(member.guild.id, newInvites);
  const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
  if(!usedInvite) return welcomeChannel.send(new MessageEmbed().setColor(color).setDescription(`**Je n'arrive pas à trouver** comment ${member.toString()} a rejoint le serveur.`)).catch(err => {});
  if(usedInvite.code === member.guild.vanityURLCode) {
     if(welcomeChannel) welcomeChannel.send(new MessageEmbed().setColor(color).setDescription(`${member.toString()} nous a rejoint en utilisant ***le lien d'invitation personnalisé du serveur.***`));
      db.set(`inviter_${member.guild.id}_${member.id}`, "vanity");
      return;
  };
let invite = db.add(`invites_${member.guild.id}_${usedInvite.inviter.id}`, 1);
let iv2= usedInvite.inviter
  db.set(`inviter_${member.guild.id}_${member.id}`, usedInvite.inviter.id);
  db.add(`Regular_${member.guild.id}_${usedInvite.inviter.id}`, 1);
  let money = db.all().filter(data => data.ID.startsWith(`rewardinvite_${member.guild.id}`)).sort((a, b) => b.data - a.data)
  money.filter(x => member.guild.roles.cache.get(x.ID.split('_')[2])).map((m, i) => {
if(invite === m.ID.split('_')[3] && !member.roles.cache.has(m.ID.split('_')[2])) {
 member.roles.add(m.ID.split('_')[2]).catch()
}})
  let inv = db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}`);
  if (inv == null) inv =0

let embedj = db.get(`joinmessageembed_${member.guild.id}`)

if(!embedj.description) {} else {embedj.description = embedj.description.replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:tag}", iv2.tag).replace("{inviter:tag}", iv2.tag).replace("{inviter:tag}", iv2.tag).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv)}
if(!embedj.title) { } else {embedj.title = embedj.title.replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:tag}", iv2.tag).replace("{inviter:tag}", iv2.tag).replace("{inviter:tag}", iv2.tag).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv)}
if(!embedj.footer) {} else {embedj.footer.text = embedj.footer.text.replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:tag}", iv2.tag).replace("{inviter:tag}", iv2.tag).replace("{inviter:tag}", iv2.tag).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv)}

if(welcomeChannel) welcomeChannel.send({embed: embedj}).then((msggg)=> {
  if( db.get(`joinmsgdel_${member.guild.id}`) ) {
  msggg.delete({timeout: ms( db.get(`joinmsgdel_${member.guild.id}`)) })
  }
})
} else {
  let welcomeChannel = await client.channels.fetch(db.get(`joinchannelmessage_${member.guild.id}`)).catch(err => {});
  if(member.user.bot && welcomeChannel) return welcomeChannel.send(`Le bot ${member.toString()} nous a rejoint en utilisant ***l'api OAuth2***`).catch(err => {});
  const cachedInvites = client.guildInvites.get(member.guild.id);
  const newInvites = await member.guild.fetchInvites();
  if(member.guild.vanityURLCode) newInvites.set(member.guild.vanityURLCode, await member.guild.fetchVanityData());
  client.guildInvites.set(member.guild.id, newInvites);
  const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
  if(!usedInvite) return welcomeChannel.send(`**Je n'arrive pas à trouver** comment ${member.toString()} a rejoint le serveur.`).catch(err => {});
  if(usedInvite.code === member.guild.vanityURLCode) {
     if(welcomeChannel) welcomeChannel.send(`${member.toString()} nous a rejoint en utilisant ***le lien d'invitation personnalisé du serveur.***`);
      db.set(`inviter_${member.guild.id}_${member.id}`, "vanity");
      return;
  };
let invite = db.add(`invites_${member.guild.id}_${usedInvite.inviter.id}`, 1);
let iv2= usedInvite.inviter

  db.set(`inviter_${member.guild.id}_${member.id}`, usedInvite.inviter.id);
  db.add(`Regular_${member.guild.id}_${usedInvite.inviter.id}`, 1);
  let money = db.all().filter(data => data.ID.startsWith(`rewardinvite_${member.guild.id}`)).sort((a, b) => b.data - a.data)
  money.filter(x => member.guild.roles.cache.get(x.ID.split('_')[2])).map((m, i) => {
if(invite === m.ID.split('_')[3] && !member.roles.cache.has(m.ID.split('_')[2])) {
 member.roles.add(m.ID.split('_')[2]).catch()
}})
  let inv = db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}`);
  if (inv == null) inv =0

  let joinmessage = db.get(`joinmessage_${member.guild.id}`);
  if (joinmessage === null) joinmessage = client.config.defaultjoinmessage;
  let toSend = joinmessage .replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{inviter}", usedInvite.inviter).replace("{inviter}", usedInvite.inviter).replace("{inviter}", usedInvite.inviter).replace("{inviter}", usedInvite.inviter).replace("{inviter:name}", usedInvite.inviter.username).replace("{inviter:name}", usedInvite.inviter.username).replace("{inviter:name}", usedInvite.inviter.username).replace("{inviter:name}", usedInvite.inviter.username).replace("{inviter:tag}", usedInvite.inviter.tag).replace("{inviter:tag}", usedInvite.inviter.tag).replace("{inviter:tag}", usedInvite.inviter.tag).replace("{inviter:id}", usedInvite.inviter.id).replace("{inviter:id}", usedInvite.inviter.id).replace("{inviter:id}", usedInvite.inviter.id).replace("{inviter:id}", usedInvite.inviter.id).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv)

  if(welcomeChannel) welcomeChannel.send(toSend).then((msggg)=> {
      if( db.get(`joinmsgdel_${member.guild.id}`) ) {
      msggg.delete({timeout: ms( db.get(`joinmsgdel_${member.guild.id}`)) })
      }
    })
}
 
   

};


