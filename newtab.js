/*
 * 新标签页js，目前作用是列举出浏览历史记录
 */
chrome.runtime.sendMessage({'command':'historyList'}, function(items) {
  console.log(items);
  items.forEach(function(item){
    document.write('<div><a href="'+item.url+'">'+item.title+'</a></div>')
  });
});
