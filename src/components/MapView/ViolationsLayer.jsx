//  these are the components to render filterable code violation markers on the map

import L from "leaflet";
import { GeoJSON } from "react-leaflet";
import { mockViolations } from "../../mock/mockViolations";

export default function ViolationsLayer({ violationFilters }) {
  const violationData = mockViolations;

  const filteredFeatures = violationData.features.filter((f) => {
    const p = f.properties;

    const matchesYear =
      !violationFilters.year || p.year_filed === violationFilters.year;

    const matchesStatus =
      !violationFilters.status?.length ||
      violationFilters.status.includes(p.resolution_status);

    const matchesSubcode =
      !violationFilters.subcode || p.subcode === violationFilters.subcode;

    return matchesYear && matchesStatus && matchesSubcode;
  });

  const filtered = {
    ...violationData,
    features: filteredFeatures
  };

  const pointToLayer = (feature, latlng) => {
    return L.circleMarker(latlng, {
      radius: 6,
      fillColor:
        feature.properties.resolution_status === "Open" ? "#e41a1c" : "#4daf4a",
      color: "#333",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.9
    });
  };

  const onEachFeature = (feature, layer) => {
    const p = feature.properties;
    layer.bindPopup(
      `<strong>${p.address}</strong><br/>
       Year filed: ${p.year_filed}<br/>
       Status: ${p.resolution_status}<br/>
       Subcode: ${p.subcode}`
    );
  };

  return (
    <GeoJSON
      data={filtered}
      pointToLayer={pointToLayer}
      onEachFeature={onEachFeature}
    />
  );
}