const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');

module.exports = {
    name: 'banner',
    aliases: [],
    run: async (client, message, args, prefix, color) => {
        let perm = ""
        message.member.roles.cache.forEach(role => {
       if(db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
        if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm || db.get(`channelpublic_${message.guild.id}_${message.channel.id}`) === true ) {  
            const use = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
            const member = client.users.cache.get(use.id)
            const bannerUrl = await getUserBannerUrl(member.id,client, { size: 4096 });
      if(bannerUrl) {
      const Embed = new Discord.MessageEmbed()
          Embed.setTitle(`${member.username}`);
          Embed.setImage(`${bannerUrl}`);
        
          Embed.setColor(color)
      message.channel.send(Embed) 
      } else {
          const Embed = new Discord.MessageEmbed()
          Embed.setTitle(`${member.username}`);
          Embed.setDescription(`N'a pas de bannière`);
        
          Embed.setColor(color)
      message.channel.send(Embed) 
      }
      
    }}
}

async function getUserBannerUrl(userId, client, { dynamicFormat = true, defaultFormat = "webp", size = 512 } = {}) {

    if (![16, 32, 64, 128, 256, 512, 1024, 2048, 4096].includes(size)) {
        throw new Error(`The size '${size}' is not supported!`);
    }
  
    
    if (!["webp", "png", "jpg", "jpeg"].includes(defaultFormat)) {
        throw new Error(`The format '${defaultFormat}' is not supported as a default format!`);
    }
  
  
    const user = await client.api.users(userId).get();
    if (!user.banner) return null;
  
    const query = `?size=${size}`;
    const baseUrl = `https://cdn.discordapp.com/banners/${userId}/${user.banner}`;
  
  
    if (dynamicFormat) {
        const { headers } = await axios.head(baseUrl);
        if (headers && headers.hasOwnProperty("content-type")) {
            return baseUrl + (headers["content-type"] == "image/gif" ? ".gif" : `.${defaultFormat}`) + query;
        }
    }
  
    return baseUrl + `.${defaultFormat}` + query;
  
  }