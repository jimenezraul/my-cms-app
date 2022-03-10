const db = require("./db/connection");
const CMS = require("./lib/questions");
var figlet = require("figlet");

// Connect to the database
db.connect((err) => {
  // figlet for ASCII art
  figlet("Employee \n Manager", function (error, data) {
    if (error) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
    if (err) throw err;
    // Start the CMS
    new CMS().getMenu();
  });
});