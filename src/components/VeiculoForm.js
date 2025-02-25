import { useState, useEffect, useRef } from "react";
import API_BASE_URL from "../services/api";

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
      setFormData({
        ...editingVeiculo,
        images: [],
      });

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
    if (files) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)],
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
      if (editingVeiculo) {
        await fetch(`${API_BASE_URL}/api/vehicles/${editingVeiculo.id}`, {
          method: "PUT",
          body: data,
        });
        alert("✅ Veículo atualizado com sucesso!");
      } else {
        await fetch(`${API_BASE_URL}/api/vehicles`, {
          method: "POST",
          body: data,
        });
        alert("✅ Veículo cadastrado com sucesso!");
      }

      resetForm(); // 🔹 Limpa o formulário após o envio
      onSubmit(); // 🔹 Atualiza a lista de veículos
    } catch (error) {
      alert("❌ Erro ao salvar veículo.");
    }
  };

  return (
    <div className="container mt-4" ref={formRef}>
      <h3 className="text-center">
        {editingVeiculo ? "Editar Veículo" : "Cadastrar Veículo"}
      </h3>
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
        />
        <input
          className="form-control mb-2"
          type="number"
          name="year"
          placeholder="Ano"
          value={formData.year}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          type="text"
          name="brand"
          placeholder="Marca"
          value={formData.brand}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          type="text"
          name="model"
          placeholder="Modelo"
          value={formData.model}
          onChange={handleChange}
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
        <label className="form-label">
          Imagens do Veículo (Múltiplas imagens permitidas)
        </label>
        <input
          className="form-control mb-3"
          type="file"
          name="images"
          onChange={handleChange}
          accept="image/*"
          multiple
        />

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            {editingVeiculo ? "Atualizar" : "Cadastrar"}
          </button>
          {editingVeiculo && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default VeiculoForm;
