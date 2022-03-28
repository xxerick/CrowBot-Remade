const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
module.exports = {
    name: 'reward',
    aliases: ["rewardrole"],
    run: async (client, message, args, prefix, color) => {

        message.member.roles.cache.forEach(role => {
            if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
            })
            if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {  
              if(args[0] === "invites" || args[0] === "invite") {
                    if(args[1].toLowerCase() === "add") {
                        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                        const rank = args[3]
                        if(!role && isNaN(rank)) return message.react("❌")
         
                        db.set(`rewardinvite_${message.guild.id}_${role.id}_${rank}`, true)
                        return message.react(`✅`)
                            
         
                        } else if(args[1].toLowerCase() === "remove") {
                         const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                         if(!role) return message.react("❌")
                         let kkkk = await db.all().filter(data => data.ID.startsWith(`rewardinvite_${message.guild.id}_${role.id}`))
                         let hehehe = 0;
                         for(let i = 0; i < kkkk.length; i++) {
                         db.delete(kkkk[i].ID);
                         hehehe++;
                         }
                       return  message.react(`✅`)
         
                        } else if(args[1].toLowerCase() === "clear"){
                         let kkkk = await db.all().filter(data => data.ID.startsWith(`rewardinvite_${message.guild.id}`))
                         let hehehe = 0;
                         for(let i = 0; i < kkkk.length; i++) {
                         db.delete(kkkk[i].ID);
                         hehehe++;
                         }
                         return  message.react(`✅`)
         
                        } else if(args[1].toLowerCase() === "list") {
                         let money = db.all().filter(data => data.ID.startsWith(`rewardinvite_${message.guild.id}`)).sort((a, b) => b.data - a.data)
         
                         let p0 = 0;
                         let p1 = 15;
                         let page = 1;
                     
                         const embed = new Discord.MessageEmbed()
                             .setTitle('Reward Invites')
                             .setDescription(money
                                 .filter(x => message.guild.roles.cache.get(x.ID.split('_')[2]))
                                 .map((m, i) => `${i + 1}) <@&${message.guild.roles.cache.get(m.ID.split('_')[2]).id}> : **${m.ID.split("_")[3]}** Invites`)
                                 .slice(0, 15)
                     
                             )
                             .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                             .setColor(color)
                     
                     
                         message.channel.send(embed).then(async tdata => {
                             if (money.length > 15) {
                                 const B1 = new MessageButton()
                                     .setLabel("◀")
                                     .setStyle("gray")
                                     .setID('inviterole1');
                     
                                 const B2 = new MessageButton()
                                     .setLabel("▶")
                                     .setStyle("gray")
                                     .setID('inviterole2');
                     
                                 const bts = new MessageActionRow()
                                     .addComponent(B1)
                                     .addComponent(B2)
                                 tdata.edit("", { embed: embed, components: [bts] })
                                 setTimeout(() => {
                                     tdata.edit("", {
                                         components: [], embed: new Discord.MessageEmbed()
                                             .setTitle('Reward Invites')
                                             .setDescription(money
                                                 .filter(x => message.guild.members.cache.get(x.ID.split('_')[2]))
                                                 .map((m, i) => `${i + 1}) `)
                                                 .slice(0, 15)
                     
                                             )
                                             .setFooter(`1/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                                             .setColor(color)
                     
                     
                                     })
                                     // message.channel.send(embeds)
                                 }, 60000 * 5)
                                 client.on("clickButton", (button) => {
                                     if (button.clicker.user.id !== message.author.id) return ;
                                     if (button.id === "inviterole1") {
                                         button.reply.defer(true)
                     
                                         p0 = p0 - 15;
                                         p1 = p1 - 15;
                                         page = page - 1
                     
                                         if (p0 < 0) {
                                             return
                                         }
                                         if (p0 === undefined || p1 === undefined) {
                                             return
                                         }
                     
                     
                                         embed   .setDescription(money
                                 .filter(x => message.guild.roles.cache.get(x.ID.split('_')[2]))
                                 .map((m, i) => `${i + 1}) <@&${message.guild.roles.cache.get(m.ID.split('_')[2]).id}> : **${m.ID.split("_")[3]}** Invites`)
                                 .slice(0, 15)
                     
                             )
                                             .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                                         tdata.edit(embed);
                     
                                     }
                                     if (button.id === "inviterole2") {
                                         button.reply.defer(true)
                     
                                         p0 = p0 + 15;
                                         p1 = p1 + 15;
                     
                                         page++;
                     
                                         if (p1 > money.length + 15) {
                                             return
                                         }
                                         if (p0 === undefined || p1 === undefined) {
                                             return
                                         }
                     
                     
                                         embed   .setDescription(money
                                 .filter(x => message.guild.roles.cache.get(x.ID.split('_')[2]))
                                 .map((m, i) => `${i + 1}) <@&${message.guild.roles.cache.get(m.ID.split('_')[2]).id}> : **${m.ID.split("_")[3]}** Invites`)
                                 .slice(0, 15)
                     
                             )
                                             .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                                         tdata.edit(embed);
                     
                                     }
                                 })
                             }
                     
                         })
                        }
                        
                
              } else if(args[0] === "levels" || args[0] === "rank" || args[0] === "level") {
               if(args[1].toLowerCase() === "add") {
               const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
               const rank = args[3]
               if(!role && isNaN(rank) || !rank) return message.react("❌")

               db.set(`rewardlevel_${message.guild.id}_${role.id}_${rank}`, true)
               return message.react(`✅`)
                   

               } else if(args[1].toLowerCase() === "remove") {
                const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                if(!role) return message.react("❌")
                let kkkk = await db.all().filter(data => data.ID.startsWith(`rewardlevel_${message.guild.id}_${role.id}`))
                let hehehe = 0;
                for(let i = 0; i < kkkk.length; i++) {
                db.delete(kkkk[i].ID);
                hehehe++;
                }
              return  message.react(`✅`)

               } else if(args[1].toLowerCase() === "clear"){
                let kkkk = await db.all().filter(data => data.ID.startsWith(`rewardlevel_${message.guild.id}`))
                let hehehe = 0;
                for(let i = 0; i < kkkk.length; i++) {
                db.delete(kkkk[i].ID);
                hehehe++;
                }
                return  message.react(`✅`)

               } else if(args[1].toLowerCase() === "list") {
                let money = db.all().filter(data => data.ID.startsWith(`rewardlevel_${message.guild.id}`)).sort((a, b) => b.data - a.data)

                let p0 = 0;
                let p1 = 15;
                let page = 1;
            
                const embed = new Discord.MessageEmbed()
                    .setTitle('Reward Level')
                    .setDescription(money
                        .filter(x => message.guild.roles.cache.get(x.ID.split('_')[2]))
                        .map((m, i) => `${i + 1}) <@&${message.guild.roles.cache.get(m.ID.split('_')[2]).id}> : **${m.ID.split("_")[3]}** Level`)
                        .slice(0, 15)
            
                    )
                    .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                    .setColor(color)
            
            
                message.channel.send(embed).then(async tdata => {
                    if (money.length > 15) {
                        const B1 = new MessageButton()
                            .setLabel("◀")
                            .setStyle("gray")
                            .setID('levelrole1');
            
                        const B2 = new MessageButton()
                            .setLabel("▶")
                            .setStyle("gray")
                            .setID('levelrole2');
            
                        const bts = new MessageActionRow()
                            .addComponent(B1)
                            .addComponent(B2)
                        tdata.edit("", { embed: embed, components: [bts] })
                        setTimeout(() => {
                            tdata.edit("", {
                                components: [], embed: new Discord.MessageEmbed()
                                    .setTitle('Reward Level')
                                    .setDescription(money
                                        .filter(x => message.guild.members.cache.get(x.ID.split('_')[2]))
                                        .map((m, i) => `${i + 1}) `)
                                        .slice(0, 15)
            
                                    )
                                    .setFooter(`1/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                                    .setColor(color)
            
            
                            })
                            // message.channel.send(embeds)
                        }, 60000 * 5)
                        client.on("clickButton", (button) => {
                            if (button.clicker.user.id !== message.author.id) return ;
                            if (button.id === "levelrole1") {
                                button.reply.defer(true)
            
                                p0 = p0 - 15;
                                p1 = p1 - 15;
                                page = page - 1
            
                                if (p0 < 0) {
                                    return
                                }
                                if (p0 === undefined || p1 === undefined) {
                                    return
                                }
            
            
                                embed   .setDescription(money
                        .filter(x => message.guild.roles.cache.get(x.ID.split('_')[2]))
                        .map((m, i) => `${i + 1}) <@&${message.guild.roles.cache.get(m.ID.split('_')[2]).id}> : **${m.ID.split("_")[3]}** Level`)
                        .slice(0, 15)
            
                    )
                                    .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                                tdata.edit(embed);
            
                            }
                            if (button.id === "levelrole2") {
                                button.reply.defer(true)
            
                                p0 = p0 + 15;
                                p1 = p1 + 15;
            
                                page++;
            
                                if (p1 > money.length + 15) {
                                    return
                                }
                                if (p0 === undefined || p1 === undefined) {
                                    return
                                }
            
            
                                embed   .setDescription(money
                        .filter(x => message.guild.roles.cache.get(x.ID.split('_')[2]))
                        .map((m, i) => `${i + 1}) <@&${message.guild.roles.cache.get(m.ID.split('_')[2]).id}> : **${m.ID.split("_")[3]}** Level`)
                        .slice(0, 15)
            
                    )
                                    .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                                tdata.edit(embed);
            
                            }
                        })
                    }
            
                })
               }
               }
        }

    }
}