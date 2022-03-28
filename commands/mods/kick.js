
const Discord = require("discord.js"),
{MessageEmbed} = require("discord.js"),

ms = require("ms"), 
cooldown = {}
const db = require("quick.db")





function kick(message, user, authorcooldown) {
       message.guild.members.cache.get(user.id).kick(`Expulser par ${message.author.tag} pour: Sans raison`).then(r => {
       authorcooldown.limit++
       setTimeout(() => {
           authorcooldown.limit = authorcooldown.limit - 1
           }, 120000);
       })
};

function kickreason(message, user, authorcooldown, reason) {
    message.guild.members.cache.get(user.id).kick(`Expulser par ${message.author.tag} pour: ${reason}`).then(r => {
        authorcooldown.limit++
       setTimeout(() => {
           authorcooldown.limit = authorcooldown.limit - 1
           }, 120000);
       })
}
module.exports = {
   name: 'kick',
  aliases: ["setkick","k"],
   run: async (client, message, args, prefix, color) => {

   
               let perm = ""
               message.member.roles.cache.forEach(role => {
                   if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
               if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
               })
               if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {  
               
                   if(args[0]) {
                       let chx = db.get(`logmod_${message.guild.id}`);
                       const logsmod = message.guild.channels.cache.get(chx)
                       if(!cooldown[message.author.id]) cooldown[message.author.id] = { limit: 0 }
           var authorcooldown = cooldown[message.author.id]
           if(authorcooldown.limit > 2) return message.channel.send(`Vous avez atteint votre limite de **kick**, veuillez retenter plus tard!`);
           var user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
           if(!user) return  message.channel.send(`Aucun membre trouvée pour: \`${args[0]}\``)
           
           if (user.id === message.author.id) {
               return message.channel.send(`Vous n'avez pas la permission de **kick** <@${user.id}>`);
             }
             if(user.roles.highest.position > client.user.id) return message.channel.send(`Je n'ai pas les permissions nécessaires pour **kick** <@${user.id}>`);
             if(user.roles.highest.position > message.member.roles.highest.position) return message.channel.send(`Vous n'avez pas les permissions nécessaires pour **kick** <@${user.id}>`);
             if( db.get(`ownermd.${message.author.id}`) === true) return message.channel.send(`Vous n'avez pas la permission de **kick** <@${user.id}>`);
             if(client.config.owner.includes(user.id)) return message.channel.send(`Vous n'avez pas la permission de **kick** <@${user.id}>`);
           if(args[1]) {
             
               var reason = args.slice(1).join(" ")
               if(reason) { 
               message.channel.send(`${user} a été **kick** pour \`${reason}\``);
               kickreason(message, user, authorcooldown, reason)
               user.send(`Vous avez été **kick** de ${message.guild.name} pour \`${reason}\``)
           
               if(logsmod) logsmod.send(
                   new Discord.MessageEmbed()
                  // .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                   .setColor(color)
                   //.setTitle(`<:protection:847072581382438953> Modération • Type: **\`kicknissement\`**`)
             //      .setTimestamp() 
               //     .setDescription(` **Bannissement de**: ${user}\n**Auteur**: ${message.author} \n**Salon**: ${message.channel}\n**Pour** \`${reason}\`\n**Temps de réponse**: ${client.ws.ping}ms`)
               .setDescription(`${message.author} a **kick** ${user} pour \`${reason}\``)
           
                        
           
                   ) 
               } else {
               message.channel.send(`${user} a été **kick**`);
               kick(message, user, authorcooldown)
               user.send(`Vous avez été **kick** de ${message.guild.name}`)
           
               if(logsmod) logsmod.send(
                   new Discord.MessageEmbed()
            //       .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                 .setColor(color)
                //   .setTitle(`<:protection:847072581382438953> Modération • Type: **\`kicknissement\`**`)
              //     .setTimestamp() 
                //    .setDescription(` **Bannissement de**: ${user}\n**Auteur**: ${message.author} \n**Salon**: ${message.channel}\n**Temps de réponse**: ${client.ws.ping}ms`)
                .setDescription(`${message.author} a **kick** ${user}`)
           
                        
           
                   )                    
               }
               } else {
                message.channel.send(`${user} a été **kick**`);
                kick(message, user, authorcooldown)
                user.send(`Vous avez été **kick** de ${message.guild.name}`)
            
                if(logsmod) logsmod.send(
                    new Discord.MessageEmbed()
             //       .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                  .setColor(color)
                 //   .setTitle(`<:protection:847072581382438953> Modération • Type: **\`kicknissement\`**`)
               //     .setTimestamp() 
                 //    .setDescription(` **Bannissement de**: ${user}\n**Auteur**: ${message.author} \n**Salon**: ${message.channel}\n**Temps de réponse**: ${client.ws.ping}ms`)
                 .setDescription(`${message.author} a **kick** ${user}`)
            
                         
            
                    )                    
                  
               }
               } else {
               message.channel.send(`${user} a été **kick**`);
               kick(message, user, authorcooldown)
               user.send(`Vous avez été **kick** de ${message.guild.name}`)
           
               if(logsmod) logsmod.send(
                   new Discord.MessageEmbed()
           //        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                   .setColor(color)
             //      .setTitle(`<:protection:847072581382438953> Modération • Type: **\`kicknissement\`**`)
               //    .setTimestamp() 
                 //   .setDescription(` **Bannissement de**: ${user}\n**Auteur**: ${message.author} \n**Salon**: ${message.channel}\n**Temps de réponse**: ${client.ws.ping}ms`)
                 .setDescription(`${message.author} a **kick** ${user}`)
           
                        
           
                   ) 
           }
               
                
           
                       

 
               
   }
   }
}