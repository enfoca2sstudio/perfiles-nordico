import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePersistence } from './usePersistence';


const ACCENT = '#FF9100';

function initials(b) {
  return ((b.name[0] || '') + (b.last[0] || '')).toUpperCase();
}

export default function BarberoPerfil() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { barberos } = usePersistence();
  const [hovWa, setHovWa] = React.useState(false);
  const [photoIdx, setPhotoIdx] = React.useState(0);   // ✅ NUEVO: índice del carrusel
  const [lightbox, setLightbox] = React.useState(null); // ✅ NUEVO: foto abierta en fullscreen

  const b = barberos.find(x => String(x.id) === String(id));

  if (!b) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--ink)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <i className="ti ti-user-off" style={{ fontSize: '3rem', color: 'var(--text3)' }} />
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: 'var(--text2)' }}>
          Barbero no encontrado
        </div>
        <button onClick={() => navigate('/')} style={btnBack}>
          Volver al panel
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink)', display: 'flex', flexDirection: 'column' }}>

      {/* topbar */}
      <div style={{
        background: 'var(--ink2)',
        borderBottom: '1px solid var(--border)',
        padding: '0 2rem',
        height: 62,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <img src="/logo.png" alt="Nórdico Barbería" style={{ height: 40, width: 'auto' }} />
        <button onClick={() => navigate('/')} style={btnBack}>
          <i className="ti ti-arrow-left" style={{ marginRight: 6 }} />
          Panel
        </button>
      </div>

      {/* hero */}
      <div style={{
        background: 'var(--ink2)',
        borderBottom: '1px solid var(--border)',
        padding: '3rem 2rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* accent line top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />

        {/* avatar */}
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          background: 'var(--ink3)',
          border: `3px solid ${ACCENT}66`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.5rem', fontWeight: 600, color: ACCENT,
          marginBottom: '1.25rem',
        }}>
          {initials(b)}
        </div>

        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 300, color: 'var(--text)', lineHeight: 1.1 }}>
          {b.name} {b.last}
        </div>
        <div style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: ACCENT, marginTop: 8 }}>
          {b.role}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Pill>{b.status === 'active' ? 'Activo' : 'Inactivo'}</Pill>
          <Pill>{b.branch}</Pill>
        </div>
      </div>

      {/* content */}
      <div style={{ flex: 1, maxWidth: 560, width: '100%', margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {b.bio && (
          <Section title="Sobre mí">
            <p style={{ fontSize: '0.95rem', color: 'var(--text2)', lineHeight: 1.8 }}>{b.bio}</p>
          </Section>
        )}

        {b.skills.length > 0 && (
          <Section title="Especialidades">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {b.skills.map((s, i) => (
                <span key={i} style={{
                  fontSize: '0.75rem', letterSpacing: '0.08em',
                  padding: '5px 12px', borderRadius: 2,
                  background: `${ACCENT}15`, color: ACCENT,
                  border: `1px solid ${ACCENT}40`,
                }}>
                  {s}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* ✅ NUEVO: carrusel de portafolio */}
        {b.photos && b.photos.length > 0 && (
          <Section title="Portafolio">
            {/* foto principal */}
            <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', aspectRatio: '4/3', background: 'var(--ink3)', marginBottom: 8 }}>
              <img
                src={b.photos[photoIdx]}
                alt={`trabajo ${photoIdx + 1}`}
                onClick={() => setLightbox(photoIdx)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'zoom-in', transition: 'opacity 0.2s' }}
              />

              {/* flechas */}
              {b.photos.length > 1 && (
                <>
                  <button
                    onClick={() => setPhotoIdx(i => (i - 1 + b.photos.length) % b.photos.length)}
                    style={carouselBtn('left')}
                  >
                    <i className="ti ti-chevron-left" />
                  </button>
                  <button
                    onClick={() => setPhotoIdx(i => (i + 1) % b.photos.length)}
                    style={carouselBtn('right')}
                  >
                    <i className="ti ti-chevron-right" />
                  </button>

                  {/* contador */}
                  <div style={{
                    position: 'absolute', bottom: 10, right: 12,
                    background: 'rgba(0,0,0,0.55)', borderRadius: 20,
                    padding: '3px 10px', fontSize: '0.7rem', color: '#fff',
                    letterSpacing: '0.08em',
                  }}>
                    {photoIdx + 1} / {b.photos.length}
                  </div>
                </>
              )}
            </div>

            {/* thumbnails */}
            {b.photos.length > 1 && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {b.photos.map((src, i) => (
                  <div
                    key={i}
                    onClick={() => setPhotoIdx(i)}
                    style={{
                      width: 52, height: 52, borderRadius: 4, overflow: 'hidden',
                      cursor: 'pointer', flexShrink: 0,
                      border: `2px solid ${i === photoIdx ? ACCENT : 'transparent'}`,
                      transition: 'border-color 0.15s',
                    }}
                  >
                    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </Section>
        )}

        <Section title="Contacto">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {b.phone && (
              <a
                href={`https://wa.me/${b.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${b.name}, quiero agendar una cita en Nórdico Barbería`)}`}
                target="_blank"
                rel="noreferrer"
                style={contactRow}
                onMouseEnter={() => setHovWa(true)}  // ✅ FIX: activa hover
                onMouseLeave={() => setHovWa(false)} // ✅ FIX: desactiva hover
              >
                <div style={contactIcon}><i className="ti ti-brand-whatsapp" /></div>
                <div>
                  <div style={contactLabel}>WhatsApp</div>
                  <div style={contactValue}>{b.phone}</div>
                </div>
                <div style={{
                  marginLeft: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  // ✅ FIX: cambia a verde sólido solo al hacer hover
                  background: hovWa ? '#25D366' : '#25D36620',
                  border: `1px solid ${hovWa ? '#25D366' : '#25D36650'}`,
                  color: hovWa ? '#fff' : '#25D366',
                  fontSize: 16,
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}>
                  <i className="ti ti-arrow-right" />
                </div>
              </a>
            )}
            {b.ig && (
              <a href={`https://instagram.com/${b.ig.replace('@', '')}`} target="_blank" rel="noreferrer" style={contactRow}>
                <div style={contactIcon}><i className="ti ti-brand-instagram" /></div>
                <div>
                  <div style={contactLabel}>Instagram</div>
                  <div style={contactValue}>{b.ig}</div>
                </div>
                <i className="ti ti-arrow-right" style={{ marginLeft: 'auto', color: 'var(--text3)', fontSize: 14 }} />
              </a>
            )}
            {b.hora && (
              <div style={{ ...contactRow, cursor: 'default' }}>
                <div style={contactIcon}><i className="ti ti-clock" /></div>
                <div>
                  <div style={contactLabel}>Horario</div>
                  <div style={contactValue}>{b.hora}</div>
                </div>
              </div>
            )}
            <div style={{ ...contactRow, cursor: 'default' }}>
              <div style={contactIcon}><i className="ti ti-map-pin" /></div>
              <div>
                <div style={contactLabel}>Sede</div>
                <div style={contactValue}>{b.branch}</div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* footer */}
      <div style={{
        padding: '1.5rem',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <img src="/logo.png" alt="Nórdico Barbería" style={{ height: 32, width: 'auto', opacity: 0.5 }} />
      </div>

      {/* ✅ NUEVO: lightbox fullscreen */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <img
            src={b.photos[lightbox]}
            alt=""
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '95vw', maxHeight: '92vh', objectFit: 'contain', borderRadius: 4 }}
          />
          {b.photos.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); setLightbox(i => (i - 1 + b.photos.length) % b.photos.length); }}
                style={{ ...carouselBtn('left'), top: '50%', transform: 'translateY(-50%)' }}
              >
                <i className="ti ti-chevron-left" />
              </button>
              <button
                onClick={e => { e.stopPropagation(); setLightbox(i => (i + 1) % b.photos.length); }}
                style={{ ...carouselBtn('right'), top: '50%', transform: 'translateY(-50%)' }}
              >
                <i className="ti ti-chevron-right" />
              </button>
            </>
          )}
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', top: 16, right: 16,
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', width: 38, height: 38, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: 18,
            }}
          >
            <i className="ti ti-x" />
          </button>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <div style={{
        fontSize: '0.63rem', letterSpacing: '0.22em',
        textTransform: 'uppercase', color: 'var(--text3)',
        marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10,
      }}>
        {title}
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      {children}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span style={{
      fontSize: '0.62rem', letterSpacing: '0.15em',
      textTransform: 'uppercase', padding: '4px 10px', borderRadius: 2,
      background: 'rgba(106,98,88,0.15)', color: 'var(--text3)',
      border: '1px solid rgba(106,98,88,0.2)',
    }}>
      {children}
    </span>
  );
}

const btnBack = {
  background: 'transparent',
  border: '1px solid var(--border)',
  color: 'var(--text2)',
  padding: '7px 14px',
  fontSize: '0.78rem',
  borderRadius: 3,
  cursor: 'pointer',
  display: 'flex', alignItems: 'center',
};

const contactRow = {
  display: 'flex', alignItems: 'center', gap: 14,
  background: 'var(--ink2)',
  border: '1px solid var(--border)',
  borderRadius: 4, padding: '12px 16px',
  textDecoration: 'none', color: 'inherit',
  transition: 'border-color 0.15s',
};

const contactIcon = {
  width: 38, height: 38, borderRadius: '50%',
  background: `${ACCENT}15`,
  border: `1px solid ${ACCENT}35`,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: ACCENT, fontSize: 18, flexShrink: 0,
};

const contactLabel = {
  fontSize: '0.65rem', letterSpacing: '0.12em',
  textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 2,
};

const contactValue = {
  fontSize: '0.88rem', color: 'var(--text)',
};

// ✅ NUEVO: estilo de botones del carrusel
const carouselBtn = (side) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  [side]: 10,
  background: 'rgba(0,0,0,0.55)',
  border: '1px solid rgba(255,255,255,0.15)',
  color: '#fff',
  width: 34,
  height: 34,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: 16,
  zIndex: 10,
});
