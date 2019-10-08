// /src/ubike-map/map.d.ts
import L, { LatLngExpression } from 'leaflet';
import { MapConfig } from '../map.config';

declare namespace CustomMap {
  // 宣告 Initializer 介面
  export interface Initializer {
    readonly map: L.Map;
    readonly config: MapConfig;
    initialize(): void;
  }

  // 宣告 MarkerLayer 介面
  export interface MarkerLayer {
    readonly map: L.Map;
    readonly layer: L.LayerGroup;
    addMarker(marker: Marker): void;
    addMarkers(markers: Marker[]): void;
    clear(): void;
  }

  // 宣告 Marker 介面
  export interface Marker {
    marker: L.Marker;
    bindTooltip(content: string): void;
  }
}
