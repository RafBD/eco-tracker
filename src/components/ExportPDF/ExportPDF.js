import React from "react";
import jsPDF from "jspdf";
import 'jspdf-autotable';

function ExportPDFButton({ auditResult }) {
    const exportPDF = () => {
        const doc = new jsPDF();

        // Título estilizado
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("Reporte de Auditoría Ambiental", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

        // Subtítulo
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("Resumen del reporte:", 10, 40);

        // Contenido del reporte
        doc.setFontSize(10);
        auditResult.report.forEach((line, index) => {
            doc.text(line, 20, 50 + (index * 10));
        });

        // Espacio antes de la tabla
        const tableStartY = 60 + (auditResult.report.length * 10);

        // Tabla con datos de emisiones
        doc.autoTable({
          head: [['Descripción', 'Emisiones CO2 (kg)']],
          body: auditResult.emissionsData.map(data => [data.description, data.co2Emissions.toFixed(2)]),
          startY: tableStartY,
          theme: 'grid',  // Estilo con bordes
          headStyles: { fillColor: [0, 123, 255], textColor: 255 }, // Color de encabezado
          styles: { cellPadding: 3, fontSize: 10, valign: 'middle', halign: 'center' },
        });

        // Pie de página con fecha
        const date = new Date().toLocaleDateString();
        doc.setFontSize(10);
        doc.text(`Fecha de generación: ${date}`, 10, doc.internal.pageSize.getHeight() - 10);

        // Guardar el PDF
        doc.save("auditoria-ambiental.pdf");
    }

    return (
        <button class="button-59" onClick={exportPDF}>
            <span>Exportar a PDF</span>
        </button>
    );
}

export default ExportPDFButton;
