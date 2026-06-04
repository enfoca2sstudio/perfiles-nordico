import React from 'react';

export default function ConfirmDialog({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2000, padding: '1rem',
      }}
      onClick={e => e.target === e.currentTarget && onCancel()}
    >
      <div style={{
        background: 'var(--ink2)', border: '1px solid var(--border2)',
        borderRadius: 6, width: '100%', maxWidth: 360, padding: '1.75rem',
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.2rem', fontWeight: 300, color: 'var(--text)',
          marginBottom: '0.75rem',
        }}>
          Confirmar acción
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          {message}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button
            onClick={onCancel}
            style={{
              background: 'transparent', border: '1px solid var(--border)',
              color: 'var(--text2)', padding: '8px 18px',
              fontSize: '0.8rem', borderRadius: 3, cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            style={{
              background: '#9e2a2a', border: 'none',
              color: '#ffe0e0', padding: '8px 22px',
              fontSize: '0.8rem', fontWeight: 500, borderRadius: 3, cursor: 'pointer',
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
