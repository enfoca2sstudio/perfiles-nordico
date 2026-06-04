import React from 'react';

const ACCENT = '#FF9100';

function initials(b) {
  return ((b.name[0] || '') + (b.last[0] || '')).toUpperCase();
}

export default function ProfileModal({ barbero: b, onClose, onEdit }) {
  if (!b) return null;

  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={modal}>
        {/* header */}
        <div style={header}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--ink3)',
            border: `2px solid ${ACCENT}66`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.8rem', fontWeight: 600, color: ACCENT,
            flexShrink: 0,
          }}>
            {initials(b)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 300, color: 'var(--text)' }}>
              {b.name} {b.last}
            </div>
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginTop: 3 }}>
              {b.role}
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              <Badge active={b.status === 'active'} color={ACCENT}>
                {b.status === 'active' ? 'Activo' : 'Inactivo'}
              </Badge>
              <Badge>{b.branch}</Badge>
            </div>
          </div>
          <button style={closeX} onClick={onClose}><i className="ti ti-x" /></button>
        </div>

        {/* body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {b.bio && (
            <Section title="Bio">
              <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.7 }}>{b.bio}</p>
            </Section>
          )}

          <Section title="Información">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {b.phone && <ProfileRow icon="ti-phone">{b.phone}</ProfileRow>}
              {b.ig && <ProfileRow icon="ti-brand-instagram">{b.ig}</ProfileRow>}
              {b.hora && <ProfileRow icon="ti-clock">{b.hora}</ProfileRow>}
              <ProfileRow icon="ti-map-pin">{b.branch}</ProfileRow>
            </div>
          </Section>

          {b.skills.length > 0 && (
            <Section title="Especialidades">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {b.skills.map((s, i) => (
                  <span key={i} style={{
                    fontSize: '0.72rem', letterSpacing: '0.08em',
                    padding: '4px 10px', borderRadius: 2,
                    background: `${ACCENT}18`, color: ACCENT,
                    border: `1px solid ${ACCENT}40`,
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* footer */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button style={btnSecondary} onClick={onClose}>Cerrar</button>
          <button style={btnPrimary} onClick={() => { onClose(); onEdit(b); }}>
            <i className="ti ti-edit" style={{ marginRight: 6 }} />Editar perfil
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <div style={{ fontSize: '0.63rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function ProfileRow({ icon, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.83rem', color: 'var(--text2)' }}>
      <i className={`ti ${icon}`} style={{ fontSize: 15, color: 'var(--text3)', marginTop: 1, flexShrink: 0 }} aria-hidden="true" />
      {children}
    </div>
  );
}

function Badge({ children, active, color }) {
  if (active !== undefined) {
    return (
      <span style={{
        fontSize: '0.6rem', letterSpacing: '0.15em',
        textTransform: 'uppercase', padding: '3px 8px', borderRadius: 2,
        ...(active
          ? { background: `${color}18`, color, border: `1px solid ${color}35` }
          : { background: 'rgba(106,98,88,0.15)', color: 'var(--text3)', border: '1px solid rgba(106,98,88,0.2)' }),
      }}>
        {children}
      </span>
    );
  }
  return (
    <span style={{
      fontSize: '0.6rem', letterSpacing: '0.15em',
      textTransform: 'uppercase', padding: '3px 8px', borderRadius: 2,
      background: 'rgba(106,98,88,0.1)', color: 'var(--text3)',
      border: '1px solid rgba(106,98,88,0.18)',
    }}>
      {children}
    </span>
  );
}

const overlay = {
  position: 'fixed', inset: 0,
  background: 'rgba(0,0,0,0.88)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 1000, padding: '1rem',
};
const modal = {
  background: 'var(--ink2)',
  border: '1px solid var(--border2)',
  borderRadius: 6,
  width: '100%', maxWidth: 500,
  maxHeight: '92vh', overflowY: 'auto',
};
const header = {
  padding: '1.5rem',
  borderBottom: '1px solid var(--border)',
  display: 'flex', gap: '1rem', alignItems: 'flex-start',
};
const closeX = {
  background: 'transparent', border: '1px solid var(--border)',
  color: 'var(--text3)', width: 30, height: 30,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: 3, fontSize: 15, flexShrink: 0,
  cursor: 'pointer',
};
const btnSecondary = {
  background: 'transparent', border: '1px solid var(--border)',
  color: 'var(--text2)', padding: '8px 18px',
  fontSize: '0.8rem', borderRadius: 3, cursor: 'pointer',
};
const btnPrimary = {
  background: 'var(--gold)', border: 'none',
  color: 'var(--ink)', padding: '8px 20px',
  fontSize: '0.8rem', fontWeight: 500, borderRadius: 3,
  cursor: 'pointer', display: 'flex', alignItems: 'center',
};
