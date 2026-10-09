import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Place, Incident, RouteOption } from '../types';

interface MapComponentProps {
  center?: [number, number];
  zoom?: number;
  places?: Place[];
  selectedPlace?: Place | null;
  onSelectPlace?: (place: Place) => void;
  incidents?: Incident[];
  selectedIncident?: Incident | null;
  onSelectIncident?: (incident: Incident) => void;
  activeHeatmapLayers?: string[]; // e.g. ['waterlogging', 'poor_lighting', 'accident', 'harassment', 'traffic']
  routes?: RouteOption[];
  activeRouteId?: string;
  onSelectRoute?: (routeId: string) => void;
  height?: string;
  className?: string;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  center = [18.5204, 73.8567], // Pune center
  zoom = 13,
  places = [],
  selectedPlace,
  onSelectPlace,
  incidents = [],
  selectedIncident,
  onSelectIncident,
  activeHeatmapLayers = ['waterlogging', 'poor_lighting', 'accident', 'harassment', 'traffic'],
  routes = [],
  activeRouteId = 'safest',
  onSelectRoute,
  height = '100%',
  className = ''
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const incidentsLayerRef = useRef<L.LayerGroup | null>(null);
  const routesLayerRef = useRef<L.LayerGroup | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center,
      zoom,
      zoomControl: false
    });

    // Sleek Dark CartoDB Voyager / Positron tiles for high-tech aesthetic
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    incidentsLayerRef.current = L.layerGroup().addTo(map);
    routesLayerRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update center when needed
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (selectedPlace) {
      mapInstanceRef.current.setView(selectedPlace.coordinates, 15, { animate: true });
    } else if (selectedIncident) {
      mapInstanceRef.current.setView(selectedIncident.coordinates, 15, { animate: true });
    }
  }, [selectedPlace, selectedIncident]);

  // Render Places
  useEffect(() => {
    if (!markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();

    places.forEach((place) => {
      const isSelected = selectedPlace?.id === place.id;
      const pulseScore = Math.round(
        (place.subScores.safety + place.subScores.cleanliness + place.subScores.affordability + place.subScores.ratings + place.subScores.accessibility) / 5
      );

      const color = pulseScore >= 80 ? '#10b981' : pulseScore >= 65 ? '#f59e0b' : '#ef4444';

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            background: ${isSelected ? '#0f172a' : 'white'};
            color: ${isSelected ? '#38bdf8' : '#0f172a'};
            border: 2px solid ${color};
            border-radius: 9999px;
            padding: 3px 8px;
            font-size: 11px;
            font-weight: 700;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            display: flex;
            align-items: center;
            gap: 4px;
            white-space: nowrap;
            transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
          ">
            <span style="display:inline-block; width:7px; height:7px; border-radius:50%; background:${color};"></span>
            <span>${place.name.slice(0, 14)}</span>
            <span style="font-size:9px; background:${color}22; color:${color}; padding:1px 4px; border-radius:4px;">${pulseScore}</span>
          </div>
        `,
        iconSize: [80, 26],
        iconAnchor: [40, 13]
      });

      const marker = L.marker(place.coordinates, { icon: customIcon });
      marker.on('click', () => {
        onSelectPlace?.(place);
      });

      marker.addTo(markersLayerRef.current!);
    });
  }, [places, selectedPlace, onSelectPlace]);

  // Render Incidents / Safety Heatmap
  useEffect(() => {
    if (!incidentsLayerRef.current) return;
    incidentsLayerRef.current.clearLayers();

    incidents.forEach((incident) => {
      if (!activeHeatmapLayers.includes(incident.category)) return;

      const isSelected = selectedIncident?.id === incident.id;
      let circleColor = '#ef4444'; // Red default
      let radius = 180;

      if (incident.category === 'waterlogging') {
        circleColor = '#0ea5e9'; // Blue for water
        radius = 240;
      } else if (incident.category === 'poor_lighting') {
        circleColor = '#8b5cf6'; // Purple for lighting
        radius = 160;
      } else if (incident.category === 'accident') {
        circleColor = '#f97316'; // Orange for accident
        radius = 200;
      } else if (incident.category === 'positive_shoutout') {
        circleColor = '#10b981'; // Green for positive
        radius = 150;
      }

      // Heat effect glow circle
      const circle = L.circle(incident.coordinates, {
        color: circleColor,
        fillColor: circleColor,
        fillOpacity: isSelected ? 0.45 : 0.25,
        weight: isSelected ? 3 : 1.5,
        radius: radius
      });

      circle.on('click', () => {
        onSelectIncident?.(incident);
      });

      // Pin icon
      const incidentIcon = L.divIcon({
        className: 'incident-map-pin',
        html: `
          <div style="
            background: ${circleColor};
            color: white;
            border: 2px solid white;
            border-radius: 50%;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            font-weight: 800;
            box-shadow: 0 0 16px ${circleColor};
            cursor: pointer;
            transform: ${isSelected ? 'scale(1.3)' : 'scale(1)'};
            transition: all 0.2s ease;
          ">
            ${incident.category === 'waterlogging' ? '🌊' : incident.category === 'poor_lighting' ? '💡' : incident.category === 'accident' ? '⚠️' : incident.category === 'harassment' ? '🛡️' : '🚨'}
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker(incident.coordinates, { icon: incidentIcon });
      marker.on('click', () => {
        onSelectIncident?.(incident);
      });

      circle.addTo(incidentsLayerRef.current!);
      marker.addTo(incidentsLayerRef.current!);
    });
  }, [incidents, selectedIncident, activeHeatmapLayers, onSelectIncident]);

  // Render Routes
  useEffect(() => {
    if (!routesLayerRef.current) return;
    routesLayerRef.current.clearLayers();

    if (routes.length === 0) return;

    routes.forEach((route) => {
      const isActive = route.id === activeRouteId;
      const polyline = L.polyline(route.coordinates, {
        color: route.color,
        weight: isActive ? 6 : 3,
        opacity: isActive ? 0.95 : 0.4,
        dashArray: route.id === 'fastest' ? '6, 6' : undefined
      });

      polyline.on('click', () => {
        onSelectRoute?.(route.id);
      });

      polyline.addTo(routesLayerRef.current!);

      // If active, add origin and destination markers
      if (isActive && route.coordinates.length > 0) {
        const startPoint = route.coordinates[0];
        const endPoint = route.coordinates[route.coordinates.length - 1];

        const startIcon = L.divIcon({
          className: 'route-start-pin',
          html: `<div style="background:#10b981; color:white; width:22px; height:22px; border-radius:50%; border:2px solid white; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; box-shadow:0 2px 8px rgba(0,0,0,0.3);">A</div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        });

        const endIcon = L.divIcon({
          className: 'route-end-pin',
          html: `<div style="background:#ef4444; color:white; width:22px; height:22px; border-radius:50%; border:2px solid white; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; box-shadow:0 2px 8px rgba(0,0,0,0.3);">B</div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        });

        L.marker(startPoint, { icon: startIcon }).addTo(routesLayerRef.current!);
        L.marker(endPoint, { icon: endIcon }).addTo(routesLayerRef.current!);
      }
    });

    // Fit bounds if routes exist
    if (mapInstanceRef.current && routes.length > 0) {
      const allCoords = routes.flatMap((r) => r.coordinates);
      const bounds = L.latLngBounds(allCoords);
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [routes, activeRouteId, onSelectRoute]);

  return (
    <div
      ref={mapContainerRef}
      className={`map-wrapper ${className}`}
      style={{ height, width: '100%', position: 'relative', zIndex: 1 }}
    />
  );
};
