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
