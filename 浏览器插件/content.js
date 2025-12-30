// 监听来自父窗口（侧边栏容器）的消息
window.addEventListener('message', (event) => {
  // 简单验证来源，或者根据需要调整
  if (event.data && event.data.type === 'SET_THOUGHT_INPUT') {
    const text = event.data.text;
    if (text) {
      fillThoughtInput(text);
    }
  }
});

function fillThoughtInput(text) {
  // 尝试从 CONFIG 获取选择器，如果没有则使用默认
  const selector = (typeof CONFIG !== 'undefined' && CONFIG.THOUGHT_INPUT_SELECTOR) 
    ? CONFIG.THOUGHT_INPUT_SELECTOR 
    : "textarea, input[type='text']";

  const input = document.querySelector(selector);
  if (input) {
    console.log("Benlai 插件: 正在填充输入框");
    input.value = text;
    // 触发输入事件，确保网页应用能感知到内容变化（如 React/Vue 绑定）
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.focus();
  } else {
    console.warn("Benlai 插件: 未找到输入框", selector);
  }
}
