// 載入 jQuery
import $ from 'jquery';

// 當網站的元素載入時執行
$(document).ready(function() {
  const $btn = $('#main-btn');
  const $count = $('#count');
  let count = 0;

  // 每一次按鈕被按的時候，更新 $count 元素
  $btn.click(() => {
    count++;
    $count.text(count);
  });
});
