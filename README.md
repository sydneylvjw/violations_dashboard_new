# Overview
This dashboard was created as a visual tool to see the spatial distribution of residential code enforcement implementation.The violations, represented by the point markers, are overlaid on top of ACS tract-level data. A KPI panel populates pertinent information about the filtered violation as the user adjusts their view.

# Instructions
The user can filter the violations by location, year, type, status, priority, council district, and L&I enforcement district. They also have the option to switch between several ACS metrics, including data on income, poverty, standardized concentration of different racial groups, and housing costs.


# Data
The following data was sourced from the City of Philadelphia via [OpenDataPhilly](www.opendataphilly.org):
- **Violations**: (https://opendataphilly.org/datasets/licenses-and-inspections-code-violations/)
- **2014 L&I Districts**: (https://opendataphilly.org/datasets/licenses-and-inspections-districts/)
- **2024 Council Districts**: (https://opendataphilly.org/datasets/city-council-districts/)

Neighborhood characteristics were pulled from the United States Census 2023 ACS 5-Year Survey. 

This dashboard is a part of a larger project examining residential code enforcement practices across Philadelphia. Feel free to reach out with any questions, comments, or suggestions. 

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Contact
Sydney Jones, MCP/MUSA '27
University of Pennsylvania Weitzman School of Design
[sydneyjw@upenn.edu](mailto: sydneyjw@upenn.edu)

**Note**: ChatGPT was used to assist with the technical development of this project. 
