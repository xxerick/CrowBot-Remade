const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
const {MessageEmbed} = require("discord.js")
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
module.exports = {
    name: 'banlist',
    aliases: [],
    run: async (client, message, args, prefix, color) => {
        let perm = ""
        message.member.roles.cache.forEach(role => {
            
            if(db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
            if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
        if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {    
            message.guild.fetchBans()
        
            .then(async bans => {
                let p0 = 0;
                let p1 = 30;
                let page = 1;
                let ie = 0; 
                const obj = bans.map(m => ({
                  user: ``
                }));
                const bList = Array.from(obj);
                if (bList.length < 1) return message.channel.send(new Discord.MessageEmbed().setColor(color).setTitle("Aucun ban en cours"))
    
            const embed = new Discord.MessageEmbed()
                .setTitle('Ban en cours')
                .setDescription(bans
                    .map(r => r)
                    
              .map((m,i) => `${i+1}) ${m.user} (${m.user.id})`)
                  .slice(p0, p1)
                  )
                  
              .setColor(color)
              .setFooter(`Total: ${bList.length} • ${client.config.name}`)
    
    
            message.channel.send(embed).then(async tdata => {
                if (bList.length > 15) {
                    const B1 = new MessageButton()
                        .setLabel("◀")
                        .setStyle("gray")
                        .setID('banlist1');
    
                    const B2 = new MessageButton()
                        .setLabel("▶")
                        .setStyle("gray")
                        .setID('banlist2');
    
                    const bts = new MessageActionRow()
                        .addComponent(B1)
                        .addComponent(B2)
                    tdata.edit("", { embed: embed, components: [bts] })
                    setTimeout(() => {
                        tdata.edit("", {
                            components: [], embed: new Discord.MessageEmbed()
                                .setTitle('Ban en cours')
                                .setDescription(bans
                                    .map(r => r)
                                    
                              .map((m,i) => `${i+1}) ${m.user} (${m.user.id})`)
                                  .slice(p0, p1)
                                  )
                                  
                              .setColor(color)
                              .setFooter(`Total: ${bList.length} • ${client.config.name}`)
    
    
                        })
                        // message.channel.send(embeds)
                    }, 60000 * 5)
                    client.on("clickButton", (button) => {
                        if (button.clicker.user.id !== message.author.id) return
                        if (button.id === "banlist1") {
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
    
    
                            embed        .setDescription(bans
                    .map(r => r)
                    
              .map((m,i) => `${i+1}) ${m.user} (${m.user.id})`)
                  .slice(p0, p1)
                  )
                  
              .setColor(color)
              .setFooter(`Total: ${bList.length} • ${client.config.name}`)
                            tdata.edit(embed);
    
                        }
                        if (button.id === "banlist2") {
                            button.reply.defer(true)
    
                            p0 = p0 + 15;
                            p1 = p1 + 15;
    
                            page++;
    
                            if (p1 > bList.length + 15) {
                                return
                            }
                            if (p0 === undefined || p1 === undefined) {
                                return
                            }
    
    
                            embed        .setDescription(bans
                    .map(r => r)
                    
              .map((m,i) => `${i+1}) ${m.user} (${m.user.id})`)
                  .slice(p0, p1)
                  )
                  
              .setColor(color)
              .setFooter(`Total: ${bList.length} • ${client.config.name}`)
                            tdata.edit(embed);
    
                        }
                    })
                }
    
            })
        })
             
    }
    }
}