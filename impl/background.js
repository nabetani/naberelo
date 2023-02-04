console.log("hoge");
let timerIds = {};

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if ("enable" != request.cmd && "disable" != request.cmd) {
            return;
        }
        const tabid = request.tab.id;
        const timerId = timerIds[tabid];
        switch (request.cmd) {
            case "enable":
                if (timerId) {
                    clearInterval(timerId);
                }
                timerIds[tabid] = setInterval(
                    () => {
                        console.log("reload!");
                        chrome.tabs.reload(tabid);
                    },
                    request.intervalMS);
                console.log(request.tab);
                break;
            case "disable":
                if (timerId) {
                    clearInterval(timerId);
                    timerIds[tabid] = null;
                }
                break;
        }
    }
);