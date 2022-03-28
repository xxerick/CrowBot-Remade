const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');

module.exports = {
    name: 'tempvoc',
    aliases: ["tempo"],
    run: async (client, message, args, prefix, color) => {

        function updateembed(msg) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Configuration Tempvoc`)
                .setColor(color)
                .addField("Salon vocal", db.get(`jc_${msg.guild.id}`) === null ? ":x:" : `<#${db.get(`jc_${msg.guild.id}`)}> (${db.get(`jc_${msg.guild.id}`)})`)
                .addField("Category", db.get(`catggg_${msg.guild.id}`) === null ? ":x:" : `${db.get(`catggg_${msg.guild.id}`)}`)
                .addField("Emoji", db.get(`emote_${msg.guild.id}`) === null ? "Salon de" : `${db.get(`emote_${msg.guild.id}`)}`)



            let menuoptions = [
                { value: "Configuration automatique", description: "", emoji: "🔰" },
                { value: "Modifier le salon vocal", description: "", emoji: "🏷️" },
                { value: "Supprimer le salon vocal", description: "", emoji: "🛎️" },
                { value: "Modifier la category", description: "", emoji: "📩" },
                { value: "Supprimer la category", description: "", emoji: "✉️" },
                { value: "Modifier l'emoji", description: "", emoji: "🌟" },
                { value: "Supprimer l'emoji", description: "", emoji: "⭐" },


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
            .setID(message.id+"tempvoc")
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
                      }]})         }

        let perm = ""
        message.member.roles.cache.forEach(role => {
        if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {     
                    const embed = new Discord.MessageEmbed()
                .setTitle(`Configuration Tempvoc`)
                .setColor(color)
                .addField("Salon vocal", db.get(`jc_${message.guild.id}`) === null ? ":x:" : `<#${db.get(`jc_${message.guild.id}`)}> (${db.get(`jc_${message.guild.id}`)})`)
                .addField("Category", db.get(`catggg_${message.guild.id}`) === null ? ":x:" : `${db.get(`catggg_${message.guild.id}`)}`)
                .addField("Emoji", db.get(`emote_${message.guild.id}`) === null ? "Salon de " : `${db.get(`emote_${message.guild.id}`)}`)



            let menuoptions = [
                { value: "Configuration automatique", description: "", emoji: "🔰" },
                { value: "Modifier le salon vocal", description: "", emoji: "🏷️" },
                { value: "Supprimer le salon vocal", description: "", emoji: "🛎️" },
                { value: "Modifier la category", description: "", emoji: "📩" },
                { value: "Supprimer la category", description: "", emoji: "✉️" },
                { value: "Modifier l'emoji", description: "", emoji: "🌟" },
                { value: "Supprimer l'emoji", description: "", emoji: "⭐" },


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
            .setID(message.id+"tempvoc")
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
                      }]}) .then(async m => {
                setTimeout(() => {
                    m.edit("", { components: [], embed:  new Discord.MessageEmbed()
                        .setTitle(`Configuration Tempvoc`)
                        .setColor(color)
                        .addField("Salon vocal", db.get(`jc_${message.guild.id}`) === null ? ":x:" : `<#${db.get(`jc_${message.guild.id}`)}> (${db.get(`jc_${message.guild.id}`)})`)
                        .addField("Category", db.get(`catggg_${message.guild.id}`) === null ? ":x:" : `${db.get(`catggg_${message.guild.id}`)}`)
                        .addField("Emoji", db.get(`emote_${message.guild.id}`) === null ? "Salon de " : `${db.get(`emote_${message.guild.id}`)}`) })
                    // message.channel.send(embeds)
                }, 60000 * 5)
                client.on('clickMenu', async (menu) => {
                    if (message.author !== menu.clicker.user || menu.message.id !== m.id ) return ;
                    menu.reply.defer(true)
                    menuselection(menu)
                })
                client.on('clickButton', async (button) => {
                    if (message.author !== button.clicker.user) return ;
                    if(button.id === message.id+"tempvoc") {
                        button.reply.defer(true)
updateembed(m)
                    }
                })
                function menuselection(menu) {
                    switch (menu.values[0]) {
                        case "Configuration automatique":
                            message.channel.send(`Création de la **catégorie** des salons personnalisé en cours..`).then(msge => {
                                message.guild.channels.create('Salon temporaire', {
                                    type: 'category',
                                    permissionsOverwrites: [{
                                        id: message.guild.id,
                                        allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK']
                                    }]

                                },

                                ).then(c => {
                                    db.set(`catggg_${message.guild.id}`, c.id)

                                    c.guild.channels.create('➕・Crée ton salon', {
                                        type: 'voice',
                                        parent: c.id,
                                        permissionOverwrites: [
                                            {
                                                id: message.guild.id,
                                                allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK']
                                            },
                                        ],
                                    }).then(v => {
                                        db.set(`jc_${message.guild.id}`, v.id)
                                        db.set(`tempomodule_${message.guild.id}`, true)
                                        updateembed(m)
                                        msge.edit(`Création de la **catégorie** des salons personnalisé effectué avec succès.`).then(msgee => msgee.delete({ timeout: 2500, reason: '' }));

                                    })
                                })
                            })
                            break
                        case "Modifier le salon vocal":
                            message.channel.send(`Quel est **le nouveau salon vocal** ?`).then(mp => {
                                mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                    .then(cld => {

                                        var msg = cld.first();
                                        var role = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
                                        if (!role) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\`.`);

                                        db.set(`jc_${message.guild.id}`, role.id)
                                        mp.delete()
                                        cld.first().delete()
                                        updateembed(m)

                                    });
                            })
                            break
                        case "Supprimer le salon vocal":
                            db.delete(`jc_${message.guild.id}`)
                            updateembed(m)
                            break
                        case "Modifier la category":
                            message.channel.send(`Quel est **la nouvelle category** ?`).then(mp => {
                                mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                    .then(cld => {

                                        var msg = cld.first();
                                        var role = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
                                        if (!role) return message.channel.send(`Aucune category trouvé pour \`${msg.content}\`.`);

                                        db.set(`catggg_${message.guild.id}`, role.id)
                                        mp.delete()
                                        cld.first().delete()
                                        updateembed(m)

                                    });
                            })
                            break
                        case "Supprimer la category":
                            db.delete(`catggg_${message.guild.id}`)
                            updateembed(m)
                            break
                        case "Modifier l'emoji":
                            message.channel.send(`Quel est **le nouveau emoji** ?`).then(mp => {
                                mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                    .then(cld => {

                                        var msg = cld.first();

                                        db.set(`emote_${message.guild.id}`, msg.content)
                                        mp.delete()
                                        cld.first().delete()
                                        updateembed(m)

                                    });
                            })
                            break
                        case "Supprimer l'emoji":
                            db.delete(`emote_${message.guild.id}`)
                            updateembed(m)
                            break
                    }
                }
            })

        }

    }
}