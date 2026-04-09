// 1. 找到主要照片
const mainPhoto = document.getElementById('main-photo');

// 2. 找到「所有」的濾鏡按鈕 (回傳一個陣列)
const filterButtons = document.querySelectorAll('.filter-btn');

// 3. 幫所有按鈕都加上監聽器
filterButtons.forEach(function(button) {
    
    // 4. 監聽「點擊」事件
    button.addEventListener('click', function() {
        
        // 5. 讀取這個被點擊按鈕的 "data-filter" 屬性值
        const filterName = button.dataset.filter; // 例如 "sepia" 或 "bw"

        // 6. (關鍵) 先把照片身上「所有」濾鏡都移除
        //    (我們把所有濾鏡名稱存在這裡)
        const allFilters = ['sepia', 'bw', 'contrast', 'warm', 'cool', 'invert'];
        
        allFilters.forEach(function(filter) {
            mainPhoto.classList.remove(filter);
        });

        // 7. (關鍵) 如果點的不是「清除」按鈕，
        //    就把對應的 class 加回去
        if (filterName !== 'none') {
            mainPhoto.classList.add(filterName);
        }
    });
});