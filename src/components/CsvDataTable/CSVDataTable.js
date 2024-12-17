// components/CSVDataTable.js
import React from 'react';

function CSVDataTable({ emissionsData }) {
  return (
    <div>
      <h3>Datos de Emisiones del CSV</h3>
      <table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Emisiones CO2 (kg)</th>
          </tr>
        </thead>
        <tbody>
          {emissionsData.map((data, index) => (
            <tr key={index}>
              <td>{data.description}</td>
              <td>{data.co2Emissions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CSVDataTable;
