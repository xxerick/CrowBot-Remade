const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
const ms = require("ms")
function duration(mss) {
    const sec = Math.floor((mss / 1000) % 60).toString()
    const min = Math.floor((mss / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((mss / (1000 * 60 * 60)) % 60).toString()
    const days = Math.floor(mss / (1000 * 60 * 60 * 24)).toString()
    return `${days.padStart(2, '') == "0" ? "" : `${days.padStart(2, '')} jours, `}${hrs.padStart(2, '') == "0" ? "" : `${hrs.padStart(2, '')} heures, `}${min.padStart(2, '') == "0" ? "" : `${min.padStart(2, '')} minutes et `}${sec.padStart(2, '')} secondes`
}
const backup = require("discord-backup")
backup.setStorageFolder(__dirname+"/backups/");

module.exports = {
    name: 'backup',
    aliases: [],
    run: async (client, message, args, prefix, color) => {

            if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true) {

                if (args[0] === "serveur" || args[0] === "server") {
                    if(args[1].toLowerCase() === "create") {
                        let code = args[2]
                        if(!code) return message.reply(`Merci d'entrer un nom de backup !`)
                        let bruh = `backupserv_${client.user.id}`;
                        
                        backup.create(message.guild, {
                            maxMessagesPerChannel: 0,
                            jsonBeautify: true,
                            doNotBackup: ["emojis", "bans" ]
            
                   
                        }).then((backupData) => {
            
            
            
            db.push(`backupserv_${client.user.id}`, {code:code, dcode: backupData.id});
        })
        return     message.channel.send(`Le serveur a bien été copié`)

                    } else if(args[1].toLowerCase() === "delete") {
                        let code = args[2]
                        if(!code ) return
                       let pog = db.get(`backupserv_${client.user.id}`);
                       if (pog) {
                           let data = pog.find(x => x.code === code)
                           if (!data) return
                          
                   db.set(`backupserv_${client.user.id}`,  db.get(`backupserv_${client.user.id}`).filter(s => s.code !==code))
                   message.channel.send(`Backup supprimée`) 
                }
        
                    } else if(args[1].toLowerCase() === "clear") {
                        db.delete(`backupserv_${client.user.id}`)
                       
                        return message.channel.send(`Toute les Backups d'emoji ont était supprimés.`);
                   
                    } else if(args[1].toLowerCase() === "load") {
                        let timeout = 2400000;
                        let daily = await db.fetch(`guildbackup_${message.guild.id}`);
                    
                        if (daily != null && daily >= Date.now()) {
                        
                       
                          message.channel.send(`Une backup à déjà été charger sur le serveur, re essayer dans ${duration(daily - Date.now())} !`)
                      } else {  
                         let code = args[2]
                         if(!code ) return
                        let pog = db.get(`backupserv_${client.user.id}`);
                        if (pog) {
                            let data = pog.find(x => x.code === code)
                            if (!data) return
                    
                           
                backup.fetch(data.dcode).then(() => {

                    backup.load(data.dcode, message.guild).then(async () => {
                        db.set(`guildbackup_${message.guild.id}`, Date.now()+60000*40)
                        let guild = message.guild
                        const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
                        if (channel) {
                            await channel.send(`${message.author} Backup chargée`)
                        }
                      })
                    })
                                
                            
                    
                           
                        } }
                   
        
                    } else if(args[1].toLowerCase() === "list") {
                        let p0 = 0;
                        let p1 = 15;
                        let page = 1;
                
                
                            let bkp = db.get(`backupserv_${client.user.id}`)
                            if(bkp === null) return message.channel.send(new Discord.MessageEmbed().setColor(color).setTitle("Aucune backup de serveur enregistrée"))
                    
                           
                    
                            let embed = new Discord.MessageEmbed()
                    
                    
                            embed.setTitle(`Liste des backups de serveur`)
                            .setColor(color)
                            .setDescription(bkp
                              .map(r => r)
                              .map((r, i) => `${r.code}`)
                                .slice(0, 30)
                                )
                              
                
                        message.channel.send(embed).then(async tdata => {
                            if (bkp.length > 15) {
                                const B1 = new MessageButton()
                                    .setLabel("◀")
                                    .setStyle("gray")
                                    .setID('backuplistserv1');
                
                                const B2 = new MessageButton()
                                    .setLabel("▶")
                                    .setStyle("gray")
                                    .setID('backuplistserv2');
                
                                const bts = new MessageActionRow()
                                    .addComponent(B1)
                                    .addComponent(B2)
                                tdata.edit("", { embed: embed, components: [bts] })
                                setTimeout(() => {
                                    tdata.edit("", {
                                        components: [], embed: new Discord.MessageEmbed()
                                        .setTitle('Backup Serveur')
                                        .setDescription(bkp
                                            .map(r => r)
                                            .map((r, i) => `${r.code}`)
                                              .slice(0, 30)
                                              )
                                            .setColor(color)
                
                
                                    })
                                    // message.channel.send(embeds)
                                }, 60000 * 5)
                                client.on("clickButton", (button) => {
                                    if (button.clicker.user.id !== message.author.id) return ;
                                    if (button.id === "backuplistserv1") {
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
                
                
                                        embed
                                        .setDescription(bkp
                                            .map(r => r)
                                            .map((r, i) => `${r.code}`)
                                              .slice(0, 30)
                                              )
                                        tdata.edit(embed);
                
                                    }
                                    if (button.id === "backuplistserv2") {
                                        button.reply.defer(true)
                
                                        p0 = p0 + 15;
                                        p1 = p1 + 15;
                
                                        page++;
                
                                        if (p1 > bkp.length + 15) {
                                            return
                                        }
                                        if (p0 === undefined || p1 === undefined) {
                                            return
                                        }
                
                
                                        embed
                                        .setDescription(bkp
                                            .map(r => r)
                                            .map((r, i) => `${r.code}`)
                                              .slice(0, 30)
                                              )
                                            .setFooter(`${page}/${Math.ceil(bkp.length === 0?1:bkp.length / 15)} • ${client.config.name}`)
                                        tdata.edit(embed);
                
                                    }
                                })
                            }
                
                        })
                    }
                    
                  
             } else if (args[0] === "emoji" || args[0] === "emojis") {
                if(args[1].toLowerCase() === "create") {
                    let code = args[2]
                    if(!code) return message.reply(`Merci d'entrer un nom de backup !`)
                    let bruh = `backupemoji_${client.user.id}`;
                    message.channel.send(`Backup en cours...`)
                        
                        let emoji = message.guild.emojis.cache;
                    
                    
                        let arr = new Array();
                        emoji.forEach(e => arr.push(e.toString()));
                        db.push(bruh, {
                            code: code,
                            server: message.guild.name,
                            emojis: arr,
                            size: emoji.size
                        });
                        
                        return message.channel.send(`${emoji.size} ${emoji.size?"émojis ont été sauvegardés":"émoji à été sauvegardé"}`);
                } else if(args[1].toLowerCase() === "delete") {
                    let code = args[2]
                    if(!code ) return
                   let pog = db.get(`backupemoji_${client.user.id}`);
                   if (pog) {
                       let data = pog.find(x => x.code === code)
                       if (!data) return
                      
               db.set(`backupemoji_${client.user.id}`,  db.get(`backupemoji_${client.user.id}`).filter(s => s.code !==code))
               message.channel.send(`Backup supprimée`) 
            }
    
                } else if(args[1].toLowerCase() === "clear") {
                    db.delete(`backupsemoji_${client.user.id}`)
                   
                    return message.channel.send(`Toute les Backups d'emoji ont était supprimés.`);
               
                } else if(args[1].toLowerCase() === "load") {
                    let timeout = 2400000;
                    let daily = await db.fetch(`guildbackup_${message.guild.id}`);
                    if (daily != null && daily >= Date.now()) {
                        
                       
                        message.channel.send(`Une backup à déjà été charger sur le serveur, re essayer dans ${duration(daily - Date.now())} !`)
                  } else {  
                     let code = args[2]
                     if(!code ) return
                    let pog = db.get(`backupemoji_${client.user.id}`);
                    if (pog) {
                        let data = pog.find(x => x.code === code)
                        if (!data) return
                        if (!data.emojis) return
                       if (!data.size) return
                       message.channel.send(`Chargement de la backup...`)
                
                        data.emojis.forEach(emote => {
                            let emoji = Discord.Util.parseEmoji(emote);
                            if (emoji.id) {
                                const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
                                    emoji.animated ? 'gif' : 'png'
                                }`;
                                message.guild.emojis
                                    .create(`${Link}`, `${`${emoji.name}`}`)
                                    .catch(error => {
                                                          });
                            }
                        });
                
                        db.set(`guildbackup_${message.guild.id}`, Date.now()+60000*40)
                        let guild = message.guild
                       
                        message.channel.send(`Backup d'émoji chargée ${data.size ||0}/${data.size ||0}`);
                    } }
               
    
                } else if(args[1].toLowerCase() === "list") {
                    let p0 = 0;
                    let p1 = 15;
                    let page = 1;
            
            
                        let bkp = db.get(`backupemoji_${client.user.id}`)
                        if(bkp === null) return message.channel.send(new Discord.MessageEmbed().setColor(color).setTitle("Aucune backup d'émoji enregistrée"))
                
                       
                
                        let embed = new Discord.MessageEmbed()
                
                
                        embed.setTitle(`Liste des backups d'émoji`)
                        .setColor(color)
                        .setDescription(bkp
                          .map(r => r)
                          .map((r, i) => `${r.code}`)
                            .slice(0, 30)
                            )
                          
            
                    message.channel.send(embed).then(async tdata => {
                        if (bkp.length > 15) {
                            const B1 = new MessageButton()
                                .setLabel("◀")
                                .setStyle("gray")
                                .setID('backuplistemoj1');
            
                            const B2 = new MessageButton()
                                .setLabel("▶")
                                .setStyle("gray")
                                .setID('backuplistemoj2');
            
                            const bts = new MessageActionRow()
                                .addComponent(B1)
                                .addComponent(B2)
                            tdata.edit("", { embed: embed, components: [bts] })
                            setTimeout(() => {
                                tdata.edit("", {
                                    components: [], embed: new Discord.MessageEmbed()
                                    .setTitle('Backup emoji')
                                    .setDescription(bkp
                                        .map(r => r)
                                        .map((r, i) => `${r.code}`)
                                          .slice(0, 30)
                                          )
                                        .setColor(color)
            
            
                                })
                                // message.channel.send(embeds)
                            }, 60000 * 5)
                            client.on("clickButton", (button) => {
                                if (button.clicker.user.id !== message.author.id) return ;
                                if (button.id === "backuplistemoj1") {
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
            
            
                                    embed
                                    .setDescription(bkp
                                        .map(r => r)
                                        .map((r, i) => `${r.code}`)
                                          .slice(0, 30)
                                          )
                                    tdata.edit(embed);
            
                                }
                                if (button.id === "backuplistemoj2") {
                                    button.reply.defer(true)
            
                                    p0 = p0 + 15;
                                    p1 = p1 + 15;
            
                                    page++;
            
                                    if (p1 > bkp.length + 15) {
                                        return
                                    }
                                    if (p0 === undefined || p1 === undefined) {
                                        return
                                    }
            
            
                                    embed
                                    .setDescription(bkp
                                        .map(r => r)
                                        .map((r, i) => `${r.code}`)
                                          .slice(0, 30)
                                          )
                                        .setFooter(`${page}/${Math.ceil(bkp.length === 0?1:bkp.length / 15)} • ${client.config.name}`)
                                    tdata.edit(embed);
            
                                }
                            })
                        }
            
                    })
                }
                
              }
    
            }}
        

    
}