import L from 'leaflet';
import MapSingleton from './ubike-map/MapSingleton';
import MapInitializer from './ubike-map/MapInitializer';
import MapMarkerLayer from './ubike-map/MapMarkerLayer';
import MapMarker from './ubike-map/MapMarker';
import { MapConfig } from './map.config';
import { UBikeInfo } from './data';

export default class UBikeMapFacade {
  private map: L.Map | null = MapSingleton.getInstance();
  private mapInitializer: MapInitializer;
  private mapMarkerLayer: MapMarkerLayer;

  constructor(
    config: MapConfig,
    public tooltipTemplate: (data: UBikeInfo) => string
  ) {
    // 確保地圖個體為正確的狀態
    if (this.map === null) {
      throw new Error("Map isn't correctly initialized")
    }
    this.mapInitializer = new MapInitializer(this.map, config);
    this.mapMarkerLayer = new MapMarkerLayer(this.map);

    // 初始化地圖
    this.mapInitializer.initialize();
  }

  pinStops(data: UBikeInfo[]) {
    // 將 UBikeInfo 的資料轉換成 MapMarker
    const markers = data.map(info => {
      const marker = MapMarker.create(info.latLng);
      marker.bindTooltip(
        this.tooltipTemplate(info)
      );

      return marker;
    });

    // 將 MapMarker[] 新增到 Layer 裡面，我們不需要關心渲染問題，
    // 因為 Layer 早已把渲染過程放在 MapMarkerLayer 裡
    this.mapMarkerLayer.addMarkers(markers);
  }

  clearStops() {
    this.mapMarkerLayer.clear();
  }
}
