const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
function unban(message, user, authorcooldown) {
    message.guild.members.unban(user.id, {reason: `Debannis par ${message.author.tag}`}).then(r => {
    authorcooldown.limit++
    setTimeout(() => {
        authorcooldown.limit = authorcooldown.limit - 1
        }, 120000);
    })
};
const cooldown = {}
module.exports = {
    name: 'unban',
    aliases: [],
    run: async (client, message, args, prefix, color) => {

            if(args[0] == "all") {
                let perm = ""
            message.member.roles.cache.forEach(role => {
            if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
            })
            if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {    
                try {
              message.guild.fetchBans().then(bans => {
                if (bans.size == 0) {
                    message.channel.send("Aucune personne n'est ban.")
                } else {
                    bans.forEach(ban => {
                        setInterval(()=> {if(ban.user) message.guild.members.unban(ban.user.id,  `Unbanall par ${message.author.tag}`).catch(err => {});}, 250)
                       
                    })
                    let chx = db.get(`logmod_${message.guild.id}`);

                    const logsmod = message.guild.channels.cache.get(chx)

                    message.channel.send(`${bans.size} ${bans.size > 1 ? "utilisateurs ont": "utilisateur a"} été unban`);
                    if(logsmod) logsmod.send(
                        new Discord.MessageEmbed()
                       // .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                .setColor(color)
                //        .setTitle(`<:protection:847072581382438953> Modération • Type: **\`bannissement\`**`)
                  //      .setTimestamp() 
                    //     .setDescription(` **Bannissement de**: ${user}\n**Auteur**: ${message.author} \n**Salon**: ${message.channel}\n**Temps de réponse**: ${client.ws.ping}ms`)
                    .setDescription(`${message.author} a **unban** tout les membres bannis`))
               
                }
                
            }
            )
          } catch (error) {
              return;
          } }
            } else if(args[0]) {
                let perm = ""
                message.member.roles.cache.forEach(role => {
                    if(db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
                    if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
                if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
                })
                if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {  
                    let chx = db.get(`logmod_${message.guild.id}`);
                    const logsmod = message.guild.channels.cache.get(chx)
                    if(!cooldown[message.author.id]) cooldown[message.author.id] = { limit: 0 }
        var authorcooldown = cooldown[message.author.id]
        if(authorcooldown.limit > 5) return message.channel.send(`Vous avez atteint votre limite de **bannisement**, veuillez retenter plus tard!`); 
              
        let user =  client.users.cache.get(args[0]) || await client.users.fetch(args[0]) 
        if(!user) return  message.channel.send(`Aucun membre trouvée pour: \`${args[0]}\``)
    
        const banList = await message.guild.fetchBans();
        const bannedUser = banList.find(slm => slm.id === user.id);
       if(!bannedUser) return message.channel.send(`Aucun membre banni trouvée pour: \`${args[0]}\``)

       message.channel.send(`${user.tag} n'est plus banni`);
       unban(message, user, authorcooldown)
       if(logsmod) logsmod.send(
        new Discord.MessageEmbed()
       // .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
.setColor(color)
//        .setTitle(`<:protection:847072581382438953> Modération • Type: **\`bannissement\`**`)
  //      .setTimestamp() 
    //     .setDescription(` **Bannissement de**: ${user}\n**Auteur**: ${message.author} \n**Salon**: ${message.channel}\n**Temps de réponse**: ${client.ws.ping}ms`)
    .setDescription(`${message.author} a **unban** ${user}`))
            
  
                }}
    
    }
}