chrome.runtime.sendMessage({'command':'historyList'}, function(items) {
  console.log(items);
  items.forEach(function(item){
    document.write('<div><a href="'+item.url+'">'+item.title+'</a></div>')
  });
});
