// importing map shell components--this is the container for all the map stuff

// components/MapView/MapView.js
import { MapContainer, TileLayer } from "react-leaflet";
import ViolationsLayer from "./ViolationsLayer";
import TractChoropleth from "./TractChoropleth";
import DistrictBoundaries from "./DistrictBoundaries";
import MapControls from "./MapControls";
import Legend from "./Legend";
import "./mapView.css";
import "leaflet/dist/leaflet.css";

const acsVariable = ["median_income", "poverty_rate"]; // extendable list of acs variables

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

      {/* District boundaries */}
      <DistrictBoundaries selectedDistrict={filters.selectedDistrict} />

      {/* ACS choropleths for each variable */}
      {acsVariable.map(variable => (
        <TractChoropleth
          key={variable}
          acsVariable={variable}
          tractFilters={filters.tractFilters}
        />
      ))}

      {/* Code violations */}
      <ViolationsLayer violationFilters={filters.violationFilters} />

      {/* Controls + Legend */}
      <MapControls />
      <Legend acsVariable={filters.acsVariable} />
    </MapContainer>
  );
}