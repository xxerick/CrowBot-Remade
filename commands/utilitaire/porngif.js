const {MessageEmbed} = require('discord.js')
const db = require('quick.db')
const superagent = require('superagent')
module.exports = {
    name: 'porngif',
    aliases: ["pgif"],
    run: async (client, message, args, prefix, color) => {
       
        let perm = ""
        message.member.roles.cache.forEach(role => {
       if(db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
        if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm || db.get(`channelpublic_${message.guild.id}_${message.channel.id}`) === true ) {         
                if (message.channel.nsfw) {
      
            
            
      if(!args[0]) {
        const embed = new MessageEmbed()
      
        superagent.get('https://nekobot.xyz/api/image')
        .query({ type: 'pgif'})
        .end((err, response) => {
            embed.setImage(response.body.message)
            embed.setTitle("porngif")
            embed.setColor(color);
          message.channel.send({ embed: embed });
        });
      } else if(args[0] === "ass") {
        const embed = new MessageEmbed()
      
        superagent.get('https://nekobot.xyz/api/image')
        .query({ type: 'ass'})
        .end((err, response) => {
            embed.setImage(response.body.message)
            embed.setTitle("ass")
            embed.setColor(color);
          message.channel.send({ embed: embed });
        });
      }  else if(args[0] === "anal") {
        const embed = new MessageEmbed()
      
        superagent.get('https://nekobot.xyz/api/image')
        .query({ type: 'anal'})
        .end((err, response) => {
            embed.setImage(response.body.message)
            embed.setTitle("anal")
            embed.setColor(color);
          message.channel.send({ embed: embed });
        });
    } else if(args[0] === "pussy") {
        const embed = new MessageEmbed()
      
        superagent.get('https://nekobot.xyz/api/image')
        .query({ type: 'pussy'})
        .end((err, response) => {
            embed.setImage(response.body.message)
            embed.setTitle("pussy")
            embed.setColor(color);
          message.channel.send({ embed: embed });
        });
    } else if(args[0] === "boobs") {
        const embed = new MessageEmbed()
      
        superagent.get('https://nekobot.xyz/api/image')
        .query({ type: 'boobs'})
        .end((err, response) => {
            embed.setImage(response.body.message)
            embed.setTitle("boobs")
            embed.setColor(color);
          message.channel.send({ embed: embed });
        });
    } else if(args[0] === "hentai") {
        const embed = new MessageEmbed()
      
        superagent.get('https://nekobot.xyz/api/image')
        .query({ type: 'hentai'})
        .end((err, response) => {
            embed.setImage(response.body.message)
            embed.setTitle("hentai")
            embed.setColor(color);
          message.channel.send({ embed: embed });
        });
    } else if(args[0] === "4k") {
        const embed = new MessageEmbed()
      
        superagent.get('https://nekobot.xyz/api/image')
        .query({ type: '4k'})
        .end((err, response) => {
            embed.setImage(response.body.message)
            embed.setTitle("4k")
            embed.setColor(color);
          message.channel.send({ embed: embed });
        });
    }   }else {}
  } else {}
}
}