import { useState, useEffect, useRef } from "react";
import API_BASE_URL from "../services/api";
import HeaderAdm from "../components/Headeradm";

function VeiculoForm({ onSubmit, editingVeiculo, setEditingVeiculo }) {
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

  useEffect(() => {
    if (editingVeiculo) {
      setFormData({ ...editingVeiculo, images: [] });
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } else {
      resetForm();
    }
  }, [editingVeiculo]);

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
    setEditingVeiculo(null);
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
      const response = await fetch(`${API_BASE_URL}/api/vehicles`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      alert("✅ Veículo cadastrado com sucesso!");
      resetForm();
      onSubmit();
    } catch (error) {
      console.error("❌ Erro ao salvar veículo:", error);
      alert("❌ Erro ao salvar veículo: " + error.message);
    }
  };

  return (
    <div className="container mt-4" ref={formRef}>
      <HeaderAdm />
      <h2
        style={{
          marginBottom: "15px",
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
        }}
      >
        Cadastrar Veículo{" "}
      </h2>
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
          type="number"
          name="year"
          placeholder="Ano"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="text"
          name="brand"
          placeholder="Marca"
          value={formData.brand}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="text"
          name="model"
          placeholder="Modelo"
          value={formData.model}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="number"
          name="mileage"
          placeholder="Quilometragem"
          value={formData.mileage}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          type="text"
          name="color"
          placeholder="Cor"
          value={formData.color}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          type="text"
          name="options"
          placeholder="Opcionais"
          value={formData.options}
          onChange={handleChange}
        />

        <label className="form-label">Imagens do Veículo</label>
        <input
          className="form-control mb-3"
          type="file"
          name="images"
          onChange={handleChange}
          accept="image/*"
          multiple
        />

        <button type="submit" className="btn btn-primary w-100">
          {editingVeiculo ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

export default VeiculoForm;
