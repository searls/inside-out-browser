var doc = document.documentElement;
var source = $('<div/>').text(doc.outerHTML).html();
var sourceHtml = source.replace(/(\t|  )/g,"&nbsp;&nbsp;").split('\n').join('<br/>');
var $originals = $(doc).children().detach();

var css = {
  'position':'absolute',
  'top':0,
  'left':0,
  'margin':0,
};
var $source = $('<div><div>').css($.extend({  
  'background-color':'#fff',  
  'width':'100%',
  'height':'100%',
  'padding': '30px 10px 10px 30px',
  'font-family': 'Courier New, monospace'
},css)).html(sourceHtml).appendTo(doc);


var $exit = $('<a href="#" class="close-source"><img src="'+chrome.extension.getURL("x.png")+'"/></a>').css($.extend({
  'z-index': 9999,
  'padding': '5px 0px 0px 5px'
},css)).insertBefore($source);

$('.close-source').live('click',function(e) {
  e.preventDefault();
  $source.remove();
  $(this).remove();
  $originals.appendTo(doc);
});


chrome.extension.sendRequest({}, function(response) {});
