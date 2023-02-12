"use strict";

console.log("background task started.");
let timerIds = {};

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if ("enable" != request.cmd && "disable" != request.cmd) {
            return;
        }
        ((tabId, cmd, intervalMS) => {
            const timerId = () => { return timerIds[tabId] };
            const disable = () => {
                if (timerId()) {
                    console.log("disable interval timer for ", tabId,);
                    clearInterval(timerId());
                    timerIds[tabId] = null;
                }
            };
            const reload = () => {
                chrome.tabs.reload(tabId, { bypassCache: true }, () => {
                    const e = chrome.runtime.lastError;
                    if (e) {
                        console.log("failed to reload tab ", tabId, ": ", e, " @ ", (new Date()).toJSON());
                        disable();
                    } else {
                        console.log("reloaded tab ", tabId, ": ", e, " @ ", (new Date()).toJSON());
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