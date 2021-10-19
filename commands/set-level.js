exports.run = (client, message, args) => {
const Database = require("@replit/database")
const db = new Database()

  async function set_level(){
    const fs = require('fs');
    var dir = `../data/${message.guild.id}`;
    const user_list = require(`${dir}/user_level.json`);
    if (message.guild.ownerId != message.author.id) {
      message.reply('Kamu bukan Raja!');
      return
    }
    if (args[0]) {
      if (args[1]) {
        level = parseInt(args[1])
        if (Number.isInteger(level)) {
          if (level > 0 && level <= 100) {
            if (args[0].match(/<@!([1-9])\d+>/g)) {
              const userId = args[0].match(/([1-9])\d+/g);
              let found = await db.get(`user_level_${message.guild.id}_${userId}`);
              if (found) {
                found = JSON.parse(found);
                await db.set(`user_level_${message.guild.id}_${userId}`, `{"level" : ${level}, "exp" : ${found.exp}}`).then(() => {
                  message.reply(`Level <@${userId}> telah menjadi level ${level}`);
                });
              } else {
                message.reply('User tidak ditemukan');
              }
            } else {
              message.reply('User tidak ditemukan');
            }
          } else {
            message.reply('Masukkan angka antara 1-100');
          }
        } else {
          message.reply('Masukkan angka antara 1-100');
        }
      } else {
        message.reply('Set level berapa?');
      }
    } else {
      message.reply('Set level siapa?');
    }
  }

  set_level()
}