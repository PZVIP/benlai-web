importScripts('config.js');

// 设置点击图标时打开侧边栏
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error("侧边栏启动失败:", error));

// 创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CONFIG.CONTEXT_MENU_ID,
    title: CONFIG.CONTEXT_MENU_TITLE,
    contexts: ["selection"]
  });
});

// 处理右键菜单点击
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === CONFIG.CONTEXT_MENU_ID) {
    const selectedText = info.selectionText;
    
    // 1. 将文字保存到 storage
    chrome.storage.local.set({ selectedText: selectedText }, () => {
      // 2. 打开侧边栏
      chrome.sidePanel.open({ windowId: tab.windowId });
    });
  }
});