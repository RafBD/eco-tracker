// services/csvParser.js
export function parseCSV(csvData) {
    const lines = csvData.split("\n");
    const result = [];
    
    // Asume que la primera fila es el encabezado
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",");
      if (row.length > 1) { // Asegurarse de que no haya filas vacías
        result.push({
          description: row[0].trim(),
          co2Emissions: parseFloat(row[1].trim())
        });
      }
    }
  
    return result;
  }
  