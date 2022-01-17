const Database = require("@replit/database");
const db = new Database();


db.get("user_level_721434408552235009_331018289062871051").then(value => {
  console.log(value)
});
db.set(`user_level_721434408552235009_331018289062871051`, `{"level":99,"exp":131979}`);