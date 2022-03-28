const db = require("quick.db");
const tempomap = new Map();
const tempo = function (client , message) {


  new Promise(resolve => {
    setInterval(() => {
      resolve(2);
        try{
          client.guilds.cache.forEach(guild => {
            
         
          const channels = guild.channels.cache.map(ch => ch.id)
          for (let i = 0; i < channels.length; i++) {
            const key = `tempvoicechannel_${guild.id}_${channels[i]}`;
            if (tempomap.get(key)) {
              var vc = guild.channels.cache.get(tempomap.get(key));
              if (vc.members.size < 1) {
                tempomap.delete(key);
                return vc.delete();
              } else {}
            }
          } });
      }catch{}
    }, 10000)
  })



    client.on("voiceStateUpdate", (oldState, newState) => {
      let salon  = db.get(`jc_${oldState.guild.id}`)
      if(salon == null ) return;
     

  let oldparentname = "unknown"
  let oldchannelname = "unknown"
  let oldchanelid = "unknown"
  if (oldState && oldState.channel && oldState.channel.parent && oldState.channel.parent.name) oldparentname = oldState.channel.parent.name
  if (oldState && oldState.channel && oldState.channel.name) oldchannelname = oldState.channel.name
  if (oldState && oldState.channelID) oldchanelid = oldState.channelID
  let newparentname = "unknown"
  let newchannelname = "unknown"
  let newchanelid = "unknown"
  if (newState && newState.channel && newState.channel.parent && newState.channel.parent.name) newparentname = newState.channel.parent.name
  if (newState && newState.channel && newState.channel.name) newchannelname = newState.channel.name
  if (newState && newState.channelID) newchanelid = newState.channelID
  if (oldState.channelID) {
      if (typeof oldState.channel.parent !== "undefined")  oldChannelName = `${oldparentname}\n\t**${oldchannelname}**\n*${oldchanelid}*`
       else  oldChannelName = `-\n\t**${oldparentname}**\n*${oldchanelid}*`
  }
  if (newState.channelID) {
      if (typeof newState.channel.parent !== "undefined") newChannelName = `${newparentname}\n\t**${newchannelname}**\n*${newchanelid}*`
      else newChannelName = `-\n\t**${newchannelname}**\n*${newchanelid}*`
  }
  if (!oldState.channelID && newState.channelID) {
    if(newState.channelID !== salon) return;  
    tempochannel(newState);  
  }
  if (oldState.channelID && !newState.channelID) {
          if (tempomap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`)) {
            var vc = oldState.guild.channels.cache.get(tempomap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`));
            if (vc.members.size < 1) { 
              tempomap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`); 
              return vc.delete(); 
          }
            else {
            }
          }
  }
  if (oldState.channelID && newState.channelID) {

    if (oldState.channelID !== newState.channelID) {
      if(newState.channelID===salon) 
      tempochannel(oldState);  
      if (tempomap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`)) {
        var vc = oldState.guild.channels.cache.get(tempomap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`));
        if (vc.members.size < 1) { 
          tempomap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`); 
          return vc.delete(); 
      }
      else {
      }}
      }
    }

  })
    async function tempochannel(user) {
      let emoji = db.get(`emote_${user.guild.id}`)
      if(emoji == null ) emoji = "Salon de "
   
      let categoy  = db.get(`catggg_${user.guild.id}`)
      if(categoy == null ) return;
    
 
      //user.member.user.send("")
      await user.guild.channels.create(`${emoji}${user.member.user.username}`, {
        type: 'voice',
        parent: categoy, 
      }).then(async vc => {
        user.setChannel(vc);
       
        tempomap.set(`tempvoicechannel_${vc.guild.id}_${vc.id}`, vc.id);
        await vc.overwritePermissions([
          {
            id: user.id,
            allow: ['MANAGE_CHANNELS'],
          },
          {
            id: user.guild.id,
            allow: ['VIEW_CHANNEL'],
          },
        ]);
      })
    }
}



module.exports = tempo


