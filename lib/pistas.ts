export type Pista = {
  id: number
  titulo: string
  descripcion: string
  acertijo: string
  pista_extra: string
  respuesta: string   
  esUltima: boolean
}

export const pistas: Pista[] = [
  {
    id: 1,
    titulo: "Primera pista 🗝️",
    descripcion: "Con la salida planeada, quise hacer una pequeña trivia c:",
    acertijo: "¿De que color son nuestros gatitos en minecraft?",
    pista_extra: "Hint: Ambos son del mismo color 🐱",
    respuesta: "blanco",       
    esUltima: false,
  },
  {
    id: 2,
    titulo: "Pista 2 🔍",
    descripcion: "Muy bien, Siguiente pregunta",
    acertijo: "¿Cómo se llama la canción de la que más hablamos en nuestro primer jam de spoty? ",
    pista_extra: "Hint: Es de Childish Gambino 🎵",
    respuesta: "heartbeat",   
    esUltima: false,
  },
  {
    id: 3,
    titulo: "Última pista",
    descripcion: "Una pregunta más",
    acertijo: "¿Qué jugamos la primera vez que hablamos por discord?",
    pista_extra: "Combinamos skins desde ese día 👀",
    respuesta: "fortnite",       
    esUltima: true,
  },
]