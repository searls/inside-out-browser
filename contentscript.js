(function($) {
  var $source, $exit, $originals, 
    doc = document.documentElement, 
    css = {
      'position':'absolute',
      'top':0,
      'left':0,
      'margin':0,
    };
  
  var init = function() {
    var sourceHtml = $('<div/>').text(doc.outerHTML).html().replace(/(\t|  )/g,"&nbsp;&nbsp;").split('\n').join('<br/>');
    $originals = $(doc).children().detach();

    $source = $('<div><div>').css($.extend({  
      'background-color':'#fff',  
      'width':'100%',
      'height':'100%',
      'padding': '30px 10px 10px 30px',
      'font-family': 'Courier New, monospace'
    },css)).html(sourceHtml).appendTo(doc);
  }
  
  var renderExitButton = function() {
    $exit = $('<a href="#" class="close-source"><img src="'+chrome.extension.getURL("x.png")+'"/></a>').css($.extend({
      'z-index': 9999,
      'padding': '5px 0px 0px 5px'
    },css)).insertBefore($source);    
  };
  
  var restorePage = function(e) {
    e.preventDefault();
    $source.remove();
    $exit.remove();
    $originals.appendTo(doc);
  };

  $('.close-source').live('click',restorePage);
  $(document.documentElement).keyup(function(e) {
    if(e.keyCode === 27) {
      restorePage(e);
    }
  });

  init();
  renderExitButton();

  chrome.extension.sendRequest({}, function(response) {});
})(jQuery);