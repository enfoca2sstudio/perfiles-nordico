# Nórdico Barbería — Panel de Gestión

Panel de gestión para barberos, con estética oscura inspirada en Nórdico Barbería.

## Características

- Agregar, editar y eliminar perfiles de barberos
- Búsqueda y filtros por estado y sede
- Persistencia de datos en `localStorage` (los datos se mantienen al cerrar el navegador)
- Vista detallada de perfil por barbero
- Estadísticas del equipo en tiempo real
- Diseño oscuro premium con tipografía elegante

## Requisitos

- Node.js 16 o superior
- npm o yarn

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar la app en modo desarrollo
npm start
```

La app abre en `http://localhost:3000`

## Build para producción

```bash
npm run build
```

Genera la carpeta `build/` lista para desplegar.

## Estructura

```
src/
  App.jsx           — Componente principal y lógica de estado
  usePersistence.js — Hook de persistencia con localStorage
  StatsBar.jsx      — Barra de estadísticas
  BarberoCard.jsx   — Tarjeta de barbero en el grid
  BarberoForm.jsx   — Modal de agregar / editar barbero
  ProfileModal.jsx  — Modal de perfil detallado
  ConfirmDialog.jsx — Diálogo de confirmación de eliminación
  index.css         — Variables y estilos globales
```

## Personalización

Los datos de ejemplo están en `src/usePersistence.js` dentro de `DEFAULT_BARBEROS`.
Los colores y la tipografía se controlan mediante variables CSS en `src/index.css`.
