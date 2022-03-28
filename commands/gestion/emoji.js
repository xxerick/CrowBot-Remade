const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
module.exports = {
    name: 'emoji',
    aliases: [],
    run: async (client, message, args, prefix, color) => {


        let perm = ""
        message.member.roles.cache.forEach(role => {
          if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
            if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {

            if(args[0] === "add") {
                const emoji = args[1];
        
                if (!emoji) return message.channel.send('');
        
                let customemoji = Discord.Util.parseEmoji(emoji);
                if (!customemoji.id)return message.channel.send(`Je n'est pas accès à cette emoji`);

                if (customemoji.id) {
                    const Link = `https://cdn.Discordapp.com/emojis/${customemoji.id}.${
              customemoji.animated ? "gif" : "png"
            }`;
                    const name = args.slice(2).join(" ");
                    message.guild.emojis
                        .create(`${Link}`, `${name || `${customemoji.name}`}`)
              .catch((error) => {
                ;
              });
              message.channel.send(`1 emoji créé`).catch((e) => {
                ;
              });
          
          
          
          } else {
            let CheckEmoji = parse(emoji, {
              assetType: "png",
            });
            if (!CheckEmoji[0])
              return message.channel.send(`Ceci n'est pas un emoji`);
         
          }
        
              }
              if(args[0] === "remove") {
               
                let emoji = Discord.Util.parseEmoji(args[1]) || message.guild.emojis.cache.find(r => r.name === args[1]) || message.guild.emojis.cache.get(args[1])
                if (!message.guild.emojis.cache.get(emoji.id))return message.channel.send(`Cette emoji n'est pas sur ce serveur`);
                emoji = message.guild.emojis.cache.get(emoji.id)
                emoji.delete().then(() => {
                  message.channel.send(`1 emoji surppimé`)
               
                })
               
              }
        }

    }
}