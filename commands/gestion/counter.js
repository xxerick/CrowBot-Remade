const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');

module.exports = {
    name: 'counter',
    aliases: [],
    run: async (client, message, args, prefix, color) => {

        function updateembed(msg) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Configuration Compteur`)
                .setColor(color)
                .addField("Compteur de membres", db.get(`member_${msg.guild.id}`) === null ? ":x:" : `<#${db.get(`member_${msg.guild.id}`)}> (${db.get(`member_${msg.guild.id}`)})`)
                .addField("Compteur de membres en ligne", db.get(`online_${msg.guild.id}`) === null ? ":x:" : `<#${db.get(`online_${msg.guild.id}`)}> (${db.get(`online_${msg.guild.id}`)})`)
                .addField("Compteur de membres en vocal", db.get(`vocal_${msg.guild.id}`) === null ? ":x:" : `<#${db.get(`vocal_${msg.guild.id}`)}> (${db.get(`vocal_${msg.guild.id}`)})`)
                .addField("Compteur de boost", db.get(`boost_${msg.guild.id}`) === null ? ":x:" : `<#${db.get(`boost_${msg.guild.id}`)}> (${db.get(`boost_${msg.guild.id}`)})`)



            let menuoptions = [
                { value: "Configuration automatique (création de tout les salons vocaux)", description: "", emoji: "🔰" },
                { value: "Modifier le compteur de membres", description: "", emoji: "👤" },
                { value: "Supprimer le compteur de membres", description: "", emoji: "👥" },

                { value: "Modifier le compteur de membres en ligne", description: "", emoji: "🌟" },
                { value: "Supprimer le compteur de membres en ligne", description: "", emoji: "🪁" },

                { value: "Modifier le compteur de membres en vocal", description: "", emoji: "🎧" },
                { value: "Supprimer le compteur de membres  en vocal", description: "", emoji: "🔈" },

                { value: "Modifier le compteur de boost", description: "", emoji: "💎" },
                { value: "Supprimer le compteur de boost", description: "", emoji: "🔮" },

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
       
            const bt2 = new MessageButton()
            .setStyle("gray")
            .setID("counter2"+message.id)
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
                        components: [bt2],
                      }]})
        }

        let perm = ""
        message.member.roles.cache.forEach(role => {
        if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {     
                const embed = new Discord.MessageEmbed()
                .setTitle(`Configuration Compteur`)
                .setColor(color)
                .addField("Compteur de membres", db.get(`member_${message.guild.id}`) === null ? ":x:" : `<#${db.get(`member_${message.guild.id}`)}> (${db.get(`member_${message.guild.id}`)})`)
                .addField("Compteur de membres en ligne", db.get(`online_${message.guild.id}`) === null ? ":x:" : `<#${db.get(`online_${message.guild.id}`)}> (${db.get(`online_${message.guild.id}`)})`)
                .addField("Compteur de membres en vocal", db.get(`vocal_${message.guild.id}`) === null ? ":x:" : `<#${db.get(`vocal_${message.guild.id}`)}> (${db.get(`vocal_${message.guild.id}`)})`)
                .addField("Compteur de boost", db.get(`boost_${message.guild.id}`) === null ? ":x:" : `<#${db.get(`boost_${message.guild.id}`)}> (${db.get(`boost_${message.guild.id}`)})`)



            let menuoptions = [
                { value: "Configuration automatique", description: "", emoji: "🔰" },
                { value: "Modifier le compteur de membres", description: "", emoji: "👤" },
                { value: "Supprimer le compteur de membres", description: "", emoji: "👥" },

                { value: "Modifier le compteur de membres en ligne", description: "", emoji: "🌟" },
                { value: "Supprimer le compteur de membres en ligne", description: "", emoji: "🪁" },

                { value: "Modifier le compteur de membres en vocal", description: "", emoji: "🎧" },
                { value: "Supprimer le compteur de membres  en vocal", description: "", emoji: "🔈" },

                { value: "Modifier le compteur de boost", description: "", emoji: "💎" },
                { value: "Supprimer le compteur de boost", description: "", emoji: "🔮" },

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
            const bt2 = new MessageButton()
            .setStyle("gray")
            .setID("counter2"+message.id)
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
                        components: [bt2],
                      }]}).then(async m => {
                setTimeout(() => {
                    m.edit("", { components: [], embed: new Discord.MessageEmbed()
                .setTitle(`Configuration Compteur`)
                .setColor(color)
                .addField("Compteur de membres", db.get(`member_${message.guild.id}`) === null ? ":x:" : `<#${db.get(`member_${message.guild.id}`)}> (${db.get(`member_${message.guild.id}`)})`)
                .addField("Compteur de membres en ligne", db.get(`online_${message.guild.id}`) === null ? ":x:" : `<#${db.get(`online_${message.guild.id}`)}> (${db.get(`online_${message.guild.id}`)})`)
                .addField("Compteur de membres en vocal", db.get(`vocal_${message.guild.id}`) === null ? ":x:" : `<#${db.get(`vocal_${message.guild.id}`)}> (${db.get(`vocal_${message.guild.id}`)})`)
                .addField("Compteur de boost", db.get(`boost_${message.guild.id}`) === null ? ":x:" : `<#${db.get(`boost_${message.guild.id}`)}> (${db.get(`boost_${message.guild.id}`)})`) })
                    // message.channel.send(embeds)
                }, 60000 * 5)
                client.on('clickMenu', async (menu) => {
                    if (message.author !== menu.clicker.user || menu.message.id !== m.id ) return ;
                    menu.reply.defer(true)
                    menuselection(menu)
                })
                client.on('clickButton', async (button) => {
                    if (message.author !== button.clicker.user) return ;
                    
                
                    if(button.id === "counter2"+message.id) {
                        button.reply.defer(true)
updateembed(m)
                    }
                })
                function menuselection(menu) {
                    switch (menu.values[0]) {
                        case "Configuration automatique":
                            message.channel.send(`Création de la **catégorie** des Compteurs en cours..`).then(msge => {
                                message.guild.channels.create('STATISTIQUE', {
                                    type: 'category',
                                    permissionsOverwrites: [{
                                        id: message.guild.id,
                                        deny: ['CONNECT'],
                                        allow: ['VIEW_CHANNEL']
                                    }]
                                }).then(c => {
                                    c.setPosition(0)
                                    c.guild.channels.create(`💎・Membres: ${message.guild.memberCount}`, {
                                        type: 'voice',
                                        parent: c.id,
                                        permissionOverwrites: [
                                            {
                                                id: message.guild.id,
                                                deny: ['CONNECT'],
                                                allow: ['VIEW_CHANNEL']
                                            },
                                        ],
                                    }).then(total => {
                                        db.set(`member_${message.guild.id}`, total.id)
                                        c.guild.channels.create(`🌟・En ligne: ${message.guild.members.cache.filter(m => m.user.presence.status !== 'offline').size}`, {
                                            type: 'voice',
                                            parent: c.id,
                                            permissionOverwrites: [
                                                {
                                                    id: message.guild.id,
                                                    deny: ['CONNECT'],
                                                    allow: ['VIEW_CHANNEL']
                                                },
                                            ],
                                        }).then(online => {
                                            db.set(`online_${message.guild.id}`, online.id)

                                            c.guild.channels.create(`🎧・En vocal: ${message.guild.members.cache.filter(m => m.voice.channel).size}`, {
                                                type: 'voice',
                                                parent: c.id,
                                                permissionOverwrites: [
                                                    {
                                                        id: message.guild.id,
                                                        deny: ['CONNECT'],
                                                        allow: ['VIEW_CHANNEL']
                                                    },
                                                ],
                                            }).then(vocal => {
                                                db.set(`vocal_${message.guild.id}`, vocal.id)

                                                c.guild.channels.create(`🔮・Boost: ${message.guild.premiumSubscriptionCount}`, {
                                                    type: 'voice',
                                                    parent: c.id,
                                                    permissionOverwrites: [
                                                        {
                                                            id: message.guild.id,
                                                            deny: ['CONNECT'],
                                                            allow: ['VIEW_CHANNEL']
                                                        },
                                                    ],
                                                }).then(boost => {
                                                    db.set(`boost_${message.guild.id}`, boost.id)

                                                    msge.edit(`Création de la **catégorie** des Compteurs effectué avec succès.`)
                                                    updateembed(m)

                                                })
                                            })
                                        })
                                    })
                                })
                            })
                            break
                        case "Modifier le compteur de membres":
                            message.channel.send(`Quel est **le nouveau compteur de membres ?**`).then(mp => {
                                mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                    .then(cld => {
                                        var msg = cld.first();
                                        var role = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
                                        if (!role) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\`.`);
                                        message.channel.send(`Quel est **le format du Compteur de membres ?** (Mettez \`default\` pour le mettre par default, Mettez \`<count>\` pour le nombre de membres)`).then(mpe => {
                                            mpe.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                                .then(cld2 => {
                                                    if (cld2.first().content === "default") {
                                                        db.set(`memberformat_${message.guild.id}`, null)
                                                        db.set(`member_${message.guild.id}`, role.id)
                                                        mpe.delete()
                                                        cld2.first().delete()
                                                        mp.delete()
                                                        cld.first().delete()
                                                        role.setName(`💎・Membres: ${message.guild.memberCount}`)
                                                        updateembed(m)
                                                    } else {
                                                        db.set(`memberformat_${message.guild.id}`, cld2.first().content)
                                                        db.set(`member_${message.guild.id}`, role.id)
                                                        role.setName(cld2.first().content.replace("<count>", message.guild.memberCount))
                                                        mpe.delete()
                                                        cld2.first().delete()
                                                        mp.delete()
                                                        cld.first().delete()
                                                        updateembed(m)
                                                    }
                                                })
                                        })
                                    }
                                    )
                            })
                            break
                        case "Supprimer le compteur de membres":
                            db.delete(`member_${message.guild.id}`)
                            updateembed(m)
                            break
                        case "Modifier le compteur de membres en ligne":
                            message.channel.send(`Quel est **le nouveau compteur de membres en ligne ?**`).then(mp => {
                                mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                    .then(cld => {
                                        var msg = cld.first();
                                        var role = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
                                        if (!role) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\`.`);
                                        message.channel.send(`Quel est **le format du Compteur de membres en ligne  ?** (Mettez \`default\` pour le mettre par default, Mettez \`<count>\` pour le nombre de membres)`).then(mpe => {
                                            mpe.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                                .then(cld2 => {
                                                    if (cld2.first().content === "default") {
                                                        db.set(`onlineformat_${message.guild.id}`, null)
                                                        db.set(`online_${message.guild.id}`, role.id)
                                                        mpe.delete()
                                                        cld2.first().delete()
                                                        mp.delete()
                                                        cld.first().delete()
                                                        role.setName(`🌟・En ligne: ${message.guild.members.cache.filter(m => m.user.presence.status !== 'offline').size}`)
                                                        updateembed(m)
                                                    } else {
                                                        db.set(`onlineformat_${message.guild.id}`, cld2.first().content)
                                                        db.set(`online_${message.guild.id}`, role.id)
                                                        role.setName(cld2.first().content.replace("<count>", message.guild.members.cache.filter(m => m.user.presence.status !== 'offline').size))
                                                        mpe.delete()
                                                        cld2.first().delete()
                                                        mp.delete()
                                                        cld.first().delete()
                                                        updateembed(m)
                                                    }
                                                })
                                        })
                                    }
                                    )
                            })
                            break
                        case "Supprimer le compteur de membre en ligne":
                            db.delete(`online_${message.guild.id}`)
                            updateembed(m)
                            break
                        case "Modifier le compteur de membres en vocal":
                            message.channel.send(`Quel est **le nouveau compteur de membres en vocal ?**`).then(mp => {
                                mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                    .then(cld => {
                                        var msg = cld.first();
                                        var role = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
                                        if (!role) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\`.`);
                                        message.channel.send(`Quel est **le format du Compteur de membres en vocal  ?** (Mettez \`default\` pour le mettre par default, Mettez \`<count>\` pour le nombre de membres)`).then(mpe => {
                                            mpe.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                                .then(cld2 => {
                                                    if (cld2.first().content === "default") {
                                                        db.set(`vocalformat_${message.guild.id}`, null)
                                                        db.set(`vocal_${message.guild.id}`, role.id)
                                                        mpe.delete()
                                                        cld2.first().delete()
                                                        mp.delete()
                                                        cld.first().delete()
                                                        role.setName(`🎧・En vocal: ${message.guild.members.cache.filter(m => m.voice.channel).size}`)
                                                        updateembed(m)
                                                    } else {
                                                        db.set(`vocalformat_${message.guild.id}`, cld2.first().content)
                                                        db.set(`vocal_${message.guild.id}`, role.id)
                                                        role.setName(cld2.first().content.replace("<count>", message.guild.members.cache.filter(m => m.voice.channel).size))
                                                        mpe.delete()
                                                        cld2.first().delete()
                                                        mp.delete()
                                                        cld.first().delete()
                                                        updateembed(m)
                                                    }
                                                })
                                        })
                                    }
                                    )
                            })
                            break
                        case "Supprimer le compteur de membre en vocal":
                            db.delete(`vocal_${message.guild.id}`)
                            updateembed(m)
                            break
                        case "Modifier le compteur de boost":
                            message.channel.send(`Quel est **le nouveau compteur de boost ?**`).then(mp => {
                                mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                    .then(cld => {
                                        var msg = cld.first();
                                        var role = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
                                        if (!role) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\`.`);
                                        message.channel.send(`Quel est **le format du Compteur de boost  ?** (Mettez \`default\` pour le mettre par default, Mettez \`<count>\` pour le nombre de boost)`).then(mpe => {
                                            mpe.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                                .then(cld2 => {
                                                    if (cld2.first().content === "default") {
                                                        db.set(`boostformat_${message.guild.id}`, null)
                                                        db.set(`boost_${message.guild.id}`, role.id)
                                                        mpe.delete()
                                                        cld2.first().delete()
                                                        mp.delete()
                                                        cld.first().delete()
                                                        role.setName(`🔮・Boost: ${message.guild.premiumSubscriptionCount}`)
                                                        updateembed(m)
                                                    } else {
                                                        db.set(`boostformat_${message.guild.id}`, cld2.first().content)
                                                        db.set(`boost_${message.guild.id}`, role.id)
                                                        role.setName(cld2.first().content.replace("<count>", message.guild.premiumSubscriptionCount))
                                                        mpe.delete()
                                                        cld2.first().delete()
                                                        mp.delete()
                                                        cld.first().delete()
                                                        updateembed(m)
                                                    }
                                                })
                                        })
                                    }
                                    )
                            })
                            break
                        case "Supprimer le compteur de boost":
                            db.delete(`boost_${message.guild.id}`)
                            updateembed(m)
                            break

                    }
                }
            })

        }

    }
}