import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// 📍 Coordenadas do local (Exemplo: Rio de Janeiro)
const position = [-22.9068, -43.1729];

function MapaLocalizacao() {
  return (
    <div className="container text-center mb-4" style={{ marginTop: "20px" }}>
      {/* 📍 Título Centralizado */}
      <h2 style={{ marginBottom: "15px", fontWeight: "bold", color: "#333" }}>
        Onde Estamos 📍
      </h2>
      <p>Endereço: Rua Exemplo, 123, Bairro, Cidade, Estado.</p>

      {/* 🔹 Mapa com tamanho reduzido */}
      <div
        style={{
          width: "100%",
          height: "300px",
          maxWidth: "600px",
          margin: "0 auto",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
          backgroundColor: "#fff",
        }}
      >
        <MapContainer
          center={position}
          zoom={15}
          style={{ width: "100%", height: "100%" }}
        >
          {/* Mapa padrão (OpenStreetMap) */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* 📍 Marcador do local */}
          <Marker position={position}>
            <Popup>
              📍 Estamos aqui! <br /> 2 Corações Gourmet & Fit
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default MapaLocalizacao;
