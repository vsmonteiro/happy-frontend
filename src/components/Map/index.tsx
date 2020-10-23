
import React from 'react';
import { Map as LeafletMap, MapProps as LeafletMapProps, TileLayer } from 'react-leaflet'

interface MapProps extends LeafletMapProps {
  interactive?: boolean
  children: React.ReactNode
}

export default function Map({ children, interactive = true, ...props }: MapProps) {
  return (
    <LeafletMap
      center={[-29.6815171, -51.1368158]}
      zoom={15}
      style={{ width: '100%', height: '100%' }}
      dragging={interactive}
      touchZoom={interactive}
      zoomControl={interactive}
      scrollWheelZoom={interactive}
      doubleClickZoom={interactive}
      {...props}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAP_TOKEN}`}
      />
      {children}
    </LeafletMap>
  );
}