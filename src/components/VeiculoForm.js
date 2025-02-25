import { useState, useEffect, useRef } from "react";
import API_BASE_URL from "../services/api";
import HeaderAdm from "../components/Headeradm";

function VeiculoForm({ onSubmit }) {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    carName: "",
    description: "",
    price: "",
    year: "",
    brand: "",
    model: "",
    mileage: "",
    color: "",
    options: "",
    images: [],
  });

  const resetForm = () => {
    setFormData({
      carName: "",
      description: "",
      price: "",
      year: "",
      brand: "",
      model: "",
      mileage: "",
      color: "",
      options: "",
      images: [],
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(files),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((image) => data.append("images", image));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      await fetch(`${API_BASE_URL}/api/vehicles`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      alert("✅ Veículo cadastrado com sucesso!");
      resetForm();
      onSubmit();
    } catch (error) {
      alert("❌ Erro ao salvar veículo.");
    }
  };

  return (
    <div className="container mt-4" ref={formRef}>
      <HeaderAdm />
      <h2 className="text-center mb-4">Cadastrar Veículo</h2>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded"
        encType="multipart/form-data"
      >
        <input
          className="form-control mb-2"
          type="text"
          name="carName"
          placeholder="Nome do Veículo"
          value={formData.carName}
          onChange={handleChange}
          required
        />
        <textarea
          className="form-control mb-2"
          name="description"
          placeholder="Descrição"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          type="number"
          name="price"
          placeholder="Valor"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="file"
          name="images"
          onChange={handleChange}
          accept="image/*"
          multiple
        />
        <button type="submit" className="btn btn-primary w-100">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default VeiculoForm;
