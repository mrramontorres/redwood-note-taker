// ===============================================================================
// DEPENDENCIES
// We need to include the fs package in order to read/write to the .json file.
// ===============================================================================
var fs = require("fs");

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// This data source hold a .json file.
// ===============================================================================

var notesData = require("../db/db.json");

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
    console.log("app.get")
    res.json(notesData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    if (notesData.length < 5) {
      notesData.push(req.body);
      res.json(true);
    }
    else {
      notesData.push(req.body);
      res.json(false);
    }
  })

  app.delete("/api/notes/id", function(req, res){
    console.log("delete")
    res.json()
  })
};