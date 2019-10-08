// src/index.ts
import mapConfig from './map.config';
import { districts } from './districtData';
import fetchData from './fetchData';
import { Districts, UBikeInfo } from './data';
import UBikeMapFacade from './MapFacade';

/* 將所有的行政區 Options 的 HTML DOM 建立起來 */
// 選取 <select> 標籤
const $selectDistrict = <HTMLSelectElement | null>(
  document.getElementById('select-district')
);

// 使用 Type Guard 排除掉 $selectDistrict 為 null 的情形
if ($selectDistrict === null) {
  throw new Error('No select-district field provided.');
}

// 遍歷所有的行政區
districts.forEach((d) => {
  // 建立 <option> 標籤
  const $optionTag = document.createElement('option');

  // 將 option 標籤標上 value 與內容
  $optionTag.setAttribute('value', d);
  $optionTag.innerText = d;

  $selectDistrict.appendChild($optionTag);
});

/* 建立 UBike 地圖外觀 - Legacy Code */
const mapFacade = new UBikeMapFacade(
  mapConfig,
  function (info: UBikeInfo) {
    return `
      <p>${info.regionName} — ${info.stopName}</p>
      <p>總自行車數：${info.totalBikes}</p>
      <p>可用自行車數：${info.availableBikes}</p>
    `;
  }
);

/* 繪製點位 */
// 取出目前的行政區
let currentDistrict = $selectDistrict.value as Districts;

function updateUBikeMap(district: Districts): void {
  // 轉換點位並繪製
  fetchData().then(data => {
    // 1. 先將資料根據選到的行政區進行過濾的動作
    const selectedData = data.filter(
      info => info.regionName === district
    );

    // 2. 只要把要渲染的 UBike 點位輸入進去
    mapFacade.pinStops(selectedData);
  });
}

updateUBikeMap(currentDistrict);

/* 不同的行政區應該要渲染出不同的狀況 */
$selectDistrict.addEventListener('change', (event) => {
  // 當行政區更改時，需要更新 UBike 地圖資訊

  // 1. 取得行政區的值
  let { value } = event.target as HTMLSelectElement;
  currentDistrict = value as Districts;

  // 2. 將原本的 Marker 除掉 - 改成使用 UBikeMapFacade 處理掉
  mapFacade.clearStops();

  // 3. 更新地圖
  updateUBikeMap(currentDistrict);
});
