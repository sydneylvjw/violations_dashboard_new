// these are the components to render the selector to filter by council district

const DISTRICTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function DistrictSelector({ filters, setFilters }) {
  const handleChange = (e) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setFilters((prev) => ({
      ...prev,
      selectedDistrict: value
    }));
  };

  return (
    <div className="filter-panel">
      <h3>Council District</h3>
      <select value={filters.selectedDistrict || ""} onChange={handleChange}>
        <option value="">All districts</option>
        {DISTRICTS.map((d) => (
          <option key={d} value={d}>
            District {d}
          </option>
        ))}
      </select>
    </div>
  );
}