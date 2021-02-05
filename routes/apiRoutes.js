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
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    res.json(notesData);
  });

  // API POST Requests
  // Below code handles when a user submits data to the server.
  // In each of the below cases, when a user submits form by clicking the save icon 
  // ...data (a JSON object) is pushed to the appropriate file
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {
    // Our "server" will respond to requests and push the new note with specific ID.
    // It will do this by adding an ID to the new note and pushing it to the json file.
    // req.body is available since we're using the body parsing middleware

    var num = Math.round(Math.random()*1000);
    var id = notesData.length + num
    if (notesData.length) {
      notesData.push({id,...req.body});
      res.json(true);
    } else {
      id = 0;
      notesData.push({id,...req.body});
      res.json(false);
    }
    //console.log("this is the id ---> " + id);
  })

  // API DELETE Requests
  // Our "server" will respond to requests and delete a speific note with ID.
  // It will do this by map() finding what index matches the object ID.
  app.delete("/api/notes/:id", function(req, res) {
    var x = parseInt(req.params.id);
    var removeNote = notesData.map(function(item) {
      return parseInt(item.id);
    }).indexOf(x);
    notesData.splice(removeNote, 1);
    res.end();
  })
};