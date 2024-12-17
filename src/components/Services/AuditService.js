// services/auditService.js
import Papa from "papaparse";

export const performAudit = (file, setAuditResult, setPreviousAudits) => {
  Papa.parse(file, {
    header: true,
    complete: (result) => {
      const transactions = result.data;
      let passed = true;
      let report = [];
      let emissionsData = [];

      transactions.forEach((transaction, index) => {
        const co2Emissions = parseFloat(transaction["Emisiones CO2 (kg)"]);
        const description = transaction["description"] || "Sin descripcion";
        const amount = parseFloat(transaction["Monto"]);

        if (!description || isNaN(co2Emissions) || isNaN(amount)) {
          return;
        }

        emissionsData.push({ description, co2Emissions });

        if (co2Emissions > 100) {
          passed = false;
          report.push(`Transacción ${index + 1} (${description}): Emisiones altas (${co2Emissions} kg)`);
        } else {
          report.push(`Transacción ${index + 1} (${description}): Emisiones aceptables (${co2Emissions} kg)`);
        }

        if (description.toLowerCase().includes("solar")) {
          report.push(`Transacción ${index + 1}: Inversión en energía sostenible (${amount} MXN)`);
        }
      });

      const auditResult = { passed, report, emissionsData };
      setAuditResult(auditResult);

      const previousAudits = JSON.parse(localStorage.getItem("audits")) || [];
      previousAudits.push(auditResult);
      localStorage.setItem("audits", JSON.stringify(previousAudits));

      setPreviousAudits(previousAudits);
    },
  });
};
