// ===============================================================================
// DEPENDENCIES
// We need to include the fs package in order to read/write to the .json file.
// ===============================================================================

var fs = require("fs");
notesData = require("../db/db.json");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    console.log("app.delete");
    console.log(notesData);
    res.json(notesData);
  });

  // API POST Requests
  // Below code handles when a user submits data to the server.
  // In each of the below cases, when a user submits form by clicking the save icon 
  // ...data (a JSON object) is pushed to the appropriate file
  // (ex. User fills title... this data is then sent to the server...
  // Then the server saves the data to the json file)
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {
    // Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    
    if (notesData.length) {
      console.log("app.post");
      console.log(notesData.length);
      console.log(req.body);
      notesData.push(req.body);
      res.json(true);
    }
    else {
      notesData.push(req.body);
      res.json(false);
    }
  })

  // API DELETE Requests
  app.delete("/api/notes/:id", function(req, res){
    console.log("app.delete");
    res.end();
  })
};