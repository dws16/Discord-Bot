const {
  Client,
  Intents
} = require('discord.js');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const config = require("./data/config.json");


client.on('ready', () => {
  console.log('I\'m Ready!')
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  selectedPrefix = '';
  config.prefix.forEach((prefix) => {
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

client.login(config.API_TOKEN);