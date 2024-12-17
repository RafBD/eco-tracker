// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import CSVDataTable from '../CsvDataTable/CSVDataTable';
import EmissionChart from '../Charts/EmissionChart';

function Dashboard() {
  const [emissionsData, setEmissionsData] = useState(null);

  useEffect(() => {
    // Cargar el resultado de la última auditoría del localStorage
    const storedAuditResult = JSON.parse(localStorage.getItem("latestAuditResult"));
    if (storedAuditResult) {
      setEmissionsData(storedAuditResult.emissionsData);
    }
  }, []);

  return (
    <div className="dashboard">
      <h1>Resultados de la Auditoría</h1>
      {emissionsData ? (
        <>
          <CSVDataTable emissionsData={emissionsData} />
          <EmissionChart emissionsData={emissionsData} />
        </>
      ) : (
        <p>No hay resultados disponibles. Realiza una auditoría primero.</p>
      )}
    </div>
  );
}

export default Dashboard;
