const db = require("quick.db")
const {buttonInteraction} = require('../../util/embedButton/start.js');

module.exports =async  (client, button) => {
  buttonInteraction(button, client.interaction);

    if (button.message.partial) await button.message.fetch();
    if (button.partial) await button.fetch();
    if (button.clicker.user.bot) return;
  button.clicker.fetch()
  let member = button.clicker.member;
  let rol = button.guild.roles.cache.get(db.get(`buttonmenuconfig_${button.guild.id}`))
  if(rol) { 
  
  if(button.id === "menu-"+rol.id) {
    button.reply.defer(true)
    if (button.clicker.member.roles.cache.has(rol.id)) {
  
      button.clicker.member.roles.remove(rol).catch()
    } else if(!button.clicker.member.roles.cache.has(rol.id)) {
      button.clicker.member.roles.add(rol).catch()
  
    
    }
  
}

}

}