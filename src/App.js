// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/TopBar/TopBar";
import Home from "./components/Home/Home";
import AuditPage from "./components/Results/AuditResults";
import Dashboard from "./components/Dashboard/DashBoard";
import FileUpload from "./components/FileUploader/FileUploader";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/fileUpload" element={<FileUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
