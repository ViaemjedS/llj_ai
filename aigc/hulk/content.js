// 这个文件用于在页面中执行背景颜色改变的脚本
// 由于我们使用了chrome.scripting.executeScript，这个文件实际上可以保持为空
// 但为了完整性，我们保留这个文件 

// 处理图片URL解析错误
function fixImageUrls() {
  const images = document.getElementsByTagName('img');
  for (let img of images) {
    if (img.src.includes('tplv-')) {
      try {
        // 尝试修复URL
        const fixedUrl = img.src.replace(/tplv-[^:]+:/, '');
        img.src = fixedUrl;
      } catch (error) {
        console.log('图片URL修复失败:', error);
      }
    }
  }
}

// 监听DOM变化，处理动态加载的图片
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      fixImageUrls();
    }
  });
});

// 开始观察
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// 初始运行一次
fixImageUrls(); 