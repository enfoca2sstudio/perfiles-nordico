import React, { useState, useEffect, useRef } from "react";

const ACCENT = "#f4ba19";

const BRANCHES = ["Los Magallanes", "Catia — Calle México", "Ambas"];

const HORAS = ["8:00am - 5:00pm", "8:00am - 8:00pm", "8:00am - 9:00pm"];

const COLORS = [
  "#b8976a",
  "#7a9e7e",
  "#7a8fa0",
  "#9e7a7a",
  "#8a7a9e",
  "#a09060",
  "#6a8fa0",
];

const EMPTY = {
  name: "",
  last: "",
  role: "Maestro Barbero",
  phone: "",
  ig: "",
  exp: 1,
  skills: [],
  bio: "",
  status: "active",
  branch: "Los Magallanes",
  color: "#b8976a",
  hora: "8:00am - 8:00pm",
};

export default function BarberoForm({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(EMPTY);
  const [skillInput, setSkillInput] = useState("");
  const skillRef = useRef();

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...initial } : { ...EMPTY });
      setSkillInput("");
    }
  }, [open, initial]);

  if (!open) return null;

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s)) {
      set("skills", [...form.skills, s]);
    }
    setSkillInput("");
    skillRef.current?.focus();
  };

  const removeSkill = (i) =>
    set(
      "skills",
      form.skills.filter((_, idx) => idx !== i),
    );

  const handleSkillKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
    if (e.key === "Backspace" && skillInput === "" && form.skills.length) {
      set("skills", form.skills.slice(0, -1));
    }
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    onSave(form);
  };

  return (
    <div
      style={overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={modal}>
        {/* header */}
        <div style={modalHeader}>
          <span style={modalTitle}>
            {initial ? "Editar Barbero" : "Agregar Barbero"}
          </span>
          <button style={iconBtn} onClick={onClose}>
            <i className="ti ti-x" />
          </button>
        </div>

        {/* body */}
        <div style={modalBody}>
          <div style={row2}>
            <Field label="Nombre">
              <input
                style={input}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Carlos"
              />
            </Field>
            <Field label="Apellido">
              <input
                style={input}
                value={form.last}
                onChange={(e) => set("last", e.target.value)}
                placeholder="Rodríguez"
              />
            </Field>
          </div>

          <div style={row2}>
            <Field label="Teléfono">
              <input
                style={input}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+58 414 000 0000"
              />
            </Field>
            <Field label="Instagram">
              <input
                style={input}
                value={form.ig}
                onChange={(e) => set("ig", e.target.value)}
                placeholder="@usuario"
              />
            </Field>
          </div>

          <div style={row2}>
            <Field label="Sede">
              <select
                style={input}
                value={form.branch}
                onChange={(e) => set("branch", e.target.value)}
              >
                {BRANCHES.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </Field>
            <Field label="Horario">
              <select
                style={input}
                value={form.hora}
                onChange={(e) => set("hora", e.target.value)}
              >
                {HORAS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </Field>
          </div>

          {/* skills */}
          <Field label="Habilidades (Enter para agregar)">
            <div style={skillsBox} onClick={() => skillRef.current?.focus()}>
              {form.skills.map((s, i) => (
                <span
                  key={i}
                  style={{
                    ...skillTag,
                    background: `${ACCENT}18`,
                    color: ACCENT,
                    border: `1px solid ${ACCENT}45`,
                  }}
                >
                  {s}
                  <button onClick={() => removeSkill(i)} style={skillDel}>
                    ×
                  </button>
                </span>
              ))}
              <input
                ref={skillRef}
                style={skillInput2}
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKey}
                placeholder={
                  form.skills.length === 0 ? "Fade, Diseño, Afeitado..." : ""
                }
              />
            </div>
          </Field>

          <Field label="Bio / Descripción">
            <textarea
              style={{ ...input, resize: "vertical", minHeight: 72 }}
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
              placeholder="Describe al barbero, su estilo y experiencia..."
            />
          </Field>

          <Field label="Estado">
            <select
              style={input}
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </Field>
        </div>

        {/* footer */}
        <div style={modalFooter}>
          <button style={btnCancel} onClick={onClose}>
            Cancelar
          </button>
          <button style={btnSave} onClick={handleSave}>
            {initial ? "Guardar cambios" : "Agregar barbero"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label
        style={{
          fontSize: "0.68rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--text3)",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.88)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  padding: "1rem",
};
const modal = {
  background: "var(--ink2)",
  border: "1px solid var(--border2)",
  borderRadius: 6,
  width: "100%",
  maxWidth: 500,
  maxHeight: "92vh",
  overflowY: "auto",
};
const modalHeader = {
  padding: "1.25rem 1.5rem",
  borderBottom: "1px solid var(--border)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const modalTitle = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: "1.4rem",
  fontWeight: 300,
  color: "var(--text)",
};
const modalBody = {
  padding: "1.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};
const modalFooter = {
  padding: "1rem 1.5rem",
  borderTop: "1px solid var(--border)",
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
};
const row2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" };
const input = {
  background: "var(--ink3)",
  border: "1px solid var(--border)",
  color: "var(--text)",
  padding: "9px 12px",
  fontSize: "0.85rem",
  borderRadius: 3,
  outline: "none",
  width: "100%",
  transition: "border-color 0.15s",
};
const skillsBox = {
  background: "var(--ink3)",
  border: "1px solid var(--border)",
  borderRadius: 3,
  padding: "8px",
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  minHeight: 44,
  cursor: "text",
};
const skillTag = {
  fontSize: "0.72rem",
  letterSpacing: "0.05em",
  padding: "3px 8px",
  borderRadius: 2,
  display: "flex",
  alignItems: "center",
  gap: 4,
  whiteSpace: "nowrap",
};
const skillDel = {
  background: "none",
  border: "none",
  color: "inherit",
  cursor: "pointer",
  fontSize: 15,
  lineHeight: 1,
  padding: 0,
};
const skillInput2 = {
  background: "transparent",
  border: "none",
  color: "var(--text)",
  fontSize: "0.85rem",
  outline: "none",
  flex: 1,
  minWidth: 100,
};
const iconBtn = {
  background: "transparent",
  border: "1px solid var(--border)",
  color: "var(--text3)",
  width: 30,
  height: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 3,
  fontSize: 15,
};
const btnCancel = {
  background: "transparent",
  border: "1px solid var(--border)",
  color: "var(--text2)",
  padding: "8px 18px",
  fontSize: "0.8rem",
  borderRadius: 3,
};
const btnSave = {
  background: "var(--gold)",
  border: "none",
  color: "var(--ink)",
  padding: "8px 22px",
  fontSize: "0.8rem",
  fontWeight: 500,
  borderRadius: 3,
};
