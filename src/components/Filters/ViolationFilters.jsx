// these are the filters for violations based on type, severity, date range, etc.

const YEARS = [
  2010, 2011, 2012, 2013, 2014, 2015, 2016,
  2017, 2018, 2019, 2020, 2021, 2022, 2023,
];

const STATUSES = [
  "CANCELLED",
  "CLOSED",
  "COMPLIED, BALANCE DUE",
  "IN VIOLATION",
  "IN VIOLATION - COURT",
  "STOP WORK",
  "SVN ISSUED, BALANCE DUE",
  "UNDER INVESTIGATION",
  "UNSPECIFIED (no status)",
];

const INSPECTDIST = [
  "NORTH",
  "CENTRAL EAST",
  "EAST",
  "SOUTH",
  "CENTRAL WEST",
];

const RESOLUTIONCODE = [
  "CLOSED - ADMINISTRATIVELY",
  "CLOSED - APPEAL SUSTAINED",
  "CLOSED - REISSUED/REWRITTEN",
  "CLOSED - STOP PROCESSING",
  "CLOSED - WRITTEN IN ERROR",
  "COMPLIED - BY ENFORCEMENT ACTION",
  "COMPLIED - LICENSE/CERTIFICATE/REPORT OBTAINED",
  "COMPLIED - OWNER DEMOLITION",
  "COMPLIED - PERMIT OBTAINED",
  "COMPLIED - VARIANCE GRANTED",
  "CVN ISSUED",
  "SVN ISSUED",
  "WARNING ISSUED",
  "UNRESOLVED (no status)",
];

const PRIORITY = [
  "5 DAY REVIEW GROUP",
  "ACCELERATED REVIEW",
  "AIU LICENSING VIOLATION NOTICE",
  "CONSTRUCTION SERVICES",
  "STANDARD",
  "UNFIT",
  "UNLAWFUL",
  "UNSAFE",
  "HAZARDOUS",
  "IMMINENTLY DANGEROUS",
  "UNSPECIFIED (no status)",
];

export default function ViolationFilters({ filters, setFilters }) {
  const vf = filters.violationFilters;

  // YEARS -> filters.violationFilters.YEARS
const handleYearChange = (e) => {
  const value = e.target.value ? Number(e.target.value) : null;
  setFilters((prev) => ({
    ...prev,
    violationFilters: {
      ...prev.violationFilters,
      YEARS: value,
    },
  }));
  };

  // STATUSES -> filters.violationFilters.STATUSES (array)
  const handleStatusChange = (status) => {
    setFilters((prev) => {
      const current = prev.violationFilters.STATUSES || [];
      const exists = current.includes(status);
      const updated = exists
        ? current.filter((s) => s !== status)
        : [...current, status];

      return {
        ...prev,
        violationFilters: {
          ...prev.violationFilters,
          STATUSES: updated,
        },
      };
    });
  };

  // INSPECTDIST -> filters.violationFilters.INSPECTDIST
  const handleInspectDistChange = (e) => {
    const value = e.target.value || null;
    setFilters((prev) => ({
      ...prev,
      violationFilters: {
        ...prev.violationFilters,
        INSPECTDIST: value,
      },
    }));
  };

  // RESOLUTIONCODE -> filters.violationFilters.RESOLUTIONCODE
  const handleResolutionCodeChange = (e) => {
    const value = e.target.value || null;
    setFilters((prev) => ({
      ...prev,
      violationFilters: {
        ...prev.violationFilters,
        RESOLUTIONCODE: value,
      },
    }));
  };

  // PRIORITY -> filters.violationFilters.PRIORITY
  const handlePriorityChange = (e) => {
    const value = e.target.value || null;
    setFilters((prev) => ({
      ...prev,
      violationFilters: {
        ...prev.violationFilters,
        PRIORITY: value,
      },
    }));
  };

  return (
    <div className="filter-panel">
      <h3>Code violations</h3>

      {/* Year filter */}
      <div>
        <label>
          Year filed:
          <select value={vf.YEARS || ""} onChange={handleYearChange}>
            <option value="">All years</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Status checkboxes */}
      <div style={{ marginTop: 8 }}>
        <div>Violation Status:</div>
        {STATUSES.map((s) => (
          <label key={s} style={{ marginRight: 8 }}>
            <input
              type="checkbox"
              checked={vf.STATUSES?.includes(s) || false}
              onChange={() => handleStatusChange(s)}
            />
            {s}
          </label>
        ))}
      </div>

      {/* L&I Inspection District */}
      <div style={{ marginTop: 8 }}>
        <label>
          L&I Inspection District:
          <select
            value={vf.INSPECTDIST || ""}
            onChange={handleInspectDistChange}
          >
            <option value="">All districts</option>
            {INSPECTDIST.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Violation Resolution Code */}
      <div style={{ marginTop: 8 }}>
        <label>
          Violation Resolution Code:
          <select
            value={vf.RESOLUTIONCODE || ""}
            onChange={handleResolutionCodeChange}
          >
            <option value="">All codes</option>
            {RESOLUTIONCODE.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Priority */}
      <div style={{ marginTop: 8 }}>
        <label>
          Case Priority:
          <select value={vf.PRIORITY || ""} onChange={handlePriorityChange}>
            <option value="">All priorities</option>
            {PRIORITY.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}