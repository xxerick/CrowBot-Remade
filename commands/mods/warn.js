const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
let random_string = require("randomstring");
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

module.exports = {
    name: 'warn',
    aliases: ["sanctions"],
    run: async (client, message, args, prefix, color) => {
        let chx = db.get(`logmod_${message.guild.id}`);
        const logschannel = message.guild.channels.cache.get(chx)
        let perm = ""
        message.member.roles.cache.forEach(role => {
            if (db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
            if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
            if (db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
        })
        if (client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {
            let wass = db.get(`logmod_${message.guild.id}`);

            const logschannel = message.guild.channels.cache.get(wass)
            if (args[0] === "add") {
                const use = message.mentions.users.first() || client.users.cache.get(args[1]) 
               let user = client.users.cache.get(use.id)


                if (!user) return message.channel.send(`Aucun membre trouvé pour \`${args[1] || "rien"}\``)
                if (user.bot) return message.channel.send(`Vous pouvez pas sanctionnez un bot !`)
                if (user.id == message.author.id) return message.channel.send(`Vous pouvez pas vous sanctionnez vous même !`)


                if (message.guild.members.cache.get(user.id).roles.highest.position >= message.member.roles.highest.position || user.id === message.guild.owner.id) return message.channel.send(`Cette personnes est plus haute que vous sur le serveur, vous ne pouvez pas la sanctionnez !`)

                let res = args.slice(2).join(" ")

                let warnID = await
                    random_string.generate({
                        charset: 'numeric',
                        length: 8
                    });



                db.push(`info.${message.guild.id}.${user.id}`, { moderator: message.author.tag, reason: res ? res : "Aucune raison", date: Date.parse(new Date) / 1000, id: warnID })
                db.add(`number.${message.guild.id}.${user.id}`, 1)
                if (!res) {
                    message.channel.send(`${user} a été **warn**`);
                    user.send(`Vous avez été **warn** sur ${message.guild.name}`)

                    logschannel.send(new MessageEmbed()
                        //.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                        .setColor(color)
                        // .setTitle(`<:protection:847072581382438953> Modération • Type: **\`expulsion\`**`)
                        //  .setTimestamp() 
                        //.setDescription(`**Expulsion de**: ${user}\n**Auteur**: ${message.author}\n**Pour**: \`${reason}\`\n**Temps de réponse**: ${client.ws.ping}ms`)
                        .setDescription(`${message.author} a **warn** ${user}`)
                    )
                } else {
                    message.channel.send(`${user} a été **warn** pour \`${res}\``);
                    user.send(`Vous avez été **warn** sur ${message.guild.name} pour \`${res}\``)

                    logschannel.send(new MessageEmbed()
                        //.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                        .setColor(color)
                        // .setTitle(`<:protection:847072581382438953> Modération • Type: **\`expulsion\`**`)
                        //  .setTimestamp() 
                        //.setDescription(`**Expulsion de**: ${user}\n**Auteur**: ${message.author}\n**Pour**: \`${reason}\`\n**Temps de réponse**: ${client.ws.ping}ms`)
                        .setDescription(`${message.author} a **warn** ${user} pour \`${res}\``)
                    )
                }


            }
            if (args[0] === "list") {
                const use = message.mentions.users.first() || client.users.cache.get(args[1]) || message.author
               let user = client.users.cache.get(use.id)
                if (!user) return message.channel.send(`Aucun membre trouvé pour \`${args[1]}\``)

                const number = db.fetch(`number.${message.guild.id}.${user.id}`)
                const warnInfo = db.fetch(`info.${message.guild.id}.${user.id}`)

                if (!number || !warnInfo || warnInfo == []) return message.channel.send(`Aucun membre trouvé avec des sanctions pour \`${args[1] || "rien"}\``)
                let p0 = 0;
                let p1 = 5;
                let page = 1;



                const embed = new MessageEmbed()
                embed.setTitle(`Liste des sanctions de ${user.tag} (**${number}**)`)
                    .setDescription(warnInfo
                        .map(r => r)
                        .map((m, i) => `${i + 1}・\`${m.id}\`\n**Modérateur:** \`${m.moderator}\`\n **Raison:** \`${m.reason}\`\n**Date:** <t:${m.date}>`)
                        .slice(p0, p1)

                    )
                    .setFooter(`${page}/${Math.ceil(number === 0?1:number / 15)} • ${client.config.name}`)
                    .setColor(color)
                    message.channel.send(embed).then(async tdata => {
                    if (number > 15) {
                        const B1 = new MessageButton()
                            .setLabel("◀")
                            .setStyle("gray")
                            .setID('warnlist1');
        
                        const B2 = new MessageButton()
                            .setLabel("▶")
                            .setStyle("gray")
                            .setID('warnlist2');
        
                        const bts = new MessageActionRow()
                            .addComponent(B1)
                            .addComponent(B2)
                        tdata.edit("", { embed: embed, components: [bts] })
                        setTimeout(() => {
                            tdata.edit("", {
                                components: [], embed: new Discord.MessageEmbed()
                                    .setTitle(`Liste des sanctions de ${user.tag} (**${number}**)`)
                                    .setDescription(money
                                        .map(r => r)
                                        .map((m, i) => `${i + 1}・\`${m.id}\`\n**Modérateur:** \`${m.moderator}\`\n **Raison:** \`${m.reason}\`\n**Date:** <t:${m.date}>`)
                                        .slice(0, 15)
        
                                    )
                                    .setFooter(`1/${Math.ceil(number === 0?1:number / 15)} • ${client.config.name}`)
                                    .setColor(color)
        
        
                            })
                            // message.channel.send(embeds)
                        }, 60000 * 5)
                        client.on("clickButton", (button) => {
                            if (button.clicker.user.id !== message.author.id) return ;
                            if (button.id === "warnlist1") {
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
                                    .map(r => r)
                                        .map((m, i) => `${i + 1}・\`${m.id}\`\n**Modérateur:** \`${m.moderator}\`\n **Raison:** \`${m.reason}\`\n**Date:** <t:${m.date}>`)
                                    .slice(p0, p1)
        
                                )
                                    .setFooter(`${page}/${Math.ceil(number === 0?1:number / 15)} • ${client.config.name}`)
                                tdata.edit(embed);
        
                            }
                            if (button.id === "warnlist2") {
                                button.reply.defer(true)
        
                                p0 = p0 + 15;
                                p1 = p1 + 15;
        
                                page++;
        
                                if (p1 > number + 15) {
                                    return
                                }
                                if (p0 === undefined || p1 === undefined) {
                                    return
                                }
        
        
                                embed.setDescription(money
                                    .map(r => r)
                                    .map((m, i) => `${i + 1}・\`${m.id}\`\n**Modérateur:** \`${m.moderator}\`\n **Raison:** \`${m.reason}\`\n**Date:** <t:${m.date}>`)
                                    .slice(p0, p1)
        
                                )
                                    .setFooter(`${page}/${Math.ceil(number === 0?1:number / 15)} • ${client.config.name}`)
                                tdata.edit(embed);
        
                            }
                        })
                    }})

               
            }
            if (args[0] === "remove") {
                let id = args[2]
                const use = message.mentions.users.first() || client.users.cache.get(args[1]) 
               let user = client.users.cache.get(use.id)
                let database = db.fetch(`info.${message.guild.id}.${user.id}`)
                if (!user) return message.channel.send(`Aucun membre trouvé pour \`${args[1]}\``)
                if (user.bot) return message.channel.send(`Aucun membre trouvé pour \`${args[1] || "rien"}\``)
                if (user.id == message.author.id) return message.react("❌")


                if (!database || database == []) return message.channel.send(`Aucun membre trouvé avec des sanctions pour \`${args[1] || "rien"}\``)

                if (!database.find(data => data.id === id)) return message.channel.send(`Aucune sanctions trouvé pour \`${args[2] || "rien"}\``)




                database.splice(database.findIndex(data => data.id == id), 1)
                if (database.length >= 1) {
                    db.subtract(`number.${message.guild.id}.${user.id}`, 1)
                    db.set(`info.${message.guild.id}.${user.id}`, database)
                } else {
                    db.delete(`number.${message.guild.id}.${user.id}`)
                    db.delete(`info.${message.guild.id}.${user.id}`)

                }
                message.channel.send(`La sanctions **${args[2]}** a été supprimé`)

            }
            if (args[0] === "clear") {
                const use = message.mentions.users.first() || client.users.cache.get(args[1]) 
                let user = client.users.cache.get(use.id)


                if (!user) return message.channel.send(`Aucun membre trouvé pour \`${args[1] || "rien"}\``)
                if (user.bot) return message.channel.send(`Aucun membre trouvé pour \`${args[1] || "rien"}\``)
                if (user.id == message.author.id) return message.react("❌")


                if (message.guild.members.cache.get(user.id).roles.highest.position >= message.member.roles.highest.position) return
                const number = db.fetch(`number.${message.guild.id}.${user.id}`)
                if (!number) return message.channel.send(`Aucune sanctions trouvé`)

                message.channel.send(`${number} ${number > 1 ? "sanctions ont été supprimés" : "sanction à été supprimé"} `)

                db.delete(`number.${message.guild.id}.${user.id}`)

                db.delete(`info.${message.guild.id}.${user.id}`)


            }
        }

    }
}