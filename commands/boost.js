exports.run = (client, message, args) => {
  const fs = require('fs');

if (message.guild.ownerId != message.author.id) message.reply('Kamu bukan Raja!') return;
  if (args[0]) {
    multiplier = parseInt(args[0])
    if (Number.isInteger(multiplier)) {
      if (multiplier > 0 && multiplier <= 100) {
        fs.writeFileSync(`./data/${message.guild.id}/multiplier.json`, `{"multiplier":${multiplier}}`, function (err) {
          console.log(err);
        })
        message.reply(`Boost EXP x${multiplier} ${message.guild.ownerId} ${message.author.id} berhasil diaktifkan!`);
      } else {
        message.reply('Harap masukkan angka antara 1 - 100');
      }
    } else {
      message.reply('Harap masukkan angka antara 1 - 100');
    }
  } else {
    message.reply('Boost kelipatan berapa?');
  }
}