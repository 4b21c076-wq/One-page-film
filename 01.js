// 1. 找到我們在 HTML 中設定好 ID 的元素
const photo = document.getElementById('my-photo');
const toggleButton = document.getElementById('toggle-button');

// 2. 替按鈕加上「點擊事件監聽」
toggleButton.addEventListener('click', function() {
    
    // 3. 當按鈕被點擊時，切換 'is-negative' 這個 class
    photo.classList.toggle('is-negative');
    
    // ( 'toggle' 的意思是：有就移除，沒有就加上 )
});