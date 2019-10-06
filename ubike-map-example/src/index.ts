// src/index.ts
import L, { LayerGroup, marker } from 'leaflet';
import mapConfig from './map.config';
import { districts } from './districtData';
import fetchData from './fetchData';
import { Districts } from './data';

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

/* 建立地圖 */
const {
  coordinate,
  zoomLevel,
  tileLayerURL,
  containerID
} = mapConfig;

// 建立 Leaflet 地圖個體，`map` 代表選擇 ID 為 'map' 的 HTML 元素
const map = L.map(containerID);

// 設定地圖要聚焦的座標與縮放等級
map.setView(coordinate, zoomLevel);

// 設定地圖的底圖並加到地圖的個體中
L.tileLayer(tileLayerURL)
  .addTo(map);

// 新增 map layer 負責渲染所有的 marker
let markerLayer: LayerGroup;

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

    // 2. 將 selectedData 裡面的 UBikeInfo 轉換成 Leaflet Marker
    const markers = selectedData.map(data => {
      // 使用 L.Marker 裡面填入 LatLngExpression
      const marker = new L.Marker(data.latLng);

      // 顯示 UBike 的資料
      marker.bindTooltip(`
        <p>${data.regionName} — ${data.stopName}</p>
        <p>總自行車數：${data.totalBikes}</p>
        <p>可用自行車數：${data.availableBikes}</p>
      `);

      marker.on('mouseover', () => {
        marker.openTooltip();
      });

      marker.on('mouseleave', () => {
        marker.closeTooltip();
      });

      return marker;
    });

    // 3. 將所有的 Marker 丟進 LayerGroup 並新增到地圖裡
    markerLayer = L.layerGroup(markers);
    markerLayer.addTo(map);
  });
}

updateUBikeMap(currentDistrict);

/* 不同的行政區應該要渲染出不同的狀況 */
$selectDistrict.addEventListener('change', (event) => {
  // 當行政區更改時，需要更新 UBike 地圖資訊

  // 1. 取得行政區的值
  let { value } = event.target as HTMLSelectElement;
  currentDistrict = value as Districts;

  // 2. 將原本的 Marker 除掉
  markerLayer.remove();

  // 3. 更新地圖
  updateUBikeMap(currentDistrict);
});
