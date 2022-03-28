const Discord = require("discord.js");
const disbut = require("discord-buttons")
const db = require("quick.db")

module.exports = (client) => {
    setInterval(async () => {
        client.guilds.cache.forEach(guild => {
            let memberformat = db.fetch(`memberformat_${guild.id}`)
            let onlineformat = db.fetch(`onlineformat_${guild.id}`)
            let vocalformat = db.fetch(`vocalformat_${guild.id}`)
            let boostformat = db.fetch(`boostformat_${guild.id}`)
            if (memberformat == null) memberformat = `💎・Membres: ${guild.memberCount}`
            if (onlineformat == null) onlineformat = `🌟・En ligne: ${guild.members.cache.filter(m => m.user.presence.status !== 'offline').size}`
            if (vocalformat == null) vocalformat = `🎧・En vocal: ${guild.members.cache.filter(m => m.voice.channel).size}`
            if (boostformat == null) boostformat = `🔮・Boost: ${guild.premiumSubscriptionCount}`

            let memberchannel = guild.channels.cache.get(db.fetch(`member_${guild.id}`))
            if (!memberchannel) { return; } else { memberchannel.setName(memberformat.replace("<count>", guild.memberCount)) }
            let onlinechannel = guild.channels.cache.get(db.fetch(`online_${guild.id}`))
            if (!onlinechannel) { return; } else { onlinechannel.setName(onlineformat.replace("<count>", guild.members.cache.filter(m => m.user.presence.status !== 'offline').size)) }
            let vocalchannel = guild.channels.cache.get(db.fetch(`vocal_${guild.id}`))
            if (!vocalchannel) { return; } else { vocalchannel.setName(vocalformat.replace("<count>", guild.members.cache.filter(m => m.voice.channel).size)) }
            let boostchannel = guild.channels.cache.get(db.fetch(`boost_${guild.id}`))
            if (!boostchannel) { return; } else { boostchannel.setName(boostformat.replace("<count>", guild.premiumSubscriptionCount)) }
        });

    }, 5000)

    client.guilds.cache.forEach(async guild => {
   let colorcolor = db.get(`randomcolor_${guild.id}`)
    if(colorcolor === null) colorcolor = "#2f3136"
    let interval = db.get(`randominterval_${guild.id}`)
    if(interval === null) interval = 60000*2
        // Random Gif
        if(db.get(`randomgif_${guild.id}`)) { 
        setInterval(() => {
            let channel = guild.channels.cache.get(db.get(`randomgif_${guild.id}`))
            if(channel) {  
        let user = client.users.cache.random()
        if(user.bot) return;
        if(user.displayAvatarURL({ dynamic : true  }).includes(".gif")){
            
        
                    let button = new disbut.MessageButton()
                    .setStyle('url')
                    .setURL(user.displayAvatarURL({ dynamic : true  })) 
                    .setLabel("Clique pour télécharger"); 
        let embed = new Discord.MessageEmbed()
        .setImage(user.displayAvatarURL({ dynamic : true  }))
        .setColor(colorcolor)
        .setFooter(`Gif de profil de ${user.tag}`)
        channel.send(embed, button).then(slm => {console.log(`Gif envoyer dans ${guild.channels.cache.get(db.get(`randomgif_${guild.id}`)).name}`)}).catch(err => {})
        
        
        }
        } 
        
        
        
        }, interval)
        // Random Pic
        }  if(db.get(`randompp_${guild.id}`)) {
        
        setInterval(() => {
        
            let channel = guild.channels.cache.get(db.get(`randompp_${guild.id}`))
            if(channel) {  
        let user = client.users.cache.random()
        if(user.bot) return;
        let button = new disbut.MessageButton()
        .setStyle('url')
        .setURL(user.displayAvatarURL()) 
        .setLabel("Clique pour télécharger"); 
        let embed = new Discord.MessageEmbed()
        .setImage(user.displayAvatarURL())
        .setColor(colorcolor)
        .setFooter(`Photo de profil de ${user.tag}`)
        
        channel.send(embed, button).then(slm => {console.log(`Pic envoyer dans ${guild.channels.cache.get(db.get(`randompp_${guild.id}`)).name}`)}).catch(err => {})
        }
        
        
        }, interval)
        // Random Banner
        
        }  if(db.get(`randombanner_${guild.id}`)) {
        
        setInterval( async () => {
        
            let channel = guild.channels.cache.get(db.get(`randombanner_${guild.id}`))
            if(channel) {  
        let user = client.users.cache.random()
        if(user.bot) return;
        let button = new disbut.MessageButton()
        .setStyle('url')
        .setURL(await getUserBannerUrl(user.id,client, { size: 512 })) 
        .setLabel("Clique pour télécharger"); 
        let embed = new Discord.MessageEmbed()
        .setImage(await getUserBannerUrl(user.id,client, { size: 512 }))
        .setColor(colorcolor)
        .setFooter(`Bannière de profil de ${user.tag}`)
        
        channel.send(embed, button).then(slm => {console.log(`Banner envoyer dans ${guild.channels.cache.get(db.get(`randombanner_${guild.id}`)).name}`)}).catch(err => {})
        
        
        }
        
        
        }, interval)
      }})
}
