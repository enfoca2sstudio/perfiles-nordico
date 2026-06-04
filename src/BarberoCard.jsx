import React from "react";

const ACCENT = "#f4ba19";

function initials(b) {
  return ((b.name[0] || "") + (b.last[0] || "")).toUpperCase();
}

export default function BarberoCard({ barbero: b, onView, onEdit, onDelete }) {
  return (
    <div
      onClick={() => onView(b)}
      style={{
        background: "var(--ink2)",
        border: "1px solid var(--border)",
        borderRadius: "4px",
        overflow: "hidden",
        transition: "border-color 0.2s, transform 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border2)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* banner */}
      <div
        style={{
          height: "5px",
          background: `linear-gradient(90deg, ${ACCENT}88, ${ACCENT})`,
        }}
      />

      <div style={{ padding: "1.25rem" }}>
        {/* avatar */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--ink3)",
            border: `2px solid ${ACCENT}55`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.4rem",
            fontWeight: 600,
            color: ACCENT,
            marginBottom: "0.75rem",
          }}
        >
          {initials(b)}
        </div>

        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.2rem",
            color: "var(--text)",
          }}
        >
          {b.name} {b.last}
        </div>
        <div
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: ACCENT,
            marginTop: 2,
            marginBottom: "0.75rem",
          }}
        ></div>

        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <InfoRow icon="ti-map-pin" text={b.branch} />
          {b.hora && <InfoRow icon="ti-clock" text={b.hora} />}
          {b.ig && <InfoRow icon="ti-brand-instagram" text={b.ig} />}
        </div>

        {b.skills.length > 0 && (
          <>
            <div
              style={{
                height: 1,
                background: "var(--border)",
                margin: "0.75rem 0",
              }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {b.skills.slice(0, 3).map((s, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    borderRadius: 2,
                    background: `${ACCENT}18`,
                    color: ACCENT,
                    border: `1px solid ${ACCENT}40`,
                  }}
                >
                  {s}
                </span>
              ))}
              {b.skills.length > 3 && (
                <span
                  style={{
                    fontSize: "0.62rem",
                    color: "var(--text3)",
                    padding: "3px 4px",
                  }}
                >
                  +{b.skills.length - 3}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.65rem 1.25rem",
          borderTop: "1px solid var(--border)",
          background: "rgba(0,0,0,0.18)",
        }}
      >
        <span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "3px 8px",
            borderRadius: 2,
            ...(b.status === "active"
              ? {
                  background: `${ACCENT}18`,
                  color: ACCENT,
                  border: `1px solid ${ACCENT}35`,
                }
              : {
                  background: "rgba(106,98,88,0.15)",
                  color: "var(--text3)",
                  border: "1px solid rgba(106,98,88,0.2)",
                }),
          }}
        >
          {b.status === "active" ? "Activo" : "Inactivo"}
        </span>

        <div
          style={{ display: "flex", gap: 6 }}
          onClick={(e) => e.stopPropagation()}
        >
          <IconBtn
            icon="ti-external-link"
            title="Ver perfil público"
            onClick={() => navigate(`/barbero/${b.id}`)}
          />
          <IconBtn icon="ti-edit" title="Editar" onClick={() => onEdit(b)} />
          <IconBtn
            icon="ti-trash"
            title="Eliminar"
            danger
            onClick={() => onDelete(b.id)}
          />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: "0.78rem",
        color: "var(--text2)",
      }}
    >
      <i
        className={`ti ${icon}`}
        style={{ fontSize: 13, color: "var(--text3)" }}
        aria-hidden="true"
      />
      {text}
    </div>
  );
}

function IconBtn({ icon, title, danger, onClick }) {
  const [hov, setHov] = React.useState(false);
  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "transparent",
        border: `1px solid ${hov ? (danger ? "#c0392b" : "var(--gold)") : "var(--border)"}`,
        color: hov ? (danger ? "#c0392b" : "var(--gold)") : "var(--text3)",
        width: 28,
        height: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3,
        transition: "all 0.15s",
        fontSize: 13,
      }}
    >
      <i className={`ti ${icon}`} />
    </button>
  );
}
