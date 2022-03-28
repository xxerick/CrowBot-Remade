const Discord= require('discord.js')
const db = require('quick.db')
const math = require('mathjs') 

const { MessageButton, MessageActionRow } = require('discord-buttons') 
module.exports = {
name: 'calc',
aliases: [],
run: async (client, message, args, prefix, color) => {

    let perm = ""
        message.member.roles.cache.forEach(role => {
       if(db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
        if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm || db.get(`channelpublic_${message.guild.id}_${message.channel.id}`) === true ) {             

          if (!args.length) return message.react("❌")

    let calcular = args.join(' ')

    try {
        const embed = new Discord.MessageEmbed()
            .setTitle(`Résultat`)
            .setDescription(`\`\`\`${math.evaluate(calcular)}\`\`\``)
            .setColor(color);

        message.channel.send(embed)
    } catch (err) {
        const split = err.message.split(' ')
        const length = split.length
        const errMsg = err.message


        message.channel.send(`Format invalide`)    }  
} else {

}
  
}
}