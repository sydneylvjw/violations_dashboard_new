// these are the components to render filterable code violation markers on the map

import { useMemo } from "react";
import { Marker, Popup } from "react-leaflet";
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

  // 2. Apply filters with useMemo; convert scalar filters to arrays internally
  const filteredFeatures = useMemo(() => {
    // normalize filters to arrays for easier `.includes` checks
    const YEARS = vf.YEARS != null ? [vf.YEARS] : [];
    const STATUSES = Array.isArray(vf.STATUSES) ? vf.STATUSES : [];
    const INSPECTDIST = vf.INSPECTDIST ? [vf.INSPECTDIST] : [];
    const RESOLUTIONCODE = vf.RESOLUTIONCODE ? [vf.RESOLUTIONCODE] : [];
    const PRIORITY = vf.PRIORITY ? [vf.PRIORITY] : [];


    return allFeatures.filter((feature) => {
      const props = feature.properties || {};

      if (YEARS.length) {
        const year = props.violation_year;
        if (!YEARS.includes(year)) return false;
      }

      if (STATUSES.length) {
        const status = props.casestatus;
        if (!STATUSES.includes(status)) return false;
      }

      if (INSPECTDIST.length) {
        const dist = props.inspect_district;
        if (!INSPECTDIST.includes(dist)) return false;
      }

      if (RESOLUTIONCODE.length) {
        const code = props.violationresolutioncode;
        if (!RESOLUTIONCODE.includes(code)) return false;
      }

      if (PRIORITY.length) {
        const priority = props.caseprioritydesc;
        if (!PRIORITY.includes(priority)) return false;
      }

      return true;
    });
  }, [allFeatures, vf]);


  // 3. Render markers from filteredFeatures
  const limitedFeatures = filteredFeatures.slice(0, 1000); // limit to first 1000 for performance
  return (
    <>
      {limitedFeatures.map((feature, idx) => {
        const { geometry, properties: p = {} } = feature;
        if (!geometry || geometry.type !== "Point") return null;

        const [lng, lat] = geometry.coordinates || [];
        if (lat == null || lng == null) return null;

        return (
          <Marker key={idx} position={[lat, lng]}>
            <Popup>
              <div>
                <div>
                  <strong>{p.address}</strong>
                </div>
                <div>Year: {p.violation_year}</div>
                <div>Council District: {p.council_district}</div>
                <div>Inspection District: {p.inspect_district}</div>
                <div>Tract: {p.censustract}</div>
                <div>Status: {p.casestatus}</div>
                <div>Priority: {p.caseprioritydesc}</div>
                <div>Resolution Code: {p.violationresolutioncode}</div>
                <div>Subcode: {p.subcode}</div>
                <div>Class: {p.viol_class}</div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}