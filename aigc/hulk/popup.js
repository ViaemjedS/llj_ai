/**
 * @desc 页面背景切换
 * @author mrsk
 * @date 2025-05-10 21:31:00
 */

//  JS面向对象 语言
//  事件监听
//  弹窗加载完后
//  获取按钮元素
// 监听按钮点击事件
document.getElementById('changeColor').addEventListener('click', async () => {
  // 查询当前激活的标签页
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // 在目标标签页中执行脚本
  chrome.scripting.executeScript({
    target: { tabId: tab.id }, // 指定目标标签页
    function: () => {
      // 将页面背景颜色设置为绿色
      document.body.style.backgroundColor = 'green';
    }
  });
});