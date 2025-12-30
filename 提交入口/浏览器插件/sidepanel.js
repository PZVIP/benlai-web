// 初始化 iframe 地址
document.addEventListener('DOMContentLoaded', () => {
  const iframe = document.getElementById('benlai-iframe');
  if (iframe) {
    iframe.src = CONFIG.IFRAME_URL;
    
    // iframe 加载完成后检查是否有待处理的文字
    iframe.onload = () => {
      chrome.storage.local.get(['selectedText'], (result) => {
        if (result.selectedText) {
          sendToIframe(result.selectedText);
        }
      });
    };
  }
});

// 监听来自 background 的 storage 变化
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.selectedText) {
    sendToIframe(changes.selectedText.newValue);
  }
});

function sendToIframe(text) {
  const iframe = document.getElementById('benlai-iframe');
  if (iframe && iframe.contentWindow) {
    console.log("正在向 iframe 发送文字:", text);
    // 向 iframe 发送消息
    iframe.contentWindow.postMessage({
      type: 'SET_THOUGHT_INPUT',
      text: text
    }, '*');
    
    // 发送后清除，防止重复处理
    chrome.storage.local.remove('selectedText');
  }
}
