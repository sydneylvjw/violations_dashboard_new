// these are the components to render filterable district boundaries on the map

import { GeoJSON } from "react-leaflet";
import { mockDistricts } from "../../mock/mockDistricts";

export default function DistrictBoundaries({ selectedDistrict }) {
  const districtData = mockDistricts; // later: replace with real data

  const style = (feature) => {
    const isSelected =
      selectedDistrict && feature.properties.district === selectedDistrict;

    return {
      color: isSelected ? "#ffcc00" : "#555555",
      weight: isSelected ? 3 : 1,
      fillOpacity: 0,
      dashArray: "4"
    };
  };

  const onEachFeature = (feature, layer) => {
    layer.bindTooltip(
      `District ${feature.properties.district}: ${feature.properties.name}`,
      { sticky: true }
    );
  };

  return (
    <GeoJSON data={districtData} style={style} onEachFeature={onEachFeature} />
  );
}