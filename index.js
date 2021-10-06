const Discord = require('discord.js');
const client = new Discord.Client();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const prefixes = ['~', '!', '!!~', '/'];
const ownerID = 'myID';

client.on('ready', () => {
  console.log('I\'m Ready!')
});

client.on('message', message => {
  if (message.author.bot) return;

  selectedPrefix = '';
  prefixes.forEach((prefix) => {
    if (message.content.startsWith(prefix)) selectedPrefix = prefix;
  });

  let level = require(`./commands/level.js`);
  level.run(client, message);

  if (!selectedPrefix) return;
  let args = message.content.slice(selectedPrefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();

  try {

    delete require.cache[require.resolve(`./commands/${cmd}.js`)];
    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args);

  } catch (e) {
    console.log(e.stack);
  }
});

client.login(process.env.API_TOKEN);