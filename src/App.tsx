import React from "react";
import Portfolio from "./Portfolio.tsx";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Portfolio />
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 
                bg-yellow-600 text-white px-6 py-3 rounded-xl shadow-xl 
                animate-pulse transition-all duration-150 z-50"
      >
        ⚠️ UNDER MAINTENANCE
      </div>
    </div>
  );
};

export default App;
