"use client";
import { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js";
import localFont from "next/font/local";
import Link from "next/link";

const fontSerif = localFont({ src: "../../fonts/NotoSerifTangut.ttf" });
const fontSageffine = localFont({ src: "../../fonts/Sageffine.otf" });

const trivia = {
  totalPreguntas: 8,
  preguntas: [
    {
      id: 1,
      pregunta: "¿Qué regiones de Argentina son las más famosas por la producción de Malbec?",
      respuestas: [
        "Mendoza", 
        "San Juan", 
        "Salta", 
        "Todas las anteriores"
      ],
      respuestaCorrecta: "Todas las anteriores",
    },
    {
      id: 2,
      pregunta: "¿Qué diferencia hay entre un Malbec joven y un Malbec Reserva?",
      respuestas: [
        "El tiempo de añejamiento en barrica", 
        "La variedad de la uva", 
        "El método de elaboración", 
        "El precio"
      ],
      respuestaCorrecta: "El tiempo de añejamiento en barrica",
    },
    {
      id: 3,
      pregunta: "¿Qué tipos de Malbec existen?",
      respuestas: [
        "Tinto, blanco, rosado", 
        "Dulce, seco, espumoso", 
        "Joven, Reserva, Gran Reserva", 
        "Todas las anteriores"
      ],
      respuestaCorrecta: "Todas las anteriores",
    },
    {
      id: 4,
      pregunta: "¿Cuáles son algunos de los Malbec argentinos más premiados?",
      respuestas: [
        "Catena Zapata Malbec",
        "Rutini Wines Malbec",
        "Norton Malbec",
        "Todos los anteriores",
      ],
      respuestaCorrecta: "Todos los anteriores",
    },
    {
      id: 5,
      pregunta: "¿Por qué el Malbec argentino es tan popular en el mundo?",
      respuestas: [
        "Por su sabor único y distintivo", 
        "Por su relación calidad-precio", 
        "Por ser un vino versátil que marida con muchas comidas", 
        "Todas las anteriores"
      ],
      respuestaCorrecta: "Todas las anteriores",
    },
    {
      id: 6,
      pregunta: "¿Qué factores influyen en el estilo de un Malbec?",
      respuestas: [
        "Clima, suelo, altitud, método de elaboración", 
        "La marca de la bodega", 
        "El precio del vino", 
        "La variedad de la uva"
      ],
      respuestaCorrecta: "Clima, suelo, altitud, método de elaboración",
    },
    {
      id: 7,
      pregunta: "¿Qué es la maceración carbónica y cómo afecta al Malbec?",
      respuestas: [
        "Es un método de elaboración que aporta color y taninos al vino", 
        "Es una técnica de marketing para vender más Malbec", 
        "Es un tipo de uva que se utiliza para hacer Malbec", 
        "Es una enfermedad que afecta a las viñas de Malbec"
      ],
      respuestaCorrecta: "Es un método de elaboración que aporta color y taninos al vino",
    },
    {
      id: 8,
      pregunta: "¿Qué diferencia hay entre un Malbec de Mendoza y un Malbec de San Juan?",
      respuestas: [
        "El clima y el suelo", 
        "La variedad de la uva", 
        "El método de elaboración", 
        "El precio"
      ],
      respuestaCorrecta: "El clima y el suelo",
    },
  ],
};

const Quiz = () => {
  const [preguntaActiva, setPreguntaActiva] = useState(0);

  const [checked, setChecked] = useState(false);

  const [respuestaSeleccionadaIndex, setRespuestaSeleccionadaIndex] =
    useState(null);
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
    setResultado(
      (
        prev // Define prev en 0 cada vez que se use
      ) =>
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
              data: [
                resultado.respuestasCorrectas,
                resultado.respuestasIncorrectas,
              ],
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
      <div className={fontSageffine.className}>
        <div className="absolute top-0 right-0 m-7 text-4xl">
          Trivia{" "}
          <span className="bg-white text-red-900 rounded-md p-2">Malbec</span>
        </div>
      </div>
      <div>
        <div className="">
          {!mostrarResultado ? (
            <div className="w-[100%] md:w-[70%] lg:w-[50%] text-white mt-14 mx-auto p-5">
              {/* <h2 className="font-bold text-2xl">
                Preguntas: {preguntaActiva + 1}{" "}
                <span>/ {preguntas.length}</span>
              </h2> */}
              <div className={fontSerif.className}>
                <h2 className="w-fit bg-white text-red-900 rounded-full font-bold text-xl py-2 px-10 my-2">
                  {preguntaActiva + 1}
                  {"º Pregunta"}
                </h2>
              </div>
              <div className="w-[80%] md:w-[70%] lg:w-[80%]">
                <div className={fontSageffine.className}>
                  <h3 className="text-white text-4xl md:text-5xl lg:text-7xl p-3">
                    {preguntas[preguntaActiva].pregunta}
                  </h3>
                </div>
              </div>
              <div className={fontSerif.className}>
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
                    <button
                      onClick={siguientePregunta}
                      className="btn shadow-glow"
                    >
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
                      className="btn-disabled shadow-glow"
                    >
                      {" "}
                      {preguntaActiva === pregunta.length - 1
                        ? "Finalizar"
                        : "Siguiente"}
                    </button>
                  </div>
                )}
              </div>
              <div className={fontSageffine.className}>
                <div className="text-center">
                  <span className="text-4xl">
                    Seleccione su respuesta<br></br>pulsando el cuadrado
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-[100%] md:w-[70%] lg:w-[35%] backdrop-blur-sm bg-white/[.06] text-white p-5 text-xl border border-white rounded-lg mt-20 mx-auto">
              <div>
                <div className="flex mx-auto mt-4">
                  <div className="pt-0 w-full h-fit mb-6">
                    <canvas id="myChart"></canvas>
                  </div>
                </div>
              </div>

              <div className={fontSerif.className}>
                <h3 className="text-2xl font-bold pl-2">Resultados:</h3>
                <p className="p-2">
                  Respuestas Correctas:{" "}
                  <span className="text-green-500">
                    {resultado.respuestasCorrectas}
                  </span>
                </p>
                <p className="p-2">
                  Respuestas Incorrectas:{" "}
                  <span className="text-red-500">
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
                <div className="btn shadow-glow">
                  <Link href="/" >
                    Volver a Jugar
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
