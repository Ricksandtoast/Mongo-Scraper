$(document).ready(function(){

var articleContainer = $(".article-container");
$(document).on("click","btn.save",handleArticleSave);
$(document).on("click",".scrape-new",handleArticleScrape);

initPage();

function initePage(){
  articleContainer.empty();
  $.get("/api/headlines?saved=false")
  .then(function(data){
    //if exists
    if(data && data.length){
      renderArticles(data);
    }
    else{
      renderEmpty();
    }
  });
}
function renderArticles(articles){
  var articlePanels = [];
  //wtf create panel
  for( var i = 0; i < articles.length; i++){
    articlePanels.push(createPanel(articles[i]));
  }
}





function renderEmpty(){

  var emptyAlert = 
  $(["<div class = 'alert alert-warning text-center'>",
  "<h4>No new articles fool</h4>",
  "</div>",
  "<div class ='panel panel-default'>",
  "<div class = 'panel-heading text-center'>",
  "</div>",
  "<div class = 'panel-body text-center'>",
  "<h4><a class = 'scrape-new'>Try scraping new articles</a></h4>",
  "<h4><a href= 'saved'> Go to Saved Articles</a></h4>",
  "</div>",
  "</div>"
].join(""));
  articleContainer.append(emptyAlert);
}
function handleArticleSave(){

  var articleToSave = $(this).parents(".panel").data();
  articleToSave.saved =true;

  $.ajax({
    method: "PATCH",
    url: "/api/headlines",
    data: articleToSave
  })
  .then(function(data){
    //if exists reload all artiles
    if(data.ok){
      initPage();
    }
  });
  }


function handleArticleScrape(){
  $.get("/api/fetch")
  .then(function(data){
    initPage();
    bootbox.alert("<h3 class ='text-center m-top-80'>"+ data.message + "<h3>");
  })
}
})