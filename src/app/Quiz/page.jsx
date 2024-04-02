"use client";
import { useState } from "react";

const trivia = {
  totalPreguntas: 5,
  preguntas: [
    {
      id: 1,
      pregunta: "¿Cuál es la capital de Francia?",
      respuestas: ["Madrid", "Berlín", "París", "Londres"],
      respuestaCorrecta: "París",
    },
    {
      id: 2,
      pregunta: "¿Cuál es la fruta que contiene potasio?",
      respuestas: ["Frutilla", "Naranja", "Banana", "Manzana"],
      respuestaCorrecta: "Banana",
    },
    {
      id: 3,
      pregunta: "¿Cuál es el resultado de 2 + 2?",
      respuestas: ["3", "4", "5", "6"],
      respuestaCorrecta: "4",
    },
    {
      id: 4,
      pregunta: "¿Quién escribió 'Don Quijote de la Mancha'?",
      respuestas: [
        "Miguel de Cervantes",
        "Gabriel García Márquez",
        "William Shakespeare",
        "Leo Tolstoy",
      ],
      respuestaCorrecta: "Miguel de Cervantes",
    },
    {
      id: 5,
      pregunta: "¿Cuál es el mejor vino Argentino?",
      respuestas: ["Filipino", "Tauren", "Cosecha Temprana", "Malbec"],
      respuestaCorrecta: "Malbec",
    },
  ],
};

const Quiz = () => {
  const [preguntaActiva, setPreguntaActiva] = useState(0);

  const [checked, setChecked] = useState(false);

  const [respuestaSeleccionadaIndex, setRespuestaSeleccionadaIndex] = useState(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState("");

  const mostrarGrafico = (contenedor) => {
    var ctx = document.createElement("canvas");
    ctx.style.width = "40%"; // Establecer el ancho al 40%
    ctx.style.margin = "auto"; // Centrar horizontalmente
    contenedor.appendChild(ctx);

    var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
          // labels: ['Correctas', 'Incorrectas'],
          datasets: [{
              label: 'Resultados',
              data: [resultado.respuestasCorrectas, resultado.respuestasIncorrectas],
              backgroundColor: [
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
          }]
      },
    });
  };

  const [resultado, setResultado] = useState({
    puntaje: 0,
    respuestasCorrectas: 0,
    respuestasIncorrectas: 0,
  });

  const [mostrarResultado, setMostrarResultado] = useState(false);

  const { preguntas } = trivia;
  const { pregunta, respuestas, respuestaCorrecta } = preguntas[preguntaActiva];

  //   Respuesta seleccionada y checkeada
  const onRespuestaSeleccionada = (respuesta, idx) => {
    setChecked(true);
    setRespuestaSeleccionadaIndex(idx);
    if (respuesta === respuestaCorrecta) {
      setRespuestaSeleccionada(true);
      //   console.log("true");
    } else {
      setRespuestaSeleccionada(false);
      //   console.log("false");
    }
  };

  //   Calcula el puntaje y cambia a la siguiente pregunta
  const siguientePregunta = () => {
    setRespuestaSeleccionadaIndex(null);
    setResultado((prev) => // Define prev en 0 cada vez que se use
      respuestaSeleccionada
        ? {
            ...prev, // Setea prev con los datos previos de resultado
            puntaje: prev.puntaje + 5,
            respuestasCorrectas: prev.respuestasCorrectas + 1,
          }
        : {
            ...prev,
            respuestasIncorrectas: prev.respuestasIncorrectas + 1,
          }
    );
    if (preguntaActiva !== preguntas.length - 1) {
      setPreguntaActiva((prev) => prev + 1);
    } else {
      setPreguntaActiva(0);
      setMostrarResultado(true);
    }
    setChecked(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-5 ">
      <div>
        <div className="py-5">
          <h1 className="font-bold text-5xl text-center">Trivia Malbec</h1>
        </div>

        <div className="">
          {!mostrarResultado ? (
            <div className="bg-white text-black p-5 rounded-md">
              <h2 className="font-bold text-2xl">
                Preguntas: {preguntaActiva + 1}{" "}
                <span>/ {preguntas.length}</span>
              </h2>
              <h3 className="text-black font-bold text-2xl p-3">
                {preguntas[preguntaActiva].pregunta}
              </h3>
              {respuestas.map((respuesta, idx) => (
                <li
                  key={idx}
                  onClick={() => onRespuestaSeleccionada(respuesta, idx)}
                  className={
                    respuestaSeleccionadaIndex === idx
                      ? "li-selected"
                      : "li-hover"
                  }
                >
                  <span>{respuesta}</span>
                </li>
              ))}
              {checked ? (
                <div className="w-full">
                  <button onClick={siguientePregunta} className="btn">
                    {preguntaActiva === pregunta.length - 1
                      ? "Finalizar"
                      : "Siguiente"}
                  </button>
                </div>
              ) : (
                <div className="w-full">
                  <button
                    onClick={siguientePregunta}
                    disabled
                    className="btn-disabled"
                  >
                    {" "}
                    {preguntaActiva === pregunta.length - 1
                      ? "Finalizar"
                      : "Siguiente"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white text-black p-5 text-xl">
              <h3 className="text-2xl font-bold">Resultados:</h3>



              <h3 className="p-2">
                Nota:{" "}
                <span className="text-sky-400">
                  {(resultado.puntaje / 25) * 100}/100
                </span>
              </h3>
              <p className="p-2">
                Preguntas:{" "}
                <span className="text-sky-400">{preguntas.length}</span>
              </p>
              <p className="p-2">
                Puntaje:{" "}
                <span className="text-sky-400">{resultado.puntaje}</span>
              </p>
              <p className="p-2">
                Respuestas Correctas:{" "}
                <span className="text-green-400">
                  {resultado.respuestasCorrectas}
                </span>
              </p>
              <p className="p-2">
                Respuestas Incorrectas:{" "}
                <span className="text-red-400">
                  {resultado.respuestasIncorrectas}
                </span>
              </p>
              <button className="btn" onClick={() => window.location.reload()}>
                Reiniciar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
