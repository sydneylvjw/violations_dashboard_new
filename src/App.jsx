// global set up for importing other documents and managing the state of the react app

import { useState } from "react";
import MapView from "./components/MapView/MapView";
import ViolationFilters from "./components/Filters/ViolationFilters";
import TractFilters from "./components/Filters/TractFilters";
import DistrictSelector from "./components/Filters/DistrictSelector";


// debounce hook for memory optimization
// function useDebouncedValue(value, delay) {
//   const [debounced, setDebounced] = useState(value);

//   useMemo(() => {
//     const id = setTimeout(() => setDebounced(value), delay);
//     return () => clearTimeout(id);
//   }, [value, delay]);

//   return debounced;
// }
export default function App() {
  const [filters, setFilters] = useState({
    selectedDistrict: null,
    acsVariables: "medHHincE",
    violationFilters: {
      YEARS: null,          // single year or null
      STATUSES: [],         // array (checkbox list)
      INSPECTDIST: null,    // single district or null
      RESOLUTIONCODE: null, // single code or null
      PRIORITY: null,       // single priority or null
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