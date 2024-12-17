import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'; // Para redirigir
import './FileUploader.css';

function FileUploader({ onFileUpload }) {
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [auditResult, setAuditResult] = useState(null);
  const [previousAudits, setPreviousAudits] = useState([]);
  const fileInputRef = useRef();
  const navigate = useNavigate(); // Hook de navegación

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileData(file);
      onFileUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.add("file-upload-zone-hover");
  };

  const handleDragLeave = (e) => {
    e.target.classList.remove("file-upload-zone-hover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove("file-upload-zone-hover");

    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      setFileData(file);
      onFileUpload(file);
    }
  };

  // Simula la función que realiza la auditoría
  const performAudit = (file, setAuditResult, setPreviousAudits) => {
    // Lógica ficticia para la auditoría (puedes sustituirla con la real)
    const passed = file.size < 1024 * 1024;  // Ejemplo: verifica que el archivo no sea mayor a 1MB
    const report = passed
      ? ["La auditoría fue exitosa. El archivo es válido."]
      : ["La auditoría falló. El archivo es demasiado grande."];

    setAuditResult({ passed, report });
    setPreviousAudits((prev) => [...prev, { fileName: file.name, passed }]);
  };

  const handleAudit = () => {
    if (fileData) {
      performAudit(fileData, setAuditResult, setPreviousAudits);
      navigate('/dashboard'); // Redirige a la página de dashboard
    } else {
      setAuditResult({ passed: false, report: ["No se subió ningún archivo"] });
    }
  };

  return (
    <div>
      <div
      className="file-upload-zone"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
    >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="file-input"
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <p>{fileName ? `Archivo seleccionado: ${fileName}` : "Arrastra y suelta tu archivo CSV aquí o haz clic para seleccionar uno"}</p>

        {/* Mostrar resultado de auditoría si existe */}
        {auditResult && (
          <div>
            <h4>Resultados de Auditoría:</h4>
            <ul>
              {auditResult.report.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    {/* Botón para realizar la auditoría */}
      <button className="audit" onClick={handleAudit} >
        <span>Realizar Auditoría</span>
      </button>
    </div>

  );
}

export default FileUploader;
