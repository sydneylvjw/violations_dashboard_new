// these are the components to render the legend for the map based on the selected acs characteristics

import { getLegendBins } from "../../utils/colorScales";

export default function Legend({ acsVariable }) {
  const bins = getLegendBins(acsVariable);

  if (!bins.length) return null;

  return (
    <div className="legend">
      <strong>{acsVariable}</strong>
      <div>
        {bins.map((bin, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                width: 16,
                height: 12,
                background: bin.color,
                marginRight: 6,
                border: "1px solid #999"
              }}
            />
            <span>{bin.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}