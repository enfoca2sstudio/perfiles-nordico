import React from 'react';

const styles = {
  bar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    borderBottom: '1px solid var(--border)',
  },
  stat: {
    background: 'var(--ink2)',
    padding: '1rem 1.5rem',
    textAlign: 'center',
    borderRight: '1px solid var(--border)',
  },
  number: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '2rem',
    fontWeight: 300,
    color: 'var(--gold)',
    lineHeight: 1,
  },
  label: {
    fontSize: '0.65rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--text3)',
    marginTop: '4px',
  },
};

export default function StatsBar({ barberos }) {
  const active = barberos.filter(b => b.status === 'active').length;
  const avgExp = barberos.length
    ? Math.round(barberos.reduce((a, b) => a + b.exp, 0) / barberos.length)
    : 0;
  const allSkills = [...new Set(barberos.flatMap(b => b.skills))].length;

  const stats = [
    { n: barberos.length, l: 'Barberos' },
    { n: active,          l: 'Activos' },
    { n: avgExp,          l: 'Años prom.' },
    { n: allSkills,       l: 'Especialidades' },
  ];

  return (
    <div style={styles.bar}>
      {stats.map((s, i) => (
        <div key={i} style={{ ...styles.stat, borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
          <div style={styles.number}>{s.n}</div>
          <div style={styles.label}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}
