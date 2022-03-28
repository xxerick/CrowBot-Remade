const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = async (client, member) => {
   const color = db.get(`color_${member.guild.id}`) === null ? client.config.color : db.get(`color_${member.guild.id}`)

   if(member.partial) member = await member.fetch();

    if(db.get(`leavemessageembed_${member.guild.id}`) !== null) {
      let welcomeChannel = await client.channels.fetch(db.get(`leavechannelmessage_${member.guild.id}`)).catch(err => {});
      if(member.user.bot && welcomeChannel) return welcomeChannel.send(new MessageEmbed().setColor(color).setDescription(`Le bot ${member.toString()} nous a quitter, il avait rejoins en utilisant ***l'api OAuth2***`)).catch(err => {});
      let user = db.get(`inviter_${member.guild.id}_${member.id}`);
      if(user === null&& welcomeChannel) return welcomeChannel.send(new MessageEmbed().setColor(color).setDescription(`**${member.user.tag}** a quitter le serveur, mais **je n'arrive pas à trouver** comment il l'avait rejoint.`));
      if(user === 'vanity'&& welcomeChannel) return welcomeChannel.send(new MessageEmbed().setColor(color).setDescription(`**${member.user.tag}** nous a quitter il avais rejoint en utilisant ***le lien d'invitation personnalisé du serveur.**`));
      let iv2 = await client.users.fetch(user).catch(err => {});
      let inv = db.fetch(`invites_${member.guild.id}_${user}`);
     if (inv == null) inv = 0
     let invite = db.subtract(`invites_${member.guild.id}_${user}`, 1);
     db.add(`leaves_${member.guild.id}_${user}`, 1);
  
     let money = db.all().filter(data => data.ID.startsWith(`rewardinvite_${member.guild.id}`)).sort((a, b) => b.data - a.data)
     money.filter(x => member.guild.roles.cache.get(x.ID.split('_')[2])).map((m, i) => {
  if(invite !== m.ID.split('_')[3] && member.roles.cache.has(m.ID.split('_')[2])) {
    member.roles.remove(m.ID.split('_')[2]).catch()
  }})
  
      let embedj = db.get(`leavemessageembed_${member.guild.id}`)

      if(!embedj.description) {} else {embedj.description = embedj.description.replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:tag}", iv2.tag).replace("{inviter:tag}", iv2.tag).replace("{inviter:tag}", iv2.tag).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv)}
      if(!embedj.title) { } else {embedj.title = embedj.title.replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:tag}", iv2.tag).replace("{inviter:tag}", iv2.tag).replace("{inviter:tag}", iv2.tag).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv)}
      if(!embedj.footer) {} else {embedj.footer.text = embedj.footer.text.replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:tag}", iv2.tag).replace("{inviter:tag}", iv2.tag).replace("{inviter:tag}", iv2.tag).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv)}
      
      if(welcomeChannel) welcomeChannel.send({embed: embedj})
   } else {
      let welcomeChannel = await client.channels.fetch(db.get(`leavechannelmessage_${member.guild.id}`)).catch(err => {});
      if(member.user.bot && welcomeChannel) return welcomeChannel.send(`Le bot ${member.toString()} nous a quitter, il avait rejoins en utilisant ***l'api OAuth2***`).catch(err => {});
      let user = db.get(`inviter_${member.guild.id}_${member.id}`);
      if(user === null&& welcomeChannel) return welcomeChannel.send(`**${member.user.tag}** a quitter le serveur, mais **je n'arrive pas à trouver** comment il l'avait rejoint.`);
      if(user === 'vanity'&& welcomeChannel) return welcomeChannel.send(`**${member.user.tag}** nous a quitter il avais rejoint en utilisant ***le lien d'invitation personnalisé du serveur.**`);
      let iv2 = await client.users.fetch(user).catch(err => {});
      let inv = db.fetch(`invites_${member.guild.id}_${user}`);
     if (inv == null) inv = 0
     let invite = db.subtract(`invites_${member.guild.id}_${user}`, 1);
     db.add(`leaves_${member.guild.id}_${user}`, 1);
  
     let money = db.all().filter(data => data.ID.startsWith(`rewardinvite_${member.guild.id}`)).sort((a, b) => b.data - a.data)
     money.filter(x => member.guild.roles.cache.get(x.ID.split('_')[2])).map((m, i) => {
  if(invite !== m.ID.split('_')[3] && member.roles.cache.has(m.ID.split('_')[2])) {
    member.roles.remove(m.ID.split('_')[2]).catch()
  }})
  
      let leavemssage = db.get(`leavemessage_${member.guild.id}`);
      if (leavemssage === null) leavemssage = client.config.defaultleavemessage;

      let toSend = leavemssage .replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter}", iv2).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:name}", iv2.username).replace("{inviter:tag}", iv2.tag).replace("{inviter:tag}", iv2.tag).replace("{inviter:tag}", iv2.tag).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{inviter:id}", iv2.id).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{guild:member}", member.guild.memberCount).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv).replace("{invite}", inv)
    
      if(welcomeChannel) welcomeChannel.send(toSend)
   }
};
