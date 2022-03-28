const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'public',
    aliases: [],
    run: async (client, message, args, prefix, color) => {

        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true) {
 
    if(args[0] === "add") {
            let ss = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
if(ss) {
    if(db.get(`channelpublic_${message.guild.id}_${ss.id}`) === true) return message.channel.send(`Les commandes publiques dans ${ss} sont déjà activées`)
    db.set(`channelpublic_${message.guild.id}_${ss.id}`, true)
  message.channel.send(`Les commandes publiques dans ${ss} sont maintenant activées`)
} else if(!ss) {
  return  message.react(":x:")
}
        }   else if(args[0] === "remove") {
           
            let ss = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
            if(ss) {
                if(db.get(`channelpublic_${message.guild.id}_${ss.id}`) === null) return message.channel.send(`Les commandes publiques dans ${ss} sont déjà désactivées`)
                db.set(`channelpublic_${message.guild.id}_${ss.id}`, null)
              message.channel.send(`Les commandes publiques dans ${ss} sont maintenant désactivées`)
            } else if(!ss) {
              return  message.react(":x:")
            } 
     

          } else if(args[0] === "list") {

          let money = db.all().filter(data => data.ID.startsWith(`channelpublic_${message.guild.id}`)).sort((a, b) => b.data - a.data)

          let p0 = 0;
          let p1 = 15;
          let page = 1;
      
          const embed = new Discord.MessageEmbed()
              .setTitle(`Liste des salon public`)
              .setDescription(money
              .filter(x => message.guild.channels.cache.get(x.ID.split('_')[2]))
              .map((m, i) => `${i + 1}) <#${message.guild.channels.cache.get(m.ID.split('_')[2]).id}> (${m.ID.split('_')[2]})`)
              .slice(0, 15)
      
              )
              .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
              .setColor(color)
      
      
          message.channel.send(embed).then(async tdata => {
              if (money.length > 15) {
                  const B1 = new MessageButton()
                      .setLabel("◀")
                      .setStyle("gray")
                      .setID('publiclist1');
      
                  const B2 = new MessageButton()
                      .setLabel("▶")
                      .setStyle("gray")
                      .setID('publiclist2');
      
                  const bts = new MessageActionRow()
                      .addComponent(B1)
                      .addComponent(B2)
                  tdata.edit("", { embed: embed, components: [bts] })
                  setTimeout(() => {
                      tdata.edit("", {
                          components: [], embed: new Discord.MessageEmbed()
                          .setTitle(`Liste des salon public`)
                          .setDescription(money
                          .filter(x => message.guild.channels.cache.get(x.ID.split('_')[2]))
                          .map((m, i) => `${i + 1}) <#${message.guild.channels.cache.get(m.ID.split('_')[2]).id}> (${m.ID.split('_')[2]})`)
                          .slice(0, 15)
                  
                          )
                              .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                              .setColor(color)
      
      
                      })
                      // message.channel.send(embeds)
                  }, 60000 * 5)
                  client.on("clickButton", (button) => {
                      if (button.clicker.user.data !== message.author.id) return ;
                      if (button.id === "publiclist1") {
                          button.reply.defer(true)
      
                          p0 = p0 - 15;
                          p1 = p1 - 15;
                          page = page - 1
      
                          if (p0 < 0) {
                              return
                          }
                          if (p0 === undefined || p1 === undefined) {
                              return
                          }
      
      
                          embed   .setDescription(money
                            .filter(x => message.guild.channels.cache.get(x.ID.split('_')[2]))
                            .map((m, i) => `${i + 1}) <#${message.guild.channels.cache.get(m.ID.split('_')[2]).id}> (${m.ID.split('_')[2]})`)
                            .slice(0, 15)
                    
                            )
                                .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                          tdata.edit(embed);
      
                      }
                      if (button.id === "publiclist2") {
                          button.reply.defer(true)
      
                          p0 = p0 + 15;
                          p1 = p1 + 15;
      
                          page++;
      
                          if (p1 > money.length + 15) {
                              return
                          }
                          if (p0 === undefined || p1 === undefined) {
                              return
                          }
      
      
                          embed   .setDescription(money
                            .filter(x => message.guild.channels.cache.get(x.ID.split('_')[2]))
                            .map((m, i) => `${i + 1}) <#${message.guild.channels.cache.get(m.ID.split('_')[2]).id}> (${m.ID.split('_')[2]})`)
                            .slice(0, 15)
                    
                            )
                                .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                          tdata.edit(embed);
      
                      }
                  })
              }
      
          })
                 
        }
    }}}
