const regEvent = async (cmd, f) => {
  const val = (id) => {
    return parseFloat(document.getElementById(id).value);
  };
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.runtime.sendMessage({ cmd: cmd, tab: tab, intervalMS: val("num") * val("unit") });
};

window.onload = () => {
  console.log("onload");
  chrome.storage.sync.get(null, (val) => {
    console.log("chrome.storage.sync.get");
    if (val && val.num && val.unit) {
      document.getElementById("num").value = val.num;
      document.getElementById("unit").value = val.unit;
    }
  });
};

document.getElementById("enable").addEventListener("click", async () => {
  await regEvent("enable", () => { });
  const val = (id) => { return document.getElementById(id).value; };
  chrome.storage.sync.set({ "num": val("num"), "unit": val("unit") });
});

document.getElementById("disable").addEventListener("click", async () => {
  await regEvent("disable", () => { });
});
