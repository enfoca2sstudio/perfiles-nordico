import { useState, useEffect } from 'react';

const STORAGE_KEY = 'nordico_barberos_v1';

const DEFAULT_BARBEROS = [
  {
    id: 1,
    name: 'Alejandro',
    last: 'Méndez',
    role: 'Maestro Barbero',
    phone: '+58 414 123 4567',
    ig: '@alejandro.cuts',
    exp: 9,
    skills: ['Fade Clásico', 'Navaja', 'Diseño', 'Barba'],
    bio: 'Más de 9 años perfeccionando el arte del corte. Especialista en estilos clásicos y diseños a mano alzada.',
    status: 'active',
    branch: 'Los Magallanes',
    color: '#b8976a',
    photos: [], // ✅ NUEVO: portafolio de fotos
  },
  {
    id: 2,
    name: 'Rafael',
    last: 'Torres',
    role: 'Barbero Senior',
    phone: '+58 412 987 6543',
    ig: '@rafa.barber',
    exp: 6,
    skills: ['Skin Fade', 'Ondas', 'Coloración'],
    bio: 'Apasionado por las tendencias actuales y los fade precisos. Cada corte es una obra de arte.',
    status: 'active',
    branch: 'Ambas',
    color: '#7a9e7e',
    photos: [], // ✅ NUEVO: portafolio de fotos
  },
  {
    id: 3,
    name: 'Diego',
    last: 'Vargas',
    role: 'Barbero Estilista',
    phone: '+58 416 555 7890',
    ig: '@diego.styles',
    exp: 4,
    skills: ['Corte Texturizado', 'Peinado', 'Cejas'],
    bio: 'Estilo contemporáneo con técnica europea. Especialista en cabello rizado y texturizado.',
    status: 'active',
    branch: 'Catia — Calle México',
    color: '#7a8fa0',
    photos: [], // ✅ NUEVO: portafolio de fotos
  },
];

export function usePersistence() {
  const [barberos, setBarberosState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return DEFAULT_BARBEROS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(barberos));
    } catch (e) {}
  }, [barberos]);

  const addBarbero = (data) => {
    const newBarbero = { ...data, id: Date.now() };
    setBarberosState(prev => [...prev, newBarbero]);
    return newBarbero;
  };

  const updateBarbero = (id, data) => {
    setBarberosState(prev =>
      prev.map(b => b.id === id ? { ...b, ...data } : b)
    );
  };

  const deleteBarbero = (id) => {
    setBarberosState(prev => prev.filter(b => b.id !== id));
  };

  const resetToDefault = () => {
    setBarberosState(DEFAULT_BARBEROS);
  };

  return { barberos, addBarbero, updateBarbero, deleteBarbero, resetToDefault };
}
