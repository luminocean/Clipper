chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command == "historyList"){
      chrome.history.search({'text':''}, function(historyItems){
        var items = [];
        for( var item in historyItems ){
          items.push(historyItems[item]);
        }
        sendResponse(items);
      });
    }

    return true;
});
