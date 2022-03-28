const Discord = require('discord.js')
const {MessageEmbed} = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: 'allbotadmin',
    aliases: [],

    run: async (client, message, args, prefix, color) => {
   
                let perm = ""
            message.member.roles.cache.forEach(role => {
            if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
            if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
            })
            if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {    
        
                var str_filtrer = message.guild.members.cache.filter(member => member.hasPermission("ADMINISTRATOR") && member.user.bot)
                if(str_filtrer.size === 0 || undefined || false || null) return message.channel.send(new Discord.MessageEmbed().setColor(color).setTitle("Aucun bot admins présents"))
           
                
                let p0 = 0;
                let p1 = 15;
                let page = 1;
        
                const embed = new Discord.MessageEmbed()
                    .setTitle('Liste des bots admins présents')
                    .setDescription(str_filtrer
                        .map(r => r)
                        .filter(x => message.guild.members.cache.get(x.user.id))
                  .map((m,i) => `${i+1}) ${m.user} (${m.user.id})`)
                      .slice(p0, p1)
                      )
                      
                  .setColor(color)
                  .setFooter(`Total: ${str_filtrer.size} • ${client.config.name}`)
        
        
                message.channel.send(embed).then(async tdata => {
                    if (str_filtrer.size > 15) {
                        const B1 = new MessageButton()
                            .setLabel("◀")
                            .setStyle("gray")
                            .setID('allbotadm1');
        
                        const B2 = new MessageButton()
                            .setLabel("▶")
                            .setStyle("gray")
                            .setID('allbotadm2');
        
                        const bts = new MessageActionRow()
                            .addComponent(B1)
                            .addComponent(B2)
                        tdata.edit("", { embed: embed, components: [bts] })
                        setTimeout(() => {
                            tdata.edit("", {
                                components: [], embed: new Discord.MessageEmbed()
                                    .setTitle('Liste des bots admins présents')
                                    .setDescription(str_filtrer
                                        .map(r => r)
                                        .filter(x => message.guild.members.cache.get(x.user.id))
                                  .map((m,i) => `${i+1}) ${m.user} (${m.user.id})`)
                                      .slice(p0, p1)
                                      )
                                      
                                  .setColor(color)
                                  .setFooter(`Total: ${str_filtrer.size} • ${client.config.name}`)
        
        
                            })
                            // message.channel.send(embeds)
                        }, 60000 * 5)
                        client.on("clickButton", (button) => {
                            if (button.id === "allbotadm1") {
                                if (button.clicker.user.id !== message.author.id) return ;
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
        
        
                                embed        .setDescription(str_filtrer
                        .map(r => r)
                        .filter(x => message.guild.members.cache.get(x.user.id))
                  .map((m,i) => `${i+1}) ${m.user} (${m.user.id})`)
                      .slice(p0, p1)
                      )
                      
                  .setColor(color)
                  .setFooter(`Total: ${str_filtrer.size} • ${client.config.name}`)
                                tdata.edit(embed);
        
                            }
                            if (button.id === "allbotadm2") {
                                if (button.clicker.user.id !== message.author.id) return ;
                                button.reply.defer(true)
        
                                p0 = p0 + 15;
                                p1 = p1 + 15;
        
                                page++;
        
                                if (p1 > str_filtrer.size + 15) {
                                    return
                                }
                                if (p0 === undefined || p1 === undefined) {
                                    return
                                }
        
        
                                embed        .setDescription(str_filtrer
                        .map(r => r)
                        .filter(x => message.guild.members.cache.get(x.user.id))
                  .map((m,i) => `${i+1}) ${m.user} (${m.user.id})`)
                      .slice(p0, p1)
                      )
                      
                  .setColor(color)
                  .setFooter(`Total: ${str_filtrer.size} • ${client.config.name}`)
                                tdata.edit(embed);
        
                            }
                        })
                    }
        
                })
                  
        }
    }
}