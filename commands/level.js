exports.run = (client, message, args) => {

  function sendMsg(level) {
    message.channel.send(`<@${message.author.id}> telah naik ke level ${level}`);

    let budak = message.guild.roles.cache.find(role => role.name ==='Budak');
    let petani = message.guild.roles.cache.find(role => role.name ==='Petani');
    let pedagang = message.guild.roles.cache.find(role => role.name ==='Pedagang');
    let bangsawan = message.guild.roles.cache.find(role => role.name ==='Bangsawan');
    let member = message.guild.members.cache.get(message.author.id);

      if(level>20 && level<=45){
        member.roles.add(petani)
        member.roles.remove(budak)
        console.log('tes');
      }else if(level>45 && level<=70){
        member.roles.add(pedagang)
        member.roles.remove(petani)
      }else if(level>70 && level<101){
        member.roles.add(bangsawan)
        member.roles.remove(pedagang)
    }
  }

  async function level(){
    const fs = require('fs');
    const Database = require("@replit/database");
    const db = new Database();
    const user_id = message.author.id;
    const guild_id = message.guild.id;
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

    const level = JSON.parse(fs.readFileSync(`./data/level.json`));
    const user = JSON.parse(await db.get(`user_level_${guild_id}_${user_id}`));
    multiplier = JSON.parse(fs.readFileSync(`${dir}/multiplier.json`)).multiplier;
    exp = message.content.length * multiplier;
    if (user) {
      let before = user.level;
      while (exp > 0) {
       user.exp = user.exp + exp;
        exp = user.exp < level[user.level] ? 0 : user.exp - level[user.level];
        console.log(exp, user, level[user.level]);

        if (user.exp >= level[user.level]) {
          user.level++;
          user.exp = 0;
        }
      }
      let after = user.level;
      if (before != after) {
        sendMsg(user.level);
      }
      db.set(`user_level_${guild_id}_${user_id}`, `${JSON.stringify(user)}`);
    } else {
      db.set(`user_level_${guild_id}_${user_id}`, `{"level" : 1, "exp" : 1}`);
      sendMsg(1);
    }
  }

  level()
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