const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');

module.exports = {
    name: 'custom',
    aliases: [],
    run: async (client, message, args, prefix, color) => {
       
      
       

        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true ) {   
            if(args[0] === "list") {
                let money =  db.all().filter(data => data.ID.startsWith(`customcmd`)) 
                let p0 = 0;
                let p1 = 15;
                let page = 1;
        
                const embed = new Discord.MessageEmbed()
                    .setTitle('Custom Commande')
                    .setDescription(money
                        
                        .map((m, i) => `${i + 1}) ${m.ID.split('_')[1]} (${m.ID.split("_")[0] === "customcmdembed" ? "Embed":"Message"})`)
                        .slice(0, 15)
        
                    )
                    .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                    .setColor(color)
        
        
                message.channel.send(embed).then(async tdata => {
                    if (money.length > 15) {
                        const B1 = new MessageButton()
                            .setLabel("◀")
                            .setStyle("gray")
                            .setID('customlist1');
        
                        const B2 = new MessageButton()
                            .setLabel("▶")
                            .setStyle("gray")
                            .setID('customlist2');
        
                        const bts = new MessageActionRow()
                            .addComponent(B1)
                            .addComponent(B2)
                        tdata.edit("", { embed: embed, components: [bts] })
                        setTimeout(() => {
                            tdata.edit("", {
                                components: [], embed: new Discord.MessageEmbed()
                                    .setTitle('Custom Commande')
                                    .setDescription(money
                                        
                                                               .map((m, i) => `${i + 1}) ${m.ID.split('_')[1]} (${m.data.embed ? "Embed":"Message"})`)
                                        .slice(0, 15)
        
                                    )
                                    .setFooter(`1/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                                    .setColor(color)
        
        
                            })
                            // message.channel.send(embeds)
                        }, 60000 * 5)
                        client.on("clickButton", (button) => {
                            if (button.clicker.user.id !== message.author.id) return ;
                            if (button.id === "customlist1") {
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
                                    
                                                           .map((m, i) => `${i + 1}) ${m.ID.split('_')[1]} (${m.data.embed ? "Embed":"Message"})`)
                                    .slice(p0, p1)
        
                                )
                                    .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                                tdata.edit(embed);
        
                            }
                            if (button.id === "customlist2") {
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
                                    
                                                           .map((m, i) => `${i + 1}) ${m.ID.split('_')[1]} (${m.data.embed ? "Embed":"Message"})`)
                                    .slice(p0, p1)
        
                                )
                                    .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                                tdata.edit(embed);
        
                            }
                        })
                    }
        
                })
            } else if(args[0] === "delete") {
                let cmd = args[1]
                if(!cmd) return message.reply(`Merci d'entrer une commande à supprimer !`)
                let cmd1=  db.get(`customcmd_${cmd}`)
                let cmd2 =  db.get(`customcmdembed_${cmd}`)
                if(cmd1 ===null|| cmd2 ===null) return message.reply(`Je ne trouve pas de commande personaliser avec ce nom !`)
                db.delete(`customcmd_${cmd}`)
                db.delete(`customcmdembed_${cmd}`)
                message.react("✅")

            }   else  if(args[0] !== "delete" || args[0] !== "list") { 
                let cmd = args[0]
                function updateembed(msg) {
                    if(db.get(`customstyle_${message.guild.id}_${message.id}`) === "message" || db.get(`customstyle_${message.guild.id}_${message.id}`) === null) {
                        const embed = new Discord.MessageEmbed()
                        .setTitle(`Custom Commande`)
                        .setColor(color)
                        .addField("Nom", db.get(`customcmdname_${message.guild.id}`) === null ? cmd : `<@&${db.get(`customcmdname_${message.guild.id}`)}> (${db.get(`customcmdname_${message.guild.id}`)})`)
                        .addField("Message", db.get(`custommsg_${message.guild.id}`) === null ? db.get(`customembed_${message.guild.id}`) === null ? ":x:" :"Embed" : `${db.get(`custommsg_${message.guild.id}`)}`)
                        
        
        
        
                    let menuoptions = [
                        { value: "Style Embed", description: "", emoji: "📑" },
                        { value: "Modifier le nom", description: "", emoji: "🏷️" },
                        { value: "Modifier le message", description: "", emoji: "🔱" },
                        { value: "Supprimer le message", description: "", emoji: "📄" },
                     
        
                    ]
                    const bt1 = new MessageButton()
                    .setStyle("gray")
                    .setID(message.id+"customval")
                    .setEmoji("✅")
                    .setLabel("Valider")
                    const bt2 = new MessageButton()
                    .setStyle("gray")
                    .setID(message.id+"custom")
                    .setEmoji("❌")
                    .setLabel("Re formuler votre choix")
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
                    msg.edit("",{embed: embed,
                        components: [
                          
                            {
                              type: 1,
                              components: [interactiveButtons]
                            },
                        
                            {
                                type: 1,
                                components: [bt1,bt2],
                              }]})      
                } else  if(db.get(`customstyle_${message.guild.id}_${message.id}`) === "embed" ) {
        
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Custom Commande`)
                        .setColor(color)
                        .addField("Nom", db.get(`customcmdname_${message.guild.id}`) === null ? cmd : `<@&${db.get(`customcmdname_${message.guild.id}`)}> (${db.get(`customcmdname_${message.guild.id}`)})`)
                        .addField("Embed", db.get(`customembed_${message.guild.id}`) === null ? db.get(`custommsg_${message.guild.id}`) === null ? ":x:" :`Message: ${db.get(`custommsg_${message.guild.id}`)}` : `Oui`)
        
        
                    let menuoptions = [
                        { value: "Style Message", description: "", emoji: "📑" },
                        { value: "Modifier le nom", description: "", emoji: "🏷️" },
                        { value: "Modifier l'embed", description: "", emoji: "🔱" },
                        { value: "Supprimer l'embed", description: "", emoji: "📄" },
                     
        
                    ]
                    const bt8 = new MessageButton()
                    .setStyle("gray")
                    .setID(message.id+"customval")
                    .setEmoji("✅")
                    .setLabel("Valider")
                    const bt1 = new MessageButton()
                    .setStyle("gray")
                    .setID(message.id+"custommsg")
                    .setEmoji("📝")
                    .setLabel("Voir l'embed")
                    const bt2 = new MessageButton()
                    .setStyle("gray")
                    .setID(message.id+"custom")
                    .setEmoji("❌")
                    .setLabel("Re formuler votre choix")
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
                    msg.edit("",{embed: embed,
                        components: [
                          
                            {
                              type: 1,
                              components: [interactiveButtons]
                            },
                        
                            {
                                type: 1,
                                components: [bt8,bt1,bt2],
                              }]})   
                            }   
                                }
                if(!cmd) return message.react("❌")
                let cmd1=  db.get(`customcmd_${cmd}`)
                let cmd2 =  db.get(`customcmdembed_${cmd}`)
                if(cmd1 !==null|| cmd2 !==null) return message.reply(`Il existe déjà une commande personaliser avec ce nom !`)
                
            message.channel.send(`Salut`) .then(async m => {
                updateembed(m)
                setTimeout(() => {
                    m.edit("Trop long", { components: [], embed: []})
                    // message.channel.send(embeds)
                }, 60000 * 5)
                client.on('clickMenu', async (menu) => {
                    if (message.author !== menu.clicker.user || menu.message.id !== m.id ) return ;
                    menu.reply.defer(true)
                    menuselection(menu)
                })
                client.on('clickButton', async (button) => {
                    if (message.author !== button.clicker.user) return ;
                  
                    if(button.id === message.id+"customval") {
                        button.reply.defer(true)
                      const nm = db.get(`customcmdname_${message.guild.id}`) || cmd
                      const em =  db.get(`customembed_${message.guild.id}`)
                      const ms = db.get(`custommsg_${message.guild.id}`)
                      const role = db.get(`customroleadd_${message.guild.id}`)
                      if(ms !== null) {
                        
                            db.set(`customcmd_${nm}`, ms)
                            return message.channel.send(`Commande crée.`)  
                          
                      } else if(em !== null) {
                            db.set(`customcmdembed_${nm}`, em)
                            return message.channel.send(`Commande crée.`)  
                      }
                        
                      
                    }
                    if(button.id === message.id+"custommsg") {
                        button.reply.defer(true)
                        if(db.get(`customembed_${message.guild.id}`) !== null) {
                            message.channel.send({embed: db.get(`customembed_${message.guild.id}`)})
                        }
                    }
                    if(button.id === message.id+"custom") {
                        button.reply.defer(true)
updateembed(m)
                    }
                })
                function menuselection(menu) {
                    switch (menu.values[0]) {
                        case "Style Embed":
                            db.set(`customstyle_${message.guild.id}_${message.id}`, "embed") 

                            updateembed(m)
                        break
                        case "Style Message":
                            db.set(`customstyle_${message.guild.id}_${message.id}`, "message") 
                            updateembed(m)
                        break
                        case "Modifier l'embed":
                            db.set(`custommsg_${message.guild.id}`,null)
                            embedmsg(m)
                        break

                        case "Supprimer l'embed":
                            db.set(`customembed_${message.guild.id}`, null)
                            updateembed(m)
                            break
                        
                      
                        case "Modifier le message":
                            message.channel.send(`
\`\`\`
--- Informations sur l'author : ---

Mention de l'user : {user}
Id de l'user : {user:id}
Tag de l'user : {user:tag}
Nom de l'user : {user:name}

--- Informations sur le serveur : ---
 
Membres totaux : {guild:member}
Serveur : {guild:name}

            \`\`\`

Quel est **le nouveau message** ?`).then(mp => {
                                mp.channel.awaitMessages(response => { return response.author.id === message.author.id }, { max: 1, time: 60000, errors: ['time'] })
                                    .then(cld => {

                                        var msg = cld.first();
                                        db.set(`customembed_${message.guild.id}`, null)
                                        db.set(`custommsg_${message.guild.id}`, msg.content)
                                        mp.delete()
                                        cld.first().delete()
                                        updateembed(m)

                                    });
                            })

                            break
                        case "Supprimer le message":
                            db.delete(`custommsg_${message.guild.id}`)
                            updateembed(m)
                            break
                    
                    }
                }
            })

        }

       async function embedmsg(m) {
        const filterMessage = m => message.author.id === m.author.id;
        const filter = m => message.author.id === m.author.id;
        let menuoptions = [
            { value: "Copier un embed", description: "", emoji: "📥" },
            { value: "Modifier le titre", description: "", emoji: "🖊" },
            { value: "Supprimer le titre", description: "", emoji: "💥" },
            { value: "Modifier la description", description: "", emoji: "💬" },
            { value: "Supprimer la description", description: "", emoji: "📝" },
            { value: "Modifier l'auteur", description: "", emoji: "🕵️" },
            { value: "Supprimer l'auteur", description: "", emoji: "✂" },
            { value: "Modifier le footer", description: "", emoji: "🔻" },
            { value: "Supprimer le footer ", description: "", emoji: "🔺" },
            { value: "Modifier le thumbnail", description: "", emoji: "🔳" },
            { value: "Modifier l'image", description: "", emoji: "🖼️" },
            { value: "Modifier l'url du titre", description: "", emoji: "🌐" },
            { value: "Modifier la couleur", description: "", emoji: "🎨" },
            { value: "Supprimer la couleur", description: "", emoji: "🔵" },
        

        ]
        const embedbase = new Discord.MessageEmbed()
            .setDescription("** **")
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
        .setID("customembedmsg1"+message.id)
        .setEmoji("✅")
        .setLabel("Valider")
        const bt3 = new MessageButton()
        .setStyle("gray")
        .setID("customembedmsg3"+message.id)
        .setEmoji("❌")
        .setLabel("Re formuler votre choix")

         message.channel.send(`\`\`\`
--- Informations sur l'author : ---

Mention de l'user : {user}
Id de l'user : {user:id}
Tag de l'user : {user:tag}
Nom de l'user : {user:name}

--- Informations sur le serveur : ---
 
Membres totaux : {guild:member}
Serveur : {guild:name}
   \`\`\``,{embed: embedbase,
            components: [
              
                {
                  type: 1,
                  components: [interactiveButtons]
                },
            
                {
                    type: 1,
                    components: [bt,bt3],
                  }]}).then(async msgg => {
            setTimeout(() => {
                msgg.delete()
                // message.channel.send(embeds)
            }, 60000 * 15)
            client.on('clickMenu', async (menu) => {
                menu.reply.defer(true)
                if (message.author !== menu.clicker.user ) return;
                slmmenu(menu)
            })
            client.on('clickButton', async (button) => {
                if (message.author !== button.clicker.user || button.message.id !== msgg.id) return;
             
                if(button.id === "customembedmsg1"+message.id){
                    button.reply.defer(true)
                db.set(`customembed_${message.guild.id}`, msgg.embeds[0])
                updateembed(m)
                msgg.delete()
                }
                if(button.id === "customembedmsg3"+message.id){
                    button.reply.defer(true)
                    msgg.edit(msgg.embeds)
                }
            })
        async    function slmmenu(menu) {
                switch (menu.values[0]) {
                    case "Modifier le titre":
                        let question = await message.channel.send("Quel est **le nouveau titre de l'embed ?**")
                        
                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 60000,
                            errors: ['time']
                        }).then(async (collected) => {
                            const lowercase = collected.first().content.toLowerCase()
                       
                            collected.first().delete()
                            question.delete()
                            embedbase.setTitle(collected.first().content)
                            msgg.edit(embedbase)
                            }).catch(async (err) => {
                                
                                message.channel.send("**Désolé mais je ne peux pas modifier le Titre !**").then((mm) => mm.delete({
                                    timeout: 2500
                            }));
                        })
                        break

                      case "Supprimer le titre":
                        embedbase.setTitle("** **")
                        msgg.edit(embedbase)
                        break

                    case "Modifier la description":
                        let descriptionques = await message.channel.send("Quel est **la nouvelle description de l'embed ?**")
                        
                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 60000,
                            errors: ['time']
                        }).then(async (collected) => {
                            const lowercase = collected.first().content.toLowerCase()
                       
                            collected.first().delete()
                            descriptionques.delete()
                            embedbase.setDescription(collected.first().content)
                            msgg.edit(embedbase)
                            }).catch(async (err) => {
                                
                                message.channel.send("**Désolé mais je ne peux pas modifier la description !**").then((mm) => mm.delete({
                                    timeout: 2500
                            }));
                        })
                        break

                      case "Supprimer la description":
                        embedbase.setDescription("** **")
                        msgg.edit(embedbase)
                        break

                    case "Modifier l'auteur":
                        const embedquest = new Discord.MessageEmbed()                            

                        let SELAMq = await message.channel.send("Quel est **le nouveau autheur de l'embed ?", embedquest.setDescription("Vous pouvez mentionner un **Utilisateur** pour mettre son pseudo et sont Avatar"))
                        
                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 60000,
                            errors: ['time']
                        }).then(async (collected) => {
                            const lowercase = collected.first().content.toLowerCase()
                        
                                collected.first().delete()
                                SELAMq.delete()
                                if (collected.first().mentions.users.size <= 0)
                                {
                                    auteur = collected.first().content;
                                    const question2 = await message.channel.send("Voulez-vous ajouter un **Avatar** a votre Author, sinon entrez `non`");
                                    const auteurImg = (await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time']})).first();
                                    question2.delete();
                                    auteurImg.delete();
                                    const img = auteurImg.content
                                    const liens = [
                                        "https://",
                                        "http://",
                                        "https",
                                        "http"
                                    ];
                                    if (!liens.some(word => img.includes(word))){
                                        embedbase.setAuthor(auteur)
                                        message.channel.send("Vous avez choisi de ne pas ajouter d'Avatar a votre Author ou le lien n'est pas Valide !").then((mm) => mm.delete({ timeout: 2500 })) }
    
                                        if (liens.some(word => img.includes(word))){
                                    embedbase.setAuthor(auteur, auteurImg.content)
                                        }
                                }
                                if (collected.first().mentions.users.size > 0) 
                                {
                                    auteur = collected.first().mentions.users.first();
             
                                    embedbase.setAuthor(auteur.username, auteur.displayAvatarURL({dynamic: true}));
                                }
                            msgg.edit(embedbase)
                            }).catch(async (err) => {
                                
                                message.channel.send("**Désolé mais je ne peux pas modifier l'Author !**").then((mm) => mm.delete({
                                    timeout: 2500
                            }));
                        })
                        break

                      case "Supprimer l'auteur":
                        embedbase.setAuthor("** **")
                        msgg.edit(embedbase)
                        break
                    case "Modifier le footer":
                        const embedtttt = new Discord.MessageEmbed()
                        let TDCQUEST2 = await message.channel.send("Quel **Footer** voulez-vous attribuez à l'embed ?", embedtttt.setDescription("Vous pouvez mentionner un **Utilisateur** pour mettre son pseudo et sont Avatar"))
                        
                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 60000,
                            errors: ['time']
                        }).then(async (collected) => {
                            const lowercase = collected.first().content.toLowerCase()
                 
                                collected.first().delete()
                                TDCQUEST2.delete()
                                if (collected.first().mentions.users.size <= 0)
                                {
                                    footer = collected.first().content;
                                    const question2 = await message.channel.send("Voulez-vous ajouter un **Avatar** a votre Footer, sinon entrez `non`");
                                    const footerImg = (await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time']})).first();
                                    question2.delete();
                                    footerImg.delete();
                                    const img = footerImg.content
                                    const liens = [
                                        "https://",
                                        "http://",
                                        "https",
                                        "http"
                                    ];
                                    if (!liens.some(word => img.includes(word))){
                                        embedbase.setFooter(footer)
                                        message.channel.send("Vous avez choisi de ne pas ajouter d'Avatar au Footer ou le lien n'est pas Valide !").then((mm) => mm.delete({ timeout: 2500 })) }
    
                                        if (liens.some(word => img.includes(word))){
                                    embedbase.setFooter(footer, footerImg.content)
                                        }
                                }
                                if (collected.first().mentions.users.size > 0) 
                                {
                                    footer = collected.first().mentions.users.first();
             
                                    embedbase.setFooter(footer.username, footer.displayAvatarURL({dynamic: true}));
                                }
                            msgg.edit(embedbase)
                            }).catch(async (err) => {
                                
                                message.channel.send("**Désolé mais je ne peux pas modifier le Footer !**").then((mm) => mm.delete({
                                    timeout: 2500
                            }));
                        })
                       
                        break

                      case "Supprimer le footer":
                        embedbase.setFooter("** **")
                        msgg.edit(embedbase)
                        break
                        case "Modifier le thumbnail":
                            let PASDETDCMEC = await message.channel.send("Quel **Thumbnail** voulez-vous attribuez à l'embed ?")
                            
                            message.channel.awaitMessages(filter, {
                                max: 1,
                                time: 60000,
                                errors: ['time']
                            }).then(async (collected) => {
                                const lowercase = collected.first().content.toLowerCase()
                             
                                const thumbnail = collected.first().content
                                const liens = [
                                    "https://",
                                    "http://",
                                    "https",
                                    "http"
                                ];
                                if (!liens.some(word => thumbnail.includes(word))){
                                    collected.first().delete()
                                    PASDETDCMEC.delete()
                                    return message.channel.send("L'opération a été Annulée, vous devez spécifier un Lien !").then((mm) => mm.delete({ timeout: 2500 })) }
                               
        
                                collected.first().delete()
                                PASDETDCMEC.delete()
                                embedbase.setThumbnail(collected.first().content)
                                msgg.edit(embedbase)
                                }).catch(async (err) => {
                                    
                                    message.channel.send("**Désolé mais je ne peux pas modifier le Thumbnail !**").then((mm) => mm.delete({
                                        timeout: 2500
                                }));
                            })
                           
                            break

                          case "Supprimer le thumbnail":
                            embedbase.setThumbnail("htps://slm.com")
                            msgg.edit(embedbase)
                            break   
                         case "Modifier l'image":
                            let heh1 = await message.channel.send("Quel **Image** voulez-vous attribuez à l'embed ?")
                
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    const lowercase = collected.first().content.toLowerCase()
                    
                        const image = collected.first().content
                        const liens = [
                            "https://",
                            "http://",
                            "https",
                            "http"
                        ];
                        if (!liens.some(word => image.includes(word))){
                            collected.first().delete()
                            heh1.delete()
                            return message.channel.send("L'opération a été Annulée, vous devez spécifier un Lien !").then((mm) => mm.delete({ timeout: 2500 })) }
                       
            
                    collected.first().delete()
                    heh1.delete()
                    embedbase.setImage(collected.first().content, {size: 4096})
                    msgg.edit(embedbase)
                    }).catch(async (err) => {
                        
                        message.channel.send("**Désolé mais je ne peux pas modifier l'Image !**").then((mm) => mm.delete({
                            timeout: 2500
                    }));
                })
                            break

                          case "Supprimer l'image":
                            embedbase.setImage("htps://slm.com")
                            msgg.edit(embedbase)
                            break 
                            
                            case "Modifier l'url du titre":
                                let WASSIMLEMAITRE = await message.channel.send("Quel **URL** voulez-vous attribuez à l'embed ?")
                                
                                message.channel.awaitMessages(filter, {
                                    max: 1,
                                    time: 60000,
                                    errors: ['time']
                                }).then(async (collected) => {
                                    const lowercase = collected.first().content.toLowerCase()
                          
                                        const url = collected.first().content
                                        const liens = [
                                            "https://",
                                            "http://",
                                            "https",
                                            "http"
                                        ];
                                        if (!liens.some(word => url.includes(word))){
                                            collected.first().delete()
                                            WASSIMLEMAITRE.delete()
                                            return message.channel.send("L'opération a été Annulée, vous devez spécifier un Lien !").then((mm) => mm.delete({ timeout: 2500 })) }
                                       
                                            
                                    collected.first().delete()
                                    WASSIMLEMAITRE.delete()
                                    embedbase.setURL(collected.first().content)
                                    msgg.edit(embedbase)
                                    }).catch(async (err) => {
                                        
                                        message.channel.send("**Désolé mais je ne peux pas modifier l'Url !**").then((mm) => mm.delete({
                                            timeout: 2500
                                    }));
                                })
                                break
    
                              case "Supprimer l'url du titre":
                                embedbase.setURL("htps://")
                                msgg.edit(embedbase)
                                break
                                case "Supprimer l'image":
                                    embedbase.setImage("** **")
                                    msgg.edit(embedbase)
                                    break 
                                    
                                    case "Modifier la couleur":
                                        let HEHEHHE = await message.channel.send("Quel **Couleur** voulez-vous attribuez à l'embed ?")
                                        
                                        message.channel.awaitMessages(filter, {
                                            max: 1,
                                            time: 60000,
                                            errors: ['time']
                                        }).then(async (collected) => {
                                            const lowercase = collected.first().content.toLowerCase()
                                        
                                
                                            collected.first().delete()
                                            HEHEHHE.delete()
                                            embedbase.setColor(collected.first().content)
                                            msgg.edit(embedbase)
                                            }).catch(async (err) => {
                                                
                                                message.channel.send("**Désolé mais je ne peux pas modifier la Couleur !**").then((mm) => mm.delete({
                                                    timeout: 2500
                                            }));
                                        })
                                        break
            
                                      case "Supprimer la couleur":
                                        embedbase.setColor("WASSIM")
                                        msgg.edit(embedbase)
                                        break 
                
        

                    case "Copier un embed":
                        const channID = await message.channel.send("Quel est **le salon ou ce trouve le message à copier ?** (*ID*)");
                        const channel_id = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                        channID.delete();
                        channel_id.delete();
                        if(!Number(channel_id.content)||!message.guild.channels.cache.get(channel_id.content)) return message.channel.send(`Aucun salon trouvé pour \`${channel_id.content}\``).then(msg => msg.delete({timeout: 5000}));
                       const msgQuestionMessageID = await message.channel.send("Quel est **le message de l'embed à copier ?** (*Une ID*)");
                       const message_id = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first();
                       msgQuestionMessageID.delete();
                       message_id.delete();
                       if(!Number(message_id.content)||!message.guild.channels.cache.get(channel_id.content).messages.fetch(message_id.content)) return message.channel.send('Message Invalide').then(msg => msg.delete({timeout: 5000}));
                       const msg = await message.guild.channels.cache.get(channel_id.content).messages.fetch(message_id.content);
                       if (msg.embeds.length === 0) return message.channel.send("Ce message n'est pas un embed").then(msg => msg.delete({timeout: 50000}));
                       if (msg.partial) {
                        try {
                            await msg.fetch()
                        } catch {
                            return
                        }}
                        msgg.edit({embed: msg.embeds[0]})

                        break

                              
                }
            }
        
        })
        }
    
    }
    }
}