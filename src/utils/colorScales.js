// this utility function returns a d3 color scale based on the selected acs attribute

// export function getColorScale(variable) {
//   // TODO: return a d3 color scale based on ACS variable
//   return () => "#cccccc"; // placeholder
// }  <-- I don't want to delete this just yet--I think the code below does the same thing but with actual color scales, but I'll leave it until I am completely sure.

// Simple, hand-rolled color scale for now.
// You can swap this for d3-scale later.

const incomeBreaks = [0, 25000, 40000, 60000, 80000, 100000];

const incomeColors = [
  "#f7fbff",
  "#deebf7",
  "#c6dbef",
  "#9ecae1",
  "#6baed6",
  "#3182bd"
];

export const getColorScale = (variable) => {
  // For now, we only know about "median_income"
  // You can expand this later with a switch/case.

  if (variable === "median_income") {
    return (value) => {
      if (value == null) return "#cccccc";

      for (let i = incomeBreaks.length - 1; i >= 0; i--) {
        if (value >= incomeBreaks[i]) {
          return incomeColors[i];
        }
      }
      return incomeColors[0];
    };
  }

  // Default: gray
  return () => "#cccccc";
}

export function getLegendBins(variable) {
  if (variable === "median_income") {
    return incomeBreaks.map((b, i) => ({
      label:
        i === incomeBreaks.length - 1
          ? `$${b}+`
          : `$${b}–$${incomeBreaks[i + 1]}`,
      color: incomeColors[i]
    }));
  }

  return [];
}