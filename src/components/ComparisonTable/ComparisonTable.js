// components/ComparisonTable.js
import React from "react";
// import '../styles/CompareButton.css'

function ComparisonTable({ previousAudits, onCompareAudits, comparisonResult }) {
  const handleCompare = () => {
    if (previousAudits.length < 2) return; // Necesitamos al menos 2 auditorías para comparar
    const audit1 = previousAudits[previousAudits.length - 2];
    const audit2 = previousAudits[previousAudits.length - 1];
    onCompareAudits(audit1, audit2);
  };

  return (
    <div className="comparison-container">
      <h2 className="titulo">Comparación de Auditorías</h2>
      {previousAudits.length >= 2 && (
        <button class="compare-button" onClick={handleCompare}>
          <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="black"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-git-compare"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M18 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M11 6h5a2 2 0 0 1 2 2v8" /><path d="M14 9l-3 -3l3 -3" /><path d="M13 18h-5a2 2 0 0 1 -2 -2v-8" /><path d="M10 15l3 3l-3 3" /></svg>
        <span class="lable">Comparar auditorías</span>
      </button>
      )}

      {comparisonResult && (
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Emisiones Auditoría 1</th>
              <th>Emisiones Auditoría 2</th>
            </tr>
          </thead>
          <tbody>
            {comparisonResult.map((data, index) => (
              <tr key={index}>
                <td>{data.description}</td>
                <td>{data.audit1Emissions}</td>
                <td>{data.audit2Emissions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ComparisonTable;
