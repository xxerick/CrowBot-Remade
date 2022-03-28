const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
function unban(message, user, authorcooldown) {
    message.guild.members.unban(user.id, { reason: `Debannis par ${message.author.tag}` }).then(r => {
        authorcooldown.limit++
        setTimeout(() => {
            authorcooldown.limit = authorcooldown.limit - 1
        }, 120000);
    })
};
module.exports = {
    name: 'derank',
    aliases: [],

    run: async (client, message, args, prefix, color) => {

        let perm = ""
        message.member.roles.cache.forEach(role => {
            if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {

                
            if(args[0]) {
                let user = await client.users.cache.get(args[0]) || message.mentions.members.first()  
                if(!user) return message.channel.send(`Aucun membre trouvée pour: \`${args[0]}\``)
        if(user) {
            if (user.id === message.author.id) {
                return message.channel.send(`Vous n'avez pas la permission de **derank** <@${user.id}>`);
              }
              if(user.roles.highest.position > client.user.id) return message.channel.send(`Je n'ai pas les permissions nécessaires pour **derank** <@${user.id}>`);
              if( db.get(`ownermd_${client.user.id}_${message.author.id}`) === true) return message.channel.send(`Vous n'avez pas la permission de **derank** <@${user.id}>`);
              if(client.config.owner.includes(user.id)) return message.channel.send(`Vous n'avez pas la permission de **derank** <@${user.id}>`);
          
        
        
        
             message.channel.send(`${user} à été **derank**`)
                user.roles.set([], `Derank par ${message.author.tag}`)
                let wass = db.get(`logmod_${message.guild.id}`);
                const logschannel = message.guild.channels.cache.get(wass)
               if(logschannel) logschannel.send(new Discord.MessageEmbed()
        //         .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                .setColor(color)
         //       .setTitle(`<:protection:847072581382438953> Modération • Type: **\`derank\`**`)
           //     .setTimestamp() 
             //   .setDescription(`**Derank de**: ${user}\n**Auteur**: ${message.author}\n**Temps de réponse**: ${client.ws.ping}ms`)
             .setDescription(`${message.author} a **derank** ${user.user}`)  
             )
        }}

        }
    }
}