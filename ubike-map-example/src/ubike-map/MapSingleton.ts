// /src/ubike-map/MapSingleton.ts
import L from 'leaflet';
import mapConfig from '../map.config';

export default class MapSingleton {
  // 地圖可能為 null，因為 containerID 可能有 Typo 的潛在性
  public readonly map = L.map(mapConfig.containerID);

  constructor() {
    if (this.map === null) {
      console.warn("Map isn't initialized correctly!");
    }
  }

  private static Instance: L.Map | null = new MapSingleton().map;

  static getInstance(): L.Map | null {
    return this.Instance;
  }
}
