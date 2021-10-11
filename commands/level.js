exports.run = (client, message, args) => {

  function sendMsg(level) {
    message.channel.send(`<@${message.author.id}> telah naik ke level ${level}`);
  }

  const fs = require('fs');
  const user_id = message.author.id;
  var dir = `./data/${message.guild.id}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.readFile(`${dir}/multiplier.json`, function (err, fd) {
    if (err) {
      fs.writeFileSync(`${dir}/multiplier.json`, '{"multiplier":1}', function (err) {
        console.log(err);
      })
    }
  })
  fs.readFile(`${dir}/user_level.json`, function (err, fd) {
    if (err) {
      fs.writeFileSync(`${dir}/user_level.json`, '[]', function (err) {
        console.log(err);
      })
    }
  })


  let user_level = JSON.parse(fs.readFileSync(`${dir}/user_level.json`));
  const level = JSON.parse(fs.readFileSync(`./data/level.json`));
  let user = false;
  user_level.forEach((data, index) => {
    if (data.user_id == user_id) user = index;
  });
  multiplier = JSON.parse(fs.readFileSync(`${dir}/multiplier.json`)).multiplier;
  exp = message.content.length * multiplier;
  if (user !== false) {
    let before = user_level[user].level;
    while (exp > 0) {
      user_level[user].exp = user_level[user].exp + exp;
      exp = user_level[user].exp < level[user_level[user].level] ? 0 : user_level[user].exp - level[user_level[user].level];
      console.log(exp, user_level[user], level[user_level[user].level]);

      if (user_level[user].exp >= level[user_level[user].level]) {
        user_level[user].level++;
        user_level[user].exp = 0;
      }
    }
    let after = user_level[user].level;
    if (before != after) {
      sendMsg(user_level[user].level);
    }

  } else {
    user_level.push({
      user_id: user_id,
      exp: 1,
      level: 1
    })
    sendMsg(1);
  }

  fs.writeFileSync(`${dir}/user_level.json`, JSON.stringify(user_level), function (err) {
    console.log(err);
  })
}


// let fs = require('fs');
// let levels = [];
// for (let i = 0; i < 100; i++) {
//   let exp = 30 * Math.pow(i, 2);

//   levels.push(exp);
// }
// levels = JSON.stringify(levels)

// fs.writeFile('../data/level.json', levels, 'utf8', function (a) {
//   console.log(a);
// });
// console.log(levels);