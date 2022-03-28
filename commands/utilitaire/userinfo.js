const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
const axios = require('axios')

module.exports = {
    name: 'userinfo',
    aliases: ['user', 'ui'],
    run: async (client, message, args, prefix, color) => {

        let perm = ""
        message.member.roles.cache.forEach(role => {
        if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) { 

                let user = message.mentions.members.first()
                if(user) user = user.id
                if(!user) user = args[0]
                if(!user) user = message.author.id 
                if(!message.guild.members.cache.has(user)) return message.channel.send(`Aucun membre trouvé pour \`${args[0]}\``);
           else user = message.guild.members.cache.get(user)

           let nm = ""
           client.guilds.cache.map(r =>{
            const list = client.guilds.cache.get(r.id);
            list.members.cache.map(m => (m.user.id ==user.id? nm++ : nm = nm)) 
            //  list.members.cache.map(m => (m.user.id ==member.id? listes= listes+" | `" +list.name+"`" : listes = listes)) 
            }) 
           //console.log(guilds)
        

            const data = await axios.get(`https://discord.com/api/users/${user.id}`, {
           headers: {
               Authorization: `Bot ${client.config.token}`
           }
           }).then(d => d.data);
           if (data.banner) {
           let url = data.banner.startsWith("a_") ? ".gif?size=2048" : ".png?size=2048";
           url = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${url}`;

            const UserInfo = new Discord.MessageEmbed()

            .setTitle(user.user.tag)
            .setDescription(`<@${user.user.id}>\nPrésent sur ce serveur depuis le <t:${parseInt(user.joinedTimestamp / 1000 )}:d>\nCompte créé le <t:${parseInt(user.user.createdTimestamp / 1000)}:d>\nServeur en commun: ${nm}`)
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
            .setImage(url)
            .setColor(color)
            
            message.channel.send(UserInfo)
           } else {

            const UserInfo = new Discord.MessageEmbed()

            .setTitle(user.user.tag)
            .setDescription(`<@${user.user.id}>\nPrésent sur ce serveur depuis le <t:${parseInt(user.joinedTimestamp / 1000 )}:d>\nCompte créé le <t:${parseInt(user.user.createdTimestamp / 1000)}:d>\nServeur en commun: ${nm}`)
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
            .setColor(color)
            .setImage("https://cdn.discordapp.com/attachments/914596914161397762/922439441589616660/image.png")
            //if (user.user = user.user.bot) UserInfo.setDescription(`<@${user.user.id}>\nPrésent sur ce serveur depuis le <t:${parseInt(user.joinedTimestamp / 1000 )}:d>\nCompte créé le <t:${parseInt(user.user.createdTimestamp / 1000)}:d>\nServeur en commun: ${nm}\n[Lien d'invation](https://discord.com/api/oauth2/authorize?client_id=${user.user.id}&permissions=8&scope=bot)`)
            message.channel.send(UserInfo)

           }
        


    }
    }
}