// global set up for importing other documents and managing the state of the react app

import { useState } from "react";
import MapView from "./components/MapView/MapView";
import ViolationFilters from "./components/Filters/ViolationFilters";
import TractFilters from "./components/Filters/TractFilters";
import DistrictSelector from "./components/Filters/DistrictSelector";

export default function App() {
  const [filters, setFilters] = useState({
    selectedDistrict: null,
    acsVariable: "median_income",
    violationFilters: {
      year: null,
      status: [],
      subcode: null,
    },
  });

  return (
    <div className="dashboard">
      <div className="sidebar">
        <DistrictSelector filters={filters} setFilters={setFilters} />
        <TractFilters filters={filters} setFilters={setFilters} />
        <ViolationFilters filters={filters} setFilters={setFilters} />
      </div>

      <div className="map-area">
        <MapView filters={filters} />
      </div>
    </div>
  );
}