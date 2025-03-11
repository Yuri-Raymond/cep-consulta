import React, { useState } from "react";
import "./style.css";

function App() {
  const [cep, setCep] = useState("");
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState("");

  const buscarCep = async (e) => {
    e.preventDefault();
    setErro("");
    setDados(null);

    const cepFormatado = cep.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cepFormatado.length !== 8) {
      setErro("O CEP deve ter 8 dígitos.");
      return;
    }

    try {
      const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cepFormatado}`);
      const data = await response.json();

      if (data.hasOwnProperty("erro")) {
        setErro("CEP não encontrado.");
      } else {
        setDados(data);
      }
    } catch {
      setErro("Erro ao buscar o CEP. Tente novamente mais tarde.");
    }
  };

  return (
    <div>
      <header>
        <h1>PROJETO CEP</h1>
      </header>

      <div className="container">
        <main>
          <form onSubmit={buscarCep}>
            <input
              type="text"
              placeholder="Digite o CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              maxLength="9"
              required
            />
            <button type="submit">Consultar</button>
          </form>

          {erro && <p className="erro">{erro}</p>}

          {dados && (
            <div className="resultado">
              <p><strong>CEP:</strong> {dados.cep}</p>
              <p><strong>Logradouro:</strong> {dados.street}</p>
              <p><strong>Bairro:</strong> {dados.neighborhood}</p>
              <p><strong>Cidade:</strong> {dados.city}</p>
              <p><strong>Estado:</strong> {dados.state}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
