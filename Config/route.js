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

    headlinesController.get(query,function(data){
      res.json(data);
    });
  });

  router.delete("/api/headlines/:id",function(req,res){
    var query = {};
    query_id = req.params.id;
    headlinesController.delete(query,function(err,data){
      res.json(data);
    });
  });

  router.patch("/api/headlines",function(req,res){
    headlinesController.update(req.body,function(err,data){
      res.json(data);
    });
  });

  router.get("api/notes/:headline_id?",function(req,res){
    var query = {};
    if(req.params.headline_id){
      query.id = req.params.headline_id;
    }
  })

  routersController.get(query, function(err,data){
   res.json(data);
  })
  //might have a problem
  router.delete("api.notes/:id",function(req,res){
    var query = {};
    query._id - req.params.id;
    notesController.delete(query, function(err,data){
      res.json(data);
    });
  });

  router.post("api/notes",function(req,res){
    routersController.save(req.body,function(data){
      res.json(data);
    })
  })
}