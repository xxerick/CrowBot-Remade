const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');


module.exports = {
    name: 'perm',
    aliases: [],
    run: async (client, message, args, prefix, color) => {

        if (args[0] === "set") {
            if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true) {
                if (args[1].toLowerCase() === "mods") {
                    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                    if (db.get(`modsp_${message.guild.id}_${role.id}`)) return message.channel.send(`Ce rôle a déjà la permissions mods !`)
                    db.set(`modsp_${message.guild.id}_${role.id}`, true)
                    message.react("✅")
                } else if (args[1].toLowerCase() === "admin") {
                    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                    if (db.get(`admin_${message.guild.id}_${role.id}`)) return message.channel.send(`Ce rôle a déjà la permissions admin !`)
                    db.set(`admin_${message.guild.id}_${role.id}`, true)
                    message.react("✅")
                } else if (args[1].toLowerCase() === "owner") {
                    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                    if (db.get(`ownerp_${message.guild.id}_${role.id}`)) return message.channel.send(`Ce rôle a déjà la permissions owner !`)
                    db.set(`ownerp_${message.guild.id}_${role.id}`, true)
                    message.react("✅")
                }
                else if (args[1].toLowerCase() === "giveaway") {
                    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                    if (db.get(`gvwp_${message.guild.id}_${role.id}`)) return message.channel.send(`Ce rôle a déjà la permissions giveaway !`)
                    db.set(`gvwp_${message.guild.id}_${role.id}`, true)
                    message.react("✅")
                }
            }
        } else if (args[0] === "del") {
            if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true) {

                if (args[1].toLowerCase() === "mods") {
                    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                    if (!db.get(`modsp_${message.guild.id}_${role.id}`)) return message.channel.send(`Ce rôle n'a pas la permissions mods !`)
                    db.delete(`modsp_${message.guild.id}_${role.id}`)
                    message.react("✅")
                } else if (args[1].toLowerCase() === "admin") {
                    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                    if (!db.get(`admin_${message.guild.id}_${role.id}`)) return message.channel.send(`Ce rôle n'a pas la permissions admin !`)
                    db.delete(`admin_${message.guild.id}_${role.id}`)
                    message.react("✅")
                } else if (args[1].toLowerCase() === "owner") {
                    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                    if (!db.get(`ownerp_${message.guild.id}_${role.id}`)) return message.channel.send(`Ce rôle n'a pas la permissions owner !`)
                    db.delete(`ownerp_${message.guild.id}_${role.id}`)
                    message.react("✅")
                }
                else if (args[1].toLowerCase() === "giveaway") {
                    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[2]}\``)
                    if (!db.get(`gvwp_${message.guild.id}_${role.id}`)) return message.channel.send(`Ce rôle n'a pas la permissions giveaway !`)
                    db.delete(`gvwp_${message.guild.id}_${role.id}`)
                    message.react("✅")
                }
            }
        } else if (args[0] === "clear") {
            let modsc = await db.all().filter(data => data.ID.startsWith(`modsp_${message.guild.id}`));
            let modssc = 0;
            for (let i = 0; i < modsc.length; i++) {
                db.delete(modsc[i].ID);
                modssc++;
            }
            let adminc = await db.all().filter(data => data.ID.startsWith(`admin_${message.guild.id}`));
            let adminsc = 0;
            for (let i = 0; i < adminc.length; i++) {
                db.delete(adminc[i].ID);
                adminsc++;
            }
            let ownerc = await db.all().filter(data => data.ID.startsWith(`ownerp_${message.guild.id}`));
            let ownersc = 0;
            for (let i = 0; i < ownerc.length; i++) {
                db.delete(ownerc[i].ID);
                ownersc++;
            }
            let gvwc = await db.all().filter(data => data.ID.startsWith(`gvwp_${message.guild.id}`));
            let gvwsc = 0;
            for (let i = 0; i < gvwc.length; i++) {
                db.delete(gvwc[i].ID);
                gvwsc++;
            }
            message.react("✅")
        } else if (!args[0]) {
            let perm = ""
            message.member.roles.cache.forEach(role => {
                if (db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
                if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
            })
            if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {

                let modst = db.all().filter(data => data.ID.startsWith(`modsp_${message.guild.id}`)).sort((a, b) => b.data - a.data)
                modst.length = 10;
                var mods = "";
                for (var i in modst) {

                    if(message.guild.roles.cache.get(modst[i].ID.split('_')[2])) mods += `${message.guild.roles.cache.get(modst[i].ID.split('_')[2]) ? "<@&" + message.guild.roles.cache.get(modst[i].ID.split('_')[2]).id + ">\n" : ":x:"}`;
                }

                let admint = db.all().filter(data => data.ID.startsWith(`admin_${message.guild.id}`)).sort((a, b) => b.data - a.data)
                admint.length = 10;
                var admin = "";
                for (var i in admint) {

                    if(message.guild.roles.cache.get(admint[i].ID.split('_')[2]))  admin += `${message.guild.roles.cache.get(admint[i].ID.split('_')[2]) ? "<@&" + message.guild.roles.cache.get(admint[i].ID.split('_')[2]).id + ">\n" : ":x:"}`;
                }

                let ownert = db.all().filter(data => data.ID.startsWith(`ownerp_${message.guild.id}`)).sort((a, b) => b.data - a.data)
                ownert.length = 10;
                var owner = "";
                for (var i in ownert) {
                  
                    if(message.guild.roles.cache.get(ownert[i].ID.split('_')[2])) owner += `${message.guild.roles.cache.get(ownert[i].ID.split('_')[2]) ? "<@&" + message.guild.roles.cache.get(ownert[i].ID.split('_')[2]).id + ">\n" : ":x:"}`;
                }

                let gvwt = db.all().filter(data => data.ID.startsWith(`gvwp_${message.guild.id}`)).sort((a, b) => b.data - a.data)
                gvwt.length = 10;
                var gvw = "";
                for (var i in gvwt) {
                  
                    if(message.guild.roles.cache.get(gvwt[i].ID.split('_')[2])) gvw += `${message.guild.roles.cache.get(gvwt[i].ID.split('_')[2]) ? "<@&" + message.guild.roles.cache.get(gvwt[i].ID.split('_')[2]).id + ">\n" : ":x:"}`;
                }
                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .addField("Permissions Giveaway", gvw === "" ? ":x:" : gvw)
                    .addField("Permissions Mods", mods === "" ? ":x:" : mods)
                    .addField("Permissions Admins", admin === "" ? ":x:" : admin)
                    .addField("Permissions Owner", owner === "" ? ":x:" : owner)

                message.channel.send(embed)
            }
        }

    }
}