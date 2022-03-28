const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
const ms = require("ms")
module.exports = {
    name: 'setpp',
    aliases: [],
    run: async (client, message, args, prefix, color) => {
        dureefiltrer = response => { return response.author.id === message.author.id };

        function updateembed(msg) {
            const embed = new Discord.MessageEmbed()
            .setTitle(`Configuration PP`)
            .setColor(color)
            .addField("Salon de pic",`${message.guild.channels.cache.get(db.get(`randompp_${message.guild.id}`)) ? `<#${db.get(`randompp_${message.guild.id}`)}>`:":x:"}`,true)
            .addField("Salon de banner",`${message.guild.channels.cache.get(db.get(`randombanner_${message.guild.id}`)) ? `<#${db.get(`randombanner_${message.guild.id}`)}>`:":x:"}`,true)
            .addField("Salon de gif",`${message.guild.channels.cache.get(db.get(`randomgif_${message.guild.id}`)) ? `<#${db.get(`randomgif_${message.guild.id}`)}>`:":x:"}`,true)
            .addField("Interval",`${db.get(`randominterval_${message.guild.id}`) ? `${ms(db.get(`randominterval_${message.guild.id}`))}`:"2m"}`,true)
            .addField("Couleur des embeds",`${db.get(`randomcolor_${message.guild.id}`) ? `${db.get(`randomcolor_${message.guild.id}`)}`:"#2f3136"}`,true)



        let menuoptions = [
            {value: "Modifier l'interval",  description: "",emoji:"🕗"},  // vitesse
            {value: "Modifier la couleur des embeds",  description:"" ,emoji:"🎨"}, // color
            {value: "Modifier le salon de pic", description: "",emoji:"📷"},  // pic
            {value: "Supprimer le salon de pic",  description: "",emoji:"📸" },
            {value: "Modifier le salon de banner",  description:"" , emoji:"🔳"} ,// banner
            {value: "Supprimer le salon de banner", description: "",emoji:"👥"} ,
            {value: "Modifier le salon de gif", description:"" ,emoji:"📡"},// gif
            {value: "Supprimer le salon de gif", description: "",emoji:"📺"}  


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
            .setID("setpp")
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
                      }]})        }
        let perm = ""
        message.member.roles.cache.forEach(role => {
        if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {     
            const embed = new Discord.MessageEmbed()
            .setTitle(`Configuration PP`)
            .setColor(color)
            .addField("Salon de pic",`${message.guild.channels.cache.get(db.get(`randompp_${message.guild.id}`)) ? `<#${db.get(`randompp_${message.guild.id}`)}>`:":x:"}`,true)
            .addField("Salon de banner",`${message.guild.channels.cache.get(db.get(`randombanner_${message.guild.id}`)) ? `<#${db.get(`randombanner_${message.guild.id}`)}>`:":x:"}`,true)
            .addField("Salon de gif",`${message.guild.channels.cache.get(db.get(`randomgif_${message.guild.id}`)) ? `<#${db.get(`randomgif_${message.guild.id}`)}>`:":x:"}`,true)
            .addField("Interval",`${db.get(`randominterval_${message.guild.id}`) ? `${ms(db.get(`randominterval_${message.guild.id}`))}`:"2m"}`,true)
            .addField("Couleur des embed",`${db.get(`randomcolor_${message.guild.id}`) ? `${db.get(`randomcolor_${message.guild.id}`)}`:"#2f3136"}`,true)



        let menuoptions = [
            {value: "Modifier l'interval",  description: "",emoji:"🕗"},  // vitesse
            {value: "Modifier la couleur des embeds",  description:"" ,emoji:"🎨"}, // color
            {value: "Modifier le salon de pic", description: "",emoji:"📷"},  // pic
            {value: "Supprimer le salon de pic",  description: "",emoji:"📸" },
            {value: "Modifier le salon de banner",  description:"" , emoji:"🔳"} ,// banner
            {value: "Supprimer le salon de banner", description: "",emoji:"👥"} ,
            {value: "Modifier le salon de gif", description:"" ,emoji:"📡"},// gif
            {value: "Supprimer le salon de gif", description: "",emoji:"📺"}  


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
            .setID("setpp")
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
                      }]})   .then(async m => {
                setTimeout(() => {
                    m.edit("", { components: [], embed:new Discord.MessageEmbed()
                        .setTitle(`Configuration PP`)
                        .setColor(color)
                        .addField("Salon de pic",`${message.guild.channels.cache.get(db.get(`randompp_${message.guild.id}`)) ? `<#${db.get(`randompp_${message.guild.id}`)}>`:":x:"}`,true)
                        .addField("Salon de banner",`${message.guild.channels.cache.get(db.get(`randombanner_${message.guild.id}`)) ? `<#${db.get(`randombanner_${message.guild.id}`)}>`:":x:"}`,true)
                        .addField("Salon de gif",`${message.guild.channels.cache.get(db.get(`randomgif_${message.guild.id}`)) ? `<#${db.get(`randomgif_${message.guild.id}`)}>`:":x:"}`,true)
                        .addField("Interval",`${db.get(`randominterval_${message.guild.id}`) ? `${ms(db.get(`randominterval_${message.guild.id}`))}`:"2m"}`,true)
                        .addField("Couleur des embeds",`${db.get(`randomcolor_${message.guild.id}`) ? `${db.get(`randomcolor_${message.guild.id}`)}`:"#2f3136"}`,true)
         })
                    // message.channel.send(embeds)
                }, 60000 * 5)
                client.on('clickMenu', async (menu) => {
                    if (message.author !== menu.clicker.user || menu.message.id !== m.id ) return ;
                    menu.reply.defer(true)
                    menuselection(menu)
                })
                client.on('clickButton', async (button) => {
                    if (message.author !== button.clicker.user) return ;
                
                    if(button.id === "setpp") {
                        button.reply.defer(true)
updateembed(m)
                    }
                })
                function menuselection(menu) {
                    switch (menu.values[0]) {
                        case "Modifier l'interval":
                            message.channel.send(`Quel est **le nouvelle interval des embeds** ? (*minimum: 30s*)`).then(mp => {
                                mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                    .then(cld => {

                                        var msg = cld.first();
                                        if(!msg.content.endsWith("h") && !msg.content.endsWith("m")&& !msg.content.endsWith("s")) return message.channel.send(`Aucun temps corect trouvé pour \`${msg.content}\``)

                                        db.set(`randominterval_${message.guild.id}`,  ms(msg.content))
                                        mp.delete()
                                        cld.first().delete()
                                        updateembed(m)

                                    });
                            })
                            break
                            case "Modifier la couleur des embeds":
                                message.channel.send(`Quel est **le nouvelle couleur des embeds** ?`).then(mp => {
                                    mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                        .then(cld => {
    
                                            var msg = cld.first();
    
                                            db.set(`randomcolor_${message.guild.id}`,  ms(msg.content))
                                            mp.delete()
                                            cld.first().delete()
                                            updateembed(m)
    
                                        });
                                })
                                break
                        case "Modifier le salon de gif":
                            message.channel.send(`Quel est **le nouveau salon de gif** ?`).then(mp => {
                                mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                    .then(cld => {

                                        var msg = cld.first();
                                        var role = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
                                        if (!role) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\`.`);

                                        db.set(`randomgif_${message.guild.id}`, role.id)
                                        mp.delete()
                                        cld.first().delete()
                                        updateembed(m)

                                    });
                            })
                            break
                        case "Supprimer le salon de gif":
                            db.delete(`randomgif_${message.guild.id}`)
                            updateembed(m)
                            break
                    
                        case "Modifier le salon de pic":
                            message.channel.send(`Quel est **le nouveau salon de pic** ?`).then(mp => {
                                mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                    .then(cld => {

                                        var msg = cld.first();
                                        var role = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
                                        if (!role) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\`.`);

                                        db.set(`randompp_${message.guild.id}`, role.id)
                                        mp.delete()
                                        cld.first().delete()
                                        updateembed(m)

                                    });
                            })
                            break
                        case "Supprimer le salon de pic":
                            db.delete(`randompp_${message.guild.id}`)
                            updateembed(m)
                            break
                        case "Modifier le salon de banner":
                            message.channel.send(`Quel est **le nouveau salon de banner** ?`).then(mp => {
                                mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                    .then(cld => {

                                        var msg = cld.first();
                                        var role = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
                                        if (!role) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\`.`);

                                        db.set(`randombanner_${message.guild.id}`, role.id)
                                        mp.delete()
                                        cld.first().delete()
                                        updateembed(m)

                                    });
                            })
                            break
                        case "Supprimer le salon de banner":
                            db.delete(`randombanner_${message.guild.id}`)
                            updateembed(m)
                            break
                    
                        
                    }
                }
            })

        }

    }
}