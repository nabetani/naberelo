console.log("hoge");
let timerIds = {};

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if ("enable" != request.cmd && "disable" != request.cmd) {
            return;
        }
        ((tabId, cmd, intervalMS) => {
            const timerId = () => { timerIds[tabId] };
            const disable = () => {
                if (timerId()) {
                    clearInterval(timerId());
                    console.log(timerIds);
                    timerIds[tabId] = null;
                    console.log(timerIds);
                }
            };
            const reload = () => {
                chrome.tabs.reload(tabId, { bypassCache: true }, () => {
                    const e = chrome.runtime.lastError;
                    if (e) {
                        console.log(e);
                        disable();
                    }
                });
            };
            const enable = () => {
                disable();
                timerIds[tabId] = setInterval(reload, intervalMS);
            };
            switch (cmd) {
                case "enable":
                    enable();
                    break;
                case "disable":
                    disable();
                    break;
            }
        })(request.tab.id, request.cmd, request.intervalMS);
    }
);