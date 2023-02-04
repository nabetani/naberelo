console.log("hoge");
var reloader = {};

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log([reloader, request]);
        switch (request.cmd) {
            case "enable":
                var tabid = request.tab.id;
                if (reloader.timerId) {
                    clearInterval(reloader.timerId);
                }
                reloader.timerId = setInterval(
                    () => {
                        console.log("reload!");
                        chrome.tabs.reload(tabid);
                    },
                    request.intervalMS);
                console.log(request.tab);
                break;
            case "disable":
                if (reloader.timerId) {
                    clearInterval(reloader.timerId);
                }
                reloader.timerId = null;
                break;
        }
    }
);