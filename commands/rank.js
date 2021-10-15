exports.run = (client, message, args) => {
  const fs = require('fs')
  const {MessageEmbed} = require('discord.js');
   delete require.cache[require.resolve(`../data/${message.guild.id}/user_level.json`)];
  let list = require(`../data/${message.guild.id}/user_level.json`)
  const level = JSON.parse(fs.readFileSync(`./data/level.json`));
  let exp = 0;
  list.forEach((data, id) => {
    exp = 0
    exp = (level[data.level] ? level[data.level] : level[data.level-2]) + data.exp;
    list[id].totalExp = exp;
  });
  list = list.sort((a,b) => parseInt(b.totalExp) - parseInt(a.totalExp));
  let msgName ='';
  let msgLevel ='';
  let msgExp = '';

  list.forEach((data, id) => {

    msgName += `${(id == 0 ? "👑" : id+1+'.')} <@${data.user_id}>           \n`;
    msgLevel += `${data.level}\n`;
    msgExp += `${data.exp}/${level[data.level] ? level[data.level] : '∞'}\n`
  })
  const embedMsg = new MessageEmbed().setTitle(`Rank ${message.guild.name}`)
  .setColor(0xffd700)
  // .setDescription('Tes description')
  .addField("User", msgName, inline=true)
  .addField("Level", msgLevel, inline=true)
  .addField("Exp", msgExp, inline=true)
  .setFooter("Happy Leveling 😊"+"\u2800".repeat(50))
  ;

  message.reply({embeds: [embedMsg]})
}