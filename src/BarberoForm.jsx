import React, { useState, useEffect, useRef } from "react";

const ACCENT = "#f4ba19";

// Comprime una imagen a base64 con tamaño máximo y calidad reducida
function compressImage(file, maxWidth = 800, quality = 0.72) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

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
  photos: [],
  avatar: null,
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
    // Si es edición conserva el id; si es nuevo, usePersistence lo asigna vía addBarbero
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
          {/* avatar */}
          <Field label="Foto del barbero">
            <AvatarUpload
              avatar={form.avatar}
              onChange={(avatar) => set("avatar", avatar)}
            />
          </Field>

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

          {/* ✅ NUEVO: sección de fotos del portafolio */}
          <Field label="Portafolio de trabajo">
            <PhotoDropZone
              photos={form.photos || []}
              onChange={(photos) => set("photos", photos)}
            />
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

// Avatar upload component
function AvatarUpload({ avatar, onChange }) {
  const fileRef = React.useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    compressImage(file, 400, 0.8).then(onChange);
    e.target.value = "";
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {/* preview */}
      <div
        onClick={() => fileRef.current?.click()}
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: avatar ? "transparent" : "var(--ink3)",
          border: `2px dashed ${ACCENT}60`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          cursor: "pointer",
          flexShrink: 0,
          transition: "border-color 0.2s",
        }}
      >
        {avatar ? (
          <img
            src={avatar}
            alt="avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <i
            className="ti ti-user-plus"
            style={{ fontSize: 24, color: `${ACCENT}80` }}
          />
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button
          onClick={() => fileRef.current?.click()}
          style={{
            background: "var(--ink3)",
            border: `1px solid ${ACCENT}50`,
            color: ACCENT,
            padding: "7px 14px",
            fontSize: "0.78rem",
            borderRadius: 3,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <i className="ti ti-upload" />
          {avatar ? "Cambiar foto" : "Subir foto"}
        </button>
        {avatar && (
          <button
            onClick={() => onChange(null)}
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text3)",
              padding: "7px 14px",
              fontSize: "0.78rem",
              borderRadius: 3,
              cursor: "pointer",
            }}
          >
            Quitar foto
          </button>
        )}
        <span style={{ fontSize: "0.7rem", color: "var(--text3)" }}>
          PNG, JPG o WEBP
        </span>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFile}
      />
    </div>
  );
}

// ✅ DRAG & DROP: componente de zona de arrastre para fotos
function PhotoDropZone({ photos, onChange }) {
  const [dragging, setDragging] = React.useState(false);
  const fileRef = useRef();

  const readFiles = (files) => {
    const validFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (!validFiles.length) return;

    Promise.all(validFiles.map((file) => compressImage(file, 800, 0.72))).then(
      (results) => onChange([...photos, ...results]),
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    readFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleFileInput = (e) => {
    readFiles(e.target.files);
    e.target.value = "";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* zona de drop */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileRef.current?.click()}
        style={{
          background: dragging ? `${ACCENT}10` : "var(--ink3)",
          border: `2px dashed ${dragging ? ACCENT : `${ACCENT}50`}`,
          borderRadius: 4,
          padding: "28px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          cursor: "pointer",
          transition: "all 0.2s",
        }}
      >
        <i
          className={`ti ${dragging ? "ti-photo-up" : "ti-cloud-upload"}`}
          style={{ fontSize: 28, color: dragging ? ACCENT : `${ACCENT}80` }}
        />
        <span
          style={{
            fontSize: "0.82rem",
            color: dragging ? ACCENT : "var(--text3)",
            letterSpacing: "0.04em",
          }}
        >
          {dragging
            ? "Suelta las fotos aquí"
            : "Arrastra fotos o haz clic para seleccionar"}
        </span>
        <span
          style={{ fontSize: "0.7rem", color: "var(--text3)", opacity: 0.6 }}
        >
          PNG, JPG, WEBP — múltiples archivos permitidos
        </span>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handleFileInput}
        />
      </div>

      {/* grid de fotos subidas */}
      {photos.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 6,
          }}
        >
          {photos.map((src, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                aspectRatio: "1",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <img
                src={src}
                alt={`foto ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(photos.filter((_, idx) => idx !== i));
                }}
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  background: "rgba(0,0,0,0.7)",
                  border: "none",
                  color: "#fff",
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                <i className="ti ti-x" />
              </button>
            </div>
          ))}
        </div>
      )}
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
