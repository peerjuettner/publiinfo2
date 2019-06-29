import React from "react";
import "./App.css";
import "typeface-roboto";
import AppHeader from "./components/Header/Header";
import PubliInfo from "./publiinfo";
import "../node_modules/leaflet/dist/leaflet.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <PubliInfo />
    </div>
  );
};

export default App;
