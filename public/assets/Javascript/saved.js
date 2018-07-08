$(document).ready(function(){
  var articleContainer = $(".article-container");

  $(document).on("click", "btn.delete", handleArticleDelete);
  $(document).on("click",".btn.notes",handleArticleNotes);
  $(document).on("click","btn-save", handleNoteSave);
  $(document).on("click", "btn.note-delete", handleNoteDelete);

  initPage();

  function initePage(){
    articleContainer.empty();
    $.get("api/headlines?saved=true").then(function(data){
      if(data && data.length){
        renderArticles(data);
      } else{
        renderEmpty();
      }
    });
  }

  function renderArticles(){
    var articlePanels = [];

    for(var i = 0; i < articles.length; i ++){

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

  function createPanel(article){

    var panel = 
    $(["<div class = 'panel panel-default'>",
    "<div class = 'panel-heading'>",
    "<h3>",
    article.headline,
    "<a class = 'btn btn-danger delete'>",
    "Delete From Saved",
    "</a>",
    "<a class = 'btn btn-info notes'>Article Notes<a>",
    "<h3>",
    "</div>",
    "<div class = 'panel-body'>",
    article.summary,
    "</div>",
    "</div>"
  ].join(""));

  panel.data("_id", article._id);
  return panel;
  }

  function renderNotesList(){

    var notesToRender = [];
    var currentNote;
    if(!data.notes.length){

      currentNOte = [
        "<li class = 'list-group-item'>",
        "No notes for this article yet.",
        "<li>"
      ].join("");
      notesToRender.push(currentNote);
    }
    else{
      for(var i = 0; i<data.notes.length; i++){
        currentNOte = $([
          "<li class = 'list-group-item note'>",
          data.notes[i].noteText,
          "<button class = 'btn btn-danger note-delete'>x</button>",
          "<li>"
        ].join(""));
        currentNote.childrend("button").data("_id",data.notes[i]>_id);

        notesToRender.push(currentNote);
      }
    }
    $(".note-container").append(notesToRender);
  }

  function handleNotesSave(){

    var noteData;
    var newNote = $(".bootbox-body textarea").val().trim();

    if(newNote){
      noteData = {
        _id: $(this).data("article")._id,
        noteText:newNote
      };
      $.post("api/notes", notesData).then(function(){
        bootbox.hideAll();
      });
    }
  }

  function handleNoteDelete(){
    var noteToDelete = $(this).data("_id");

    $.ajax({
      url: "/api/notes/" + noteToDelete,
      method: "DELETE"
    }).then(function(){
      bootbox.hideAll();
    });
  }
  function handleArticleDelete(){
    var articleToDelte = $(this).parents(".panel").data();

    $.ajax({
      method:"DELETE",
      url: "/api/headlines/" + articleToDelete._id
    }).then(function(data){
      if(data.ok){
        initPage();
      }
    })
  }

  function handleArticleNotes(){
    var currentArticle = $(this).parents(".panel").data();

    $.get("api/notes/"+ currentArticle._id).then(function(data){
      var modalText = [
        "<div> class = 'container-fluid text-center'>",
        "<h4>Notes For Article: ",
        currentArticle._id,
        "</h4>",
        "<hr />",
        "<ul class = 'list-group note container'>",
        "</ul>",
        "<textarea placeholder= 'New Note' rows ='4' cols= '60'></textarea>",
        "<button class = 'btn btn-success save'> Save Note</button>",
        "</div>"
      ].join("");

      bootbox.dialog({
        message: modalText,
        closeButton:true
      });
      var noteData = {
        _id: currentArticle._id,
        notes:data || []
      };

      $(".btn.save").data("article",noteData);

      renderNotesList(noteData);
    });
  }
})