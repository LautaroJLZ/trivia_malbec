"use client";
import { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js";

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

  const [resultado, setResultado] = useState({
    puntaje: 0,
    respuestasCorrectas: 0,
    respuestasIncorrectas: 0,
  });

  const [mostrarResultado, setMostrarResultado] = useState(false);

  const { preguntas } = trivia;
  const { pregunta, respuestas, respuestaCorrecta } = preguntas[preguntaActiva];
  const chartRef = useRef(null); // Referencia al gráfico

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

  const updateChart = () => {
    if (chartRef.current) {
      chartRef.current.data.datasets[0].data = [
        resultado.respuestasCorrectas,
        resultado.respuestasIncorrectas,
      ];
      chartRef.current.update();
    }
  };

  useEffect(() => {
    const chartElement = document.getElementById("myChart");
    if (chartElement) {
      var ctx = chartElement.getContext("2d");
      chartRef.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Correctas", "Incorrectas"],
          datasets: [
            {
              data: [resultado.respuestasCorrectas, resultado.respuestasIncorrectas],
              borderColor: ["rgb(75, 192, 192)", "rgb(255, 99, 132)"],
              backgroundColor: ["rgb(75, 192, 192 )", "rgb(255, 99, 132)"],
              borderWidth: 2,
            },
          ],
        },
        options: {
          cutoutPercentage: 70,
          legend: {
            display: false, // Oculta las leyendas
          },
        },
      });
    }
  
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [resultado]);
  

  // Dependencia vacía para que se ejecute solo una vez

  useEffect(() => {
    updateChart();
  }, [resultado]); // Se ejecuta cada vez que cambia el resultado

  return (
    <div className="bg-[url('../views/img/bg_uvas_rojo.jpg')] justify-center items-center min-h-screen p-5 ">
      <div className="absolute top-0 right-0 m-7 text-2xl">
        Trivia <span className="bg-white text-red-700 rounded-md p-2">Malbec</span>
      </div>
      <div>
        <div className="">
          {!mostrarResultado ? (
            <div className="w-[55%] text-white mx-auto my-5 p-5">
              {/* <h2 className="font-bold text-2xl">
                Preguntas: {preguntaActiva + 1}{" "}
                <span>/ {preguntas.length}</span>
              </h2> */}
              <h2 className="w-fit bg-white text-red-700 rounded-full text-lg py-2 px-10">
                {preguntaActiva + 1}{"º Pregunta"}
              </h2>
              <div className="w-[70%]">
                <h3 className="text-white font-bold text-5xl p-3">
                  {preguntas[preguntaActiva].pregunta}
                </h3>
              </div>
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
            <div className="w-[35%] backdrop-blur-sm bg-white/[.06] text-white p-5 text-xl border border-white rounded-lg mx-auto">
              <div>
                <div className="flex mx-auto my-auto">
                  <div className="pt-0 w-full h-fit mb-6">
                    <canvas id="myChart"></canvas>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold">Resultados:</h3>
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
                <h3 className="p-2">
                  Nota:{" "}
                  <span className="text-sky-400">
                    {(resultado.puntaje / 25) * 100}/100
                  </span>
                </h3>
                {/* <p className="p-2">
                  Preguntas:{" "}
                  <span className="text-sky-400">{preguntas.length}</span>
                </p> */}
                <p className="p-2">
                  Puntaje:{" "}
                  <span className="text-sky-400">{resultado.puntaje}</span>
                </p>
                
                <button
                  className="btn"
                  onClick={() => window.location.reload()}
                >
                  Reiniciar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
