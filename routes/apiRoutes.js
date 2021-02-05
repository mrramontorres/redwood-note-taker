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
    // Our "server" will respond to requests and push the new note with specific ID.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware

    var num = Math.round(Math.random()*1000);
    var id = notesData.length + num
    if (notesData.length) {
      notesData.push({id,...req.body});
      res.json(true);
    } else {
      id = 0
      notesData.push({id,...req.body});
      res.json(false);
    }
    //console.log("this is the id ---> " + id);
  })

  // API DELETE Requests
  app.delete("/api/notes/:id", function(req, res) {
    console.log(notesData);
    console.log("this is the notesData ---> " + notesData);
    var x = parseInt(req.params.id);
    console.log("req.params.id is ---> " + x);
    var removeNote = notesData.map(function(item) {
      return parseInt(item.id);
    }).indexOf(x);
    console.log("removeNote is ---> " + removeNote);
    notesData.splice(removeNote, 1);
    res.end();
  })
};