// these are the components to render filterable district boundaries on the map

import { GeoJSON } from "react-leaflet";
import councilDistricts from "../../data/Council_Districts_2024.json";
import inspectDistricts from "../../data/LI_DISTRICTS.json";
import { useMemo } from "react";

export default function DistrictBoundaries({ selectedDistrict }) {
  // // combine both district datasets
  // const districtData = {
  //   type: "FeatureCollection",
  //   features: [
  //     ...councilDistricts.features,
  //     ...inspectDistricts.features
  //   ]
  // };
  const mergedData = useMemo(() => {
    const features = [];
    if (councilDistricts?.features) features.push(...councilDistricts.features);
    if (inspectDistricts?.features) features.push(...inspectDistricts.features);
    return { type: "FeatureCollection", features };
  }, []);

  const selectedStr = selectedDistrict != null ? String(selectedDistrict) : null;

  const styleFn = useMemo(
    () => (feature) => {
      const dist = feature.properties?.DISTRICT
        ? String(feature.properties.DISTRICT)
        : null;

      const isSelected = selectedStr && dist === selectedStr;

      return {
        weight: isSelected ? 3 : 1,
        color: isSelected ? "#ff9900" : "#444",
        fill: false
      };
    },
    [selectedStr]
  );

  return (
    <GeoJSON
      data={mergedData}
      style={styleFn}
      onEachFeature={(feature, layer) => {
        const dist = feature.properties?.DISTRICT;
        if (dist != null) {
          layer.bindTooltip(`District ${dist}`, { sticky: true });
        }
      }}
    />
  );
}

//   const style = (feature) => {
//     const districtProp = feature.properties.DISTRICT;
//     const selectedStr =
//       selectedDistrict != null ? String(selectedDistrict) : null;

//     const isSelected =
//       selectedStr && districtProp === selectedStr;

//     return {
//       color: isSelected ? "#ffcc00" : "#555555",
//       weight: isSelected ? 3 : 1,
//       fillOpacity: 0,
//       dashArray: "4"
//     };
//   };

//   const onEachFeature = (feature, layer) => {
//     const districtProp = feature.properties.DISTRICT;
//     layer.bindTooltip(
//       `District ${districtProp}`,
//       { sticky: true }
//     );
//   };

//   return (
//     <GeoJSON
//       data={districtData}
//       style={style}
//       onEachFeature={onEachFeature}
//     />
//   );
// }