"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { pistas } from "@/lib/pistas"

// Misma config de partículas que en la invitación
const PARTICLE_CONFIG = [
  [7,  0,   14, 10], [14, 2.5, 18, 8 ], [23, 5,   12, 12],
  [33, 1,   16, 9 ], [47, 3.5, 20, 7 ], [54, 0.5, 15, 11],
  [63, 4,   13, 8 ], [71, 2,   17, 10], [80, 1.5, 19, 7 ],
  [89, 3,   14, 9 ], [41, 6,   22, 8 ], [59, 4.5, 16, 10],
]

export default function PistaCliente({ id }: { id: number }) {
  const [input, setInput]   = useState("")
  const [error, setError]   = useState(false)
  const [solved, setSolved] = useState(false)
  const router              = useRouter()

  const pista = pistas.find((p) => p.id === id)

  useEffect(() => {
    if (!pista) router.replace("/pista/1")
  }, [pista, router])

  if (!pista) return null

  const nextPath = pista.esUltima ? "/invitacion" : `/pista/${id + 1}`

  const handleCheck = () => {
    if (input.trim().toLowerCase() === pista.respuesta) {
      setSolved(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <main style={{
      position: "relative",
      minHeight: "100svh",
      overflowX: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingTop:    "max(env(safe-area-inset-top), 48px)",
      paddingBottom: "max(env(safe-area-inset-bottom), 48px)",
      paddingLeft:   "max(env(safe-area-inset-left),  24px)",
      paddingRight:  "max(env(safe-area-inset-right), 24px)",
    }}>

      {/* Glow de fondo */}
      <div style={{ pointerEvents: "none", position: "fixed", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "15%", left: "50%",
          width: "min(500px, 130vw)", height: "min(500px, 130vw)",
          background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
          borderRadius: "50%", transform: "translateX(-50%)",
        }} />
      </div>

      {/* Partículas flotantes */}
      <div style={{ pointerEvents: "none", position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
        {PARTICLE_CONFIG.map(([left, delay, duration, size], i) => (
          <span key={i} className="particle" style={{
            left:              `${left}%`,
            animationDelay:    `${delay}s`,
            animationDuration: `${duration}s`,
            fontSize:          `${size}px`,
          }}>✦</span>
        ))}
      </div>

      <div style={{
        position: "relative", zIndex: 10,
        width: "100%", maxWidth: "440px",
        display: "flex", flexDirection: "column", gap: "28px",
      }}>

        {/* Progress dots */}
        <div className="fade-in" style={{ display: "flex", gap: "8px", justifyContent: "center", alignItems: "center" }}>
          {pistas.map((p) => (
            <div key={p.id} style={{
              width:        p.id === id ? "28px" : "8px",
              height:       "8px",
              borderRadius: "4px",
              background:   p.id <= id ? "var(--gold)" : "rgba(201,168,76,0.18)",
              transition:   "all 0.4s ease",
            }} />
          ))}
        </div>

        {/* Badge */}
        <p className="fade-in" style={{
          textAlign: "center", fontSize: "10px",
          letterSpacing: "0.38em", color: "var(--gold)", textTransform: "uppercase",
        }}>
          ✦ Trivia ✦
        </p>

        {/* Título */}
        <h1 className="fade-in-d1 serif glow-text" style={{
          textAlign: "center",
          fontSize: "clamp(1.9rem, 9vw, 2.8rem)",
          fontWeight: 300, fontStyle: "italic", lineHeight: 1.1,
          color: "var(--text)",
        }}>
          {pista.titulo}
        </h1>

        {/* Descripción */}
        <p className="fade-in-d1 serif" style={{
          textAlign: "center", fontSize: "clamp(0.95rem, 4vw, 1.05rem)",
          fontStyle: "italic", fontWeight: 300,
          color: "var(--text-muted)", lineHeight: 1.75,
        }}>
          {pista.descripcion}
        </p>

        {/* Divider */}
        <div className="fade-in-d2 ornament">
          <div className="ornament-line ornament-line-left" />
          <span style={{ color: "var(--gold)", fontSize: "12px" }}>✦</span>
          <div className="ornament-line ornament-line-right" />
        </div>

        {/* Tarjeta del preguntas */}
        <div className="fade-in-d2 glass-card" style={{
          borderRadius: "20px", padding: "24px",
          display: "flex", flexDirection: "column", gap: "14px",
        }}>
          <p style={{ fontSize: "9px", letterSpacing: "0.3em", color: "var(--gold)", textTransform: "uppercase" }}>
            🔐 Questions
          </p>
          <p style={{ fontSize: "clamp(0.95rem, 4vw, 1.05rem)", color: "var(--text)", lineHeight: 1.65 }}>
            {pista.acertijo}
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontStyle: "italic" }}>
            {pista.pista_extra}
          </p>
        </div>

        {/* Input de respuesta */}
        {!solved && (
          <div className="fade-in-d3" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input
              type="text"
              value={input}
              placeholder="Tu respuesta..."
              onChange={(e) => { setInput(e.target.value); setError(false) }}
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
              enterKeyHint="done"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: error
                  ? "1px solid rgba(196,96,106,0.55)"
                  : "1px solid rgba(201,168,76,0.22)",
                borderRadius: "14px",
                padding: "16px 18px",
                fontSize: "16px",
                minHeight: "52px",
                transition: "border-color 0.3s",
              }}
            />
            {error && (
              <p style={{ color: "rgba(196,96,106,0.9)", fontSize: "0.85rem", textAlign: "center" }}>
                ✗ Esa no es, piénsalo bien...
              </p>
            )}
            <button className="btn-gold" onClick={handleCheck}>
              Verificar respuesta
            </button>
          </div>
        )}

        {/* Estado resuelto */}
        {solved && (
          <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
            <p style={{ color: "rgba(140,210,160,0.9)", fontSize: "0.95rem", letterSpacing: "0.1em" }}>
              ✓  ¡Correcto!
            </p>
            <button className="btn-next" onClick={() => router.push(nextPath)}>
              {pista.esUltima ? "Detalles de la date" : "Siguiente pista →"}
            </button>
          </div>
        )}

      </div>
    </main>
  )
}