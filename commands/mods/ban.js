
const Discord = require("discord.js"),
 {MessageEmbed} = require("discord.js"),

ms = require("ms"), 
cooldown = {}
const db = require("quick.db")

function bantime(message, user, time, authorcooldown) {
    message.guild.members.ban(user.id, {reason: `Bannis par ${message.author.tag} pour: Sans raison`, days: 7}).then(r => {
        authorcooldown.limit++
        setTimeout(() => {
            message.guild.members.unban(user.id)
        }, time);
        setTimeout(() => {
            authorcooldown.limit = authorcooldown.limit - 1
            }, 120000);
        })
};

function bantimereason(message, user, time, authorcooldown, reason) {
    message.guild.members.ban(user.id, {reason: `Bannis par ${message.author.tag} pour: ${reason}`, days: 7}).then(r => {
        authorcooldown.limit++
        setTimeout(() => {
            message.guild.members.unban(user.id)
        }, time);
        setTimeout(() => {
            authorcooldown.limit = authorcooldown.limit - 1
            }, 120000);
        })
};

function ban(message, user, authorcooldown) {
        message.guild.members.ban(user.id, {reason: `Bannis par ${message.author.tag} pour: Sans raison`, days: 7}).then(r => {
        authorcooldown.limit++
        setTimeout(() => {
            authorcooldown.limit = authorcooldown.limit - 1
            }, 120000);
        })
};

function banreason(message, user, authorcooldown, reason) {
    message.guild.members.ban(user.id, {reason: `Bannis par ${message.author.tag} pour: ${reason}`, days: 7}).then(r => {
        authorcooldown.limit++
        setTimeout(() => {
            authorcooldown.limit = authorcooldown.limit - 1
            }, 120000);
        })
}
module.exports = {
    name: 'ban',
    aliases: ["setban","b"],
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
            if(authorcooldown.limit > 2) return message.channel.send(`Vous avez atteint votre limite de **bannisement**, veuillez retenter plus tard!`);
            var user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(!user) return  message.channel.send(`Aucun membre trouvée pour: \`${args[0]}\``)
            
            if (user.id === message.author.id) {
                return message.channel.send(`Vous n'avez pas la permission de **ban** <@${user.id}>`);
              }
              if(user.roles.highest.position > client.user.id) return message.channel.send(`Je n'ai pas les permissions nécessaires pour **ban** <@${user.id}>`);
              if(user.roles.highest.position > message.member.roles.highest.position) return message.channel.send(`Vous n'avez pas les permissions nécessaires pour **ban** <@${user.id}>`);
              if( db.get(`ownermd.${message.author.id}`) === true) return message.channel.send(`Vous n'avez pas la permission de **ban** <@${user.id}>`);
              if(client.config.owner.includes(user.id)) return message.channel.send(`Vous n'avez pas la permission de **ban** <@${user.id}>`);
            if(args[1]) {
                var time = ms(args[1].replace("j","d"))
                if(time) {
                var reason = args.slice(2).join(" ")
                if(reason) { 
                message.channel.send(`${user} à été **ban ${args[1]}** pour \`${reason}\``);
                bantimereason(message, user, time, authorcooldown, reason)
                user.send(`Vous avez été **ban** de ${message.guild.name} pour \`${reason}\``)
            
                if(logsmod) logsmod.send(
                    new Discord.MessageEmbed()
                    //.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                    .setColor(color)
                    //.setTitle(`<:protection:847072581382438953> Modération • Type: **\`bannissement\`**`)
                    //.setTimestamp() 
                   //  .setDescription(` **Bannissement de**: ${user}\n**Auteur**: ${message.author} \n**Salon**: ${message.channel}\n**Pendant**: \`${args[1]}\`\n**Pour** \`${reason}\`\n**Temps de réponse**: ${client.ws.ping}ms`)
                   .setDescription(`${message.author} a **ban ${args[1]}** ${user} pour \`${reason}\``)
                         
            
                    ) 
                } else {
                message.channel.send(`${message.mentions.members.first().user} a été **ban ${args[1]}**`);
                bantime(message, user, time, authorcooldown)
                user.send(`Vous avez été **ban ${args[1]}** de ${message.guild.name} `)
            
                if(logsmod) logsmod.send(
                    new Discord.MessageEmbed()
                   // .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                    .setColor(color)
                   // .setTitle(`<:protection:847072581382438953> Modération • Type: **\`bannissement\`**`)
                    //.setTimestamp() 
                     //.setDescription(` **Bannissement de**: ${user}\n**Auteur**: ${message.author} \n**Salon**: ${message.channel}\n**Pendant**: \`${args[1]}\`\n**Temps de réponse**: ${client.ws.ping}ms`)
                     .setDescription(`${message.author} a **ban ${args[1]}** ${user}`)
            
                         
            
                    ) 
                }
                
                // -- 
                } else {
                
                var reason = args.slice(1).join(" ")
                if(reason) { 
                message.channel.send(`${user} a été **ban** pour \`${reason}\``);
                banreason(message, user, authorcooldown, reason)
                user.send(`Vous avez été **ban** de ${message.guild.name} pour \`${reason}\``)
            
                if(logsmod) logsmod.send(
                    new Discord.MessageEmbed()
                   // .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                    .setColor(color)
                    //.setTitle(`<:protection:847072581382438953> Modération • Type: **\`bannissement\`**`)
              //      .setTimestamp() 
                //     .setDescription(` **Bannissement de**: ${user}\n**Auteur**: ${message.author} \n**Salon**: ${message.channel}\n**Pour** \`${reason}\`\n**Temps de réponse**: ${client.ws.ping}ms`)
                .setDescription(`${message.author} a **ban** ${user} pour \`${reason}\``)
            
                         
            
                    ) 
                } else {
                message.channel.send(`${user} a été **ban**`);
                ban(message, user, authorcooldown)
                user.send(`Vous avez été **ban** de ${message.guild.name}`)
            
                if(logsmod) logsmod.send(
                    new Discord.MessageEmbed()
             //       .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                  .setColor(color)
                 //   .setTitle(`<:protection:847072581382438953> Modération • Type: **\`bannissement\`**`)
               //     .setTimestamp() 
                 //    .setDescription(` **Bannissement de**: ${user}\n**Auteur**: ${message.author} \n**Salon**: ${message.channel}\n**Temps de réponse**: ${client.ws.ping}ms`)
                 .setDescription(`${message.author} a **ban** ${user}`)
            
                         
            
                    )                    
                }
                }
                } else {
                message.channel.send(`${user} a été **ban**`);
                ban(message, user, authorcooldown)
                user.send(`Vous avez été **ban** de ${message.guild.name}`)
            
                if(logsmod) logsmod.send(
                    new Discord.MessageEmbed()
            //        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                    .setColor(color)
              //      .setTitle(`<:protection:847072581382438953> Modération • Type: **\`bannissement\`**`)
                //    .setTimestamp() 
                  //   .setDescription(` **Bannissement de**: ${user}\n**Auteur**: ${message.author} \n**Salon**: ${message.channel}\n**Temps de réponse**: ${client.ws.ping}ms`)
                  .setDescription(`${message.author} a **ban** ${user}`)
            
                         
            
                    ) 
            }
            } else {
                user = await client.users.fetch(args[0])
                if(user) {
                    if(args[1]) {
                        var time = ms(args[1])
                        if(time) {
                        var reason = args.slice(2).join(" ")
                        if(reason) { 
                        message.channel.send(`${user} a été **ban ${args[1]}** pour \`${reason}\``);
                        user.send(`Vous avez été **ban** de ${message.guild.name} pour \`${reason}\``)
                        bantimereason(message, user, time, authorcooldown, reason)
                        if(logsmod) logsmod.send(
                            new Discord.MessageEmbed()
                          //  .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                            .setColor(color)
              //              .setTitle(`<:protection:847072581382438953> Modération • Type: **\`bannissement\`**`)
                 //           .setTimestamp() 
                    //         .setDescription(` **Bannissement de**: ${user}\n**Auteur**: ${message.author} \n**Salon**: ${message.channel}\n**Pendant**: \`${args[1]}\`\n**Pour** \`${reason}\`\n**Temps de réponse**: ${client.ws.ping}ms`)
                    .setDescription(`${message.author} a **ban ${args[1]}** ${user} pour \`${reason}\``)
                                 
                    
                            )        
                                     } else {
                        message.channel.send(`${user} a été **ban ${args[1]}** `);
                        user.send(`Vous avez été **ban** de ${message.guild.name}`)
                        bantime(message, user, time, authorcooldown)
                        if(logsmod) logsmod.send(
                            new Discord.MessageEmbed()
                            //.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                          //  .setColor(color)
                    //        .setTitle(`<:protection:847072581382438953> Modération • Type: **\`bannissement\`**`)
                      //      .setTimestamp() 
                        //     .setDescription(` **Bannissement de**: ${user}\n**Auteur**: ${message.author} \n**Salon**: ${message.channel}\n**Pendant**: \`${args[1]}\`\n**Temps de réponse**: ${client.ws.ping}ms`)
                        .setDescription(`${message.author} a **ban ${args[1]}** ${user}`)
                                 
                    
                            )                 }
                        
                        // -- 
                        } else {
                        
                        var reason = args.slice(1).join(" ")
                        if(reason) { 
                        message.channel.send(`${user} à été **ban** pour \`${reason}\``);
                        user.send(`Vous avez été **ban** de ${message.guild.name} pour \`${reason}\``)
                        banreason(message, user, authorcooldown, reason)
                        if(logsmod) logsmod.send(
                            new Discord.MessageEmbed()
               //             .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                            .setColor(color)
                 //           .setTitle(`<:protection:847072581382438953> Modération • Type: **\`bannissement\`**`)
                   //         .setTimestamp() 
                     //        .setDescription(` **Bannissement de**: ${user}\n**Auteur**: ${message.author} \n**Salon**: ${message.channel}\n**Pour** \`${reason}\`\n**Temps de réponse**: ${client.ws.ping}ms`)
                     .setDescription(`${message.author} a **ban** ${user} pour \`${reason}\``)
                                 
                    
                            )        } else {
                              message.channel.send(`${user} à été **ban**`);
                              user.send(`Vous avez été **ban** de ${message.guild.name}`)
                                          ban(message, user, authorcooldown)
                        if(logsmod) logsmod.send(
                            new Discord.MessageEmbed()
                 //           .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                   //         .setColor(color)
                     //       .setTitle(`<:protection:847072581382438953> Modération • Type: **\`bannissement\`**`)
                         //   .setTimestamp() 
                       //      .setDescription(` **Bannissement de**: ${user}\n**Auteur**: ${message.author} \n**Salon**: ${message.channel}\n**Temps de réponse**: ${client.ws.ping}ms`)
                       .setDescription(`${message.author} a **ban** ${user}`)
                                 
                    
                            ) 
                                    }
                        }
                        } else {
                          message.channel.send(`${user} à été **ban**`);
                          user.send(`Vous avez été **ban** de ${message.guild.name}`)
                          ban(message, user, authorcooldown)
                        if(logsmod) logsmod.send(
                            new Discord.MessageEmbed()
                           // .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                    .setColor(color)
                    //        .setTitle(`<:protection:847072581382438953> Modération • Type: **\`bannissement\`**`)
                      //      .setTimestamp() 
                        //     .setDescription(` **Bannissement de**: ${user}\n**Auteur**: ${message.author} \n**Salon**: ${message.channel}\n**Temps de réponse**: ${client.ws.ping}ms`)
                        .setDescription(`${message.author} a **ban** ${user}`)
                                 
                    
                            )                 
                    }
                } 
            }
                        

  
                
    }
    }
}