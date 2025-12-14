// importing map shell components--this is the container for all the map stuff

import { MapContainer, TileLayer } from "react-leaflet";
import ViolationsLayer from "./ViolationsLayer";
import TractChoropleth from "./TractChoropleth";
import DistrictBoundaries from "./DistrictBoundaries";
import MapControls from "./MapControls";
import Legend from "./Legend";
import "./mapView.css";
import "leaflet/dist/leaflet.css";

export default function MapView({ filters }) {
  return (
    <MapContainer
      center={[39.9526, -75.1652]} // Philadelphia
      zoom={11}
      style={{ height: "100vh", width: "100%" }}
    >
      {/* Basemap */}
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png?api_key=f9e2d3dc-7b6e-43f4-8ee1-2aa57eb3a037"
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
      />

      {/* ACS choropleth for selected variable */}
      <TractChoropleth
        acsVariables={filters.acsVariables}
        tractFilters={filters.tractFilters}
      />

      {/* District boundaries */}
      <DistrictBoundaries selectedDistrict={filters.selectedDistrict} />

      {/* Code violations */}
      <ViolationsLayer violationFilters={filters.violationFilters} />

      {/* Controls + Legend */}
      {/* <MapControls /> */}
      <Legend acsVariables={filters.acsVariables} /> 
    </MapContainer>
  );
}