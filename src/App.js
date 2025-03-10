import React, { useState } from "react";

const App = () => {
  const [cep, setCep] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cep || cep.length !== 8) {
      alert("Insira um CEP válido com 8 dígitos.");
      return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.erro) {
        setResult("CEP não encontrado.");
      } else {
        setResult(
          <div>
            <p><strong>CEP:</strong> {data.cep}</p>
            <p><strong>Logradouro:</strong> {data.logradouro}</p>
            <p><strong>Bairro:</strong> {data.bairro}</p>
            <p><strong>Cidade:</strong> {data.localidade}</p>
            <p><strong>Estado:</strong> {data.uf}</p>
          </div>
        );
      }
    } catch (error) {
      setResult("Ocorreu um erro. Tente novamente.");
      console.error("Erro:", error);
    }
  };

  return (
    <div className="app">
      <form id="cepForm" onSubmit={handleSubmit}>
        <label htmlFor="cep">Digite o CEP:</label>
        <input
          type="text"
          id="cep"
          name="cep"
          placeholder="Ex: 01001-000"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          required
        />
        <button type="submit">Consultar</button>
      </form>

      <div id="result" className="result">
        {result}
      </div>
    </div>
  );
};

export default App;
