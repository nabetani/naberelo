
"use strict";

const updateTimerList = (o) => {
  console.log("updateTimerList", o);
};

const send = async (obj) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.runtime.sendMessage(Object.assign({ tab: tab }, obj, updateTimerList));
};

let regres = null;

const regEvent = async (cmd) => {
  const val = (id) => {
    return parseFloat(document.getElementById(id).value);
  };
  await send({ cmd: cmd, intervalMS: val("num") * val("unit") });
};

window.onload = () => {
  console.log("onload");
  send({ cmd: "none" });
  chrome.storage.sync.get(null, (val) => {
    if (val && val.num && val.unit) {
      document.getElementById("num").value = val.num;
      document.getElementById("unit").value = val.unit;
    }
  });
};

document.getElementById("enable").addEventListener("click", async () => {
  regEvent("enable");
  const val = (id) => { return document.getElementById(id).value; };
  chrome.storage.sync.set({ "num": val("num"), "unit": val("unit") });
});

document.getElementById("disable").addEventListener("click", async () => {
  regEvent("disable");
});
