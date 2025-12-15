
import { useState } from "react";
import MapView from "./components/MapView/MapView";

export default function App() {
  const [filters, setFilters] = useState({
    selectedDistrict: null,
    acsVariables: "medHHincE",
    violationFilters: {
      YEARS: [],
      STATUSES: [],
      INSPECTDIST: [],
      RESOLUTIONCODE: [],
      PRIORITY: [],
      COUNCILDIST: null,
    },
  });

    return <MapView filters={filters} setFilters={setFilters} />;
}
