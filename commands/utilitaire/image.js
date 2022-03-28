const img = require('images-scraper')

const google = new img({
    puppeteer : {
        headless : true,
    }
})


const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
function fu (ping) {
if(100 <= ping) return 15
if(200 <= ping) return 25
if(300 <= ping) return 35
if(600 <= ping) return 125

}
module.exports = {
name: 'image',
aliases: [],
run: async (client, message, args, prefix, color) => {

    let perm = ""
        message.member.roles.cache.forEach(role => {
       if(db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
        if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm || db.get(`channelpublic_${message.guild.id}_${message.channel.id}`) === true ) {             

              const query = args.join(" ")
    if(!query) return message.react("❌")
    message.channel.send(`Chargement... (Temps éstimés: ${parseFloat(fu(client.ws.ping) + Math.random() * (1.348 - 0.580) + 0.580).toFixed(0)}s)`).then( async m => {
    const results = await google.scrape(query, 1)


    const embed = new MessageEmbed()
    .setTitle(query)
    .setImage(results[0].url)
    .setColor(color)
    m.edit("",embed);
})

} else {

}

}
}