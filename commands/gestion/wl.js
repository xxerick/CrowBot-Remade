const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');


module.exports = {
    name: 'whitelist',
    aliases: ["wl"],
    run: async (client, message, args, prefix, color) => {

            if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true) {

                if (args[0] === "add") {
                    let member = message.guild.members.cache.get(message.author.id);
                        if(args[1]) {
                        member = message.guild.members.cache.get(args[1]);
                    } else {
                        return message.channel.send(`Aucun membre trouvé pour \`${args[1]|| " "}\``)
            
                    }
                    if (message.mentions.members.first()) {
                        member = message.guild.members.cache.get(message.mentions.members.first().id);
                    }
                    if (!member) return message.channel.send(`Aucun membre trouvé pour \`${args[1]|| " "}\``)
                           if (db.get(`wlmd_${message.guild.id}_${member.user.id}`) === true) { return message.channel.send(`${member.user.username} est déjà owner`)}
                    db.set(`wlmd_${message.guild.id}_${member.user.id}`, true)
            
                        message.channel.send(`${member.user.username} est maintenant dans la whitelist`)
                    } else if(args[0] === "clear") {
                        let tt = await db.all().filter(data => data.ID.startsWith(`wlmd_${message.guild.id}`));
                        message.channel.send(`${tt.length === undefined||null ? 0:tt.length} ${tt.length > 1 ? "personnes ont été supprimées ":"personne a été supprimée"} de la whitelist`)
             
                   
                        let ttt = 0;
                        for(let i = 0; i < tt.length; i++) {
                          db.delete(tt[i].ID);
                          ttt++;
                        }   
                    }else if(args[0] === "remove") {
    
                        if(args[1]){
                            let member = message.guild.members.cache.get(message.author.id);
                            if (args[1]) {
                                member = message.guild.members.cache.get(args[1]);
                            } else {
                                return message.channel.send(`Aucun membre trouvé pour \`${args[1]|| " "}\``)
                    
                            }
                            if (message.mentions.members.first()) {
                                member = message.guild.members.cache.get(message.mentions.members.first().id);
                            }
                            if (!member) return message.channel.send(`Aucun membre trouvé pour \`${args[1]|| " "}\``)
                            if (db.get(`wlmd_${message.guild.id}_${member.user.id}`) === null) { return message.channel.send(`${member.user.username} n'est pas whitlist`)}
                          db.delete(`wlmd_${message.guild.id}_${member.user.id}`)
                          message.channel.send(`${member.user.username} n'est plus whitlist`)
                        }                    
                }else if(args[0] === "list") {
            
        
            let money = db.all().filter(data => data.ID.startsWith(`wlmd_${message.guild.id}`)).sort((a, b) => b.data - a.data) 
     
            let p0 = 0;
            let p1 = 15;
            let page = 1;
        
            const embed = new Discord.MessageEmbed()
                .setTitle('Whitelist')
                .setDescription(!money ? "Aucune donnée":money
                
                .filter(x => message.guild.members.cache.get(x.ID.split('_')[2]))
                    .map((m, i) => `${i + 1}) <@${message.guild.members.cache.get(m.ID.split('_')[2]).id}> (${message.guild.members.cache.get(m.ID.split('_')[2]).id})`)
                    .slice(0, 15)
        
                )
                .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                .setColor(color)
        
        
            message.channel.send(embed).then(async tdata => {
                if (money.length > 15) {
                    const B1 = new MessageButton()
                        .setLabel("◀")
                        .setStyle("gray")
                        .setID('wl1');
        
                    const B2 = new MessageButton()
                        .setLabel("▶")
                        .setStyle("gray")
                        .setID('wl2');
        
                    const bts = new MessageActionRow()
                        .addComponent(B1)
                        .addComponent(B2)
                    tdata.edit("", { embed: embed, components: [bts] })
                    setTimeout(() => {
                        tdata.edit("", {
                            components: [], embed: new Discord.MessageEmbed()
                                .setTitle('Whitelist')
                                .setDescription(money
                                    .filter(x => message.guild.members.cache.get(x.ID.split('_')[2]))
                                    .map((m, i) => `${i + 1}) <@${message.guild.members.cache.get(m.ID.split('_')[2]).id}> (${message.guild.members.cache.get(m.ID.split('_')[2]).id})`)
                                    .slice(0, 15)
        
                                )
                                .setFooter(`1/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                                .setColor(color)
        
        
                        })
                        // message.channel.send(embeds)
                    }, 60000 * 5)
                    client.on("clickButton", (button) => {
                        if (button.id === "wl1") {
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
        
        
                            embed.setDescription(money
                                .filter(x => message.guild.members.cache.get(x.ID.split('_')[2]))
                                .map((m, i) => `${i + 1}) <@${message.guild.members.cache.get(m.ID.split('_')[2]).id}> (${message.guild.members.cache.get(m.ID.split('_')[2]).id})`)
                                .slice(p0, p1)
        
                            )
                                .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                            tdata.edit(embed)
        
                        }
                        if (button.id === "wl2") {
                            if (button.clicker.user.id !== message.author.id) return ;
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
        
        
                            embed.setDescription(money
                                .filter(x => message.guild.members.cache.get(x.ID.split('_')[2]))
                                .map((m, i) => `${i + 1}) <@${message.guild.members.cache.get(m.ID.split('_')[2]).id}> (${message.guild.members.cache.get(m.ID.split('_')[2]).id})`)
                                .slice(p0, p1)
        
                            )
                                .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                            tdata.edit(embed);
        
                        }
                    })
                }
        
            })
            
        }}
        

    }
}