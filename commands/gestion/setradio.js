const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
function crypt(str, mask, n = 1) {


    return ('' + str).slice(0, -n)
        .replace(/./g, mask)
        + ('' + str).slice(-n);
}
function radio(radio) {
    if (radio === null) return `Non definit`
    if (radio === undefined) return `Non definit`

    if (radio === null) return "Non définit"
    if (radio === "nrj") return "1️⃣"
    if (radio === "sky") return "2️⃣"
    if (radio === "nost") return "3️"
    if (radio === "virgin") return "6️⃣"
    if (radio === "mouv") return "3️⃣"
    if (radio === "rapfr") return "4️⃣"

}

module.exports = {
    name: 'setradio',
    aliases: [],
    run: async (client, message, args, prefix, color) => {





        let perm = ""
        message.member.roles.cache.forEach(role => {
            if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Configuration Radio`)
                .setColor(color)




            let menuoptions1 = [
                { value: "Ajouter une radio", description: "", emoji: "➕" },
                { value: "Enlever une radio", description: "", emoji: "➖" },


            ]
            const bt222 = new MessageButton()
            .setStyle("gray")
            .setID("setradio22")
            .setEmoji("❌")
            .setLabel("Re formuler votre choix")
            let interactiveButtons1 = new MessageMenu()
                .setID(message.id+'MenuSelection')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder('Faix un choix');
            menuoptions1.forEach(option => {
                let row = new MessageMenuOption()
                    .setLabel(option.label ? option.label : option.value)
                    .setValue(option.value)
                    .setDescription(option.description)
                    .setDefault()
                if (option.emoji) row.setEmoji(option.emoji)
                interactiveButtons1.addOption(row)
            })

            message.channel.send({
                embed: embed,
                components: [

                    {
                        type: 1,
                        components: [interactiveButtons1]
                    },
                    {
                        type: 1,
                        components: [bt222]
                    },

                ]
            }
            ).then(async m => {
                setTimeout(() => {
                    m.edit("", { components: [], embed: embed })
                    // message.channel.send(embeds)
                }, 60000 * 5)
                client.on('clickMenu', async (menu) => {
                    if (message.author !== menu.clicker.user || menu.message.id !== m.id) return ;
                    menu.reply.defer(true)
                    menuselection(menu)
                })

                client.on('clickButton', async (button) => {
                    if (message.author !== button.clicker.user) return ;
                
                    if (button.id === "setradio22") {
                        button.reply.defer(true)
                        updateembed2(m)
                    }
                })

                async function menuselection(menu) {
                    switch (menu.values[0]) {
                        case "Enlever une radio":
                            await message.channel.send("Quel est **le bot à enlever ?**")
                            const filter = m => message.author.id === m.author.id;
                            message.channel.awaitMessages(filter, {
                                max: 1,
                                time: 60000 * 10,
                                errors: ['time']
                            }).then(async (cld) => {
                                let mem = message.guild.members.cache.get(cld.first().content)
                                if (!mem) return message.channel.send(`Ce bot n'est pas en vocal`)
                                if (!mem.user.bot) return message.channel.send(`Ce n'est pas un bot !`)
                                mem.voice.kick().then(() => {
                                    return message.channel.send(`Radio enlever`)
                                }).catch(() => {
                                    return message.channel.send(`Je n'est pas pu enlever cette radio`)
                                })



                            }).catch((err) => {
                                err.first().delete()
                            })
                            break
                        case "Ajouter une radio":
                            const embede = new Discord.MessageEmbed()
                            embede.setTitle(`Configuration Radio`)
                            embede.addField("Token", db.get(`tokenradio_${message.guild.id}`) === null ? "Non définit" : `\`${crypt(db.get(`tokenradio_${message.guild.id}`), "●", 25)}\``)
                            embede.addField("Radio", radio(db.get(`radioj_${message.guild.id}`)))
                            embede.addField("Salon", db.get(`salonradio_${message.guild.id}`) === null ? "Non définit" : `<#${db.get(`salonradio_${message.guild.id}`)}> (${db.get(`salonradio_${message.guild.id}`)})`)
                           embede.setColor(color)
                            let menuoptions = [
                                { value: "Changer le token", description: "", emoji: "📡" },
                                { value: "Changer la radio", description: "", emoji: "📻" },
                                { value: "Changer le salon vocal", description: "", emoji: "🎧" },


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
                                .setID(message.id+"setradio1")
                                .setEmoji("✅")
                                .setLabel("Valider")
                            const bt2 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id+"setradio2")
                                .setEmoji("❌")
                                .setLabel("Re formuler votre choix")
                            message.channel.send({
                                embed: embede,
                                components: [
                                   
                                    {
                                        type: 1,
                                        components: [interactiveButtons]
                                    },
                                    {
                                        type: 1,
                                        components: [bt, bt2]
                                    },

                                ]
                            }
                            ).then(async msg => {
                                setTimeout(() => {
                                    msg.delete()
                                    // message.channel.send(embeds)
                                }, 60000 * 10)

                                client.on('clickButton', async (button) => {
                                    if (message.author !== button.clicker.user) return ;

                                    if (button.id === message.id+"setradio1") {
                                        button.reply.defer(true)
                                        if (db.get(`tokenradio_${message.guild.id}`) === null) return message.channel.send(`​Aucun token n'a été configuré !`)
                                        if (db.get(`radioj_${message.guild.id}`) === null) return message.channel.send(`Aucune radio n'a été configuré !`)
                                        if (db.get(`salonradio_${message.guild.id}`) === null) return message.channel.send(`Aucun salon vocal n'a été configuré !`)
                                        let rdi = ""
                                        if (db.get(`radioj_${message.guild.id}`) === "nrj") rdi = "http://radio.myts3:8000/radio_gaming"
                                        if (db.get(`radioj_${message.guild.id}`) === "sky") rdi = "http://icecast.skyrock.net/s/natio_mp3_128k"
                                        if (db.get(`radioj_${message.guild.id}`) === "nost") rdi = "http://scdn.nrjaudio.fm/adwz1/fr/56258/mp3_128.mp3?origine=fluxradios"
                                        if (db.get(`radioj_${message.guild.id}`) === "virgin") rdi = "http://ais-live.cloud-services.paris:8000/virgin.mp3"
                                        if (db.get(`radioj_${message.guild.id}`) === "mouv") rdi = "http://direct.mouv.fr/live/mouv-midfi.mp3"
                                        if (db.get(`radioj_${message.guild.id}`) === "rapfr") rdi = " http://generationfm-rap.ice.infomaniak.ch/generationfm-rap-high.mp3"


                                        message.channel.send("Connection au token en cours !").then(() => {
                                            const discord =require("discord.js.old")
                                            const cl = new discord.Client()
                                            cl.login(db.get(`tokenradio_${message.guild.id}`)).catch(() => {
                                                return message.channel.send(`Token invalide !`)
                                            }).then(() => {
                                                message.channel.send(`Connection au salon vocal <#${db.get(`salonradio_${message.guild.id}`)}> en cours ...`)
                                                message.guild.channels.cache.get(db.get(`salonradio_${message.guild.id}`)).join().catch(() => {
                                                    return message.channel.send(`Ce salon n'est pas un salon vocal !`)
                                                }) .then(connection => {

                                                    connection.play(require("path").join(rdi))
                                                        return message.channel.send(`Radio lancer !`)

                                                    


                                                })


                                                message.guild.me.voice.setDeaf(true)
                                            })

                                        })



                                    }
                                    if (button.id === message.id+"setradio2") {
                                        button.reply.defer(true)
                                        updateembed(msg)
                                    }
                                })

                                client.on('clickMenu', async (menu) => {
                                    if (message.author !== menu.clicker.user || menu.message.id !== msg.id) return ;
                                    menu.reply.defer(true)
                                    switch (menu.values[0]) {
                                        case "Changer le token":
                                            message.channel.send(`Quel est **le token du bot radio ?**`).then(async me => {
                                                const filter = m => message.author.id === m.author.id;
                                                message.channel.awaitMessages(filter, {
                                                    max: 1,
                                                    time: 60000 * 10,
                                                    errors: ['time']
                                                }).then(async (cld) => {
                                                    const discord = require("discord.js.old")
                                                    const cl = new discord.Client()
                                                    cl.login(cld.first().content).then(() => {
                                                        db.set(`tokenradio_${message.guild.id}`, cld.first().content)
                                                        cl.destroy()
                                                        me.delete()
                                                        cld.first().delete()
                                                        return updateembed(msg)

                                                    }).catch(() => {
                                                        me.delete()
                                                        cld.first().delete()
                                                        return message.channel.send(`Token invalide !`)
                                                    })

                                                })
                                            })
                                            break

                                        case "Changer le salon vocal":
                                            message.channel.send(`Quel est **le salon vocal ou la radio seras lancer ?**`).then(async me => {
                                                const filter = m => message.author.id === m.author.id;
                                                message.channel.awaitMessages(filter, {
                                                    max: 1,
                                                    time: 60000 * 10,
                                                    errors: ['time']
                                                }).then(async (cld) => {
                                                    let salon = cld.first().mentions.channels.first() || message.guild.channels.cache.get(cld.first().content)
                                                    if (!salon) return message.channel.send(`Aucun salon trouvé pour \`${cld.first().content}\``)

                                                    db.set(`salonradio_${message.guild.id}`, salon.id)
                                                    me.delete()
                                                    cld.first().delete()
                                                    updateembed(msg)



                                                })
                                            })
                                            break

                                        case "Changer la radio":
                                            const radembed = new Discord.MessageEmbed()
                                            radembed.setTitle(`📻 Veuillez choisir la radio à jouer, voici la liste des radios:`)
                                         radembed.setColor(color)
                                            radembed.setDescription(`
1️⃣ \`NRJ\`
2️⃣ \`Skyrock\`
3️⃣ \`Mouv'\`
4️⃣ \`Génération Rap FR\`
5️⃣ \`Nostalgie\`
6️⃣ \`Virgin Radio\`
                                        `)
                                            let menuoptions2 = [
                                                { value: "NRJ", description: "", emoji: "1️⃣" },
                                                { value: "Skyrock", description: "", emoji: "2️⃣" },
                                                { value: "Mouv'", description: "", emoji: "3️⃣" },
                                                { value: "RapFR", description: "", emoji: "4️⃣" },
                                                { value: "Nostalgie", description: "", emoji: "4️⃣" },
                                                { value: "Virgin", description: "", emoji: "6️⃣" },


                                            ]
                                            let interactiveButtons2 = new MessageMenu()
                                                .setID(message.id+'MenuSelection')
                                                .setMaxValues(1)
                                                .setMinValues(1)
                                                .setPlaceholder('Faix un choix');
                                            menuoptions2.forEach(option => {
                                                let row = new MessageMenuOption()
                                                    .setLabel(option.label ? option.label : option.value)
                                                    .setValue(option.value)
                                                    .setDescription(option.description)
                                                    .setDefault()
                                                if (option.emoji) row.setEmoji(option.emoji)
                                                interactiveButtons2.addOption(row)
                                            })
                                            message.channel.send(radembed, interactiveButtons2).then(msgg => {
                                                client.on('clickMenu', async (menu) => {
                                                    if (message.author !== menu.clicker.user || menu.message.id !== msgg.id) return ;
                                                    menu.reply.defer(true)
                                                    switch (menu.values[0]) {
                                                        case "NRJ":
                                                            db.set(`radioj_${message.guild.id}`, "nrj")
                                                            msgg.delete()
                                                            updateembed(msg)
                                                            break
                                                        case "Skyrock":
                                                            db.set(`radioj_${message.guild.id}`, "sky")
                                                            msgg.delete()
                                                            updateembed(msg)
                                                            break
                                                        case "Mouv'":
                                                            db.set(`radioj_${message.guild.id}`, "mouv")
                                                            msgg.delete()
                                                            updateembed(msg)
                                                            break
                                                        case "RapFR":
                                                            db.set(`radioj_${message.guild.id}`, "rapfr")
                                                            msgg.delete()
                                                            updateembed(msg)
                                                            break
                                                        case "Nostalgie":
                                                            db.set(`radioj_${message.guild.id}`, "nost")
                                                            msgg.delete()
                                                            updateembed(msg)
                                                            break
                                                        case "Virgin":
                                                            db.set(`radioj_${message.guild.id}`, "virgin")
                                                            msgg.delete()
                                                            updateembed(msg)
                                                            break

                                                    }


                                                })

                                            })
                                            break
                                    }
                                })

                            })


                            break

                    }
                }
            })

        }

        function updateembed(msg) {
            const embede = new Discord.MessageEmbed()
            embede.setTitle(`Configuration Radio`)
            embede.addField("Token", db.get(`tokenradio_${msg.guild.id}`) === null ? "Non définit" : `\`${crypt(db.get(`tokenradio_${msg.guild.id}`), "●", 25)}\``)
            embede.addField("Radio", radio(db.get(`radioj_${msg.guild.id}`)))
            embede.addField("Salon", db.get(`salonradio_${msg.guild.id}`) === null ? "Non définit" : `<#${db.get(`salonradio_${msg.guild.id}`)}> (${db.get(`salonradio_${msg.guild.id}`)})`)
           embede.setColor(msg.client.config.color)
            let menuoptions = [
                { value: "Changer le token", description: "", emoji: "📡" },
                { value: "Changer la radio", description: "", emoji: "📻" },
                { value: "Changer le salon vocal", description: "", emoji: "🎧" },
        
        
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
                .setID(message.id+"setradio1")
                .setEmoji("✅")
                .setLabel("Valider")
            const bt2 = new MessageButton()
                .setStyle("gray")
                .setID(message.id+"setradio2")
                .setEmoji("❌")
                .setLabel("Re formuler votre choix")
            msg.edit({
                embed: embede,
                components: [
                   
                    {
                        type: 1,
                        components: [interactiveButtons]
                    },
                    {
                        type: 1,
                        components: [bt, bt2]
                    },
        
                ]
            })
        }
        
        function updateembed2(msg) {
            const embed = new Discord.MessageEmbed()
            
           .setColor(msg.client.config.color)
           .setTitle(`Configuration Radio`)
        
        
        
        
        let menuoptions1 = [
           { value: "Ajouter une radio", description: "", emoji: "➕" },
           { value: "Enlever une radio", description: "", emoji: "➖" },
        
        
        ]
        const bt222 = new MessageButton()
        .setStyle("gray")
        .setID("setradio22")
        .setEmoji("❌")
        .setLabel("Re formuler votre choix")
        let interactiveButtons1 = new MessageMenu()
           .setID(message.id+'MenuSelection')
           .setMaxValues(1)
           .setMinValues(1)
           .setPlaceholder('Faix un choix');
        menuoptions1.forEach(option => {
           let row = new MessageMenuOption()
               .setLabel(option.label ? option.label : option.value)
               .setValue(option.value)
               .setDescription(option.description)
               .setDefault()
           if (option.emoji) row.setEmoji(option.emoji)
           interactiveButtons1.addOption(row)
        })
            msg.edit({
                embed: embed,
                components: [
                   
                    {
                        type: 1,
                        components: [interactiveButtons1]
                    },
                    {
                        type: 1,
                        components: [bt222]
                    },
        
                ]
            })
        }
    }

}



