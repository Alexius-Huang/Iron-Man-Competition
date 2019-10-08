// /src/ubike-map/MapMarker.ts
import L, { LatLngExpression } from 'leaflet';
import { CustomMap } from './map';

class MapMarker implements CustomMap.Marker {
  public marker: L.Marker;

  private constructor(coord: LatLngExpression) {
    this.marker = L.marker(coord);
  }

  static create(coord: LatLngExpression): MapMarker {
    return new MapMarker(coord);
  }

  public bindTooltip(content: string) {
    const { marker } = this;

    marker.bindTooltip(content);

    marker.on('mouseover', () => {
      marker.openTooltip();
    });

    marker.on('mouseleave', () => {
      marker.closeTooltip();
    });
  }
}

export default MapMarker;
