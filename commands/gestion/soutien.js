const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');

module.exports = {
    name: 'soutien',
    aliases: [],
    run: async (client, message, args, prefix, color) => {

        function updateembed(msg) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Configuration Soutien`)
                .setColor(color)
                .addField("Rôle", db.get(`rolesupp_${msg.guild.id}`) === null ? ":x:" : `<@&${db.get(`rolesupp_${msg.guild.id}`)}> (${db.get(`rolesupp_${msg.guild.id}`)})`)
                .addField("Statut", db.get(`txtsupp_${msg.guild.id}`) === null ? ":x:" : `${db.get(`txtsupp_${msg.guild.id}`)}`)



            let menuoptions = [
                { value: "Modifier le rôle", description: "", emoji: "🏷️" },
                { value: "Supprimer le rôle", description: "", emoji: "🛎️" },
                { value: "Modifier le statut", description: "", emoji: "📩" },
                { value: "Supprimer le statut", description: "", emoji: "✉️" },



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
            .setID(message.id+"soutien")
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
                      }]})           }
        let perm = ""
        message.member.roles.cache.forEach(role => {
        if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {     
          const embed = new Discord.MessageEmbed()
          .setTitle(`Configuration Soutien`)
          .setColor(color)
          .addField("Rôle", db.get(`rolesupp_${message.guild.id}`) === null ? ":x:" : `<@&${db.get(`rolesupp_${message.guild.id}`)}> (${db.get(`rolesupp_${message.guild.id}`)})`)
          .addField("Statut", db.get(`txtsupp_${message.guild.id}`) === null ? ":x:" : `${db.get(`txtsupp_${message.guild.id}`)}`)



      let menuoptions = [
          { value: "Modifier le rôle", description: "", emoji: "🏷️" },
          { value: "Supprimer le rôle", description: "", emoji: "🛎️" },
          { value: "Modifier le statut", description: "", emoji: "📩" },
          { value: "Supprimer le statut", description: "", emoji: "✉️" },
        
        
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
            .setID(message.id+"soutien")
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
                    m.edit("", { components: [], embed: embed })
                    // message.channel.send(embeds)
                }, 60000 * 5)
                client.on('clickMenu', async (menu) => {
                    if (message.author !== menu.clicker.user || menu.message.id !== m.id ) return ;
                    menu.reply.defer(true)
                    menuselection(menu)
                })
                client.on('clickButton', async (button) => {
                    if (message.author !== button.clicker.user) return ;
                
                    if(button.id === message.id+"soutien") {
                        button.reply.defer(true)
updateembed(m)
                    }
                })
                function menuselection(menu) {
                    switch (menu.values[0]) {
                        case "Modifier le rôle":
                            message.channel.send(`Quel est **le nouveau rôle de soutien** ?`).then(mp => {
                                mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                    .then(cld => {

                                        var msg = cld.first();
                                        var role = message.guild.roles.cache.get(msg.content) || msg.mentions.roles.first()
                                        if (!role) return message.channel.send(`Aucun rôles trouvé pour \`${msg.content}\`.`);

                                        db.set(`rolesupp_${message.guild.id}`, role.id)
                                        mp.delete()
                                        cld.first().delete()
                                        updateembed(m)

                                    });
                            })
                            break
                        case "Supprimer le rôle":
                            db.delete(`rolesupp_${message.guild.id}`)
                            updateembed(m)
                            break
                        case "Modifier le statut":
                            message.channel.send(`Quel est **le nouveau statut** ?`).then(mp => {
                                mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                    .then(cld => {

                                        var msg = cld.first();

                                        db.set(`txtsupp_${message.guild.id}`, msg.content)
                                        mp.delete()
                                        cld.first().delete()
                                        updateembed(m)

                                    });
                            })

                            break
                        case "Supprimer le statut":
                            db.delete(`txtsupp_${message.guild.id}`)
                            updateembed(m)
                            break

                    }
                }
            })

        }

    }
}