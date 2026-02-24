const carousel = document.getElementById('carousel');

// 1. 設定統一的卡背圖片路徑
const backImage = 'images/card_back.jpg'; 

// 2. 設定 9 位朋友製作的卡面圖片路徑
const frontImages = [
    'images/friend1.jpg',
    'images/friend2.jpg',
    'images/friend3.jpg',
    'images/friend4.jpg',
    'images/friend5.jpg',
    'images/friend6.jpg',
    'images/friend7.jpg',
    'images/friend8.jpg',
    'images/friend9.jpg'
];

// 為了實現流暢的無限捲動，我們複製前後各 3 張
const cloneCount = 3;
const extendedImages = [
    ...frontImages.slice(-cloneCount),
    ...frontImages,
    ...frontImages.slice(0, cloneCount)
];

// 產生卡片 HTML
extendedImages.forEach((imgUrl) => {
    const slot = document.createElement('div');
    slot.className = 'card-slot';
    
    slot.innerHTML = `
        <div class="card" onclick="this.classList.toggle('is-flipped')">
            <div class="card-face card-back" style="background-image: url('${backImage}')"></div>
            <div class="card-face card-front" style="background-image: url('${imgUrl}')"></div>
        </div>
    `;
    carousel.appendChild(slot);
});

// 定位與捲動邏輯
const slotWidth = 300; // 必須與 CSS 的 --slot-width 相同
const totalRealCards = frontImages.length;

function initCarousel() {
    // 初始位置：跳過前面複製的卡片，讓正宗的第一張置中
    const initialOffset = (cloneCount * slotWidth) - (window.innerWidth / 2) + (slotWidth / 2);
    carousel.scrollLeft = initialOffset;
}

window.addEventListener('load', initCarousel);
window.addEventListener('resize', initCarousel); // 螢幕轉向時重新定位

carousel.addEventListener('scroll', () => {
    const scrollLeft = carousel.scrollLeft;
    const scrollWidth = carousel.scrollWidth;
    const clientWidth = carousel.clientWidth;
    
    // 真正的內容寬度
    const realContentWidth = totalRealCards * slotWidth;
    
    // 滑到最左邊的分身區時，瞬間跳往右邊的本體
    if (scrollLeft < slotWidth) {
        carousel.scrollLeft += realContentWidth;
    } 
    // 滑到最右邊的分身區時，瞬間跳往左邊的本體
    else if (scrollLeft > (scrollWidth - clientWidth - slotWidth)) {
        carousel.scrollLeft -= realContentWidth;
    }
});