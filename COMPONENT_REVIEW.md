# cajui — Component Review Board

Tabla de seguimiento visual y técnico de todos los componentes.  
**Cómo usar**: corre `npm run dev` en `/Users/booz/Developer/cajui`, abre Storybook en `:6006`, revisa cada componente y anota en las secciones `👤 Observaciones`.  
Yo (Claude) agrego mis propios hallazgos en `🤖 Notas` y propongo fixes en `🔧 Fix propuesto`.

**Estados**:
- `⬜ Pendiente` — no revisado aún
- `✅ OK` — sin issues conocidos
- `⚠️ Issues` — tiene problemas anotados
- `🔄 En iteración` — fix en progreso
- `❌ Roto` — no renderiza / TypeScript error

---

## Leyenda de checks visuales rápidos

Cuando revises un componente, verifica:
- [ ] Glass effect visible (blur + translucencia) — requiere fondo oscuro/degradado
- [ ] Texto legible (contraste adecuado sobre glass)
- [ ] Hover/active states funcionan
- [ ] Responsive (no se rompe en ancho reducido)
- [ ] Estados especiales (disabled, loading, empty, error)
- [ ] Tipografía consistente con el resto

---

## ATOMS

### GlassPanel `⬜ Pendiente`
Componente base. La superficie de vidrio que todos los demás usan.
- 👤 **Observaciones**:
- 🤖 **Notas**: Es el building block; si algo se ve raro aquí, se propaga a todo.
- 🔧 **Fix propuesto**:

---

### CajuiProvider `⬜ Pendiente`
Wrapper raíz que inyecta el degradado de fondo.
- 👤 **Observaciones**:
- 🤖 **Notas**: Probar los 5 gradientes: `default`, `warm`, `cool`, `midnight`, `none`.
- 🔧 **Fix propuesto**:

---

### Button `⬜ Pendiente`
Botón estándar con variantes primary, secondary, ghost, danger.
- 👤 **Observaciones**:
- 🤖 **Notas**:
- 🔧 **Fix propuesto**:

---

### PriceDisplay `⬜ Pendiente`
Muestra precios formateados con moneda.
- 👤 **Observaciones**:
- 🤖 **Notas**:
- 🔧 **Fix propuesto**:

---

### StockBadge `⬜ Pendiente`
Badge de estado de inventario: in-stock / low / out.
- 👤 **Observaciones**:
- 🤖 **Notas**: Glass semántico verde/ámbar/rojo translúcido.
- 🔧 **Fix propuesto**:

---

### OrderStatus `⬜ Pendiente`
Badge + stepper de estado de orden (pending → preparing → ready → delivered...).
- 👤 **Observaciones**:
- 🤖 **Notas**: El stepper tiene 6 estados; verificar que la línea conectora no se rompa en móvil.
- 🔧 **Fix propuesto**:

---

### AlertBanner `⬜ Pendiente`
Banner de notificación tintado (info / success / warning / error).
- 👤 **Observaciones**:
- 🤖 **Notas**: Glass tintado con color semántico translúcido.
- 🔧 **Fix propuesto**:

---

### NumPad `⬜ Pendiente`
Teclado numérico para entrada de cantidades/precios.
- 👤 **Observaciones**:
- 🤖 **Notas**: La tecla de borrado (danger) debe ser rojo glass. Verificar que `caj-numkey` se vea glass.
- 🔧 **Fix propuesto**:

---

### QuantityControl `⬜ Pendiente`
Control +/- con input para cantidad.
- 👤 **Observaciones**:
- 🤖 **Notas**: Botón + es `caj-btn-primary` (verde glass). Botón - es glass blanco.
- 🔧 **Fix propuesto**:

---

### KPICard `⬜ Pendiente`
Tarjeta de métrica para dashboards de turno/caja.
- 👤 **Observaciones**:
- 🤖 **Notas**: Necesita glass aplicado — pendiente de la sesión anterior.
- 🔧 **Fix propuesto**:

---

### BarcodeInput `⬜ Pendiente`
Input invisible que captura lecturas de escáner de código de barras.
- 👤 **Observaciones**:
- 🤖 **Notas**:
- 🔧 **Fix propuesto**:

---

### CategoryFilter `⬜ Pendiente`
Botones de filtro por categoría (chips horizontales con scroll).
- 👤 **Observaciones**:
- 🤖 **Notas**: Necesita glass aplicado — pendiente de la sesión anterior.
- 🔧 **Fix propuesto**:

---

### PaymentMethod `⬜ Pendiente`
Botón individual de método de pago (efectivo, tarjeta, etc).
- 👤 **Observaciones**:
- 🤖 **Notas**: Glass ya aplicado: selected=verde glass, unselected=blanco glass.
- 🔧 **Fix propuesto**:

---

### TableCard `⬜ Pendiente`
Tarjeta de mesa para layout de restaurante.
- 👤 **Observaciones**:
- 🤖 **Notas**: Tintado por estado (libre/ocupada/cuenta).
- 🔧 **Fix propuesto**:

---

### Dialog `⬜ Pendiente`
Modal/diálogo con overlay.
- 👤 **Observaciones**:
- 🤖 **Notas**:
- 🔧 **Fix propuesto**:

---

### Branding `⬜ Pendiente`
Logo/nombre de la librería.
- 👤 **Observaciones**:
- 🤖 **Notas**:
- 🔧 **Fix propuesto**:

---

### ThemeVisualizer `⬜ Pendiente`
Visualizador del sistema de tokens/tema activo.
- 👤 **Observaciones**:
- 🤖 **Notas**:
- 🔧 **Fix propuesto**:

---

## MOLECULES

### ProductCard `⬜ Pendiente`
Tarjeta de producto para grid/lista de POS.
- 👤 **Observaciones**:
- 🤖 **Notas**: Glass ya aplicado. Probar layout grid y list. Probar con imagen y sin imagen.
- 🔧 **Fix propuesto**:

---

### CartItem `⬜ Pendiente`
Fila de ítem en el carrito con cantidad y precio.
- 👤 **Observaciones**:
- 🤖 **Notas**: Glass ya aplicado. Probar con descuento, con imagen, sin imagen.
- 🔧 **Fix propuesto**:

---

### CartSummary `⬜ Pendiente`
Resumen de carrito con subtotal, descuento, IVA, total y botón de cobro.
- 👤 **Observaciones**:
- 🤖 **Notas**: Glass ya aplicado.
- 🔧 **Fix propuesto**:

---

### CashCalculator `⬜ Pendiente`
Calculadora de cambio para pagos en efectivo.
- 👤 **Observaciones**:
- 🤖 **Notas**: Glass pendiente de aplicar.
- 🔧 **Fix propuesto**:

---

### DiscountInput `⬜ Pendiente`
Input para aplicar descuento (% o monto fijo).
- 👤 **Observaciones**:
- 🤖 **Notas**: Glass pendiente de aplicar.
- 🔧 **Fix propuesto**:

---

### TipSelector `⬜ Pendiente`
Selector de propina con opciones rápidas (10%, 15%, 20%, custom).
- 👤 **Observaciones**:
- 🤖 **Notas**: Glass pendiente de aplicar.
- 🔧 **Fix propuesto**:

---

### SplitPayment `⬜ Pendiente`
División de cuenta entre múltiples personas/métodos.
- 👤 **Observaciones**:
- 🤖 **Notas**: Glass pendiente de aplicar.
- 🔧 **Fix propuesto**:

---

### AlphaSearch `⬜ Pendiente`
Buscador "rockola" — sidebar A-Z + grid de productos + búsqueda texto.
- 👤 **Observaciones**:
- 🤖 **Notas**: El componente estrella para auto-cobro. Verificar que el sidebar A-Z sea touch-friendly.
- 🔧 **Fix propuesto**:

---

### TableMap `⬜ Pendiente`
Mapa de mesas del restaurante con estado de cada una.
- 👤 **Observaciones**:
- 🤖 **Notas**: Estructura pendiente de limpiar (contiene código de TableCard que debe moverse a atoms).
- 🔧 **Fix propuesto**:

---

## ORGANISMS

### ReceiptPreview `⬜ Pendiente`
Vista previa del ticket/recibo (papel blanco).
- 👤 **Observaciones**:
- 🤖 **Notas**: Debe mantener aspecto de papel — glass solo aplica al botón de imprimir, no al ticket en sí.
- 🔧 **Fix propuesto**:

---

### ShiftPanel `⬜ Pendiente`
Panel de turno de caja — apertura, cierre, resumen.
- 👤 **Observaciones**:
- 🤖 **Notas**: Glass pendiente de aplicar.
- 🔧 **Fix propuesto**:

---

### DataTable `⬜ Pendiente`
Tabla de datos con ordenamiento, paginación y búsqueda.
- 👤 **Observaciones**:
- 🤖 **Notas**: Glass pendiente de aplicar. Header glass, zebra con opacidad alternada.
- 🔧 **Fix propuesto**:

---

### AgeVerification `✅ OK`
Modal de verificación de edad para productos restringidos.
- 👤 **Observaciones**:
- 🤖 **Notas**: Refactorizado para usar clases semánticas `caj-` y tokens de color `caj-warning`. Soporta el tema Liquid Glass (warning frosted glass) y los temas accesibles GOV.UK `accessible-light` y `accessible-dark` (diseño plano sin bordes redondeados ni transiciones, de alto contraste).
- 🔧 **Fix propuesto**: Completado refactor y agregados estilos y overrides en `cajui.css`.

---

### AttendantCall `⬜ Pendiente`
Botón/modal de llamada a asistente (para auto-cobro).
- 👤 **Observaciones**:
- 🤖 **Notas**: Glass pendiente de aplicar.
- 🔧 **Fix propuesto**:

---

### Login `⬜ Pendiente`
Pantalla de login para el POS.
- 👤 **Observaciones**:
- 🤖 **Notas**:
- 🔧 **Fix propuesto**:

---

### RegisterLocked `⬜ Pendiente`
Pantalla de caja bloqueada.
- 👤 **Observaciones**:
- 🤖 **Notas**:
- 🔧 **Fix propuesto**:

---

### KioskPayment `⬜ Pendiente`
Flujo completo de pago en modo kiosco/auto-cobro.
- 👤 **Observaciones**:
- 🤖 **Notas**:
- 🔧 **Fix propuesto**:

---

### ItemCustomizer `⬜ Pendiente`
Personalizador de ítem (modificadores, notas, opciones).
- 👤 **Observaciones**:
- 🤖 **Notas**:
- 🔧 **Fix propuesto**:

---

## Pendientes técnicos conocidos

- [ ] `npm run type-check` — verificar 0 errores TypeScript post-reorganización atómica
- [ ] Storybook preview `.storybook/preview.ts` — agregar fondo degradado oscuro por defecto
- [ ] `TableMap` — limpiar código duplicado de TableCard (debe importar de `../../atoms/TableCard`)
- [ ] Stories existentes — envolver con `CajuiProvider` para ver glass sobre fondo oscuro
- [ ] `templates/` — promover `POSLayout` y `SelfCheckoutLayout` de demo a componente real

---

## Historial de iteraciones

| Fecha | Componente | Cambio |
|-------|-----------|--------|
| 2026-06-02 | — | Archivo creado, todos en ⬜ Pendiente |
