
"use strict";

const send = async (obj) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return chrome.runtime.sendMessage(Object.assign({ tab: tab }, obj));
};

let regres = null;

const regEvent = async (cmd) => {
  const val = (id) => {
    return parseFloat(document.getElementById(id).value);
  };
  return send({ cmd: cmd, intervalMS: val("num") * val("unit") });
};

const updateTimerList = (o) => {
  console.log(o);
};

window.onload = () => {
  console.log("onload");
  send({ cmd: "none" }).then(updateTimerList);
  chrome.storage.sync.get(null, (val) => {
    if (val && val.num && val.unit) {
      document.getElementById("num").value = val.num;
      document.getElementById("unit").value = val.unit;
    }
  });
};

document.getElementById("enable").addEventListener("click", async () => {
  let o = await regEvent("enable");
  updateTimerList(o);
  const val = (id) => { return document.getElementById(id).value; };
  chrome.storage.sync.set({ "num": val("num"), "unit": val("unit") });
});

document.getElementById("disable").addEventListener("click", async () => {
  let o = await regEvent("disable");
  updateTimerList(o);
});
