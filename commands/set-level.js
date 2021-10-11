exports.run = (client, message, args) => {
  const fs = require('fs');
  var dir = `../data/${message.guild.id}`;
  const user_list = require(`${dir}/user_level.json`);
if (message.guild.ownerId != message.author.id) {
  message.reply('Kamu bukan Raja!'); 
  return
  }
  if (args[0]) {
    if(args[1]){
       level = parseInt(args[1])
    if (Number.isInteger(level)) {
      if (level > 0 && level <= 100) {
      if(args[0].match(/<@!([1-9])\d+>/g)){
        const userId = args[0].match(/([1-9])\d+/g);
         let found = false;
          user_list.forEach((data, index) => {
            if (data.user_id == userId) found = index;
          });
        if(found){
          user_list[found].level = level;
          fs.writeFileSync(`./data/${message.guild.id}/user_level.json`, JSON.stringify(user_list), function (err) {
            console.log(err);
          })
          message.reply(`Level <@${userId}> telah menjadi level ${level}`);
        } else{
          message.reply('User tidak ditemukan');
        }
      } else{
        message.reply('User tidak ditemukan');
      }
      } else{
        message.reply('Masukkan angka antara 1-100');
      }
    }else{
        message.reply('Masukkan angka antara 1-100');
    }
    } else{
     message.reply('Set level berapa?');
    }
  } else {
    message.reply('Set level siapa?');
  }
}