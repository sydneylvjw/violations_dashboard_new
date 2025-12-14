// these are the components to render filterable code violation markers on the map

import { useMemo } from "react";
import { GeoJSON } from "react-leaflet";
import L from "leaflet";
import councilPanel from "../../data/councilPanel.json";
import inspectPanel from "../../data/inspectPanel.json";
import tractPanel from "../../data/tractPanel.json";

export default function ViolationsLayer({ violationFilters }) {
  const vf = violationFilters || {};

  // 1. Merge all panels ONCE (static data)
  const allFeatures = useMemo(() => {
    const features = [];
    if (councilPanel?.features) features.push(...councilPanel.features);
    if (inspectPanel?.features) features.push(...inspectPanel.features);
    if (tractPanel?.features) features.push(...tractPanel.features);
    return features;
  }, []); // data doesn't change at runtime

  // 2. Apply filters
  const filteredFeatures = useMemo(() => {
    const YEARS = vf.YEARS; // number or null
    const STATUSES = Array.isArray(vf.STATUSES) ? vf.STATUSES : [];
    const INSPECTDIST = vf.INSPECTDIST || null;
    const RESOLUTIONCODE = vf.RESOLUTIONCODE || null;
    const PRIORITY = vf.PRIORITY || null;
    const COUNCILDIST = vf.COUNCILDIST || null;

    // DEBUG: what filters does this layer actually see?
    console.log("ViolationsLayer filters:", {
      YEARS,
      STATUSES,
      INSPECTDIST,
      RESOLUTIONCODE,
      PRIORITY,
      COUNCILDIST,
    });

    const result = allFeatures.filter((feature) => {
      const props = feature.properties || {};

      // Copy these out for debugging
      const year = props.violation_year;
      const dist = props.inspect_district;

      if (YEARS != null && INSPECTDIST) {
        if (!(String(year) === String(YEARS) &&
              dist &&
              dist.toString().trim().toUpperCase() ===
                INSPECTDIST.toString().trim().toUpperCase())) {
          // This feature fails combined year + district, so it should be excluded
          // but if we see it on the map, then our popup is reading from a different source.
          return false;
        }
      } else {
        // original individual checks
        if (YEARS != null) {
          if (String(year) !== String(YEARS)) return false;
        }
        if (INSPECTDIST) {
          if (
            !dist ||
            dist.toString().trim().toUpperCase() !==
              INSPECTDIST.toString().trim().toUpperCase()
          ) {
            return false;
          }
        }
      }

  // ...other checks (STATUSES, COUNCILDIST, RESOLUTIONCODE, PRIORITY)...

      // Year filter (string-safe)
      // if (YEARS != null) {
      //   const year = props.violation_year;
      //   if (String(year) !== String(YEARS)) return false;
      // }

      // Statuses (multi-select)
      if (STATUSES.length) {
        const status = props.casestatus;
        if (!STATUSES.includes(String(status))) return false;
      }

      // Council district (from DistrictSelector)
      if (COUNCILDIST != null) {
        const cd = props.council_district;
        if (String(cd) !== String(COUNCILDIST)) return false;
      }

      // L&I inspection district (location)
      if (INSPECTDIST) {
        const dist = props.inspect_district;
        if (
          !dist ||
          dist.toString().trim().toUpperCase() !==
            INSPECTDIST.toString().trim().toUpperCase()
        ) {
          return false;
        }
      }

      // Resolution code
      if (RESOLUTIONCODE) {
        const code = props.violationresolutioncode;
        if (String(code) !== String(RESOLUTIONCODE)) return false;
      }

      // Priority
      if (PRIORITY) {
        const priority = props.caseprioritydesc;
        if (String(priority) !== String(PRIORITY)) return false;
      }

      return true;
    });

    // DEBUG: counts
    console.log(
      "ViolationsLayer counts:",
      "total =", allFeatures.length,
      "filtered =", result.length
    );

    return result;
  }, [
    allFeatures,
    vf.YEARS,
    vf.STATUSES,
    vf.INSPECTDIST,
    vf.RESOLUTIONCODE,
    vf.PRIORITY,
    vf.COUNCILDIST,
  ]);

  // 3. Render markers from filteredFeatures (cap for performance)
  const filtered = useMemo(
    () => ({
      type: "FeatureCollection",
      features: filteredFeatures.slice(0, 2000),
    }),
    [filteredFeatures]
  );

  const pointToLayer = (feature, latlng) =>
    L.circleMarker(latlng, {
      radius: 2,
      fillColor: "#E04833",
      color: "#E04833",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.9,
    });

  const onEachFeature = (feature, layer) => {
    const p = feature.properties || {};
    layer.bindPopup(
      `<div>ACTIVE LAYER</div>
      <strong>${p.address || "Unknown address"}</strong><br/>
       Year Filed: ${p.violation_year ?? "N/A"}<br/>
       Council District: ${p.council_district ?? "N/A"}<br/>
       L&I Inspection District: ${p.inspect_district ?? "N/A"}<br/>
       Tract: ${p.censustract ?? "N/A"}<br/>
       Case Status: ${p.casestatus ?? "N/A"}<br/>
       Priority: ${p.caseprioritydesc ?? "N/A"}<br/>
       Violation Resolution Status: ${p.violationresolutioncode ?? "N/A"}<br/>
       Subcode: ${p.subcode ?? "N/A"}<br/>
       Violation Class: ${p.viol_class ?? "N/A"}<br/>`
    );
        layer.bindPopup(
      `<div>ACTIVE LAYER</div>
      <strong>${p.address || "Unknown address"}</strong><br/>
      Year Filed: ${p.violation_year ?? "N/A"}<br/>
      ...`
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