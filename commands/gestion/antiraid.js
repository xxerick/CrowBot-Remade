const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
function onoff(antiraid) {
    if (antiraid === null) return "`❌`"
    if (antiraid === true) return "`✅`"

}
function wlbypass(antiraid) {
    if (antiraid === true) return "`❌`"
    if (antiraid === null) return "`✅`"

}
const ms = require("ms");
const message = require('../../events/rank/message');

module.exports = {
    name: 'antiraid',
    aliases: ["secur"],
    run: async (client, message, args, prefix, color) => {
        async function on() {
            message.channel.send("Chargement...").then((msggg) => {
                db.set(`massban_${message.guild.id}`, true);
                db.set(`massbansanction_${message.guild.id}`, "ban")
                db.set(`massbanwl_${message.guild.id}`, true)
                db.set(`link_${message.guild.id}`, true);
                db.set(`webhook_${message.guild.id}`, true)
                db.set(`webhooksanction_${message.guild.id}`, "ban")
                db.set(`webhookwl_${message.guild.id}`, true)
        
                db.set(`rolescreate_${message.guild.id}`, true);
                db.set(`rolescreatesanction_${message.guild.id}`, "derank")
                db.set(`rolescreatewl_${message.guild.id}`, null)
        
                db.set(`rolesdel_${message.guild.id}`, true);
                db.set(`rolesdelsanction_${message.guild.id}`, "derank")
                db.set(`rolesdelwl_${message.guild.id}`, null)
        
                db.set(`rolesmod_${message.guild.id}`, true);
                db.set(`rolesmodsanction_${message.guild.id}`, "derank")
                db.set(`rolesmodwl_${message.guild.id}`, null)
        
                db.set(`rolesadd_${message.guild.id}`, true);
                db.set(`rolesaddsanction_${message.guild.id}`, "derank")
                db.set(`rolesaddwl_${message.guild.id}`, null)
        
                db.set(`channelscreate_${message.guild.id}`, true);
                db.set(`channelscreatesanction_${message.guild.id}`, "derank")
                db.set(`channelscreatewl_${message.guild.id}`, null)
        
                db.set(`channelsdel_${message.guild.id}`, true);
                db.set(`channelsdelsanction_${message.guild.id}`, "derank")
                db.set(`channelsdelwl_${message.guild.id}`, null)
        
                db.set(`channelsmod_${message.guild.id}`, true);
                db.set(`channelsmodsanction_${message.guild.id}`, "derank")
                db.set(`channelsmodwl_${message.guild.id}`, null)
        
                db.set(`update_${message.guild.id}`, true);
                db.set(`updatesanction_${message.guild.id}`, "derank")
                db.set(`updatewl_${message.guild.id}`, true)
        
                db.set(`bot_${message.guild.id}`, true);
                db.set(`botsanction_${message.guild.id}`, "ban")
                db.set(`botwl_${message.guild.id}`, true)
        
                db.set(`antideco_${message.guild.id}`, true);
                db.set(`antidecosanction_${message.guild.id}`, "derank")
                db.set(`antidecowl_${message.guild.id}`, true)
        
                db.set(`antitoken_${message.guild.id}`, true)
                db.get(`crealimit_${message.guild.id}`, true)
                db.set(`crealimittemps_${message.guild.id}`, ms("1d"))
        
        
                return msggg.edit("Tout modules d'antiraid ont été activées")
            })
        }
        function off() {
            message.channel.send("Chargement...").then((msggg) => {
                db.set(`massban_${message.guild.id}`, null);
                db.set(`webhook_${message.guild.id}`, null);
                db.set(`rolescreate_${message.guild.id}`, null);
                db.set(`rolesdel_${message.guild.id}`, null);
                db.set(`rolesmod_${message.guild.id}`, null);
                db.set(`rolesadd_${message.guild.id}`, null);
                db.set(`channelscreate_${message.guild.id}`, null);
                db.set(`channelsdel_${message.guild.id}`, null);
                db.set(`channelsmod_${message.guild.id}`, null);
                db.set(`update_${message.guild.id}`, null);
                db.set(`bot_${message.guild.id}`, null);
                db.set(`antideco_${message.guild.id}`, null);
                db.set(`antitoken_${message.guild.id}`, null)
                db.get(`crealimit_${message.guild.id}`, null)
                return msggg.edit("Tout modules d'antiraid ont été désactivées")
            })
        }
        
        function max() {
            message.channel.send("Chargement...").then((msggg) => {
                db.set(`massban_${message.guild.id}`, true);
                db.set(`massbansanction_${message.guild.id}`, "ban")
                db.set(`massbanwl_${message.guild.id}`, true)
        
                db.set(`webhook_${message.guild.id}`, true);
                db.set(`webhooksanction_${message.guild.id}`, "ban")
                db.set(`webhookwl_${message.guild.id}`, true)
        
                db.set(`rolescreate_${message.guild.id}`, true);
                db.set(`rolescreatesanction_${message.guild.id}`, "ban")
                db.set(`rolescreatewl_${message.guild.id}`, true)
        
                db.set(`rolesdel_${message.guild.id}`, true);
                db.set(`rolesdelsanction_${message.guild.id}`, "ban")
                db.set(`rolesdelwl_${message.guild.id}`, true)
        
                db.set(`rolesmod_${message.guild.id}`, true);
                db.set(`rolesmodsanction_${message.guild.id}`, "ban")
                db.set(`rolesmodwl_${message.guild.id}`, true)
        
                db.set(`rolesadd_${message.guild.id}`, true);
                db.set(`rolesaddsanction_${message.guild.id}`, "ban")
                db.set(`rolesaddwl_${message.guild.id}`, true)
        
                db.set(`channelscreate_${message.guild.id}`, true);
                db.set(`channelscreatesanction_${message.guild.id}`, "ban")
                db.set(`channelscreatewl_${message.guild.id}`, true)
        
                db.set(`channelsdel_${message.guild.id}`, true);
                db.set(`channelsdelsanction_${message.guild.id}`, "ban")
                db.set(`channelsdelwl_${message.guild.id}`, true)
        
                db.set(`channelsmod_${message.guild.id}`, true);
                db.set(`channelsmodsanction_${message.guild.id}`, "ban")
                db.set(`channelsmodwl_${message.guild.id}`, true)
        
                db.set(`update_${message.guild.id}`, true);
                db.set(`updatesanction_${message.guild.id}`, "ban")
                db.set(`updatewl_${message.guild.id}`, true)
        
                db.set(`bot_${message.guild.id}`, true);
                db.set(`botsanction_${message.guild.id}`, "ban")
                db.set(`botwl_${message.guild.id}`, true)
        
                db.set(`antideco_${message.guild.id}`, true);
                db.set(`antidecosanction_${message.guild.id}`, "ban")
                db.set(`antidecowl_${message.guild.id}`, true)
        
                db.set(`antitoken_${message.guild.id}`, true)
                db.get(`crealimit_${message.guild.id}`, true)
                db.set(`crealimittemps_${message.guild.id}`, ms("1d"))
        
                return msggg.edit("Tout modules d'antiraid ont été activées en max")
            })
        }
        if (client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true) {
            if (args[0] === "config" || !args[0]) {

                let p0 = 0;
                let p1 = 3;
                let page = 1;



                return message.channel.send(`Antiraid • ${client.config.name}`).then(async msg => {
                    setTimeout(() => {
                        msg.edit("", { components: [] })
                    }, 60000 * 10)
                    updateembed1(msg)
                    client.on("clickButton", async (button) => {
                        if (button.clicker.user.id !== message.author.id) return
                        if (button.id === message.id + "on") {
                            button.reply.defer(true)
                            msg.delete()
                            on()

                        }
                        if (button.id === message.id + "off") {
                            msg.delete()
                            on()

                        }
                        if (button.id === message.id + "max") {
                            msg.delete()
                            max()


                        }
                        if (button.id === message.id + "2on") {
                            msg.delete()
                            on()

                        }
                        if (button.id === message.id + "2off") {
                            msg.delete()
                            on()

                        }
                        if (button.id === message.id + "2max") {
                            msg.delete()
                            max()


                        }
                        if (button.id === message.id + "3on") {
                            button.reply.defer(true)
                            msg.delete()
                            on()

                        }
                        if (button.id === message.id + "3off") {
                            button.reply.defer(true)
                            msg.delete()
                            off()
                            return updateembed3(msg)

                        }
                        if (button.id === message.id + "3max") {
                            button.reply.defer(true)
                            msg.delete()
                            max()


                        }
                        if (button.id === message.id + "addrole") {

                            button.reply.defer(true)
                            const embedantiraid = new Discord.MessageEmbed()
                                .setColor(color)
                                .setDescription(`
1️ ・ Modifier l'activité 
2️ ・ Modifier la sanctions
3️ ・ Modifier la whitlist bypass
                    `)
                                .setColor(color)
                                .setTitle(`Ajout de rôle avec des permissions dangereuses`)
                            const button1 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "addroleactif")
                                .setEmoji("1️⃣")
                            const button2 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "sanctionaddrole")
                                .setEmoji("2️⃣")
                            const button3 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "addrolewl")
                                .setEmoji("3️⃣")
                            const button4 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "anuaddrole")
                                .setEmoji("❌")
                            const inter = new MessageActionRow()
                                .addComponent(button1)
                                .addComponent(button2)
                                .addComponent(button3)
                                .addComponent(button4)

                            return message.channel.send(embedantiraid, inter).then(async m => {
                                setTimeout(() => {
                                    m.delete()
                                    return message.channel.send(`Trop long`)
                                }, 60000 * 5)
                                client.on("clickButton", async button => {
                                    if (button.id === message.id + "anuaddrole") {

                                        button.reply.defer(true)

                                        m.delete()
                                    }
                                    if (button.id === message.id + "addroleactif") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Est ce que **je dois punir les personnes qui ajouterons des permissions à un membre ?** (\`oui\` ou \`non\`)")

                                        const responseWbCr = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbCr = responseWbCr.first()
                                        const lowercase = CollectedWbCr.content.toLowerCase()
                                        if (lowercase == "oui") {
                                            db.set(`rolesadd_${message.guild.id}`, true);
                                            updateembed1(msg)
                                            message.channel.send("Le module a été activé")
                                            q.delete();
                                            CollectedWbCr.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`rolesadd_${message.guild.id}`, null);
                                            updateembed1(msg)
                                            message.channel.send("Le module a été desactivé")
                                            q.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")

                                        }
                                    }

                                    if (button.id === message.id + "sanctionaddrole") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un ajoutera des permissions à un membre ?** (`ban`, `kick`, `derank`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank" || lowercase == "derank") {
                                            db.set(`rolesaddsanction_${message.guild.id}`, lowercase.replace("unrank", "derank"))
                                            message.channel.send(`Désormais quand quelqu'un **ajoutera des permissions à un membre** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
                                            updateembed1(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `ban`, `kick` ou `derank` ! Recommence !")
                                        }

                                    }

                                    if (button.id === message.id + "addrolewl") {

                                        button.reply.defer(true)
                                        let q = await message.channel.send("Est ce que **je dois punir les personnes whitlist qui ajouterons des permissions à un membre ?** (\`oui\` ou \`non\`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "oui") {
                                            db.set(`rolesaddwl_${message.guild.id}`, true)

                                            message.channel.send(`Les whitelists ne peuvent pas bypass le module  `)
                                            updateembed1(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`rolesaddwl_${message.guild.id}`, null)

                                            message.channel.send(`Les whitelists peuvent maintenant bypass le module `)
                                            updateembed1(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")
                                        }

                                    }

                                })
                            })

                        }
                        if (button.id === message.id + "roledel") {

                            button.reply.defer(true)
                            const embedantiraid = new Discord.MessageEmbed()
                                .setColor(color)
                                .setDescription(`
1️ ・ Modifier l'activité 
2️ ・ Modifier la sanctions
3️ ・ Modifier la whitlist bypass
                    `)
                                .setColor(color)
                                .setTitle(`Suppression de rôle`)
                            const button1 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "delroledel")
                                .setEmoji("1️⃣")
                            const button2 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "delrolesanction")
                                .setEmoji("2️⃣")
                            const button3 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "delrolewl")
                                .setEmoji("3️⃣")
                            const button4 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "delroleanu")
                                .setEmoji("❌")
                            const inter = new MessageActionRow()
                                .addComponent(button1)
                                .addComponent(button2)
                                .addComponent(button3)
                                .addComponent(button4)

                            return message.channel.send(embedantiraid, inter).then(async m => {
                                setTimeout(() => {
                                    m.delete()
                                    return message.channel.send(`Trop long`)
                                }, 60000 * 5)
                                client.on("clickButton", async button => {
                                    if (button.id === message.id + "delroleanu") {

                                        button.reply.defer(true)

                                        m.delete()
                                    }
                                    if (button.id === message.id + "delroledel") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Est ce que **je dois punir les personnes qui supprimerons des rôles ?** (\`oui\` ou \`non\`)")

                                        const responseWbCr = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbCr = responseWbCr.first()
                                        const lowercase = CollectedWbCr.content.toLowerCase()
                                        if (lowercase == "oui") {
                                            db.set(`rolesdel_${message.guild.id}`, true);
                                            updateembed1(msg)
                                            message.channel.send("Le module a été activé")
                                            q.delete();
                                            CollectedWbCr.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`rolesdel_${message.guild.id}`, null);
                                            updateembed1(msg)
                                            message.channel.send("Le module a été desactivé")
                                            q.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")

                                        }
                                    }

                                    if (button.id === message.id + "delrolesanction") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un supprimera un rôle ?** (`ban`, `kick`, `derank`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank" || lowercase == "derank") {
                                            db.set(`rolesdelsanction_${message.guild.id}`, lowercase.replace("unrank", "derank"))
                                            message.channel.send(`Désormais quand quelqu'un **supprimera un rôle** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
                                            updateembed1(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `ban`, `kick` ou `derank` ! Recommence !")
                                        }

                                    }

                                    if (button.id === message.id + "delrolewl") {

                                        button.reply.defer(true)
                                        let q = await message.channel.send("Est ce que **je dois punir les personnes whitlist qui supprimerons des rôles ?** (\`oui\` ou \`non\`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "oui") {
                                            db.set(`rolesdelwl_${message.guild.id}`, true)

                                            message.channel.send(`Les whitelists ne peuvent pas bypass le module  `)
                                            updateembed1(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`rolesdelwl_${message.guild.id}`, null)

                                            message.channel.send(`Les whitelists peuvent maintenant bypass le module `)
                                            updateembed1(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")
                                        }

                                    }

                                })
                            })

                        }
                        if (button.id === message.id + "rolemodif") {

                            button.reply.defer(true)
                            const embedantiraid = new Discord.MessageEmbed()
                                .setColor(color)
                                .setDescription(`
1️ ・ Modifier l'activité 
2️ ・ Modifier la sanctions
3️ ・ Modifier la whitlist bypass
                    `)
                                .setColor(color)
                                .setTitle(`Modification de rôle`)
                            const button1 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "modifrole")
                                .setEmoji("1️⃣")
                            const button2 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "modpunrole")
                                .setEmoji("2️⃣")
                            const button3 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "wlrolemod")
                                .setEmoji("3️⃣")
                            const button4 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "delrolemod")
                                .setEmoji("❌")
                            const inter = new MessageActionRow()
                                .addComponent(button1)
                                .addComponent(button2)
                                .addComponent(button3)
                                .addComponent(button4)

                            return message.channel.send(embedantiraid, inter).then(async m => {
                                setTimeout(() => {
                                    m.delete()
                                    return message.channel.send(`Trop long`)
                                }, 60000 * 5)
                                client.on("clickButton", async button => {
                                    if (button.id === message.id + "delrolemod") {

                                        button.reply.defer(true)

                                        m.delete()
                                    }
                                    if (button.id === message.id + "modifrole") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Est ce que **je dois punir les personnes qui modifirons des rôles ?** (\`oui\` ou \`non\`)")

                                        const responseWbCr = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbCr = responseWbCr.first()
                                        const lowercase = CollectedWbCr.content.toLowerCase()
                                        if (lowercase == "oui") {
                                            db.set(`rolesmod_${message.guild.id}`, true);
                                            updateembed1(msg)
                                            message.channel.send("Le module a été activé")
                                            q.delete();
                                            CollectedWbCr.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`rolesmod_${message.guild.id}`, null);
                                            updateembed1(msg)
                                            message.channel.send("Le module a été desactivé")
                                            q.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")

                                        }
                                    }

                                    if (button.id === message.id + "modpunrole") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un modifira un rôle ?** (`ban`, `kick`, `derank`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank" || lowercase == "derank") {
                                            db.set(`rolesmodsanction_${message.guild.id}`, lowercase.replace("unrank", "derank"))
                                            message.channel.send(`Désormais quand quelqu'un **modifira un rôle** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
                                            updateembed1(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `ban`, `kick` ou `derank` ! Recommence !")
                                        }

                                    }

                                    if (button.id === message.id + "wlrolemod") {

                                        button.reply.defer(true)
                                        let q = await message.channel.send("Est ce que **je dois punir les personnes whitlist qui modifirons des rôles ?** (\`oui\` ou \`non\`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "oui") {
                                            db.set(`rolesmodwl_${message.guild.id}`, true)

                                            message.channel.send(`Les whitelists ne peuvent pas bypass le module  `)
                                            updateembed1(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`rolesmodwl_${message.guild.id}`, null)

                                            message.channel.send(`Les whitelists peuvent maintenant bypass le module `)
                                            updateembed1(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")
                                        }

                                    }

                                })
                            })

                        }
                        if (button.id === message.id + "rolecreate") {

                            button.reply.defer(true)
                            const embedantiraid = new Discord.MessageEmbed()
                                .setColor(color)
                                .setDescription(`
1️ ・ Modifier l'activité 
2️ ・ Modifier la sanctions
3️ ・ Modifier la whitlist bypass
                    `)
                                .setColor(color)
                                .setTitle(`Création de rôle`)
                            const button1 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "ifrole")
                                .setEmoji("1️⃣")
                            const button2 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "punishrole")
                                .setEmoji("2️⃣")
                            const button3 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "whitelistrole")
                                .setEmoji("3️⃣")
                            const button4 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "annulerrole")
                                .setEmoji("❌")
                            const inter = new MessageActionRow()
                                .addComponent(button1)
                                .addComponent(button2)
                                .addComponent(button3)
                                .addComponent(button4)

                            return message.channel.send(embedantiraid, inter).then(async m => {
                                setTimeout(() => {
                                    m.delete()
                                    return message.channel.send(`Trop long`)
                                }, 60000 * 5)
                                client.on("clickButton", async button => {
                                    if (button.id === message.id + "annulerrole") {

                                        button.reply.defer(true)

                                        m.delete()
                                    }
                                    if (button.id === message.id + "ifrole") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Est ce que **je dois punir les personnes qui créerons des rôles ?** (\`oui\` ou \`non\`)")

                                        const responseWbCr = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbCr = responseWbCr.first()
                                        const lowercase = CollectedWbCr.content.toLowerCase()
                                        if (lowercase == "oui") {
                                            db.set(`rolescreate_${message.guild.id}`, true);
                                            updateembed1(msg)
                                            message.channel.send("Le module a été activé")
                                            q.delete();
                                            CollectedWbCr.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`rolescreate_${message.guild.id}`, null);
                                            updateembed1(msg)
                                            message.channel.send("Le module a été desactivé")
                                            q.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")

                                        }
                                    }

                                    if (button.id === message.id + "punishrole") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un créera un rôle ?** (`ban`, `kick`, `derank`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank" || lowercase == "derank") {
                                            db.set(`rolescreatesanction_${message.guild.id}`, lowercase.replace("unrank", "derank"))
                                            message.channel.send(`Désormais quand quelqu'un **créera un rôle** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
                                            updateembed1(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `ban`, `kick` ou `derank` ! Recommence !")
                                        }

                                    }

                                    if (button.id === message.id + "whitelistrole") {

                                        button.reply.defer(true)
                                        let q = await message.channel.send("Est ce que **je dois punir les personnes whitlist qui créerons des rôles ?** (\`oui\` ou \`non\`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "oui") {
                                            db.set(`rolescreatewl_${message.guild.id}`, true)

                                            message.channel.send(`Les whitelists ne peuvent pas bypass le module  `)
                                            updateembed1(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`rolescreatewl_${message.guild.id}`, null)

                                            message.channel.send(`Les whitelists peuvent maintenant bypass le module `)
                                            updateembed1(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")
                                        }

                                    }

                                })
                            })

                        }
                        if (button.id === message.id + "webhook") {

                            button.reply.defer(true)
                            const embedantiraid = new Discord.MessageEmbed()
                                .setColor(color)
                                .setDescription(`
1️ ・ Modifier l'activité 
2️ ・ Modifier la sanctions
3️ ・ Modifier la whitlist bypass
                    `)
                                .setColor(color)
                                .setTitle(`Création de webhook`)
                            const button1 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "actifwebhok")
                                .setEmoji("1️⃣")
                            const button2 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "sanctionsweb")
                                .setEmoji("2️⃣")
                            const button3 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "wlwebhook")
                                .setEmoji("3️⃣")
                            const button4 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "delweb")
                                .setEmoji("❌")
                            const inter = new MessageActionRow()
                                .addComponent(button1)
                                .addComponent(button2)
                                .addComponent(button3)
                                .addComponent(button4)

                            return message.channel.send(embedantiraid, inter).then(async m => {
                                setTimeout(() => {
                                    m.delete()
                                    return message.channel.send(`Trop long`)
                                }, 60000 * 5)
                                client.on("clickButton", async button => {
                                    if (button.id === message.id + "delweb") {

                                        button.reply.defer(true)

                                        m.delete()
                                    }
                                    if (button.id === message.id + "actifwebhok") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Est ce que **je dois punir les personnes qui créerons des webhook ?** (\`oui\` ou \`non\`)")

                                        const responseWbCr = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbCr = responseWbCr.first()
                                        const lowercase = CollectedWbCr.content.toLowerCase()
                                        if (lowercase == "oui") {
                                            db.set(`webhook_${message.guild.id}`, true);
                                            updateembed1(msg)
                                            message.channel.send("Le module a été activé")
                                            q.delete();
                                            CollectedWbCr.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`webhook_${message.guild.id}`, null);
                                            updateembed1(msg)
                                            message.channel.send("Le module a été desactivé")
                                            q.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")

                                        }
                                    }

                                    if (button.id === message.id + "sanctionsweb") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un créera un webhook ?** (`ban`, `kick`, `derank`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank" || lowercase == "derank") {
                                            db.set(`webhooksanction_${message.guild.id}`, lowercase.replace("unrank", "derank"))
                                            message.channel.send(`Désormais quand quelqu'un **créera un webhook** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
                                            updateembed1(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `ban`, `kick` ou `derank` ! Recommence !")
                                        }

                                    }

                                    if (button.id === message.id + "wlwebhook") {

                                        button.reply.defer(true)
                                        let q = await message.channel.send("Est ce que **je dois punir les personnes whitlist qui créerons des webhook ?** (\`oui\` ou \`non\`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "oui") {
                                            db.set(`webhookwl_${message.guild.id}`, true)

                                            message.channel.send(`Les whitelists ne peuvent pas bypass le module`)
                                            updateembed1(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`webhookwl_${message.guild.id}`, null)

                                            message.channel.send(`Les whitelists peuvent maintenant bypass le module `)
                                            updateembed1(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")
                                        }

                                    }

                                })
                            })

                        }
                        if (button.id === message.id + "update") {

                            button.reply.defer(true)
                            const embedantiraid = new Discord.MessageEmbed()
                                .setColor(color)
                                .setDescription(`
1️ ・ Modifier l'activité 
2️ ・ Modifier la sanctions
3️ ・ Modifier la whitlist bypass
                    `)
                                .setColor(color)
                                .setTitle(`Modification du serveur`)
                            const button1 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "updateactif")
                                .setEmoji("1️⃣")
                            const button2 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "sanctionupdate")
                                .setEmoji("2️⃣")
                            const button3 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "updatewl")
                                .setEmoji("3️⃣")
                            const button4 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "anuupdate")
                                .setEmoji("❌")
                            const inter = new MessageActionRow()
                                .addComponent(button1)
                                .addComponent(button2)
                                .addComponent(button3)
                                .addComponent(button4)

                            return message.channel.send(embedantiraid, inter).then(async m => {
                                setTimeout(() => {
                                    m.delete()
                                    return message.channel.send(`Trop long`)
                                }, 60000 * 5)
                                client.on("clickButton", async button => {
                                    if (button.id === message.id + "anuupdate") {

                                        button.reply.defer(true)

                                        m.delete()
                                    }
                                    if (button.id === message.id + "updateactif") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Est ce que **je dois punir les personnes qui modifirons le serveur ?** (\`oui\` ou \`non\`)")

                                        const responseWbCr = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbCr = responseWbCr.first()
                                        const lowercase = CollectedWbCr.content.toLowerCase()
                                        if (lowercase == "oui") {
                                            db.set(`update_${message.guild.id}`, true);
                                            updateembed2(msg)
                                            message.channel.send("Le module a été activé")
                                            q.delete();
                                            CollectedWbCr.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`update_${message.guild.id}`, null);
                                            updateembed2(msg)
                                            message.channel.send("Le module a été desactivé")
                                            q.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")

                                        }
                                    }

                                    if (button.id === message.id + "sanctionupdate") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un modifira le serveur ?** (`ban`, `kick`, `derank`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank" || lowercase == "derank") {
                                            db.set(`updateanction_${message.guild.id}`, lowercase.replace("unrank", "derank"))
                                            message.channel.send(`Désormais quand quelqu'un **modifira le serveur** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
                                            updateembed2(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `ban`, `kick` ou `derank` ! Recommence !")
                                        }

                                    }

                                    if (button.id === message.id + "updatewl") {

                                        button.reply.defer(true)
                                        let q = await message.channel.send("Est ce que **je dois punir les personnes whitlist qui modifirons le serveur ?** (\`oui\` ou \`non\`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "oui") {
                                            db.set(`updatewl_${message.guild.id}`, true)

                                            message.channel.send(`Les whitelists ne peuvent pas bypass le module  `)
                                            updateembed2(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`updatewl_${message.guild.id}`, null)

                                            message.channel.send(`Les whitelists peuvent maintenant bypass le module `)
                                            updateembed2(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")
                                        }

                                    }

                                })
                            })

                        }
                        if (button.id === message.id + "channelcreate") {

                            button.reply.defer(true)
                            const embedantiraid = new Discord.MessageEmbed()
                                .setColor(color)
                                .setDescription(`
1️ ・ Modifier l'activité 
2️ ・ Modifier la sanctions
3️ ・ Modifier la whitlist bypass
                    `)
                                .setColor(color)
                                .setTitle(`Création de salon`)
                            const button1 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "channelcactif")
                                .setEmoji("1️⃣")
                            const button2 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "channelcsanctions")
                                .setEmoji("2️⃣")
                            const button3 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "channelscwl")
                                .setEmoji("3️⃣")
                            const button4 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "channelcdel")
                                .setEmoji("❌")
                            const inter = new MessageActionRow()
                                .addComponent(button1)
                                .addComponent(button2)
                                .addComponent(button3)
                                .addComponent(button4)

                            return message.channel.send(embedantiraid, inter).then(async m => {
                                setTimeout(() => {
                                    m.delete()
                                    return message.channel.send(`Trop long`)
                                }, 60000 * 5)
                                client.on("clickButton", async button => {
                                    if (button.id === message.id + "channelcdel") {

                                        button.reply.defer(true)

                                        m.delete()
                                    }
                                    if (button.id === message.id + "channelcactif") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Est ce que **je dois punir les personnes qui créerons des salon ?** (\`oui\` ou \`non\`)")

                                        const responseWbCr = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbCr = responseWbCr.first()
                                        const lowercase = CollectedWbCr.content.toLowerCase()
                                        if (lowercase == "oui") {
                                            db.set(`channelscreate_${message.guild.id}`, true);
                                            updateembed2(msg)
                                            message.channel.send("Le module a été activé")
                                            q.delete();
                                            CollectedWbCr.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`channelscreate_${message.guild.id}`, null);
                                            updateembed2(msg)
                                            message.channel.send("Le module a été desactivé")
                                            q.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")

                                        }
                                    }

                                    if (button.id === message.id + "channelcsanctions") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un créera des salon ?** (`ban`, `kick`, `derank`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank" || lowercase == "derank") {
                                            db.set(`channelscreatesanction_${message.guild.id}`, lowercase.replace("unrank", "derank"))
                                            message.channel.send(`Désormais quand quelqu'un **créera un salon** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
                                            updateembed2(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `ban`, `kick` ou `derank` ! Recommence !")
                                        }

                                    }

                                    if (button.id === message.id + "channelscwl") {

                                        button.reply.defer(true)
                                        let q = await message.channel.send("Est ce que **je dois punir les personnes whitlist qui créerons des salon ?** (\`oui\` ou \`non\`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "oui") {
                                            db.set(`channelscreatewl_${message.guild.id}`, true)

                                            message.channel.send(`Les whitelists ne peuvent pas bypass le module  `)
                                            updateembed2(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`channelscreatewl_${message.guild.id}`, null)

                                            message.channel.send(`Les whitelists peuvent maintenant bypass le module `)
                                            updateembed2(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")
                                        }

                                    }

                                })
                            })

                        }
                        if (button.id === message.id + "channelmodif") {

                            button.reply.defer(true)
                            const embedantiraid = new Discord.MessageEmbed()
                                .setColor(color)
                                .setDescription(`
1️ ・ Modifier l'activité 
2️ ・ Modifier la sanctions
3️ ・ Modifier la whitlist bypass
                    `)
                                .setColor(color)
                                .setTitle(`Modification de salon`)
                            const button1 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "channelmodactif")
                                .setEmoji("1️⃣")
                            const button2 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "channelmodpuni")
                                .setEmoji("2️⃣")
                            const button3 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "channelmodwl")
                                .setEmoji("3️⃣")
                            const button4 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "channelmoddel")
                                .setEmoji("❌")
                            const inter = new MessageActionRow()
                                .addComponent(button1)
                                .addComponent(button2)
                                .addComponent(button3)
                                .addComponent(button4)

                            return message.channel.send(embedantiraid, inter).then(async m => {
                                setTimeout(() => {
                                    m.delete()
                                    return message.channel.send(`Trop long`)
                                }, 60000 * 5)
                                client.on("clickButton", async button => {
                                    if (button.id === message.id + "channelmoddel") {

                                        button.reply.defer(true)

                                        m.delete()
                                    }
                                    if (button.id === message.id + "channelmodactif") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Est ce que **je dois punir les personnes qui modifirons des salon ?** (\`oui\` ou \`non\`)")

                                        const responseWbCr = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbCr = responseWbCr.first()
                                        const lowercase = CollectedWbCr.content.toLowerCase()
                                        if (lowercase == "oui") {
                                            db.set(`channelsmod_${message.guild.id}`, true);
                                            updateembed2(msg)
                                            message.channel.send("Le module a été activé")
                                            q.delete();
                                            CollectedWbCr.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`channelsmod_${message.guild.id}`, null);
                                            updateembed2(msg)
                                            message.channel.send("Le module a été desactivé")
                                            q.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")

                                        }
                                    }

                                    if (button.id === message.id + "channelmodpuni") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un modifirons des salon ?** (`ban`, `kick`, `derank`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank" || lowercase == "derank") {
                                            db.set(`channelsmodsanction_${message.guild.id}`, lowercase.replace("unrank", "derank"))
                                            message.channel.send(`Désormais quand quelqu'un **modifira un salon** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
                                            updateembed2(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `ban`, `kick` ou `derank` ! Recommence !")
                                        }

                                    }

                                    if (button.id === message.id + "channelmodwl") {

                                        button.reply.defer(true)
                                        let q = await message.channel.send("Est ce que **je dois punir les personnes whitlist qui modifirons des salon ?** (\`oui\` ou \`non\`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "oui") {
                                            db.set(`channelsmodwl_${message.guild.id}`, true)

                                            message.channel.send(`Les whitelists ne peuvent pas bypass le module  `)
                                            updateembed2(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`channelsmodwl_${message.guild.id}`, null)

                                            message.channel.send(`Les whitelists peuvent maintenant bypass le module `)
                                            updateembed2(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")
                                        }

                                    }

                                })
                            })

                        }
                        if (button.id === message.id + "antiban") {

                            button.reply.defer(true)
                            const embedantiraid = new Discord.MessageEmbed()
                                .setColor(color)
                                .setDescription(`
1️ ・ Modifier l'activité 
2️ ・ Modifier la sanctions
3️ ・ Modifier la whitlist bypass
4️ ・ Modifier la limite

                    `)
                                .setColor(color)
                                .setTitle(`Bannissement de membres`)
                            const button1 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "banactif")
                                .setEmoji("1️⃣")
                            const button2 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "banpuni")
                                .setEmoji("2️⃣")
                            const button3 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "banwl")
                                .setEmoji("3️⃣")
                            const button5 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "banlimit")
                                .setEmoji("4️⃣")
                            const button4 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "bananu")
                                .setEmoji("❌")
                            const inter = new MessageActionRow()
                                .addComponent(button1)
                                .addComponent(button2)
                                .addComponent(button3)
                                .addComponent(button5)
                                .addComponent(button4)

                            return message.channel.send(embedantiraid, inter).then(async m => {
                                setTimeout(() => {
                                    m.delete()
                                    return message.channel.send(`Trop long`)
                                }, 60000 * 5)
                                client.on("clickButton", async button => {
                                    if (button.id === message.id + "banlimit") {

                                        button.reply.defer(true)
                                        let q = await message.channel.send("Combien de fois **on dois bannir des membres pour que je punissent ?** (*ex: 2*)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (isNaN(lowercase)) {
                                            q.delete()
                                            message.channel.send("Ceci n'est pas un nombre")

                                        } else {
                                            let q2 = await message.channel.send(`En combien **de temps on dois faire ${lowercase} ban pour être punie ?** (*ex: 10s*)`)
                                            const responseWbSanc2 = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                            const CollectedWbSanc2 = responseWbSanc2.first()
                                            const lowercase2 = CollectedWbSanc2.content.toLowerCase()
                                            if (!ms(lowercase2.replace("j", "d"))) {
                                                return message.channel.send(`Temps incorrect.`)

                                            } else {
                                                q.delete()
                                                q2.delete()
                                                db.set(`massbannum_${message.guild.id}`, lowercase)
                                                db.set(`massbantime_${message.guild.id}`, lowercase2)
                                                message.channel.send(`Un utilisateur qui fera **${lowercase}** alertes de **Bannissement** en moins de **${lowercase2}\`** se fera punir !`)
                                                updateembed3(msg)
                                            }
                                        }



                                    }
                                    if (button.id === message.id + "bananu") {

                                        button.reply.defer(true)

                                        m.delete()
                                    }
                                    if (button.id === message.id + "banactif") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Est ce que **je dois punir les personnes qui bannirons des membres ?** (\`oui\` ou \`non\`)")

                                        const responseWbCr = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbCr = responseWbCr.first()
                                        const lowercase = CollectedWbCr.content.toLowerCase()
                                        if (lowercase == "oui") {
                                            db.set(`massban_${message.guild.id}`, true);
                                            updateembed3(msg)
                                            message.channel.send("Le module a été activé")
                                            q.delete();
                                            CollectedWbCr.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`massban_${message.guild.id}`, null);
                                            updateembed3(msg)
                                            message.channel.send("Le module a été desactivé")
                                            q.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")

                                        }
                                    }

                                    if (button.id === message.id + "banpuni") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un bannira un membre ?** (`ban`, `kick`, `derank`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank" || lowercase == "derank") {
                                            db.set(`massbansanction_${message.guild.id}`, lowercase.replace("unrank", "derank"))
                                            message.channel.send(`Désormais quand quelqu'un **bannira un membre** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
                                            updateembed3(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `ban`, `kick` ou `derank` ! Recommence !")
                                        }

                                    }

                                    if (button.id === message.id + "banwl") {

                                        button.reply.defer(true)
                                        let q = await message.channel.send("Est ce que **je dois punir les personnes whitlist qui bannirons des membres ?** (\`oui\` ou \`non\`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "oui") {
                                            db.set(`massbanwl_${message.guild.id}`, true)

                                            message.channel.send(`Les whitelists ne peuvent pas bypass le module  `)
                                            updateembed3(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`massbanwl_${message.guild.id}`, null)

                                            message.channel.send(`Les whitelists peuvent maintenant bypass le module `)
                                            updateembed3(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")
                                        }

                                    }

                                })
                            })

                        }
                        if (button.id === message.id + "antilink") {

                            button.reply.defer(true)
                            const embedantiraid = new Discord.MessageEmbed()
                                .setColor(color)
                                .setDescription(`
1️ ・ Modifier l'activité 
2️ ・ Modifier la whitelist bypass
3️ ・ Modifier le type

                    `)
                                .setColor(color)
                                .setTitle(`Message contenant un lien`)
                            const button1 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "linkactif")
                                .setEmoji("1️⃣")
                            const button2 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "linkwl")
                                .setEmoji("2️⃣")
                            const button3 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "linktype")
                                .setEmoji("3️⃣")

                            const button4 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "linkanu")
                                .setEmoji("❌")
                            const inter = new MessageActionRow()
                                .addComponent(button1)
                                .addComponent(button2)
                                .addComponent(button3)
                                .addComponent(button4)

                            return message.channel.send(embedantiraid, inter).then(async m => {
                                setTimeout(() => {
                                    m.delete()
                                    return message.channel.send(`Trop long`)
                                }, 60000 * 5)
                                client.on("clickButton", async button => {

                                    if (button.id === message.id + "bananu") {

                                        button.reply.defer(true)

                                        m.delete()
                                    }
                                    if (button.id === message.id + "linkactif") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Est ce que **je dois punir les personnes qui envoie des liens ?** (\`oui\` ou \`non\`)")

                                        const responseWbCr = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbCr = responseWbCr.first()
                                        const lowercase = CollectedWbCr.content.toLowerCase()
                                        if (lowercase == "oui") {
                                            db.set(`link_${message.guild.id}`, true);
                                            updateembed3(msg)
                                            message.channel.send("Le module a été activé")
                                            q.delete();
                                            CollectedWbCr.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`link_${message.guild.id}`, null);
                                            updateembed3(msg)
                                            message.channel.send("Le module a été desactivé")
                                            q.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")

                                        }
                                    }

                                    if (button.id === message.id + "linktype") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Quel est **le type de lien que je dois prendre en compte ?** (`invite`, `all`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase == "Invite") {
                                            db.set(`linktype_${message.guild.id}`, "Invite");
                                            updateembed3(msg)
                                            q.delete();
                                            CollectedWbCr.delete()

                                        } else if (lowercase == "All") {
                                            db.set(`linktype_${message.guild.id}`, "All");
                                            updateembed3(msg)
                                            q.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `invite` ou `all` ! Recommence !")

                                        }
                                    }

                                    if (button.id === message.id + "linkwl") {

                                        button.reply.defer(true)
                                        let q = await message.channel.send("Est ce que **je dois punir les personnes whitlist qui enverrons des liens ?** (\`oui\` ou \`non\`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "oui") {
                                            db.set(`linkwl_${message.guild.id}`, true)

                                            message.channel.send(`Les whitelists ne peuvent pas bypass le module  `)
                                            updateembed3(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`linkwl_${message.guild.id}`, null)

                                            message.channel.send(`Les whitelists peuvent maintenant bypass le module `)
                                            updateembed3(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")
                                        }

                                    }

                                })
                            })

                        }
                        if (button.id === message.id + "antimassjoin") {

                            button.reply.defer(true)
                            const embedantiraid = new Discord.MessageEmbed()
                                .setColor(color)
                                .setDescription(`
1️ ・ Modifier l'activité 
2️ ・ Modifier la limite

                    `)
                                .setColor(color)
                                .setTitle(`Multiplication de join`)
                            const button1 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "tokenactif")
                                .setEmoji("1️⃣")
                            const button2 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "tokenlimit")
                                .setEmoji("2️⃣")

                            const button4 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "tokenanu")
                                .setEmoji("❌")
                            const inter = new MessageActionRow()
                                .addComponent(button1)
                                .addComponent(button2)

                                .addComponent(button4)

                            return message.channel.send(embedantiraid, inter).then(async m => {
                                setTimeout(() => {
                                    m.delete()
                                    return message.channel.send(`Trop long`)
                                }, 60000 * 5)
                                client.on("clickButton", async button => {
                                    if (button.id === message.id + "tokenlimit") {

                                        button.reply.defer(true)
                                        let q = await message.channel.send("Au bout de combien **de join je commence à expulser ?** (*ex: 2*)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (isNaN(lowercase)) {
                                            q.delete()
                                            message.channel.send("Ceci n'est pas un nombre")

                                        } else {
                                            let q2 = await message.channel.send(`Au bout de combien **de temps je commence à expulser ?** (*ex: 10s*)`)
                                            const responseWbSanc2 = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                            const CollectedWbSanc2 = responseWbSanc2.first()
                                            const lowercase2 = CollectedWbSanc2.content.toLowerCase()
                                            if (!ms(lowercase2.replace("j", "d"))) {
                                                return message.channel.send(`Temps incorrect.`)

                                            } else {
                                                q.delete()
                                                q2.delete()
                                                db.set(`antitokenlimmit1_${message.guild.id}`, lowercase)
                                                db.set(`antitokenlimmit2_${message.guild.id}`, lowercase2)
                                                message.channel.send(`Si **${lowercase}** utilisateur rejoignent en moins de **${lowercase2}\`** ils ce feront expulser !`)
                                                updateembed3(msg)
                                            }
                                        }



                                    }
                                    if (button.id === message.id + "tokenanu") {

                                        button.reply.defer(true)

                                        m.delete()
                                    }
                                    if (button.id === message.id + "tokenactif") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Est ce que **je dois expulser les personnes qui rejoidrons en même temps ?** (\`oui\` ou \`non\`)")

                                        const responseWbCr = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbCr = responseWbCr.first()
                                        const lowercase = CollectedWbCr.content.toLowerCase()
                                        if (lowercase == "oui") {
                                            db.set(`antitoken_${message.guild.id}`, true);
                                            updateembed3(msg)
                                            message.channel.send("Le module a été activé")
                                            q.delete();
                                            CollectedWbCr.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`antitoken_${message.guild.id}`, null);
                                            updateembed3(msg)
                                            message.channel.send("Le module a été desactivé")
                                            q.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")

                                        }
                                    }



                                })
                            })

                        }
                        if (button.id === message.id + "antitoken") {

                            button.reply.defer(true)
                            const embedantiraid = new Discord.MessageEmbed()
                                .setColor(color)
                                .setDescription(`
1️ ・ Modifier l'activité 
2️ ・ Modifier la limite

                    `)
                                .setColor(color)
                                .setTitle(`Anti token`)
                            const button1 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "actiftoken")
                                .setEmoji("1️⃣")
                            const button2 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "limittoken")
                                .setEmoji("2️⃣")

                            const button4 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "anutoken")
                                .setEmoji("❌")
                            const inter = new MessageActionRow()
                                .addComponent(button1)
                                .addComponent(button2)

                                .addComponent(button4)

                            return message.channel.send(embedantiraid, inter).then(async m => {
                                setTimeout(() => {
                                    m.delete()
                                    return message.channel.send(`Trop long`)
                                }, 60000 * 5)
                                client.on("clickButton", async button => {
                                    if (button.id === message.id + "limittoken") {

                                        button.reply.defer(true)
                                        let q = await message.channel.send("Quel est **la nouvelle limite de création de compte ?** (*ex: 1j*)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (!ms(lowercase.replace("j", "d"))) {
                                            q.delete()
                                            message.channel.send("Temps incorect")


                                        } else {
                                            q.delete()
                                            db.set(`crealimittemps_${message.guild.id}`, lowercase.replace("j", "d"))
                                            message.channel.send(`Les membres ne pourront pas rejoindre si leur compte a été créé il y a moins de **${lowercase}** !`)
                                            updateembed3(msg)
                                        }




                                    }
                                    if (button.id === message.id + "anutoken") {

                                        button.reply.defer(true)

                                        m.delete()
                                    }
                                    if (button.id === message.id + "actiftoken") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Est ce que **je dois bannir les token ?** (\`oui\` ou \`non\`)")

                                        const responseWbCr = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbCr = responseWbCr.first()
                                        const lowercase = CollectedWbCr.content.toLowerCase()
                                        if (lowercase == "oui") {
                                            db.set(`crealimit_${message.guild.id}`, true);
                                            updateembed3(msg)
                                            message.channel.send("Le module a été activé")
                                            q.delete();
                                            CollectedWbCr.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`crealimit_${message.guild.id}`, null);
                                            updateembed3(msg)
                                            message.channel.send("Le module a été desactivé")
                                            q.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")

                                        }
                                    }



                                })
                            })

                        }
                        if (button.id === message.id + "antideco") {

                            button.reply.defer(true)
                            const embedantiraid = new Discord.MessageEmbed()
                                .setColor(color)
                                .setDescription(`
1️ ・ Modifier l'activité 
2️ ・ Modifier la sanctions
3️ ・ Modifier la whitlist bypass
4️ ・ Modifier la limite

                    `)
                                .setColor(color)
                                .setTitle(`Deconection de membres`)
                            const button1 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "decoactif")
                                .setEmoji("1️⃣")
                            const button2 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "decopuni")
                                .setEmoji("2️⃣")
                            const button3 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "decowl")
                                .setEmoji("3️⃣")
                            const button5 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "decolimit")
                                .setEmoji("4️⃣")
                            const button4 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "decoanu")
                                .setEmoji("❌")
                            const inter = new MessageActionRow()
                                .addComponent(button1)
                                .addComponent(button2)
                                .addComponent(button3)
                                .addComponent(button5)
                                .addComponent(button4)

                            return message.channel.send(embedantiraid, inter).then(async m => {
                                setTimeout(() => {
                                    m.delete()
                                    return message.channel.send(`Trop long`)
                                }, 60000 * 5)
                                client.on("clickButton", async button => {
                                    if (button.id === message.id + "decolimit") {

                                        button.reply.defer(true)
                                        let q = await message.channel.send("Combien de fois **on dois deconnecter des membres pour que je punissent ?** (*ex: 2*)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (isNaN(lowercase)) {
                                            q.delete()
                                            message.channel.send("Ceci n'est pas un nombre")

                                        } else {
                                            let q2 = await message.channel.send(`En combien **de temps on dois faire ${lowercase} deconnecter pour être punie ?** (*ex: 10s*)`)
                                            const responseWbSanc2 = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                            const CollectedWbSanc2 = responseWbSanc2.first()
                                            const lowercase2 = CollectedWbSanc2.content.toLowerCase()
                                            if (!ms(lowercase2.replace("j", "d"))) {
                                                return message.channel.send(`Temps incorrect.`)

                                            } else {
                                                q.delete()
                                                q2.delete()
                                                db.set(`antideconum_${message.guild.id}`, lowercase)
                                                db.set(`antidecotime_${message.guild.id}`, lowercase2)
                                                message.channel.send(`Un utilisateur qui fera **${lowercase}** alertes de **Deconection** en moins de **${lowercase2}\`** se fera punir !`)
                                                updateembed3(msg)
                                            }
                                        }



                                    }
                                    if (button.id === message.id + "decoanu") {

                                        button.reply.defer(true)

                                        m.delete()
                                    }
                                    if (button.id === message.id + "decoactif") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Est ce que **je dois punir les personnes qui deconecterons des membres ?** (\`oui\` ou \`non\`)")

                                        const responseWbCr = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbCr = responseWbCr.first()
                                        const lowercase = CollectedWbCr.content.toLowerCase()
                                        if (lowercase == "oui") {
                                            db.set(`antideco_${message.guild.id}`, true);
                                            updateembed3(msg)
                                            message.channel.send("Le module a été activé")
                                            q.delete();
                                            CollectedWbCr.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`antideco_${message.guild.id}`, null);
                                            updateembed3(msg)
                                            message.channel.send("Le module a été desactivé")
                                            q.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")

                                        }
                                    }

                                    if (button.id === message.id + "decopuni") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un deconectera un membre ?** (`ban`, `kick`, `derank`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank" || lowercase == "derank") {
                                            db.set(`antidecosanction_${message.guild.id}`, lowercase.replace("unrank", "derank"))
                                            message.channel.send(`Désormais quand quelqu'un **deconectera un membre** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
                                            updateembed3(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `ban`, `kick` ou `derank` ! Recommence !")
                                        }

                                    }

                                    if (button.id === message.id + "decowl") {

                                        button.reply.defer(true)
                                        let q = await message.channel.send("Est ce que **je dois punir les personnes whitlist qui deconecterons des membres ?** (\`oui\` ou \`non\`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "oui") {
                                            db.set(`antidecowl_${message.guild.id}`, true)

                                            message.channel.send(`Les whitelists ne peuvent pas bypass le module  `)
                                            updateembed3(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`antidecowl_${message.guild.id}`, null)

                                            message.channel.send(`Les whitelists peuvent maintenant bypass le module `)
                                            updateembed3(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")
                                        }

                                    }

                                })
                            })

                        }
                        if (button.id === message.id + "channeldel") {

                            button.reply.defer(true)
                            const embedantiraid = new Discord.MessageEmbed()
                                .setColor(color)
                                .setDescription(`
1️ ・ Modifier l'activité 
2️ ・ Modifier la sanctions
3️ ・ Modifier la whitlist bypass
                    `)
                                .setColor(color)
                                .setTitle(`Suppression de salon`)
                            const button1 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "channeldelactif")
                                .setEmoji("1️⃣")
                            const button2 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "channeldelpuni")
                                .setEmoji("2️⃣")
                            const button3 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "channeldelwl")
                                .setEmoji("3️⃣")
                            const button4 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "channeldelanu")
                                .setEmoji("❌")
                            const inter = new MessageActionRow()
                                .addComponent(button1)
                                .addComponent(button2)
                                .addComponent(button3)
                                .addComponent(button4)

                            return message.channel.send(embedantiraid, inter).then(async m => {
                                setTimeout(() => {
                                    m.delete()
                                    return message.channel.send(`Trop long`)
                                }, 60000 * 5)
                                client.on("clickButton", async button => {
                                    if (button.id === message.id + "channeldelanu") {

                                        button.reply.defer(true)

                                        m.delete()
                                    }
                                    if (button.id === message.id + "channeldelactif") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Est ce que **je dois punir les personnes qui supprimerons des salon ?** (\`oui\` ou \`non\`)")

                                        const responseWbCr = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbCr = responseWbCr.first()
                                        const lowercase = CollectedWbCr.content.toLowerCase()
                                        if (lowercase == "oui") {
                                            db.set(`channelsdel_${message.guild.id}`, true);
                                            updateembed2(msg)
                                            message.channel.send("Le module a été activé")
                                            q.delete();
                                            CollectedWbCr.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`channelsdel_${message.guild.id}`, null);
                                            updateembed2(msg)
                                            message.channel.send("Le module a été desactivé")
                                            q.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")

                                        }
                                    }

                                    if (button.id === message.id + "channeldelpuni") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un supprimera un salon ?** (`ban`, `kick`, `derank`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank" || lowercase == "derank") {
                                            db.set(`channelsdelsanction_${message.guild.id}`, lowercase.replace("unrank", "derank"))
                                            message.channel.send(`Désormais quand quelqu'un **supprimera un salon** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
                                            updateembed2(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `ban`, `kick` ou `derank` ! Recommence !")
                                        }

                                    }

                                    if (button.id === message.id + "channeldelwl") {

                                        button.reply.defer(true)
                                        let q = await message.channel.send("Est ce que **je dois punir les personnes whitlist qui supprimerons des salon ?** (\`oui\` ou \`non\`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "oui") {
                                            db.set(`channelsdelwl_${message.guild.id}`, true)

                                            message.channel.send(`Les whitelists ne peuvent pas bypass le module  `)
                                            updateembed2(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`channelsdelwl_${message.guild.id}`, null)

                                            message.channel.send(`Les whitelists peuvent maintenant bypass le module `)
                                            updateembed2(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")
                                        }

                                    }

                                })
                            })

                        }
                        if (button.id === message.id + "antibot") {

                            button.reply.defer(true)
                            const embedantiraid = new Discord.MessageEmbed()
                                .setColor(color)
                                .setDescription(`
1️ ・ Modifier l'activité 
2️ ・ Modifier la sanctions
3️ ・ Modifier la whitlist bypass
                    `)
                                .setColor(color)
                                .setTitle(`Ajout de bot`)
                            const button1 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "antibotactif")
                                .setEmoji("1️⃣")
                            const button2 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "antibotpuni")
                                .setEmoji("2️⃣")
                            const button3 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "antibotwl")
                                .setEmoji("3️⃣")
                            const button4 = new MessageButton()
                                .setStyle("gray")
                                .setID(message.id + "antibotanu")
                                .setEmoji("❌")
                            const inter = new MessageActionRow()
                                .addComponent(button1)
                                .addComponent(button2)
                                .addComponent(button3)
                                .addComponent(button4)

                            return message.channel.send(embedantiraid, inter).then(async m => {
                                setTimeout(() => {
                                    m.delete()
                                    return message.channel.send(`Trop long`)
                                }, 60000 * 5)
                                client.on("clickButton", async button => {
                                    if (button.id === message.id + "antibotanu") {

                                        button.reply.defer(true)

                                        m.delete()
                                    }
                                    if (button.id === message.id + "antibotactif") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Est ce que **je dois punir les personnes qui ajouterons des bots ?** (\`oui\` ou \`non\`)")

                                        const responseWbCr = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbCr = responseWbCr.first()
                                        const lowercase = CollectedWbCr.content.toLowerCase()
                                        if (lowercase == "oui") {
                                            db.set(`bot_${message.guild.id}`, true);
                                            updateembed2(msg)
                                            message.channel.send("Le module a été activé")
                                            q.delete();
                                            CollectedWbCr.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`bot_${message.guild.id}`, null);
                                            updateembed2(msg)
                                            message.channel.send("Le module a été desactivé")
                                            q.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")

                                        }
                                    }

                                    if (button.id === message.id + "antibotpuni") {

                                        button.reply.defer(true)

                                        let q = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un ajoutera un bot ?** (`ban`, `kick`, `derank`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank" || lowercase == "derank") {
                                            db.set(`botanction_${message.guild.id}`, lowercase.replace("unrank", "derank"))
                                            message.channel.send(`Désormais quand quelqu'un **ajoutera un bot** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
                                            updateembed2(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `ban`, `kick` ou `derank` ! Recommence !")
                                        }

                                    }

                                    if (button.id === message.id + "antibotwl") {

                                        button.reply.defer(true)
                                        let q = await message.channel.send("Est ce que **je dois punir les personnes whitlist qui ajouterons des bots ?** (\`oui\` ou \`non\`)")
                                        const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "oui") {
                                            db.set(`botwl_${message.guild.id}`, true)

                                            message.channel.send(`Les whitelists ne peuvent pas bypass le module  `)
                                            updateembed2(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else if (lowercase == "non") {
                                            db.set(`botwl_${message.guild.id}`, null)

                                            message.channel.send(`Les whitelists peuvent maintenant bypass le module `)
                                            updateembed2(msg)
                                            q.delete();
                                            CollectedWbSanc.delete()

                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` ! Recommence !")
                                        }

                                    }

                                })
                            })

                        }
                        if (button.id === message.id + "return2") {
                            button.reply.defer(true)
                            p0 = p0 + 5;
                            p1 = p1 + 5;

                            page++;

                            if (p1 > 18 + 5) {
                                return
                            }
                            if (p0 === undefined || p1 === undefined) {
                                return
                            }
                            updateembed2(msg)
                        }
                        if (button.id === message.id + "return1") {
                            button.reply.defer(true)
                            p0 = p0 - 5;
                            p1 = p1 - 5;
                            page = page - 1

                            if (p0 < 0) {
                                return
                            }
                            if (p0 === undefined || p1 === undefined) {
                                return
                            }
                            updateembed1(msg)



                        }
                        if (button.id === message.id + "return25") {
                            button.reply.defer(true)
                            p0 = p0 + 5;
                            p1 = p1 + 5;

                            page++;

                            if (p1 > 18 + 5) {
                                return
                            }
                            if (p0 === undefined || p1 === undefined) {
                                return
                            }
                            updateembed3(msg)
                        }
                        if (button.id === message.id + "return15") {
                            button.reply.defer(true)
                            p0 = p0 - 5;
                            p1 = p1 - 5;
                            page = page - 1

                            if (p0 < 0) {
                                return
                            }
                            if (p0 === undefined || p1 === undefined) {
                                return
                            }
                            updateembed2(msg)



                        }
                    })

                })

            }


        }
        function updateembed3(msg) {
            const webhookCreate = db.get(`webhook_${message.guild.id}`);
            const webhookCreate2 = db.get(`webhooksanction_${message.guild.id}`) === null ? "kick" : db.get(`webhooksanction_${message.guild.id}`)
            const webhookCreate3 = db.get(`webhookwl_${message.guild.id}`)

            const roleCreate = db.get(`rolescreate_${message.guild.id}`);
            const roleCreate2 = db.get(`rolescreatesanction_${message.guild.id}`) === null ? "derank" : db.get(`rolescreatesanction_${message.guild.id}`)
            const roleCreate3 = db.get(`rolescreatewl_${message.guild.id}`)

            const roleDel = db.get(`rolesdel_${message.guild.id}`);
            const roleDel2 = db.get(`rolesdelsanction_${message.guild.id}`) === null ? "derank" : db.get(`rolesdelsanction_${message.guild.id}`)
            const roleDel3 = db.get(`rolesdelwl_${message.guild.id}`)

            const roleMod = db.get(`rolesmod_${message.guild.id}`);
            const roleMod2 = db.get(`rolesmodsanction_${message.guild.id}`) === null ? "derank" : db.get(`rolesmodsanction_${message.guild.id}`)
            const roleMod3 = db.get(`rolesmodwl_${message.guild.id}`)

            const roleAdd = db.get(`rolesadd_${message.guild.id}`);
            const roleAdd2 = db.get(`rolesaddsanction_${message.guild.id}`) === null ? "derank" : db.get(`rolesaddsanction_${message.guild.id}`)
            const roleAdd3 = db.get(`rolesaddwl_${message.guild.id}`)

            const channelCreate = db.get(`channelscreate_${message.guild.id}`);
            const channelCreate2 = db.get(`channelscreatesanction_${message.guild.id}`) === null ? "derank" : db.get(`channelscreatesanction_${message.guild.id}`)
            const channelCreate3 = db.get(`channelscreatewl_${message.guild.id}`)

            const channelDel = db.get(`channelsdel_${message.guild.id}`);
            const channelDel2 = db.get(`channelsdelsanction_${message.guild.id}`) === null ? "derank" : db.get(`channelsdelsanction_${message.guild.id}`)
            const channelDel3 = db.get(`channelsdelwl_${message.guild.id}`)

            const channelMod = db.get(`channelsmod_${message.guild.id}`);
            const channelMod2 = db.get(`channelsmodsanction_${message.guild.id}`) === null ? "derank" : db.get(`channelsmodsanction_${message.guild.id}`)
            const channelMod3 = db.get(`channelsmodwl_${message.guild.id}`)

            const update = db.get(`update_${message.guild.id}`)
            const update2 = db.get(`updateanction_${message.guild.id}`) === null ? "derank" : db.get(`updateanction_${message.guild.id}`)
            const update3 = db.get(`updatewl_${message.guild.id}`)

            const ban = db.get(`massban_${message.guild.id}`);
            const ban2 = db.get(`massbansanction_${message.guild.id}`) === null ? "derank" : db.get(`massbansanction_${message.guild.id}`)
            const ban3 = db.get(`massbanwl_${message.guild.id}`)
            const ban4 = db.get(`massbannum_${message.guild.id}`) || "2"
            const ban5 = db.get(`massbantime_${message.guild.id}`) || "10s"

            const deco = db.get(`antideco_${message.guild.id}`);
            const deco2 = db.get(`antidecosanction_${message.guild.id}`) === null ? "derank" : db.get(`antidecosanction_${message.guild.id}`)
            const deco3 = db.get(`antidecowl_${message.guild.id}`)
            const deco4 = db.get(`antideconum_${message.guild.id}`) || "3"
            const deco5 = db.get(`antidecotime_${message.guild.id}`) || "10s"

            const link = db.get(`link_${message.guild.id}`);
            const link3 = db.get(`linkwl_${message.guild.id}`)
            const link4 = db.get(`linktype_${message.guild.id}`) || "Invite"


            const bot = db.get(`bot_${message.guild.id}`);
            const bot2 = db.get(`botanction_${message.guild.id}`) === null ? "derank" : db.get(`botanction_${message.guild.id}`)
            const bot3 = db.get(`botwl_${message.guild.id}`)

            const antimassjoin = db.get(`antitoken_${message.guild.id}`)
            const antimassjoin2 = db.get(`antitokenlimmit1_${message.guild.id}`) || 10
            const antimassjoin3 = db.get(`antitokenlimmit2_${message.guild.id}`) || "10s"

            const antitoken = db.get(`crealimit_${message.guild.id}`)
            const antitoken2 = db.get(`crealimittemps_${message.guild.id}`) || "0s"

            const btT1 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "return15")
                .setLabel("◀")
            const btT2 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "antiban")
                .setEmoji("1️⃣")
            const btT3 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "antimassjoin")
                .setEmoji("2️⃣")
            const btT4 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "antitoken")
                .setEmoji("3️⃣")
            const btT5 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "antideco")
                .setEmoji("4️⃣")
            const btT6 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "antilink")
                .setEmoji("5️⃣")
            let embed2 = new Discord.MessageEmbed()
            embed2.setTitle(`Configuration des modules d'antiraid`)
                .setColor(`${client.config.color}`)
                .setDescription(`
        **1️ ・ Bannissement de membre** (*Comprends aussi les explusions de membre*)
        **Actif:** ${onoff(ban)}
        **Sanction:** \`${ban2}\`
        **Whitelist bypass:** ${wlbypass(ban3)}
        **Limit**: \`${ban4}/${ban5}\`
        
        **2️ ・ Multiplication de join**
        **Actif:** ${onoff(antimassjoin)}
        **Limit**: \`${antimassjoin2}/${antimassjoin3}\`
        
        **3️ ・ Création de compte limite**
        **Actif:** ${onoff(antitoken)}
        **Limit**: \`${antitoken2 !== null ? ms(antitoken2) : "0s"}\`
        
        **4️ ・ Deconection de membre**
        **Actif:** ${onoff(deco)}
        **Sanction:** \`${deco2}\`
        **Whitelist bypass:** ${wlbypass(deco3)}
        **Limit**: \`${deco4}/${deco5}\`
        
        **5 ・ Message contenant un lien**
        **Actif:** ${onoff(link)}
        **Whitelist bypass:** ${wlbypass(link3)}
        **Type**: \`${link4}\`
        `)
                .setFooter(`3/3 • ${client.config.name}`)
            const on5 = new MessageButton()
                .setStyle("blurple")
                .setID(message.id + "3on")
                .setLabel("Activer tout les modules")
            const on6 = new MessageButton()
                .setStyle("red")
                .setID(message.id + "3off")
                .setLabel("Désactiver tout les modules")
            const on7 = new MessageButton()
                .setStyle("green")
                .setID(message.id + "3max")
                .setLabel("Activer tout les modules en max")
            msg.edit(`${db.get(`${message.guild.id}.raidlog`) === null || db.get(`${message.guild.id}.raidlog`) === undefined ? "" : `Salon de raidlog: <#${db.get(`${message.guild.id}.raidlog`)}>`}`, {
                embed: embed2,
                components: [


                    {
                        type: 1,
                        components: [btT2, btT3, btT4, btT5, btT6],
                    },
                    {
                        type: 1,
                        components: [on5, on6, on7],
                    },

                    {
                        type: 1,
                        components: [btT1],
                    },

                ]

            })
        }
        function updateembed2(msg) {
            const webhookCreate = db.get(`webhook_${message.guild.id}`);
            const webhookCreate2 = db.get(`webhooksanction_${message.guild.id}`) === null ? "kick" : db.get(`webhooksanction_${message.guild.id}`)
            const webhookCreate3 = db.get(`webhookwl_${message.guild.id}`)

            const roleCreate = db.get(`rolescreate_${message.guild.id}`);
            const roleCreate2 = db.get(`rolescreatesanction_${message.guild.id}`) === null ? "derank" : db.get(`rolescreatesanction_${message.guild.id}`)
            const roleCreate3 = db.get(`rolescreatewl_${message.guild.id}`)

            const roleDel = db.get(`rolesdel_${message.guild.id}`);
            const roleDel2 = db.get(`rolesdelsanction_${message.guild.id}`) === null ? "derank" : db.get(`rolesdelsanction_${message.guild.id}`)
            const roleDel3 = db.get(`rolesdelwl_${message.guild.id}`)

            const roleMod = db.get(`rolesmod_${message.guild.id}`);
            const roleMod2 = db.get(`rolesmodsanction_${message.guild.id}`) === null ? "derank" : db.get(`rolesmodsanction_${message.guild.id}`)
            const roleMod3 = db.get(`rolesmodwl_${message.guild.id}`)

            const roleAdd = db.get(`rolesadd_${message.guild.id}`);
            const roleAdd2 = db.get(`rolesaddsanction_${message.guild.id}`) === null ? "derank" : db.get(`rolesaddsanction_${message.guild.id}`)
            const roleAdd3 = db.get(`rolesaddwl_${message.guild.id}`)

            const channelCreate = db.get(`channelscreate_${message.guild.id}`);
            const channelCreate2 = db.get(`channelscreatesanction_${message.guild.id}`) === null ? "derank" : db.get(`channelscreatesanction_${message.guild.id}`)
            const channelCreate3 = db.get(`channelscreatewl_${message.guild.id}`)

            const channelDel = db.get(`channelsdel_${message.guild.id}`);
            const channelDel2 = db.get(`channelsdelsanction_${message.guild.id}`) === null ? "derank" : db.get(`channelsdelsanction_${message.guild.id}`)
            const channelDel3 = db.get(`channelsdelwl_${message.guild.id}`)

            const channelMod = db.get(`channelsmod_${message.guild.id}`);
            const channelMod2 = db.get(`channelsmodsanction_${message.guild.id}`) === null ? "derank" : db.get(`channelsmodsanction_${message.guild.id}`)
            const channelMod3 = db.get(`channelsmodwl_${message.guild.id}`)

            const update = db.get(`update_${message.guild.id}`)
            const update2 = db.get(`updateanction_${message.guild.id}`) === null ? "derank" : db.get(`updateanction_${message.guild.id}`)
            const update3 = db.get(`updatewl_${message.guild.id}`)

            const ban = db.get(`massban_${message.guild.id}`);
            const ban2 = db.get(`massbansanction_${message.guild.id}`) === null ? "derank" : db.get(`massbansanction_${message.guild.id}`)
            const ban3 = db.get(`massbanwl_${message.guild.id}`)

            const bot = db.get(`bot_${message.guild.id}`);
            const bot2 = db.get(`botanction_${message.guild.id}`) === null ? "derank" : db.get(`botanction_${message.guild.id}`)
            const bot3 = db.get(`botwl_${message.guild.id}`)

            const antimassjoin = db.get(`antitoken_${message.guild.id}`)
            const antimassjoin2 = db.get(`antitokenlimmit1_${message.guild.id}`) || 5
            const antimassjoin3 = db.get(`antitokenlimmit2_${message.guild.id}`) || "5s"

            const antitoken = db.get(`crealimit_${message.guild.id}`)
            const antitoken2 = db.get(`crealimittemps_${message.guild.id}`) || "0s"

            const btT1 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "return1")
                .setLabel("◀")
            const btT2 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "update")
                .setEmoji("1️⃣")
            const btT3 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "channelcreate")
                .setEmoji("2️⃣")
            const btT4 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "channelmodif")
                .setEmoji("3️⃣")
            const btT5 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "channeldel")
                .setEmoji("4️⃣")
            const btT6 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "antibot")
                .setEmoji("5️⃣")
            const btT7 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "return25")
                .setLabel("▶")
            let embed2 = new Discord.MessageEmbed()
            embed2.setTitle(`Configuration des modules d'antiraid`)
                .setColor(`${client.config.color}`)
                .setDescription(`
        **1️ ・ Modification du serveur**
        **Actif:** ${onoff(update)}
        **Sanction:** \`${update2}\`
        **Whitelist bypass:** ${wlbypass(update3)}
        
        **2️ ・ Création de salon**
        **Actif:** ${onoff(channelCreate)}
        **Sanction:** \`${channelCreate2}\`
        **Whitelist bypass:** ${wlbypass(channelCreate3)}
        
        **3️ ・ Modification de salon**
        **Actif:** ${onoff(channelMod)}
        **Sanction:** \`${channelMod2}\`
        **Whitelist bypass:** ${wlbypass(channelMod3)}
        
        **4️ ・ Suppression de salon**
        **Actif:** ${onoff(channelDel)}
        **Sanction:** \`${channelDel2}\`
        **Whitelist bypass:** ${wlbypass(channelDel3)}
        
        **5️ ・ Ajout de bot**
        **Actif:** ${onoff(bot)}
        **Sanction:** \`${bot2}\`
        **Whitelist bypass:** ${wlbypass(bot3)}
        `)
                .setFooter(`2/3 • ${client.config.name}`)
            const on5 = new MessageButton()
                .setStyle("blurple")
                .setID(message.id + "2on")
                .setLabel("Activer tout les modules")
            const on6 = new MessageButton()
                .setStyle("red")
                .setID(message.id + "2off")
                .setLabel("Désactiver tout les modules")
            const on7 = new MessageButton()
                .setStyle("green")
                .setID(message.id + "2max")
                .setLabel("Activer tout les modules en max")
            msg.edit(`${db.get(`${message.guild.id}.raidlog`) === null || db.get(`${message.guild.id}.raidlog`) === undefined ? "" : `Salon de raidlog: <#${db.get(`${message.guild.id}.raidlog`)}>`}`, {
                embed: embed2,
                components: [


                    {
                        type: 1,
                        components: [btT2, btT3, btT4, btT5, btT6],
                    },
                    {
                        type: 1,
                        components: [on5, on6, on7],
                    },
                    {
                        type: 1,
                        components: [btT1, btT7],
                    },


                ]

            })
        }

        function updateembed1(msg) {
            const webhookCreate = db.get(`webhook_${message.guild.id}`);
            const webhookCreate2 = db.get(`webhooksanction_${message.guild.id}`) === null ? "kick" : db.get(`webhooksanction_${message.guild.id}`)
            const webhookCreate3 = db.get(`webhookwl_${message.guild.id}`)

            const roleCreate = db.get(`rolescreate_${message.guild.id}`);
            const roleCreate2 = db.get(`rolescreatesanction_${message.guild.id}`) === null ? "derank" : db.get(`rolescreatesanction_${message.guild.id}`)
            const roleCreate3 = db.get(`rolescreatewl_${message.guild.id}`)

            const roleDel = db.get(`rolesdel_${message.guild.id}`);
            const roleDel2 = db.get(`rolesdelsanction_${message.guild.id}`) === null ? "derank" : db.get(`rolesdelsanction_${message.guild.id}`)
            const roleDel3 = db.get(`rolesdelwl_${message.guild.id}`)

            const roleMod = db.get(`rolesmod_${message.guild.id}`);
            const roleMod2 = db.get(`rolesmodsanction_${message.guild.id}`) === null ? "derank" : db.get(`rolesmodsanction_${message.guild.id}`)
            const roleMod3 = db.get(`rolesmodwl_${message.guild.id}`)

            const roleAdd = db.get(`rolesadd_${message.guild.id}`);
            const roleAdd2 = db.get(`rolesaddsanction_${message.guild.id}`) === null ? "derank" : db.get(`rolesaddsanction_${message.guild.id}`)
            const roleAdd3 = db.get(`rolesaddwl_${message.guild.id}`)

            const channelCreate = db.get(`channelscreate_${message.guild.id}`);
            const channelCreate2 = db.get(`channelscreatesanction_${message.guild.id}`) === null ? "derank" : db.get(`channelscreatesanction_${message.guild.id}`)
            const channelCreate3 = db.get(`channelscreatewl_${message.guild.id}`)

            const channelDel = db.get(`channelsdel_${message.guild.id}`);
            const channelDel2 = db.get(`channelsdelsanction_${message.guild.id}`) === null ? "derank" : db.get(`channelsdelsanction_${message.guild.id}`)
            const channelDel3 = db.get(`channelsdelwl_${message.guild.id}`)

            const channelMod = db.get(`channelsmod_${message.guild.id}`);
            const channelMod2 = db.get(`channelsmodsanction_${message.guild.id}`) === null ? "derank" : db.get(`channelsmodsanction_${message.guild.id}`)
            const channelMod3 = db.get(`channelsmodwl_${message.guild.id}`)

            const update = db.get(`update_${message.guild.id}`)
            const update2 = db.get(`updateanction_${message.guild.id}`) === null ? "derank" : db.get(`updateanction_${message.guild.id}`)
            const update3 = db.get(`updatewl_${message.guild.id}`)

            const ban = db.get(`massban_${message.guild.id}`);
            const ban2 = db.get(`massbansanction_${message.guild.id}`) === null ? "derank" : db.get(`massbansanction_${message.guild.id}`)
            const ban3 = db.get(`massbanwl_${message.guild.id}`)

            const bot = db.get(`bot_${message.guild.id}`);
            const bot2 = db.get(`botanction_${message.guild.id}`) === null ? "derank" : db.get(`botanction_${message.guild.id}`)
            const bot3 = db.get(`botwl_${message.guild.id}`)

            const antimassjoin = db.get(`antitoken_${message.guild.id}`)
            const antimassjoin2 = db.get(`antitokenlimmit1_${message.guild.id}`) || 5
            const antimassjoin3 = db.get(`antitokenlimmit2_${message.guild.id}`) || "5s"

            const antitoken = db.get(`crealimit_${message.guild.id}`)
            const antitoken2 = db.get(`crealimittemps_${message.guild.id}`) || "0s"

            let embed = new Discord.MessageEmbed();
            embed.setTitle(`Configuration des modules d'antiraid`)
                .setColor(`${client.config.color}`)
                .setDescription(`
        **1️ ・ Création de webhook**
        **Actif:** ${onoff(webhookCreate)}
        **Sanction:** \`${webhookCreate2}\`
        **Whitelist bypass:** ${wlbypass(webhookCreate3)}
        
        **2️ ・ Création de rôle**
        **Actif:** ${onoff(roleCreate)}
        **Sanction:** \`${roleCreate2}\`
        **Whitelist bypass:** ${wlbypass(roleCreate3)}
        
        **3️ ・ Modification de rôle**
        **Actif:** ${onoff(roleMod)}
        **Sanction:** \`${roleMod2}\`
        **Whitelist bypass:** ${wlbypass(roleMod3)}
        
        **4️ ・ Suppression de rôle**
        **Actif:** ${onoff(roleDel)}
        **Sanction:** \`${roleDel2}\`
        **Whitelist bypass:** ${wlbypass(roleDel3)}
        
        **5️ ・ Ajout de rôle avec des permissions dangereuses**
        **Actif:** ${onoff(roleAdd)}
        **Sanction:** \`${roleAdd2}\`
        **Whitelist bypass:** ${wlbypass(roleAdd3)}
        
            `)
                .setFooter(`1/3 • ${client.config.name}`)

            const bt2 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "webhook")
                .setEmoji("1️⃣")
            const bt3 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "rolecreate")
                .setEmoji("2️⃣")
            const bt4 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "rolemodif")
                .setEmoji("3️⃣")
            const bt5 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "roledel")
                .setEmoji("4️⃣")
            const bt6 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "addrole")
                .setEmoji("5️⃣")
            const bt7 = new MessageButton()
                .setStyle("gray")
                .setID(message.id + "return2")
                .setLabel("▶")


            const on5 = new MessageButton()
                .setStyle("blurple")
                .setID(message.id + "on")
                .setLabel("Activer tout les modules")
            const on6 = new MessageButton()
                .setStyle("red")
                .setID(message.id + "off")
                .setLabel("Désactiver tout les modules")
            const on7 = new MessageButton()
                .setStyle("green")
                .setID(message.id + "max")
                .setLabel("Activer tout les modules en max")
            msg.edit(`${db.get(`${message.guild.id}.raidlog`) === null || db.get(`${message.guild.id}.raidlog`) === undefined ? "" : `Salon de raidlog: <#${db.get(`${message.guild.id}.raidlog`)}>`}`, {
                embed: embed,
                components: [


                    {
                        type: 1,
                        components: [bt2, bt3, bt4, bt5, bt6],
                    },

                    {
                        type: 1,
                        components: [on5, on6, on7],
                    },
                    {
                        type: 1,
                        components: [bt7],
                    },
                ]

            })
        }
    }


}
