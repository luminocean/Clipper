/**
 * 保存当前页面
 * @param  {Function} callback 保存完成后的回调函数
 */
function savePage(callback){
  chrome.tabs.query({'currentWindow':true,'active':true}, function(tabs){
    if(tabs.length == 0) return console.log('无当前活动窗口');
    var tabId = tabs[0].id;

    chrome.runtime.sendMessage({'command':'savePage','tabId':tabId}, function(url) {
      callback(null);
    });
  });
}

$(function(){
  $('#clipBtn').on('click',function(){
    savePage(function(err){
      if(err) return console.log('剪藏发生异常');
    });
  });
});
