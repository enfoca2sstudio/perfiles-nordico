import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import BarberoPerfil from "./BarberoPerfil";
import { usePersistence } from "./usePersistence";
import StatsBar from "./StatsBar";
import BarberoCard from "./BarberoCard";
import BarberoForm from "./BarberoForm";
import ProfileModal from "./ProfileModal";
import ConfirmDialog from "./ConfirmDialog";
import logo from "./img/logo.png";

export default function App() {
  const { barberos, addBarbero, updateBarbero, deleteBarbero } =
    usePersistence();

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const [profileTarget, setProfileTarget] = useState(null);

  const [confirmId, setConfirmId] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterBranch, setFilterBranch] = useState("all");

  const openAdd = () => {
    setEditTarget(null);
    setFormOpen(true);
  };
  const openEdit = (b) => {
    setEditTarget(b);
    setFormOpen(true);
  };
  const closeForm = () => {
    setFormOpen(false);
    setEditTarget(null);
  };

  const handleSave = (data) => {
    if (editTarget) {
      updateBarbero(editTarget.id, data);
    } else {
      addBarbero(data);
    }
    closeForm();
  };

  const handleDeleteRequest = (id) => setConfirmId(id);
  const handleDeleteConfirm = () => {
    deleteBarbero(confirmId);
    setConfirmId(null);
  };

  const filtered = barberos.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      `${b.name} ${b.last} ${b.role}`.toLowerCase().includes(q) ||
      b.skills.some((s) => s.toLowerCase().includes(q));
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    const matchBranch = filterBranch === "all" || b.branch === filterBranch;
    return matchSearch && matchStatus && matchBranch;
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/barbero/:id" element={<BarberoPerfil />} />
        <Route
          path="/"
          element={
            <Dashboard
              barberos={barberos}
              filtered={filtered}
              search={search}
              setSearch={setSearch}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterBranch={filterBranch}
              setFilterBranch={setFilterBranch}
              openAdd={openAdd}
              setProfileTarget={setProfileTarget}
              openEdit={openEdit}
              handleDeleteRequest={handleDeleteRequest}
              formOpen={formOpen}
              closeForm={closeForm}
              handleSave={handleSave}
              editTarget={editTarget}
              profileTarget={profileTarget}
              setProfileTarget={setProfileTarget}
              confirmId={confirmId}
              handleDeleteConfirm={handleDeleteConfirm}
              setConfirmId={setConfirmId}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function Dashboard({
  barberos,
  filtered,
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  filterBranch,
  setFilterBranch,
  openAdd,
  setProfileTarget,
  openEdit,
  handleDeleteRequest,
  formOpen,
  closeForm,
  handleSave,
  editTarget,
  profileTarget,
  confirmId,
  handleDeleteConfirm,
  setConfirmId,
}) {
  // ✅ FIX: useNavigate dentro del árbol de BrowserRouter
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)" }}>
      {/* topbar */}
      <div
        style={{
          background: "var(--ink2)",
          borderBottom: "1px solid var(--border)",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 62,
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <img
          src={logo}
          alt="Nórdico Barbería"
          style={{ height: 40, objectFit: "contain" }}
        />

        <button
          onClick={openAdd}
          style={{
            background: "var(--gold)",
            color: "var(--ink)",
            border: "none",
            padding: "9px 20px",
            fontSize: "0.8rem",
            fontWeight: 500,
            letterSpacing: "0.04em",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            gap: 7,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          <i className="ti ti-plus" />
          Nuevo Barbero
        </button>
      </div>

      {/* stats */}
      <StatsBar barberos={barberos} />

      {/* filters */}
      <div
        style={{
          padding: "1rem 2rem",
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          borderBottom: "1px solid var(--border)",
          background: "var(--ink2)",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <i
            className="ti ti-search"
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text3)",
              fontSize: 14,
            }}
            aria-hidden="true"
          />
          <input
            style={{
              background: "var(--ink3)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              padding: "8px 10px 8px 32px",
              fontSize: "0.83rem",
              borderRadius: 3,
              outline: "none",
              width: "100%",
            }}
            placeholder="Buscar barbero, habilidad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          style={filterSelect}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Todos los estados</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
        </select>

        <select
          style={filterSelect}
          value={filterBranch}
          onChange={(e) => setFilterBranch(e.target.value)}
        >
          <option value="all">Todas las sedes</option>
          <option value="Los Magallanes">Los Magallanes</option>
          <option value="Catia — Calle México">Catia — Calle México</option>
          <option value="Ambas">Ambas</option>
        </select>
      </div>

      {/* main grid */}
      <div style={{ padding: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.8rem",
              fontWeight: 300,
              color: "var(--text)",
            }}
          >
            Equipo
          </span>
          {(search || filterStatus !== "all" || filterBranch !== "all") && (
            <span style={{ fontSize: "0.75rem", color: "var(--text3)" }}>
              {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 2rem",
              color: "var(--text3)",
            }}
          >
            <i
              className="ti ti-user-off"
              style={{
                fontSize: "3rem",
                marginBottom: "1rem",
                display: "block",
              }}
            />
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.5rem",
                color: "var(--text2)",
                marginBottom: "0.5rem",
              }}
            >
              {barberos.length === 0 ? "Sin barberos aún" : "Sin resultados"}
            </div>
            <div style={{ fontSize: "0.8rem", letterSpacing: "0.05em" }}>
              {barberos.length === 0
                ? "Agrega el primer miembro del equipo"
                : "Prueba ajustando los filtros de búsqueda"}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {filtered.map((b) => (
              <BarberoCard
                key={b.id}
                barbero={b}
                onView={setProfileTarget}
                onEdit={openEdit}
                onDelete={handleDeleteRequest}
                // ✅ FIX: usar navigate en lugar de window.location.href
                onProfile={(id) => navigate(`/barbero/${id}`)}
              />
            ))}
          </div>
        )}
      </div>

      {/* footer */}
      <div
        style={{
          padding: "1.5rem 2rem",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <i
          className="ti ti-scissors"
          style={{ fontSize: 14, color: "var(--text3)" }}
          aria-hidden="true"
        />
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.85rem",
            color: "var(--text3)",
            letterSpacing: "0.1em",
          }}
        >
          NÓRDICO Barbería · Panel de Gestión
        </span>
      </div>

      {/* modals */}
      <BarberoForm
        open={formOpen}
        onClose={closeForm}
        onSave={handleSave}
        initial={editTarget}
      />

      <ProfileModal
        barbero={profileTarget}
        onClose={() => setProfileTarget(null)}
        onEdit={openEdit}
      />

      <ConfirmDialog
        open={!!confirmId}
        message="¿Estás seguro de que quieres eliminar este barbero? Esta acción no se puede deshacer."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  );
}

const filterSelect = {
  background: "var(--ink3)",
  border: "1px solid var(--border)",
  color: "var(--text)",
  padding: "8px 12px",
  fontSize: "0.83rem",
  borderRadius: 3,
  outline: "none",
  cursor: "pointer",
};
