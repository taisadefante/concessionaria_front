import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sobre from "./pages/Sobre";
import Veiculos from "./pages/veiculos";
import AdmVeiculos from "./pages/admVeiculos";
import PrivateRoute from "./routes/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/veiculos" element={<Veiculos />} />
        <Route path="/login" element={<Login />} />
        {/* Protegendo a rota /admveiculos */}
        <Route
          path="/admveiculos"
          element={
            <PrivateRoute>
              <AdmVeiculos />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
