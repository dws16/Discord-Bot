exports.run = (client, message, args) => {
  const fs = require('fs')
  const {MessageEmbed} = require('discord.js');
  const Database = require("@replit/database")
  const db = new Database()

  async function rank(){
    let list = Object.entries(await db.getAll()).map((e) => ( { [e[0]]: e[1] } ));

    list = list.map((val) => {
      let split = String(Object.keys(val)).split('_');
      if(split[2]== message.guild.id){
        let data = JSON.parse(Object.values(val));
        return {user_id: split[3], level: data.level, exp: data.exp};
      }
    });
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

      msgName += `${(id == 0 ? "👑" : id+1+'.')} <@${data.user_id}>\n`;
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

  rank();
}