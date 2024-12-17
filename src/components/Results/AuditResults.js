// components/AuditPage.js
import React, { useState, useEffect } from "react";
import FileUploader from "../FileUploader/FileUploader";
import AuditResults from "../Results/AuditResults";
import ComparisonTable from "../ComparisonTable/ComparisonTable";
import { performAudit } from "../Services/AuditService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes necesarios de chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AuditPage() {
  const [file, setFile] = useState(null);
  const [auditResult, setAuditResult] = useState(null);
  const [previousAudits, setPreviousAudits] = useState([]);
  const [comparisonResult, setComparisonResult] = useState(null);

  useEffect(() => {
    const storedAudits = JSON.parse(localStorage.getItem("audits")) || [];
    setPreviousAudits(storedAudits);
  }, []);

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
  };

  const handleAudit = () => {
    if (file) {
      performAudit(file, (result) => {
        setAuditResult(result);
        setPreviousAudits((prev) => [...prev, result]);
        // Guardar el resultado de la auditoría en localStorage
        localStorage.setItem("latestAuditResult", JSON.stringify(result));
        setTimeout(() => {
          window.location.href = "/dashboard"; // Redirigir al dashboard
        }, 1000); // Esperar 1 segundo antes de redirigir
      });
    } else {
      setAuditResult({ passed: false, report: ["No se subió ningún archivo"] });
    }
  };
  

  const handleCompareAudits = (audit1, audit2) => {
    if (!audit1 || !audit2) return;
    const comparison = audit1.emissionsData.map((data1, index) => {
      const data2 = audit2.emissionsData[index];
      return {
        description: data1.description,
        audit1Emissions: data1.co2Emissions,
        audit2Emissions: data2 ? data2.co2Emissions : "N/A",
      };
    });
    setComparisonResult(comparison);
  };

  return (
    <div className="audit-container">
      <h1>Auditoría Ambiental</h1>
      <FileUploader onFileUpload={handleFileUpload} />
      {auditResult && <AuditResults auditResult={auditResult} />}

      {previousAudits.length > 1 && (
        <ComparisonTable
          previousAudits={previousAudits}
          onCompareAudits={handleCompareAudits}
          comparisonResult={comparisonResult}
        />
      )}
    </div>
  );
}

export default AuditPage;
