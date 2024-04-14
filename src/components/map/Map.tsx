import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet.fullscreen';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';

interface EventMapProps {
  latitude: number;
  longitude: number;
  satelliteView: boolean;
}

const Map: React.FC<EventMapProps> = ({ latitude, longitude, satelliteView }) => {
  const mapRef = useRef<L.Map | null>(null);
  const satelliteLayerRef = useRef<L.TileLayer | null>(null); // Ref for satellite tile layer

  useEffect(() => {
    if (latitude && longitude && !mapRef.current) {
      const newMap = L.map('map').setView([latitude, longitude], 13);

      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      });
      tileLayer.addTo(newMap);

      const greenIcon = L.icon({
        iconUrl: 'http://localhost:3000/leaf-green.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      });

      L.marker([latitude, longitude], { icon: greenIcon }).addTo(newMap);

      // Add fullscreen control
      const fullscreenControl = L.control.fullscreen({
        position: 'topleft',
        title: 'Show me the fullscreen !',
        titleCancel: 'Exit fullscreen mode',
        content: undefined,
        forceSeparateButton: true,
        forcePseudoFullscreen: true,
        fullscreenElement: false,
      });
      fullscreenControl.addTo(newMap);

      // Initialize satellite tile layer but don't add it to map yet
      const stadiaSatelliteUrl = 'https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png';
      const stadiaSatelliteAttrib = '&copy; Stadia Maps';
      satelliteLayerRef.current = L.tileLayer(stadiaSatelliteUrl, { attribution: stadiaSatelliteAttrib });

      mapRef.current = newMap;
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (mapRef.current && satelliteLayerRef.current) {
      if (satelliteView) {
        // Add satellite tile layer to map
        satelliteLayerRef.current.addTo(mapRef.current);
      } else {
        // Remove satellite tile layer from map
        satelliteLayerRef.current.remove();
      }
    }
  }, [satelliteView]);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map" style={{ height: '400px' }} />;
};

export default Map;
