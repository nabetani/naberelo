const regEvent = async (cmd, f) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.runtime.sendMessage({ cmd: cmd, tab: tab, intervalMS: 2000 });
};

document.getElementById("enable").addEventListener("click", async () => {
  await regEvent("enable", () => { });
});

document.getElementById("disable").addEventListener("click", async () => {
  await regEvent("disable", () => { });
});
