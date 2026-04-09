// ↓↓↓ 關鍵修正 3：把「所有」程式碼包在 window.onload 裡 ↓↓↓
// (這能確保我們的 JS 在「照片載入完成」、
//  .darkroom-container 撐開後，才執行)

window.onload = function() {

    // --- 1. 初始設定 ---

    // 找到畫布元素
    const canvas = document.getElementById('developer-canvas');
    // 取得畫布的 2D 繪圖環境
    const ctx = canvas.getContext('2d');

    // (重要！) 讓畫布的「解析度」等於它在 CSS 上的「大小」
    // (現在 offsetWidth/Height 會是「照片的真實大小」)
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // 幫畫布填滿「顯影液」的顏色 (深棕色)
    ctx.fillStyle = '#2a1a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 設定「畫筆」(刮除圓圈) 的大小
    const brushRadius = 30; // 圓圈半徑 (可調大調小)

    // 宣告一個變數，用來記住滑鼠是否「被按著」
    let isScrubbing = false;

    // --- 2. 刮除的函式 (Function) ---

    // 這是一個「在 (x, y) 座標畫一個圓圈」的函式
    function draw(x, y) {
        // 如果滑鼠沒有被按著，就什麼都不做
        if (!isScrubbing) return;

        // 關鍵！設定「混合模式」為 'destination-out'
        // 意思：接下來畫的東西，會把「原本的顏色」挖掉 (變透明)
        ctx.globalCompositeOperation = 'destination-out';

        ctx.beginPath();
        // 在 (x, y) 畫一個圓
        ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
        ctx.fill();
    }

    // --- 3. 加上滑鼠事件監聽 ---

    // 當「滑鼠按下去」時
    canvas.addEventListener('mousedown', function(e) {
        isScrubbing = true; // 記住「開始刮了！」
        // 立刻在「按下去」的點先刮一次
        draw(e.offsetX, e.offsetY);
    });

    // 當「滑鼠放開」時
    canvas.addEventListener('mouseup', function() {
        isScrubbing = false; // 記住「停止刮了！」
    });

    // 當「滑鼠移出」畫布時
    canvas.addEventListener('mouseleave', function() {
        isScrubbing = false; // (也當作停止)
    });

    // 當「滑鼠正在移動」時
    canvas.addEventListener('mousemove', function(e) {
        // (這個函式的第一行會檢查 isScrubbing,
        //  所以就算滑鼠只是「移過」，沒按著也不會畫)
        draw(e.offsetX, e.offsetY);
    });

}; // (window.onload 結束)