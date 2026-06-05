import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePersistence } from "./usePersistence";
import logo from "./img/logo.png";

const ACCENT = "#FF9100";

function initials(b) {
  return ((b.name[0] || "") + (b.last[0] || "")).toUpperCase();
}

export default function BarberoPerfil() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { barberos } = usePersistence();

  const b = barberos.find((x) => String(x.id) === String(id));

  if (!b) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--ink)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <i
          className="ti ti-user-off"
          style={{ fontSize: "3rem", color: "var(--text3)" }}
        />
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.5rem",
            color: "var(--text2)",
          }}
        >
          Barbero no encontrado
        </div>
        <button onClick={() => navigate("/")} style={btnBack}>
          Volver al panel
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--ink)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* topbar */}
      <div
        style={{
          background: "var(--ink2)",
          borderBottom: "1px solid var(--border)",
          padding: "0 2rem",
          height: 62,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          src={logo}
          alt="Nórdico Barbería"
          style={{ height: 40, width: "auto" }}
        />
        <button onClick={() => navigate("/")} style={btnBack}>
          <i className="ti ti-arrow-left" style={{ marginRight: 6 }} />
          Panel
        </button>
      </div>

      {/* hero */}
      <div
        style={{
          background: "var(--ink2)",
          borderBottom: "1px solid var(--border)",
          padding: "3rem 2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* accent line top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
          }}
        />

        {/* avatar */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "var(--ink3)",
            border: `3px solid ${ACCENT}66`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "2.5rem",
            fontWeight: 600,
            color: ACCENT,
            marginBottom: "1.25rem",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {b.avatar ? (
            <img
              src={b.avatar}
              alt={b.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            initials(b)
          )}
        </div>

        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "2.2rem",
            fontWeight: 300,
            color: "var(--text)",
            lineHeight: 1.1,
          }}
        >
          {b.name} {b.last}
        </div>
        <div
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: ACCENT,
            marginTop: 8,
          }}
        >
          {b.role}
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 14,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Pill>{b.status === "active" ? "Activo" : "Inactivo"}</Pill>
          <Pill>{b.branch}</Pill>
        </div>
      </div>

      {/* portfolio */}
      {b.photos && b.photos.length > 0 && (
        <div
          style={{
            maxWidth: 560,
            width: "100%",
            margin: "0 auto",
            padding: "0 1.5rem 2rem",
          }}
        >
          <div
            style={{
              fontSize: "0.63rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text3)",
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            Portafolio
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>
          <Carousel photos={b.photos} />
        </div>
      )}

      {/* content */}
      <div
        style={{
          flex: 1,
          maxWidth: 560,
          width: "100%",
          margin: "0 auto",
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {b.bio && (
          <Section title="Sobre mí">
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text2)",
                lineHeight: 1.8,
              }}
            >
              {b.bio}
            </p>
          </Section>
        )}

        {b.skills.length > 0 && (
          <Section title="Especialidades">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {b.skills.map((s, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    padding: "5px 12px",
                    borderRadius: 2,
                    background: `${ACCENT}15`,
                    color: ACCENT,
                    border: `1px solid ${ACCENT}40`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>
        )}

        <Section title="Contacto">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {b.phone && (
              <a
                href={`https://wa.me/${b.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola ${b.name}, quisiera reservar un turno 💈`)}`}
                target="_blank"
                rel="noreferrer"
                style={contactRow}
              >
                <div style={contactIcon}>
                  <i className="ti ti-brand-whatsapp" />
                </div>
                <div>
                  <div style={contactLabel}>WhatsApp</div>
                  <div style={contactValue}>{b.phone}</div>
                </div>
                <i
                  className="ti ti-arrow-right"
                  style={{
                    marginLeft: "auto",
                    color: "var(--text3)",
                    fontSize: 14,
                  }}
                />
              </a>
            )}
            {b.ig && (
              <a
                href={`https://instagram.com/${b.ig.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                style={contactRow}
              >
                <div style={contactIcon}>
                  <i className="ti ti-brand-instagram" />
                </div>
                <div>
                  <div style={contactLabel}>Instagram</div>
                  <div style={contactValue}>{b.ig}</div>
                </div>
                <i
                  className="ti ti-arrow-right"
                  style={{
                    marginLeft: "auto",
                    color: "var(--text3)",
                    fontSize: 14,
                  }}
                />
              </a>
            )}
            {b.hora && (
              <div style={{ ...contactRow, cursor: "default" }}>
                <div style={contactIcon}>
                  <i className="ti ti-clock" />
                </div>
                <div>
                  <div style={contactLabel}>Horario</div>
                  <div style={contactValue}>{b.hora}</div>
                </div>
              </div>
            )}
            <div style={{ ...contactRow, cursor: "default" }}>
              <div style={contactIcon}>
                <i className="ti ti-map-pin" />
              </div>
              <div>
                <div style={contactLabel}>Sede</div>
                <div style={contactValue}>{b.branch}</div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* footer */}
      <div
        style={{
          padding: "1.5rem",
          borderTop: "1px solid var(--border)",
          textAlign: "center",
        }}
      >
        <img
          src={logo}
          alt="Nórdico Barbería"
          style={{ height: 32, width: "auto", opacity: 0.5 }}
        />
      </div>
    </div>
  );
}

function Carousel({ photos }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [animDir, setAnimDir] = useState(null); // "left" | "right"

  const go = (idx, dir) => {
    setAnimDir(dir);
    setCurrent(idx);
  };
  const prev = () => go((current - 1 + photos.length) % photos.length, "right");
  const next = () => go((current + 1) % photos.length, "left");

  // touch swipe support
  const touchStart = React.useRef(null);
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStart.current = null;
  };

  // compute which indices to show: prev, current, next
  const prevIdx = (current - 1 + photos.length) % photos.length;
  const nextIdx = (current + 1) % photos.length;

  // For single photo, skip the coverflow chrome
  if (photos.length === 1) {
    return (
      <>
        <div
          style={{
            borderRadius: 8,
            overflow: "hidden",
            background: "var(--ink2)",
            cursor: "zoom-in",
            boxShadow: `0 0 0 1px rgba(255,145,0,0.2), 0 8px 32px rgba(0,0,0,0.6)`,
          }}
          onClick={() => setLightbox(0)}
        >
          <div style={{ aspectRatio: "4/3" }}>
            <img
              src={photos[0]}
              alt="trabajo 1"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
        {lightbox !== null && (
          <Lightbox
            photos={photos}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onNav={setLightbox}
          />
        )}
      </>
    );
  }

  return (
    <>
      <style>{`
        @keyframes cf-slide-in-left {
          from { opacity: 0; transform: translateX(40px) scale(0.92); }
          to   { opacity: 1; transform: translateX(0)   scale(1);    }
        }
        @keyframes cf-slide-in-right {
          from { opacity: 0; transform: translateX(-40px) scale(0.92); }
          to   { opacity: 1; transform: translateX(0)    scale(1);    }
        }
      `}</style>

      {/* coverflow track */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          userSelect: "none",
          padding: "12px 0 8px",
          overflow: "hidden",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* prev card */}
        <div
          onClick={prev}
          style={{
            position: "absolute",
            left: 0,
            width: "28%",
            aspectRatio: "3/4",
            borderRadius: 6,
            overflow: "hidden",
            opacity: 0.35,
            transform: "scale(0.82) translateX(18%)",
            transformOrigin: "right center",
            cursor: "pointer",
            transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
            zIndex: 1,
            filter: "brightness(0.55)",
          }}
        >
          <img
            src={photos[prevIdx]}
            alt={`trabajo ${prevIdx + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* active card */}
        <div
          key={current}
          style={{
            position: "relative",
            width: "58%",
            aspectRatio: "3/4",
            borderRadius: 8,
            overflow: "hidden",
            zIndex: 3,
            boxShadow: `0 0 0 1.5px ${ACCENT}55, 0 12px 48px rgba(0,0,0,0.75)`,
            cursor: "zoom-in",
            transition: "box-shadow 0.35s",
            animation:
              animDir === "left"
                ? "cf-slide-in-left 0.35s cubic-bezier(0.4,0,0.2,1)"
                : animDir === "right"
                  ? "cf-slide-in-right 0.35s cubic-bezier(0.4,0,0.2,1)"
                  : "none",
          }}
          onClick={() => setLightbox(current)}
        >
          <img
            src={photos[current]}
            alt={`trabajo ${current + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* zoom hint */}
          <div
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              background: "rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%",
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.7)",
              fontSize: 14,
              pointerEvents: "none",
            }}
          >
            <i className="ti ti-zoom-in" />
          </div>
          {/* counter badge */}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.8)",
              background: "rgba(0,0,0,0.55)",
              padding: "2px 8px",
              borderRadius: 20,
            }}
          >
            {current + 1} / {photos.length}
          </div>
        </div>

        {/* next card */}
        <div
          onClick={next}
          style={{
            position: "absolute",
            right: 0,
            width: "28%",
            aspectRatio: "3/4",
            borderRadius: 6,
            overflow: "hidden",
            opacity: 0.35,
            transform: "scale(0.82) translateX(-18%)",
            transformOrigin: "left center",
            cursor: "pointer",
            transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
            zIndex: 1,
            filter: "brightness(0.55)",
          }}
        >
          <img
            src={photos[nextIdx]}
            alt={`trabajo ${nextIdx + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* dot indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          marginTop: 10,
        }}
      >
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > current ? "left" : "right")}
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === current ? ACCENT : "rgba(255,255,255,0.2)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        ))}
      </div>

      {/* lightbox */}
      {lightbox !== null && (
        <Lightbox
          photos={photos}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNav={setLightbox}
        />
      )}
    </>
  );
}

function Lightbox({ photos, index, onClose, onNav }) {
  const prev = (e) => {
    e.stopPropagation();
    onNav((i) => (i - 1 + photos.length) % photos.length);
  };
  const next = (e) => {
    e.stopPropagation();
    onNav((i) => (i + 1) % photos.length);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.96)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <button
        onClick={prev}
        style={{
          ...arrowBtn,
          position: "fixed",
          left: 16,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <i className="ti ti-chevron-left" />
      </button>

      <img
        src={photos[index]}
        alt={`trabajo ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "90vw",
          maxHeight: "85vh",
          objectFit: "contain",
          borderRadius: 6,
        }}
      />

      <button
        onClick={next}
        style={{
          ...arrowBtn,
          position: "fixed",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <i className="ti ti-chevron-right" />
      </button>

      <button
        onClick={onClose}
        style={{
          ...arrowBtn,
          position: "fixed",
          top: 16,
          right: 16,
          transform: "none",
        }}
      >
        <i className="ti ti-x" />
      </button>

      <div
        style={{
          position: "fixed",
          bottom: 20,
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.1em",
        }}
      >
        {index + 1} / {photos.length}
      </div>
    </div>
  );
}

const arrowBtn = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.6)",
  border: `1px solid rgba(255,255,255,0.15)`,
  color: "#fff",
  width: 36,
  height: 36,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: 16,
  zIndex: 10,
};

function Section({ title, children }) {
  return (
    <div>
      <div
        style={{
          fontSize: "0.63rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--text3)",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {title}
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>
      {children}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span
      style={{
        fontSize: "0.62rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        padding: "4px 10px",
        borderRadius: 2,
        background: "rgba(106,98,88,0.15)",
        color: "var(--text3)",
        border: "1px solid rgba(106,98,88,0.2)",
      }}
    >
      {children}
    </span>
  );
}

const btnBack = {
  background: "transparent",
  border: "1px solid var(--border)",
  color: "var(--text2)",
  padding: "7px 14px",
  fontSize: "0.78rem",
  borderRadius: 3,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
};

const contactRow = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  background: "var(--ink2)",
  border: "1px solid var(--border)",
  borderRadius: 4,
  padding: "12px 16px",
  textDecoration: "none",
  color: "inherit",
  transition: "border-color 0.15s",
};

const contactIcon = {
  width: 38,
  height: 38,
  borderRadius: "50%",
  background: `${ACCENT}15`,
  border: `1px solid ${ACCENT}35`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: ACCENT,
  fontSize: 18,
  flexShrink: 0,
};

const contactLabel = {
  fontSize: "0.65rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--text3)",
  marginBottom: 2,
};

const contactValue = {
  fontSize: "0.88rem",
  color: "var(--text)",
};
