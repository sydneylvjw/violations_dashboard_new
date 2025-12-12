// these are the components to render filterable census tract choropleths based on different selected acs characteristics

import { GeoJSON } from "react-leaflet";
import { mockTracks } from "../../mock/mockTracks";
import { getColorScale } from "../../utils/colorScales";

export default function TractChoropleth({ acsVariable }) {
  const tractData = mockTracks; // later: real ACS geojson

  const colorScale = getColorScale(acsVariable);

  const style = (feature) => ({
    fillColor: colorScale(feature.properties[acsVariable]),
    weight: 1,
    color: "#666",
    fillOpacity: 0.7
  });

  const onEachFeature = (feature, layer) => {
    const value = feature.properties[acsVariable];
    layer.bindTooltip(
      `Tract ${feature.properties.GEOID}<br/>${acsVariable}: ${
        value != null ? value : "N/A"
      }`,
      { sticky: true }
    );
  };

  return (
    <GeoJSON
      data={tractData}
      style={style}
      onEachFeature={onEachFeature}
    />
  );
}