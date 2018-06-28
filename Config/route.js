//Server routes

var scrape = require("../Scripts/scrape");

var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.exports = function (router){

  router.get("/",function (req,res){
    res.render("home");
  })
  router.get("/saved",function(req,res)
  {
    res.render("saved");
  });

  router.get("api/fetch",function(req,res){
    headlinesController.fetch(function(err,docs){
      if(!docs || docs.insertedCount === 0){
        res.json({
          message: "No new articles today"
        });
      }
      else{
        res.json({
          message: "added" + docs.insertedCount + "new articles"
        });
      }
    });
  });
  router.get("/api/headlines", function(req,res){
    var query = {};
    //saved not recognized??
    if(req.query.saved){
      query = req.query
    }
  })
}