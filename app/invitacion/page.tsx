"use client"

import { useState, useEffect } from "react"

const TARGET_DATE       = new Date("2026-05-24T17:00:00")
const HER_NAME          = "Athziri"
const RESTAURANT_NAME   = "Restaurante El Lugar"
const MAPS_EMBED_SRC    = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.673271430869!2d-103.34997582391178!3d20.682867480881306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b1e5fed2a309%3A0xd735a657ac71194e!2sHerrera%20y%20Cairo%20382%2C%20Centro%20Barranquitas%2C%2044280%20Guadalajara%2C%20Jal.!5e0!3m2!1ses-419!2smx!4v1779250516294!5m2!1ses-419!2smx"
const SPOTIFY_EMBED_SRC = "https://open.spotify.com/embed/playlist/5I7Mi9fETo9AcrIJn20Gst?utm_source=generator"

const PARTICLE_CONFIG = [
  [7,  0,   14, 10], [14, 2.5, 18, 8 ], [23, 5,   12, 12],
  [33, 1,   16, 9 ], [47, 3.5, 20, 7 ], [54, 0.5, 15, 11],
  [63, 4,   13, 8 ], [71, 2,   17, 10], [80, 1.5, 19, 7 ],
  [89, 3,   14, 9 ], [41, 6,   22, 8 ], [59, 4.5, 16, 10],
]

function useCountdown(target: Date) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) { setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return }
      setTime({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000)   % 60),
        seconds: Math.floor((diff / 1000)    % 60),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])
  return time
}

export default function InvitacionPage() {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE)

  const countdown = [
    { label: "Días",  value: days    },
    { label: "Horas", value: hours   },
    { label: "Min",   value: minutes },
    { label: "Seg",   value: seconds },
  ]

  return (
    <main style={{
      position: "relative",
      minHeight: "100svh",
      overflowX: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop:    "max(env(safe-area-inset-top), 48px)",
      paddingBottom: "max(env(safe-area-inset-bottom), 48px)",
      paddingLeft:   "max(env(safe-area-inset-left),  24px)",
      paddingRight:  "max(env(safe-area-inset-right), 24px)",
      gap: "64px",
    }}>

      {/* Ambient glow */}
      <div style={{ pointerEvents: "none", position: "fixed", inset: 0, zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "5%", left: "50%",
          width: "min(700px, 150vw)", height: "min(700px, 150vw)",
          background: "radial-gradient(circle, rgba(196,96,106,0.08) 0%, rgba(201,168,76,0.04) 45%, transparent 70%)",
          borderRadius: "50%",
          animation: "glowPulse 7s ease-in-out infinite",
        }} />
      </div>

      {/* Partículas */}
      <div style={{ pointerEvents: "none", position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
        {PARTICLE_CONFIG.map(([left, delay, duration, size], i) => (
          <span key={i} className="particle" style={{
            left: `${left}%`,
            animationDelay:    `${delay}s`,
            animationDuration: `${duration}s`,
            fontSize:          `${size}px`,
          }}>✦</span>
        ))}
      </div>

      <div style={{
        position: "relative", zIndex: 10,
        width: "100%", maxWidth: "440px",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: "56px",
      }}>

        {/* Hero */}
        <section style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", textAlign: "center" }}>
          <p className="fade-in" style={{
            fontSize: "11px", letterSpacing: "0.38em",
            color: "var(--gold)", textTransform: "uppercase",
          }}>
            — Una invitación nerd 🤓 —
          </p>

          <h1 className="fade-in-d1 serif glow-text" style={{
            fontSize: "clamp(3.2rem, 18vw, 5rem)",
            fontWeight: 300, fontStyle: "italic", lineHeight: 1.05,
            color: "var(--text)",
          }}>
            {HER_NAME}
          </h1>

          <div className="fade-in-d2 ornament">
            <div className="ornament-line ornament-line-left" />
            <span style={{ color: "var(--gold)", fontSize: "13px" }}>✦</span>
            <div className="ornament-line ornament-line-right" />
          </div>

          <p className="fade-in-d2 serif" style={{
            fontSize: "clamp(1rem, 4.5vw, 1.25rem)",
            fontStyle: "italic", fontWeight: 300,
            color: "var(--text-muted)", lineHeight: 1.75,
          }}>
            Invitación formal para cita de festejo<br />en{" "}
            <span style={{ color: "var(--rose-light)", fontStyle: "normal" }}>
              {RESTAURANT_NAME}
            </span>
          </p>
        </section>

        {/* Countdown */}
        <section className="fade-in-d3" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "var(--text-muted)", textTransform: "uppercase" }}>
            La date comienza en
          </p>
          <div style={{ display: "flex", gap: "10px", width: "100%", justifyContent: "center" }}>
            {countdown.map(({ label, value }) => (
              <div key={label} className="glass-card" style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                borderRadius: "16px", padding: "18px 8px", flex: 1,
              }}>
                <span className="serif glow-text" style={{
                  fontSize: "clamp(1.8rem, 8vw, 2.4rem)",
                  fontWeight: 300, color: "var(--gold)", lineHeight: 1,
                }}>
                  {String(value).padStart(2, "0")}
                </span>
                <span style={{
                  fontSize: "9px", color: "var(--text-muted)",
                  marginTop: "8px", letterSpacing: "0.1em", textTransform: "uppercase",
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Google Maps */}
        <section className="fade-in-d4" style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="ornament">
            <div className="ornament-line ornament-line-left" style={{ opacity: 0.4 }} />
            <p style={{ fontSize: "10px", letterSpacing: "0.28em", color: "var(--text-muted)", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              Ubicación del lugar 📍
            </p>
            <div className="ornament-line ornament-line-right" style={{ opacity: 0.4 }} />
          </div>
          <div className="glass-card" style={{ borderRadius: "20px", overflow: "hidden" }}>
            <iframe
              src={MAPS_EMBED_SRC}
              width="100%" height="240"
              style={{ border: 0, display: "block", filter: "invert(92%) hue-rotate(180deg) saturate(0.8)" }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        {/* Spotify */}
        <section className="fade-in-d4" style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="ornament">
            <div className="ornament-line ornament-line-left" style={{ opacity: 0.4 }} />
            <p style={{ fontSize: "10px", letterSpacing: "0.28em", color: "var(--text-muted)", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              🎵 La playlist del día
            </p>
            <div className="ornament-line ornament-line-right" style={{ opacity: 0.4 }} />
          </div>
          <iframe
            src={SPOTIFY_EMBED_SRC}
            width="100%" height="85"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy" style={{ borderRadius: "16px", display: "block" }}
          />
        </section>

        {/* Footer */}
        <footer className="fade-in-d4" style={{ textAlign: "center", paddingBottom: "8px" }}>
          <p className="serif" style={{
            fontSize: "1.1rem", fontStyle: "italic",
            color: "var(--text-muted)", fontWeight: 300,
          }}>
            Feliz cumpleaños bonitaaa (un poco atrasado pero anyways)  💖🌹
          </p>
        </footer>

      </div>
    </main>
  )
}

