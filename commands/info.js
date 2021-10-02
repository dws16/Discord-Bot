exports.run = (client, message, args) => {
  if (args[0]) {
    switch (args[0]) {
      case 'me':
        message.channel.send(`Username : ${message.author.username}`);
        break;
      case 'bot':
        message.channel.send('Aku adalah Tutorial Bot :)');
    }
  } else {
    message.reply('Info apa yg kamu cari?');
  }
}