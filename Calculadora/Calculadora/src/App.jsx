import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [input, setInput] = useState("");
  const [esResultado, setEsResultado] = useState(false);
  // localStorage.setItem(fechaHora, datos);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("historial")) || [];
    setHistorial(data);
  }, []);

  const handleClick = (value) => {
    const operadores = ["+", "-", "*", "/"];

    if (input === "Error") {
      setInput(value);
      setEsResultado(false);
      return;
    }

    if (esResultado) {
      if (operadores.includes(value)) {
        setInput(input + value);
      } else {
        setInput(value);
      }
      setEsResultado(false);
      return;
    }

    setInput(input + value);
  };

  const clear = () => {
    setInput("");
  };

  const borrar = () => {
    setInput(input.slice(0, -1));
  }; 
  
  const hora = () => {
    const ahora = new Date();

    const dia = ahora.getDate();
    const mes = ahora.getMonth() + 1; // arranca en 0
    const anio = ahora.getFullYear();

    const horas = ahora.getHours();
    const minutos = ahora.getMinutes();
    const segundos = ahora.getSeconds();

    const fechaHora = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
    return fechaHora;
    // console.log(fechaHora);
  };

  const guardardatos = (cuenta, value) => {
    const registro = {
      cuenta,
      resultado: value,
      fecha: hora()
    };

    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.unshift(registro); 
    localStorage.setItem("historial", JSON.stringify(historial));
  };

  const calculate = () => {
    try {
      const res = eval(input).toString();
      setInput(res);
      guardardatos(input, res);

      const data = JSON.parse(localStorage.getItem("historial")) || [];
      setHistorial(data);

      setEsResultado(true);
    } catch {
      setInput("Error");
      setEsResultado(true);
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <input type="text" value={input} readOnly />

        <div className="buttons">
          <button onClick={clear}>C</button>
          <button onClick={() => handleClick("/")}>/</button>
          <button onClick={() => handleClick("*")}>*</button>
          <button onClick={() => handleClick("-")}>-</button>

          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("+")}>+</button>

          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={calculate}>=</button>

          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>

          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button onClick={borrar}>⌫</button>
        </div>
      </div>
      <div className="historial">
        <h3>Historial</h3>
        {historial.length === 0 ? (
          <p>No hay cálculos</p>
        ) : (
          historial.map((item, index) => (
            <div key={index} className="item">
              <span>{item.cuenta} = {item.resultado}</span>
              <small>{item.fecha}</small>
            </div>
          ))
        )}
      </div>
    </div>
    
  );
}

export default App;