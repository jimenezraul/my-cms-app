const db = require("./db/connection");
const CMS = require("./lib/questions");
var figlet = require("figlet");

db.connect((err) => {
  figlet("Employee \n Manager", function (error, data) {
    if (error) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
    if (err) throw err;
    console.log("Database connected.");
    new CMS().getMenu();
  });
});