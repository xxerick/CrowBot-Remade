const Discord = require('discord.js')
const db = require('quick.db')
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
const request = require("request")
const ms = require("ms")
module.exports = {
    name: 'mybot',
    aliases: [],
    run: async (client, message, args, prefix, color) => {
      
        request(`http://localhost:3030/api/client/${message.author.id}`, {
            method: "GET",
            headers: {
                authorization: "842340361212264468"
            }
        },  (err, res, body) => {
            const json = JSON.parse(body)
            if(!body || !json || json.message === "The user does not have a bot" || json.status !== 200) {
             return   message.channel.send(`Vous avez aucun bot`)
             
        } else   if(json.status === 200) {
            let expireAt
          let  timeLeft
                const embed = new Discord.MessageEmbed()
                .setDescription(`${json.db
                    .map(m => {
                   
`[${m.ID.split("_")[3]}](https://discord.com/api/oauth2/authorize?client_id=${m.ID.split("_")[2]}&permissions=8&scope=bot%20applications.commands) : <t:${Date.parse(new Date(Date.now()+m.ID.split("_")[4]))}:R>`
}).join("\n")
                               }`)
                .setColor("2f3136")
                return   message.channel.send(embed)
            }  
        })
    }
}
function duration(mss) {
    const sec = Math.floor((mss / 1000) % 60).toString()
    const min = Math.floor((mss / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((mss / (1000 * 60 * 60)) % 60).toString()
    const days = Math.floor(mss / (1000 * 60 * 60 * 24)).toString()

    return `${days.padStart(2, '') == "0" ? "" : `${days.padStart(2, '')}j `}${hrs.padStart(2, '') == "0" ? "" : `${hrs.padStart(2, '')}h `}${min.padStart(2, '') == "0" ? "" : `${min.padStart(2, '')}m `}${sec.padStart(2, '')}s`
}