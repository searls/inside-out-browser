(function($) {
  var $source, $exit, $originals, doc;
  
  var init = function() {
    doc = document.documentElement;
    var sourceHtml = $('<div/>').text(doc.outerHTML).html().replace(/(\t|  )/g,"&nbsp;&nbsp;").split('\n').join('<br/>');
    $originals = $(doc).children().hide();
    $source = $('<div class="absolute source"><div>').html(sourceHtml).appendTo(doc);
  }
  
  var renderExitButton = function() {
    $exit = $('<a href="#" class="absolute exit"><img src="'+chrome.extension.getURL("x.png")+'"/></a>').insertBefore($source);    
  };
  
  var restorePage = function(e) {
    e.preventDefault();
    $source.remove();
    $exit.remove();
    $originals.attr('style','');
  };

  $(function() {
    init();
    renderExitButton();
    $('.exit').live('click',restorePage);    
    $(document.documentElement).keyup(function(e) {
      if(e.keyCode === 27) {
        restorePage(e);
      }
    });    
  });

  chrome.extension.sendRequest({}, function(response) {});
})(jQuery);