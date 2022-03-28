const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
const ms = require("ms")
module.exports = {
    name: 'giveaway',
    aliases: ["gvw"],
    run: async (client, message, args, prefix, color) => {
        let perm = ""
        message.member.roles.cache.forEach(role => {
        if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        if(db.get(`gvwp_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) { 
         
            if(args[0] === "reroll") {
                if(!args.lenght > 0) {

                    message.channel.messages.fetch(db.get(`last${message.guild.id}`)).then(m => {
                        let msg = m
            
                        if(!m) return message.channel.send(`Aucun giveaway trouvé dans ce salon, essayez \`prefix + giveaway reroll + <message id>\``);
                        if (m.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).count <= 1) {
                            return   message.channel.send(`Aucun participant trouvé`)
                        }
                        let winner = false
                        if(db.get(`imposer${message.guild.id}`) !== null) {
                            winner = message.guild.members.cache.get(db.get(`imposer${message.guild.id}`))
                            if(!winner) return winner = msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).users.cache.filter((u) => !u.bot).random(Math.min(db.get(`winnergv${message.guild.id}`) === null?   1:`${db.get(`winnergv${message.guild.id}`)}`, msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).count));
                        } else if(db.get(`presencevocal${message.guild.id}`) === true) {
                            winner = msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).users.cache.filter((u) => !u.voice && !u.bot ).random(Math.min(db.get(`winnergv${message.guild.id}`) === null?   1:`${db.get(`winnergv${message.guild.id}`)}`, msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).count));
                        } else {
                            winner = msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).users.cache.filter((u) => !u.bot).random(Math.min(db.get(`winnergv${message.guild.id}`) === null?   1:`${db.get(`winnergv${message.guild.id}`)}`, msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).count));
                        }
                        if(!winner) return message.channel.send(`Aucun participant valide`)
                        message.channel.send(`Félicitation à ${winner} qui gagne ${db.get(`gain${message.guild.id}`)}`)
                    })
                        } else {
                    message.channel.messages.fetch(args[0]).then(m => {
                        let msg = m
            
                        if(!m) return message.channel.send(`Aucun giveaway trouvé dans ce salon, essayez \`prefix + giveaway reroll + <message id>\``);
                        if (m.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).count <= 1) {
                         return   message.channel.send(`Aucun participant trouvé`)
                        }
                        let winner = false
                        if(db.get(`imposer${message.guild.id}`) !== null) {
                            winner = message.guild.members.cache.get(db.get(`imposer${message.guild.id}`))
                            if(!winner) return winner = msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).users.cache.filter((u) => !u.bot).random(Math.min(db.get(`winnergv${message.guild.id}`) === null?   1:`${db.get(`winnergv${message.guild.id}`)}`, msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).count));
                        } else if(db.get(`presencevocal${message.guild.id}`) === true) {
                            winner = msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).users.cache.filter((u) => !u.voice && !u.bot ).random(Math.min(db.get(`winnergv${message.guild.id}`) === null?   1:`${db.get(`winnergv${message.guild.id}`)}`, msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).count));
                        } else {
                            winner = msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).users.cache.filter((u) => !u.bot).random(Math.min(db.get(`winnergv${message.guild.id}`) === null?   1:`${db.get(`winnergv${message.guild.id}`)}`, msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).count));
                        }
                        if(!winner) return message.channel.send(`Aucun participant valide`)
                          message.channel.send(`Félicitation à ${winner} qui gagne ${db.get(`gain${message.guild.id}`)}`)
            
                    })
                        }
            
            } else if(!args[0]) {
        function updateembed(msg) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Configuration Giveaway`)
                .setColor(color)
                .addField(`Durée`, `${db.get(`dure${msg.guild.id}`) === null?   "Non définit": `${ms(db.get(`dure${msg.guild.id}`)).replace("d","j")}`}`, true)
                .addField(`Salon`, `${db.get(`channel${msg.guild.id}`) === null?   message.channel:`<#${db.get(`channel${msg.guild.id}`)}>`}`, true)
                .addField(`Gagnant imposé`, `${db.get(`imposer${msg.guild.id}`) === null?   "Non définit":`<@${db.get(`imposer${msg.guild.id}`)}>`}`, true)
                .addField(`Présence en vocal`, `${db.get(`presencevocal${msg.guild.id}`) === null? "Non": `Oui`}`, true)
                .addField(`Rôle obligatoire`, `${db.get(`roleobliga${msg.guild.id}`) === null?   "Non définit":`<@&${db.get(`roleobliga${msg.guild.id}`)}>`}`, true)
                .addField(`Gagnant`, `${db.get(`winnergv${msg.guild.id}`) === null?   1:`${db.get(`winnergv${msg.guild.id}`)}`}`, true)
                .addField(`Réaction`, `${db.get(`reactgv${msg.guild.id}`) === null?   ":tada:":`${db.get(`reactgv${msg.guild.id}`)}`}`, true)
                .addField(`Gain`, `${db.get(`gain${msg.guild.id}`) === null?   "Non définit":`${db.get(`gain${msg.guild.id}`)}`}`, true)
            


                let menuoptions = [
            
                    { value: "Modifier la durée", description: "", emoji: "🕙" },
                    { value: "Modifier le salon", description: "", emoji: "🏷️" },
                    { value: "Modifier le gagnants imposer", description: "", emoji: "🕵️" },
                    { value: "Supprimer le gagnants imposer", description: "", emoji: "🕵️" },
                    { value: "Modifier la presence en vocal obligatoire", description: "", emoji: "🔊" },
                    { value: "Modifier le rôle obligatoire", description: "", emoji: "🌞" },
                    { value: "Supprimer le rôle obligatoire", description: "", emoji: "☀" },
                    { value: "Modifier le nombre de gagnants", description: "", emoji: "👤" },
                    { value: "Modifier la réaction", description: "", emoji: "⭐" },
                    { value: "Modifier le gain", description: "", emoji: "🎁" },
        
        
                ]
            let interactiveButtons = new MessageMenu()
                .setID(message.id+'MenuSelection')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder('Faix un choix');
            menuoptions.forEach(option => {
                let row = new MessageMenuOption()
                    .setLabel(option.label ? option.label : option.value)
                    .setValue(option.value)
                    .setDescription(option.description)
                    .setDefault()
                if (option.emoji) row.setEmoji(option.emoji)
                interactiveButtons.addOption(row)
            })
            const bt = new MessageButton()
            .setStyle("gray")
            .setID("gvw1"+message.id)
            .setEmoji("✅")
            .setLabel("Valider")
            const bt2 = new MessageButton()
            .setStyle("gray")
            .setID("gvw2"+message.id)
            .setEmoji("❌")
            .setLabel("Re formuler votre choix")
            msg.edit({embed: embed,
                components: [
                  
                    {
                      type: 1,
                      components: [interactiveButtons]
                    },
                
                    {
                        type: 1,
                        components: [bt,bt2],
                      }]})
        }

         
            const embed = new Discord.MessageEmbed()
            .setTitle(`Configuration Giveaway`)
            .setColor(color)
            .addField(`Durée`, `${db.get(`dure${message.guild.id}`) === null?   "Non définit": `${ms(db.get(`dure${message.guild.id}`)).replace("d","j") }`}`, true)
            .addField(`Salon`, `${db.get(`channel${message.guild.id}`) === null?   message.channel:`<#${db.get(`channel${message.guild.id}`)}>`}`, true)
            .addField(`Gagnant imposé`, `${db.get(`imposer${message.guild.id}`) === null?   "Non définit":`<@${db.get(`imposer${message.guild.id}`)}>`}`, true)
            .addField(`Présence en vocal`, `${db.get(`presencevocal${message.guild.id}`) === null? "Non": `Oui`}`, true)
            .addField(`Rôle obligatoire`, `${db.get(`roleobliga${message.guild.id}`) === null?   "Non définit":`<@&${db.get(`roleobliga${message.guild.id}`)}>`}`, true)
            .addField(`Gagnant`, `${db.get(`winnergv${message.guild.id}`) === null?   1:`${db.get(`winnergv${message.guild.id}`)}`}`, true)
            .addField(`Réaction`, `${db.get(`reactgv${message.guild.id}`) === null?   ":tada:":`${db.get(`reactgv${message.guild.id}`)}`}`, true)
            .addField(`Gain`, `${db.get(`gain${message.guild.id}`) === null?   "Non définit":`${db.get(`gain${message.guild.id}`)}`}`, true)
        


        let menuoptions = [
            
            { value: "Modifier la durée", description: "", emoji: "🕙" },
            { value: "Modifier le salon", description: "", emoji: "🏷️" },
            { value: "Modifier le gagnants imposer", description: "", emoji: "🕵️" },
            { value: "Supprimer le gagnants imposer", description: "", emoji: "🕵️" },
            { value: "Modifier la presence en vocal obligatoire", description: "", emoji: "🔊" },
            { value: "Modifier le rôle obligatoire", description: "", emoji: "🌞" },
            { value: "Supprimer le rôle obligatoire", description: "", emoji: "☀" },
            { value: "Modifier le nombre de gagnants", description: "", emoji: "👤" },
            { value: "Modifier la réaction", description: "", emoji: "⭐" },
            { value: "Modifier le gain", description: "", emoji: "🎁" },


        ]


            let interactiveButtons = new MessageMenu()
                .setID(message.id+'MenuSelection')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder('Faix un choix');
            menuoptions.forEach(option => {
                let row = new MessageMenuOption()
                    .setLabel(option.label ? option.label : option.value)
                    .setValue(option.value)
                    .setDescription(option.description)
                    .setDefault()
                if (option.emoji) row.setEmoji(option.emoji)
                interactiveButtons.addOption(row)
            })
            const bt = new MessageButton()
            .setStyle("gray")
            .setID("gvw1"+message.id)
            .setEmoji("✅")
            .setLabel("Valider")
            const bt2 = new MessageButton()
            .setStyle("gray")
            .setID("gvw2"+message.id)
            .setEmoji("❌")
            .setLabel("Re formuler votre choix")
            message.channel.send({embed: embed,
                components: [
                  
                    {
                      type: 1,
                      components: [interactiveButtons]
                    },
                
                    {
                        type: 1,
                        components: [bt,bt2],
                      }]}).then(async m => {
                setTimeout(() => {
                    m.edit("", { components: [], embed: new Discord.MessageEmbed()
                        .setTitle(`Configuration Giveaway`)
                        .setColor(color)
                        .addField(`Durée`, `${db.get(`dure${message.guild.id}`) === null?   "Non définit": `${ms(db.get(`dure${message.guild.id}`)).replace("d","j") }`}`, true)
                        .addField(`Salon`, `${db.get(`channel${message.guild.id}`) === null?   message.channel:`<#${db.get(`channel${message.guild.id}`)}>`}`, true)
                        .addField(`Gagnant imposé`, `${db.get(`imposer${message.guild.id}`) === null?   "Non définit":`<@${db.get(`imposer${message.guild.id}`)}>`}`, true)
                        .addField(`Présence en vocal`, `${db.get(`presencevocal${message.guild.id}`) === null? "Non": `Oui`}`, true)
                        .addField(`Rôle obligatoire`, `${db.get(`roleobliga${message.guild.id}`) === null?   "Non définit":`<@&${db.get(`roleobliga${message.guild.id}`)}>`}`, true)
                        .addField(`Gagnant`, `${db.get(`winnergv${message.guild.id}`) === null?   1:`${db.get(`winnergv${message.guild.id}`)}`}`, true)
                        .addField(`Réaction`, `${db.get(`reactgv${message.guild.id}`) === null?   ":tada:":`${db.get(`reactgv${message.guild.id}`)}`}`, true)
                        .addField(`Gain`, `${db.get(`gain${message.guild.id}`) === null?   "Non définit":`${db.get(`gain${message.guild.id}`)}`}`, true) })
                    // message.channel.send(embeds)
                }, 60000 * 5)
                client.on('clickMenu', async (menu) => {
                    if (message.author !== menu.clicker.user || menu.message.id !== m.id ) return ;
                    menu.reply.defer(true)
                    menuselection(menu)
                })
                client.on('clickButton', async (button) => {
                    if (message.author !== button.clicker.user) return ;
                    
                    if(button.id === "gvw1"+message.id){
                        button.reply.defer(true)
                        var channel = message.guild.channels.cache.get(db.get(`channel${message.guild.id}`)) || message.guild.channels.cache.get(message.channel.id)
                        if(!channel) return message.channel.send(`Aucun salon trouvé pour \`le giveaway\``)
                        if(db.get(`dure${message.guild.id}`) === null) return message.channel.send(`Aucune durée trouvé pour \`le giveaway\``)
                        if(db.get(`gain${message.guild.id}`) === null) return message.channel.send(`Aucune gain trouvé pour \`le giveaway\``)

                        message.channel.send(`Giveaway crée`)
                    
                       var timestamp = Date.now() + db.get(`dure${message.guild.id}`)
               
                        var embed = new Discord.MessageEmbed()
                        .setTitle(db.get(`gain${message.guild.id}`))
                        .setDescription(`Réagissez avec ${db.get(`reactgv${message.guild.id}`) === null?   ":tada:":`${db.get(`reactgv${message.guild.id}`)}`} pour participer!\n*Nombre de gagnants : ${db.get(`winnergv${message.guild.id}`) === null?   1:`${db.get(`winnergv${message.guild.id}`)}`}*`)
                        .addField(`Temps restant`, `${duration(db.get(`dure${message.guild.id}`))}`)
                           .setColor(color)
                        .setFooter(`Fin`)
                        .setTimestamp(timestamp)
                        var msg = await channel.send(embed) 
                  
                        msg.react(`${db.get(`reactgv${message.guild.id}`) === null ? `🎉`: `${db.get(`reactgv${message.guild.id}`)}` }`)
                        client.on("messageReactionAdd", async (reaction, user) => {
                            let react = ""
                            if(!db.get(`reactgv${message.guild.id}`)) react = reaction.id
                            if(!db.get(`2reactgv${message.guild.id}`)) react = reaction.name
                             if(react === db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`)) {

                                if(message.guild.roles.cache.get(db.get(`roleobliga${message.guild.id}`)) && !message.guild.members.cache.get(user.id).roles.cache.has(db.get(`roleobliga${message.guild.id}`))) reaction.users.remove(user.id)
                            }
                        })
                        setInterval(async () => { 
                            let ttm = duration(timestamp - Date.now())
                            if(!ttm.includes("-")) {
                            var slm = new Discord.MessageEmbed()
                            .setTitle(db.get(`gain${message.guild.id}`))
                            .setDescription(`Réagissez avec ${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`reactgv${message.guild.id}`) } pour participer!\n*Nombre de gagnants : ${db.get(`winnergv${message.guild.id}`) === null?   1:`${db.get(`winnergv${message.guild.id}`)}`}*`)
                            .addField(`Temps restant`, `${ttm}`)
                            .setColor(color)
                            .setFooter(`Fin`)
                            .setTimestamp(timestamp)
                        await msg.edit("",slm)}
                
                         },5000)
                        setTimeout(() => {
                 
                   
                            db.set(`last${message.guild.id}`, msg.id)
                            let winner = false
               
                        if(db.get(`imposer${message.guild.id}`) !== null) {
                            winner = message.guild.members.cache.get(db.get(`imposer${message.guild.id}`))
                            if(!winner) return winner = msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).users.cache.filter((u) => !u.bot).random(Math.min(db.get(`winnergv${message.guild.id}`) === null?   1:`${db.get(`winnergv${message.guild.id}`)}`, msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).count));
                        } else if(db.get(`presencevocal${message.guild.id}`) === true) {
                            winner = msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).users.cache.filter((u) => !u.voice && !u.bot ).random(Math.min(db.get(`winnergv${message.guild.id}`) === null?   1:`${db.get(`winnergv${message.guild.id}`)}`, msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).count));
                        } else {
                            winner = msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).users.cache.filter((u) => !u.bot).random(Math.min(db.get(`winnergv${message.guild.id}`) === null?   1:`${db.get(`winnergv${message.guild.id}`)}`, msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).count));
                        }
                        if(!winner) return message.channel.send(`Aucun participant valide`)
                        var embed = new Discord.MessageEmbed()
                        .setTitle(db.get(`gain${message.guild.id}`))
                        .setDescription(`
Gagnant: ${winner}
Crée par: ${message.author}`)
                           .setColor(color)
                        .setFooter(`Finis`)
                        .setTimestamp(Date.now())
                        msg.edit(embed)
                         msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).remove()
                        channel.send(`Félicitation à ${winner} qui gagne ${db.get(`gain${message.guild.id}`)}`)
                        }, db.get(`dure${message.guild.id}`));
                    }
                    if(button.id === "gvw2"+message.id) {
                        button.reply.defer(true)
updateembed(m)
                    }
                })
                async function menuselection(menu) {
                    switch (menu.values[0]) {
                        case "Modifier le rôle obligatoire":
                            message.channel.send(`Quel est **le nouveau rôle obligatoire pour participer au giveaway** ?`).then(mp => {
                                mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                    .then(cld => {

                                        var msg = cld.first();
                                        let channel = msg.mentions.roles.first() || message.guild.roles.cache.get(msg.content)
                                        if(!channel) return  message.channel.send(`Aucun rôle trouvé pour \`${msg.content}\``)
                                        db.set(`roleobliga${message.guild.id}` ,channel.id)
                                        mp.delete()
                                        cld.first().delete()
                                        updateembed(m)

                                    });
                            })
                            break
                            case "Supprimer le rôle obligatoire":
                      
                                            db.delete(`roleobliga${message.guild.id}` )
                                          
                                            updateembed(m)
    
                                break
                        case "Modifier la durée":
                            message.channel.send(`Quel est **la nouvelle durée du giveaway** ?`).then(mp => {
                                mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                    .then(cld => {

                                        var msg = cld.first();
                                        if(!msg.content.endsWith("d") && !msg.content.endsWith("j") && !msg.content.endsWith("h") && !msg.content.endsWith("m")  && !msg.content.endsWith("s")) return message.channel.send(`Temps incorrect.`)
                                        db.set(`dure${message.guild.id}` ,ms(msg.content.replace("j","d")))
                                        mp.delete()
                                        cld.first().delete()
                                        updateembed(m)

                                    });
                            })
                            break
                      
                            
                            case "Modifier le salon":
                                message.channel.send(`Quel est **le nouveau salon du giveaway** ?`).then(mp => {
                                    mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                        .then(cld => {
    
                                            var msg = cld.first();
                                            let channel = msg.mentions.channels.first() || message.guild.channels.cache.get(msg.content)
                                            if(!channel) return  message.channel.send(`Aucun salon trouvé pour \`${msg.content}\``)
                                            db.set(`channel${message.guild.id}` ,channel.id)
                                            mp.delete()
                                            cld.first().delete()
                                            updateembed(m)
    
                                        });
                                })
                                break
                          
                                case "Modifier le gagnants imposer":
                                    message.channel.send(`Quel est **le nouveau gagnants imposer** ?`).then(mp => {
                                        mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                            .then(cld => {
        
                                                var msg = cld.first();
                                                let users = msg.mentions.users.first() || message.guild.channels.cache.get(msg.content)
                                                if(!users)  return  message.channel.send(`Aucun utilisateur trouvé pour \`${msg.content}\``)
                                             db.set(`imposer${message.guild.id}` ,users.id)
                                                mp.delete()
                                                cld.first().delete()
                                                updateembed(m)
        
                                            });
                                    })
                                    break                                
                          
                                    case "Supprimer le gagnants imposer":
                                        db.delete(`imposer${message.guild.id}` )
                                        updateembed(m)
            
                                               
                                        
                                        break   
   
                          
                                        case "Modifier la presence en vocal obligatoire":
                                         if(db.get(`presencevocal${message.guild.id}`) === null) {
                                            db.set(`presencevocal${message.guild.id}`,true)
                                            updateembed(m)
                                         } else if(db.get(`presencevocal${message.guild.id}`) === true) {
                                            db.set(`presencevocal${message.guild.id}`,null)
                                            updateembed(m)

                                         }
            
                                            break   
   
                                            case "Modifier le nombre de gagnants":
                                                message.channel.send(`Quel est **le nouveau nombtre gagnants** ?`).then(mp => {
                                                    mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                                        .then(cld => {
                    
                                                            var msg = cld.first();
                                                            if(isNaN(msg.content)) return message.channel.send(`Aucun nombre valide trouvé pour \`${msg.content}\``)
                                                            db.set(`winnergv${message.guild.id}` , msg.content)
                                                            mp.delete()
                                                            cld.first().delete()
                                                            updateembed(m)
                    
                                                        });
                                                })
                                                break                  


                                                case "Modifier la réaction":
                                                    message.channel.send(`Quel est **la réaction** ?`).then(mp => {
                                                        mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                                            .then(cld => {
                        
                                                                var msg = cld.first();
                        
                                                                cld.first().react(msg.content).then(() => {
                                                                    db.set(`reactgv${message.guild.id}`, msg.content)
                                                                    db.delete(`2reactgv${message.guild.id}`)
                                                                    if( Discord.Util.parseEmoji(msg.content).id)  db.set(`2reactgv${message.guild.id}`, Discord.Util.parseEmoji(msg.content).id)

                                                                    mp.delete()
                                                                    cld.first().delete()
                                                                    updateembed(m)
                                                                }).catch(() => {
                                                                    mp.delete()
                                                                    cld.first().delete()
                                                                    return message.channel.send(`Je n'est pas accès à cette emoji`)
                        
                                                                })
                        
                        
                        
                        
                        
                                                            });
                                                    })
                                                    break                  

                                                    case "Modifier le gain":
                                                        message.channel.send(`Quel est **le nouveau gain** ?`).then(mp => {
                                                            mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                                                .then(cld => {
                            
                                                                    var msg = cld.first();
                                                                    db.set(`gain${message.guild.id}` ,msg.content)
                                                                    mp.delete()
                                                                    cld.first().delete()
                                                                    updateembed(m)
                            
                                                                });
                                                        })
                                                        break                  

                                }
                }
            })
        } 
        }

    }
}

function duration(mss) {
    const sec = Math.floor((mss / 1000) % 60).toString()
    const min = Math.floor((mss / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((mss / (1000 * 60 * 60)) % 60).toString()
    const days = Math.floor(mss / (1000 * 60 * 60 * 24)).toString()
    return `${days.padStart(2, '') == "0" ? "" : `${days.padStart(2, '')} jours, `}${hrs.padStart(2, '') == "0" ? "" : `${hrs.padStart(2, '')} heures, `}${min.padStart(2, '') == "0" ? "" : `${min.padStart(2, '')} minutes et `}${sec.padStart(2, '')} secondes`
}