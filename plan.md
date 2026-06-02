# Hoja de Ruta de Arquitectura: cajui

Este documento registra las decisiones estratégicas de arquitectura y diseño para **cajui**, con el fin de guiar el desarrollo de la versión actual (React-first) y preparar de forma limpia la transición a una biblioteca multi-framework en el futuro sin re-trabajos.

---

## 📌 Fase 1: Estabilización en React & Aislamiento CSS

### 1. Enfoque React-First (Pragmatismo)
- La versión 1.0.0 se desarrollará **exclusivamente en React**. Esto permite iterar rápido, refinar las APIs de los componentes y validar la biblioteca en ambientes reales de Punto de Venta (POS) y ERP.

### 2. Estrategia de Aislamiento de Estilos (Blindaje contra Tailwind)
Para evitar que las actualizaciones de Tailwind CSS (como el salto a v4) rompan los componentes y obliguen a editar el JSX individualmente, adoptaremos una estrategia de **clases CSS personalizadas semánticas**:
- Los componentes React consumirán clases semánticas prefijadas con `caj-` (ej. `caj-card`, `caj-numkey-enter`, `caj-btn-primary`).
- En lugar de saturar el JSX con clases utilitarias de Tailwind, la maquetación se encapsula en [src/styles/cajui.css](file:///Users/booz/Developer/cajui/src/styles/cajui.css) usando directivas `@apply` o CSS tradicional.

**Beneficios:**
1.  **Independencia:** Si Tailwind cambia o se elimina en el futuro, los componentes React permanecen 100% intactos; solo se modifica el archivo CSS central.
2.  **Mantenimiento Visual:** Los ajustes estéticos de Liquid Glass (sombras, opacidades, colores) se modifican en un único punto.

---

## 📌 Fase 2: Portabilidad y Monorepo (Multi-Framework)

Cuando la biblioteca de React sea madura y se decida dar soporte nativo a **Vue 3** y **Svelte**, la migración se hará bajo una estructura de **Monorepo**:

### 1. Estructura del Monorepositorio
El monorepo (gestionado con Turborepo o Nx) dividirá el proyecto en paquetes independientes dentro de `packages/`:
-   `@cajui/theme` (Shared): Contiene el archivo de estilos compilado `cajui.css` y las definiciones de tokens JSON.
-   `@cajui/react`: El paquete actual de React.
-   `@cajui/vue`: Implementación nativa de componentes en Vue 3 (Composition API).
-   `@cajui/svelte`: Implementación nativa de componentes en Svelte.

### 2. Portado de HTML y CSS
Dado que el HTML consumirá las mismas clases CSS universales `@cajui/theme/style.css`, portar un componente a Vue o Svelte consistirá únicamente en:
1.  Reescribir la estructura HTML básica (respetando las clases `caj-*`).
2.  Traducir la reactividad nativa del framework (ej: pasar de React hooks a Vue Composables o Svelte Stores).
3.  Los tres frameworks renderizarán visualmente de forma idéntica porque consumen la misma hoja de estilos unificada.
