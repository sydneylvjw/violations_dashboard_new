// these are the components to render the filters for the chosen acs attributes

const ACS_VARIABLES = [
  { value: "median_income", label: "Median household income" }
  // later: add more ACS variables
];

export default function TractFilters({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      acsVariable: e.target.value
    }));
  };

  return (
    <div className="filter-panel">
      <h3>Neighborhood characteristics</h3>
      <label>
        Variable:
        <select value={filters.acsVariable} onChange={handleChange}>
          {ACS_VARIABLES.map((v) => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}