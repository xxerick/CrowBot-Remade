const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');

function status(statut) {
    if(statut === "dnd") return `\`🔴\``
    if(statut === "idle") return `\`🟠\``
    if(statut === "online") return `\`🟢\``
    if(statut === "offline") return `\`⚫\``

}
function secur(antijoinbot) {
    if (antijoinbot === null) return `\`❌\``
    if (antijoinbot === true) return `\`✅\``

}
let activity = {
    'PLAYING': 'Joue à',
    'STREAMING': 'Streame',
    'LISTENING': 'Écoute',
    'WATCHING': 'Regarde',
}
module.exports = {
    name: 'botconfig',
    aliases: ["setprofil"],
    run: async (client, message, args, prefix, color) => {

        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true) {
            const embed = new Discord.MessageEmbed()

            embed.setTitle(`Configuration Bot`)
            embed.setColor(color)
    
            embed.setDescription(`
**1・Changer le nom d'utilisateur**
Actuel: \`${client.user.username}\`

**2・Changer l'avatar**
Actuel: [\`Clique ici\`](${client.user.displayAvatarURL()})

**3・Changer l'activitée**
Actuel: \`${client.user.presence.activities[0] ? `${activity[client.user.presence.activities[0].type]} ${client.user.presence.activities[0].name}` : `❌`}\`  

**4・Changer la presence du bot**
Actuel: ${status(client.user.presence.status)}

**5・Secur invite**
Actuel: ${secur(db.get(`antijoinbot_${client.user.id}`))}
`)
            const bt1 = new MessageButton()
            .setStyle("gray")
            .setID("unpr"+message.id)
            .setEmoji("1️⃣")
            const bt2 = new MessageButton()
            .setStyle("gray")
            .setID("deuxpr"+message.id)
            .setEmoji("2️⃣")
            const bt3 = new MessageButton()
            .setStyle("gray")
            .setID("troispr"+message.id)
            .setEmoji("3️⃣")
            const bt4= new MessageButton()
            .setStyle("gray")
            .setID("quattrepr"+message.id)
            .setEmoji("4️⃣")
            const bt5= new MessageButton()
            .setStyle("gray")
            .setID("cinqpr"+message.id)
            .setEmoji("5️⃣")
            const bt= new MessageActionRow()
        .addComponent(bt1)
        .addComponent(bt2)
        .addComponent(bt3)
        .addComponent(bt4)
        .addComponent(bt5)

        await message.channel.send({embed: embed,    components: [bt]
                      }).then(async (msg) => {
   
    
        client.on("clickButton", async (button) => {

            if (button.clicker.user.id !== message.author.id) return ;
            if (button.id === "cinqpr"+message.id) {
                
                button.reply.defer(true)
                if(db.get(`antijoinbot_${client.user.id}`) === null) {
                    db.set(`antijoinbot_${client.user.id}`, true)
                   return updateEmbed(msg, client )
                   } else if(db.get(`antijoinbot_${client.user.id}`) === true) {
                    db.set(`antijoinbot_${client.user.id}`, null)
                    return updateEmbed(msg, client )
                   }
            }
            if (button.id === "unpr"+message.id) {
                
                button.reply.defer(true)
                let question = await message.channel.send("Quel est **le nouveau nom du bot** ?",)
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000*5,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    client.user.setUsername(collected.first().content).catch(async (err) => {
                        
                        collected.first().delete()
                        message.channel.send("Je ne peux pas changer de pseudo pour l'instant, veuillez réessayer plus tard").then((mm) => mm.delete({
                            timeout: 5000
                        }));
                    }).then(async () => {
                        updateEmbed(msg,client)
                    })
                })
            }
            
            if (button.id === "deuxpr"+message.id) {
                
                button.reply.defer(true)
                let question = await message.channel.send("Quel est **le nouvelle avatar du bot ?** (*liens*)")
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000*5,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    client.user.setAvatar(collected.first().content).catch(async (err) => {
                        
                        collected.first().delete()
                        message.channel.send("Je ne peux pas changer de phote de profil pour l'instant, veuillez réessayer plus tard").then((mm) => mm.delete({
                            timeout: 5000
                        }));
                    }).then(async () => {
                        updateEmbed(msg,client)
                    })
                })
            }

            if (button.id === "troispr"+message.id) {
                
                button.reply.defer(true)
                let question = await message.channel.send("Quel est **le nouveau type d'activiter du bot ?** (\`play\`, \`stream\`, \`watch\`, \`listen\`)")
                const filter = m => message.author.id === m.author.id;

                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000*5,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    let type = ""

                    if (collected.first().content.toLowerCase().startsWith("play")) {
                        type = "PLAYING"
                    } else if (collected.first().content.toLowerCase().startsWith("stream")) {
                        type = "STREAMING"
                    } else if (collected.first().content.toLowerCase().startsWith("listen")) {
                        type = "LISTENING"
                    } else if (collected.first().content.toLowerCase().startsWith("watch")) {
                        type = "WATCHING"
                    } else {
                        return message.channel.send("Type d'activité invalide ! Recommence !")
                    }

                    let question2 = await message.channel.send("Quel est **la nouvelle activiter du bot ?** (*message*)")

                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000*5,
                        errors: ['time']
                    }).then(async (collected2) => {
                        collected2.first().delete()
                        question2.delete()

                        client.user.setActivity(collected2.first().content, { type: type, url: "https://www.twitch.tv/leaaa93" }).then(async (a) => {
                            updateEmbed(msg,client)
                        })
                    });
                })
            }

            if (button.id === "quattrepr"+message.id) {
                
                button.reply.defer(true)
                let question = await message.channel.send(`Quel est **la nouvelle presence du bot ?** (\`dnd\`, \`idle\`, \`online\`, \`offline\`)`)
                const filter = m => message.author.id === m.author.id;

                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    let type = ""

                    if (collected.first().content.toLowerCase().startsWith("dnd")) {
                        type = "dnd"   
                    } else if (collected.first().content.toLowerCase().startsWith("idle")) {
                        type = "idle"                       
                    } else if (collected.first().content.toLowerCase().startsWith("online")) {
                        type = "online"
                    } else if (collected.first().content.toLowerCase().startsWith("offline")) {
                        type = "offline"
                     }  else {
                        return message.channel.send(`Presence incorect ! Recommence !`)
                    }
                    client.user.setPresence({ status: type }).then(async (a) => {
                            updateEmbed(msg,client)
                        })
                    });
            }
            })})
        
                
    
                
    
                    
            
function updateEmbed(message, client) {
    const embed = new Discord.MessageEmbed()

    embed.setTitle(`Configuration Bot`)
    embed.setColor(coloer)


    embed.setDescription(`
**1・Changer le nom d'utilisateur**
Actuel: \`${client.user.username}\`

**2・Changer l'avatar**
Actuel: [\`Clique ici\`](${client.user.displayAvatarURL()})

**3・Changer l'activitée**
Actuel: \`${client.user.presence.activities[0] ? `${activity[client.user.presence.activities[0].type]} ${client.user.presence.activities[0].name}` : `❌`}\`  

**4・Changer la presence du bot**
Actuel: ${status(client.user.presence.status)}

**5・Secur invite**
Actuel: ${secur(db.get(`antijoinbot_${client.user.id}`))}
    `)
        const bt1 = new MessageButton()
    .setStyle("gray")
    .setID("unpr"+message.id)
    .setEmoji("1️⃣")
    const bt2 = new MessageButton()
    .setStyle("gray")
    .setID("deuxpr"+message.id)
    .setEmoji("2️⃣")
    const bt3 = new MessageButton()
    .setStyle("gray")
    .setID("troispr"+message.id)
    .setEmoji("3️⃣")
    const bt4= new MessageButton()
    .setStyle("gray")
    .setID("quattrepr"+message.id)
    .setEmoji("4️⃣")
    const bt5= new MessageButton()
    .setStyle("gray")
    .setID("cinqpr"+message.id)
    .setEmoji("5️⃣")
    message.edit("",{embed: embed,
        button: [bt1, bt2, bt3, bt4,bt5]
              })
}    
    
       
        
          
}}
}
