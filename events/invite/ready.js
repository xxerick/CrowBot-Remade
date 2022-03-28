module.exports = (client) => {
    client.guilds.cache.forEach(async guild => {
        let invites = await guild.fetchInvites();
        if(guild.vanityURLCode) invites.set(guild.vanityURLCode, await guild.fetchVanityData());
        client.guildInvites.set(guild.id, invites);
    });
}
