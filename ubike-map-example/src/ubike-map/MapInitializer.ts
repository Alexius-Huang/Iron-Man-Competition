// /src/ubike-map/MapInitializer.ts
import L from 'leaflet';
import { CustomMap } from './map';
import { MapConfig } from '../map.config';

class MapInitializer implements CustomMap.Initializer {
  constructor(
    public readonly map: L.Map,
    public readonly config: MapConfig
  ) {}

  public initialize() {
    const { map, config } = this;
    const { coordinate, zoomLevel, tileLayerURL } = config;

    // 設定地圖要聚焦的座標與縮放等級
    map.setView(coordinate, zoomLevel);

    // 設定地圖的底圖並加到地圖的個體中
    L.tileLayer(tileLayerURL)
      .addTo(map);
  }
}

export default MapInitializer;
