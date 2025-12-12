// these are the filters for violations based on type, severity, date range, etc.

const YEARS = [2021, 2022, 2023];
const STATUSES = ["Open", "Closed"];
const SUBCODES = ["PM"]; // add more later

export default function ViolationFilters({ filters, setFilters }) {
  const vf = filters.violationFilters;

  const handleYearChange = (e) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setFilters((prev) => ({
      ...prev,
      violationFilters: {
        ...prev.violationFilters,
        year: value
      }
    }));
  };

  const handleStatusChange = (status) => {
    setFilters((prev) => {
      const current = prev.violationFilters.status || [];
      const exists = current.includes(status);
      const updated = exists
        ? current.filter((s) => s !== status)
        : [...current, status];

      return {
        ...prev,
        violationFilters: {
          ...prev.violationFilters,
          status: updated
        }
      };
    });
  };

  const handleSubcodeChange = (e) => {
    const value = e.target.value || null;
    setFilters((prev) => ({
      ...prev,
      violationFilters: {
        ...prev.violationFilters,
        subcode: value
      }
    }));
  };

  return (
    <div className="filter-panel">
      <h3>Code violations</h3>

      <div>
        <label>
          Year filed:
          <select value={vf.year || ""} onChange={handleYearChange}>
            <option value="">All years</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginTop: 8 }}>
        <div>Status:</div>
        {STATUSES.map((s) => (
          <label key={s} style={{ marginRight: 8 }}>
            <input
              type="checkbox"
              checked={vf.status?.includes(s) || false}
              onChange={() => handleStatusChange(s)}
            />
            {s}
          </label>
        ))}
      </div>

      <div style={{ marginTop: 8 }}>
        <label>
          Subcode:
          <select value={vf.subcode || ""} onChange={handleSubcodeChange}>
            <option value="">All subcodes</option>
            {SUBCODES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}