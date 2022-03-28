const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');


module.exports = {
    name: 'server',
    aliases: [],
    run: async (client, message, args, prefix, color) => {

        if (client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true) {
            if (args[0] === "leave") {
                let guild = null;


                if (args[1]) {
                    let fetched = client.guilds.cache.find(g => g.name.toLowerCase().includes(args.slice(1).join(" ")));

                    let found = client.guilds.cache.get(args[1]);
                    if (!found) {
                        if (fetched) {
                            guild = fetched;
                        }
                    } else {
                        guild = found
                    }
                } else {
                    guild = message.guild
                }
                if (guild) {
                    guild.leave()
                    message.channel.send(`J'ai bien quitté le serveur ${guild.name}`);
                } else {
                    return message.channel.send(`Aucun serveur trouvé pour \`${args.slice(1).join(' ')}\``);

                }




            }
            else if (args[0] === "invite") {

                let guild = null;

                if (!args[1]) return message.channel.send("Merci d'entrer le nom d'un serveur ou je me trouve")

                if (args[1]) {
                    let fetched = client.guilds.cache.find(g => g.name.toLowerCase().includes(args.slice(1).join(" ")));

                    let found = client.guilds.cache.get(args[1]);
                    if (!found) {
                        if (fetched) {
                            guild = fetched;
                        }
                    } else {
                        guild = found
                    }
                } else {
                    return message.channel.send(`Aucun serveur trouvé pour \`${args.slice(1).join(' ')}\``);
                }
                if (guild) {
                    let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
                    if (!tChannel) {
                        return message.channel.send(`Aucun salon trouvé pour \`crée une invitation du serveur\``);
                    }
                    let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 })
                    message.channel.send(invite.url);
                } else {
                    return message.channel.send(`Aucun serveur trouvé pour \`${args.slice(1).join(' ')}\``);

                }

            }

            else if (args[0] === "list") {


                var str_filtrer = client.guilds.cache

                let p0 = 0;
                let p1 = 15;
                let page = 1;

                const embed = new Discord.MessageEmbed()
                    .setTitle('Liste des serveurs')
                    .setDescription(str_filtrer
                        .map(r => r)

                        .map((m, i) => `${i + 1 - 1}) ${m.name} (${m.id}) [${m.memberCount}]`)
                        .slice(p0, p1)
                    )

                    .setColor(color)
                    .setFooter(`Total: ${str_filtrer.size - 1} • ${client.config.name}`)


                message.channel.send(embed).then(async tdata => {
                    if (15 < str_filtrer.size - 1 - 1) {
                        const B1 = new MessageButton()
                            .setLabel("◀")
                            .setStyle("gray")
                            .setID('allserv1');

                        const B2 = new MessageButton()
                            .setLabel("▶")
                            .setStyle("gray")
                            .setID('allserv2');

                        const bts = new MessageActionRow()
                            .addComponent(B1)
                            .addComponent(B2)
                        tdata.edit("", { embed: embed, components: [bts] })
                        setTimeout(() => {
                            tdata.edit("", {
                                components: [], embed: new Discord.MessageEmbed()
                                    .setTitle('Liste des serveurs')
                                    .setDescription(str_filtrer
                                        .map(r => r)

                                        .map((m, i) => `${i + 1 - 1}) ${m.name} (${m.id}) [${m.memberCount}]`)
                                        .slice(p0, p1)
                                    )

                                    .setColor(color)
                                    .setFooter(`Total: ${str_filtrer.size - 1} • ${client.config.name}`)


                            })
                            // message.channel.send(embeds)
                        }, 60000 * 5)
                        client.on("clickButton", (button) => {
                            if (button.id === "allserv1") {
                                if (button.clicker.user.id !== message.author.id) return;

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


                                embed.setDescription(str_filtrer
                                    .map(r => r)

                                    .map((m, i) => `${i + 1 - 1}) ${m.name} (${m.id}) [${m.memberCount}]`)
                                    .slice(p0, p1)
                                )

                                    .setColor(color)
                                    .setFooter(`Total: ${str_filtrer.size - 1} • ${client.config.name}`)
                                tdata.edit(embed);

                            }
                            if (button.id === "allserv2") {
                                if (button.clicker.user.id !== message.author.id) return;
                                button.reply.defer(true)

                                p0 = p0 + 15;
                                p1 = p1 + 15;

                                page++;

                                if (p1 > str_filtrer.size - 1 - 1 + 15) {
                                    return
                                }
                                if (p0 === undefined || p1 === undefined) {
                                    return
                                }


                                embed.setDescription(str_filtrer
                                    .map(r => r)

                                    .map((m, i) => `${i + 1 - 1}) ${m.name} (${m.id}) [${m.memberCount}]`)
                                    .slice(p0, p1)
                                )

                                    .setColor(color)
                                    .setFooter(`Total: ${str_filtrer.size - 1} • ${client.config.name}`)
                                tdata.edit(embed);

                            }
                        })
                    }

                })



            }


        }
    }
}