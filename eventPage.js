/*
 * 事件页js，只有本模块才有权限调用所有的特权chrome API
 * 主要提供了各种核心功能
 * 插件的其他部分需要通过消息机制来从本模块获取需要的功能
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "historyList"){
      chrome.history.search({'text':''}, function(historyItems){
        var items = [];
        for( var item in historyItems ){
          items.push(historyItems[item]);
        }
        sendResponse(items);
      });
    }

    if (request.command === "savePage"){
      var tabId = request.tabId;
      chrome.pageCapture.saveAsMHTML({'tabId':tabId}, function(mhtmlData){
        var reader = new FileReader();
        reader.onload = function(){
          var url = reader.result;

          chrome.downloads.download({
            'url':url,
            'filename':'page',
            'saveAs':true
          }, function(downloadId){
            console.log('Download Over');
          });
          sendResponse(url);
        };
        reader.readAsDataURL(mhtmlData);
      });
    }

    return true;
});
