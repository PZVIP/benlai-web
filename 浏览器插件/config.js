const CONFIG = {
  IFRAME_URL: "https://pzvip.github.io/benlai-web/web/index.html",
  CONTEXT_MENU_ID: "send-to-benlai",
  CONTEXT_MENU_TITLE: "记录到 Benlai 记忆",
  // 目标输入框的选择器，根据实际页面结构调整
  THOUGHT_INPUT_SELECTOR: "textarea, input[type='text']", 
  MATCH_URLS: ["https://pzvip.github.io/benlai-web/*"]
};

// 导出配置供不同环境使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} else if (typeof self !== 'undefined') {
  self.CONFIG = CONFIG;
}
