const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = async (client, message) => {
    if (!message.guild) return;
    if (message.author.bot) return;


    db.add(`msg_${message.guild.id}_${message.author.id}`, 1)
    xp(message)

    
async function xp(message) {

    let prefix = db.get(`prefix_${message.guild.id}`) === null? client.config.prefix:db.get(`prefix_${message.guild.id}`)
    if (message.content.startsWith(prefix)) return;
    const randomNumber = Math.floor(Math.random() * 10) + 15
    db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber)
    db.add(`guild_${message.guild.id}_xptotal_${message.guild.id}`, randomNumber)


    var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
    var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
    var xpNeeded = level * 500
    let messagefetch = db.fetch(`msg_${message.guild.id}_${message.author.id}`)
    if (xpNeeded < xp) {

        var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1)

        let money = db.all().filter(data => data.ID.startsWith(`rewardlevel_${message.guild.id}`)).sort((a, b) => b.data - a.data)
        money.filter(x => message.guild.roles.cache.get(x.ID.split('_')[2])).map((m, i) => {
            if(newLevel === m.ID.split('_')[3] && !message.member.roles.cache.has(m.ID.split('_')[2])) {
                message.member.roles.add(m.ID.split('_')[2]).catch()
     }
          })
          db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
          let channel = await client.channels.fetch(db.get(`levelchannel_${message.guild.id}`)).catch(err => {});

          if(db.get(`levelmessageembed_${message.guild.id}`) !== null) {
            let embedj = db.get(`levelmessageembed_${message.guild.id}`)
            
            if(!embedj.description) {} else {embedj.description = embedj.description.replace("{user}", message.author).replace("{user:username}", message.author.username).replace("{user:tag}", message.author.tag).replace("{user:id}", message.author.id).replace("{guild:name}", message.guild.name).replace("{guild:member}", message.guild.memberCount).replace("{level}", newLevel).replace("{xp}", xp).replace("{message}", messagefetch).replace("{user}", message.author).replace("{user:username}", message.author.username).replace("{user:tag}", message.author.tag).replace("{user:id}", message.author.id).replace("{guild:name}", message.guild.name).replace("{guild:member}", message.guild.memberCount).replace("{level}", newLevel).replace("{xp}", xp).replace("{message}", messagefetch).replace("{user}", message.author).replace("{user:username}", message.author.username).replace("{user:tag}", message.author.tag).replace("{user:id}", message.author.id).replace("{guild:name}", message.guild.name).replace("{guild:member}", message.guild.memberCount).replace("{level}", newLevel).replace("{xp}", xp).replace("{message}", messagefetch).replace("{user}", message.author).replace("{user:username}", message.author.username).replace("{user:tag}", message.author.tag).replace("{user:id}", message.author.id).replace("{guild:name}", message.guild.name).replace("{guild:member}", message.guild.memberCount).replace("{level}", newLevel).replace("{xp}", xp).replace("{message}", messagefetch)}
            if(!embedj.title) { } else {embedj.title = embedj.title.replace("{user}", message.author).replace("{user:username}", message.author.username).replace("{user:tag}", message.author.tag).replace("{user:id}", message.author.id).replace("{guild:name}", message.guild.name).replace("{guild:member}", message.guild.memberCount).replace("{level}", newLevel).replace("{xp}", xp).replace("{message}", messagefetch).replace("{user}", message.author).replace("{user:username}", message.author.username).replace("{user:tag}", message.author.tag).replace("{user:id}", message.author.id).replace("{guild:name}", message.guild.name).replace("{guild:member}", message.guild.memberCount).replace("{level}", newLevel).replace("{xp}", xp).replace("{message}", messagefetch).replace("{user}", message.author).replace("{user:username}", message.author.username).replace("{user:tag}", message.author.tag).replace("{user:id}", message.author.id).replace("{guild:name}", message.guild.name).replace("{guild:member}", message.guild.memberCount).replace("{level}", newLevel).replace("{xp}", xp).replace("{message}", messagefetch).replace("{user}", message.author).replace("{user:username}", message.author.username).replace("{user:tag}", message.author.tag).replace("{user:id}", message.author.id).replace("{guild:name}", message.guild.name).replace("{guild:member}", message.guild.memberCount).replace("{level}", newLevel).replace("{xp}", xp).replace("{message}", messagefetch)}
            if(!embedj.footer) {} else {embedj.footer.text = embedj.footer.text.replace("{user}", message.author).replace("{user:username}", message.author.username).replace("{user:tag}", message.author.tag).replace("{user:id}", message.author.id).replace("{guild:name}", message.guild.name).replace("{guild:member}", message.guild.memberCount).replace("{level}", newLevel).replace("{xp}", xp).replace("{message}", messagefetch).replace("{user}", message.author).replace("{user:username}", message.author.username).replace("{user:tag}", message.author.tag).replace("{user:id}", message.author.id).replace("{guild:name}", message.guild.name).replace("{guild:member}", message.guild.memberCount).replace("{level}", newLevel).replace("{xp}", xp).replace("{message}", messagefetch).replace("{user}", message.author).replace("{user:username}", message.author.username).replace("{user:tag}", message.author.tag).replace("{user:id}", message.author.id).replace("{guild:name}", message.guild.name).replace("{guild:member}", message.guild.memberCount).replace("{level}", newLevel).replace("{xp}", xp).replace("{message}", messagefetch).replace("{user}", message.author).replace("{user:username}", message.author.username).replace("{user:tag}", message.author.tag).replace("{user:id}", message.author.id).replace("{guild:name}", message.guild.name).replace("{guild:member}", message.guild.memberCount).replace("{level}", newLevel).replace("{xp}", xp).replace("{message}", messagefetch)}
            
            if(channel) channel.send({embed: embedj})
            } else {
              let joinmessage = db.get(`levelmsg_${message.guild.id}`);
              if (joinmessage === null) joinmessage = client.config.defaultLevelmessage;
              let toSend = joinmessage.replace("{user}", message.author).replace("{user:username}", message.author.username).replace("{user:tag}", message.author.tag).replace("{user:id}", message.author.id).replace("{guild:name}", message.guild.name).replace("{guild:member}", message.guild.memberCount).replace("{level}", newLevel).replace("{xp}", xp).replace("{message}", messagefetch).replace("{user}", message.author).replace("{user:username}", message.author.username).replace("{user:tag}", message.author.tag).replace("{user:id}", message.author.id).replace("{guild:name}", message.guild.name).replace("{guild:member}", message.guild.memberCount).replace("{level}", newLevel).replace("{xp}", xp).replace("{message}", messagefetch).replace("{user}", message.author).replace("{user:username}", message.author.username).replace("{user:tag}", message.author.tag).replace("{user:id}", message.author.id).replace("{guild:name}", message.guild.name).replace("{guild:member}", message.guild.memberCount).replace("{level}", newLevel).replace("{xp}", xp).replace("{message}", messagefetch).replace("{user}", message.author).replace("{user:username}", message.author.username).replace("{user:tag}", message.author.tag).replace("{user:id}", message.author.id).replace("{guild:name}", message.guild.name).replace("{guild:member}", message.guild.memberCount).replace("{level}", newLevel).replace("{xp}", xp).replace("{message}", messagefetch)
            
              if(channel) channel.send(toSend)
            
            }
      
    


    }
}
} 
    
