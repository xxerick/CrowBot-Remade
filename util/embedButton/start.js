const { MessageActionRow, MessageButton } = require('discord-buttons');
const db = require("quick.db");
const buttonInteraction = async function (button, interaction) {
    if (interaction.interactor !== button.clicker.user || button.message.id !== interaction.message.id) return ;
    if (button.id == 'next-page') {
        (interaction.currentPage + 1 == interaction.embeds.length ? interaction.currentPage = 0 : interaction.currentPage += 1);
        interaction.message.edit({ embed: interaction.embeds[interaction.currentPage], components: [interaction.components] });
        button.reply.defer(true);
    } else if (button.id == 'back-page') {
        (interaction.currentPage - 1 < 0 ? interaction.currentPage = interaction.embeds.length - 1 : interaction.currentPage -= 1);
        interaction.message.edit({ embed: interaction.embeds[interaction.currentPage], components: [interaction.components] });
        button.reply.defer(true);
    } 
    }
     


const ButtonPages = async function (interaction, message, embeds, duration, buttonStyle, rightEmoji, leftEmoji) {

    if (!['red', 'green', 'blurple', "gray"].includes(buttonStyle)) throw new TypeError(`Button style incorect`);
    if (!rightEmoji) throw new TypeError(`Emoji pour le 1er boutous n'est pas fournis`);
    if (!leftEmoji) throw new TypeError(`Emoji pour le 2eme boutous n'est pas fournis`);

    const button1 = new MessageButton()
        .setLabel(rightEmoji)
        .setStyle(buttonStyle)
        .setID('next-page');

    const button2 = new MessageButton()
        .setLabel(leftEmoji)
        .setStyle(buttonStyle)
        .setID('back-page');

    const interactiveButtons = new MessageActionRow()
        .addComponent(button2)
        .addComponent(button1);

    await message.channel.send({ components: [interactiveButtons], embed: embeds[0] }).then((m) => {
        interaction.message = m;
        interaction.embeds = embeds;
        interaction.currentPage = 0;
        interaction.interactor = message.author;
        interaction.components = interactiveButtons;
        setTimeout(() => {
            m.edit("", { components: [], embed: embeds[interaction.currentPage] })
        }, 60000 * 5)

    })


}



module.exports = {
    ButtonPages,
    buttonInteraction
}





