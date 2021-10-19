const Database = require("@replit/database")
const db = new Database()
const guild_id = "721434408552235009"
const user_id = "331018289062871051"
db.set(`user_level_${guild_id}_${user_id}`, `{"level" : 101, "exp" : 1000}`)
  // .then((val) => {console.log(val)});
// db.get(`user_level_${guild_id}_${user_id}`).then(value => {console.log(JSON.parse(value))});
db.delete(`user_level_${guild_id}_${user_id}`).then(() => {});



