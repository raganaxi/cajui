# cajui

> Bootstrap tu punto de venta en minutos.

Librería de componentes React + Tailwind CSS diseñada específicamente para sistemas de **Punto de Venta** y **ERP**. Todo lo que necesitas para construir una caja rápida ya existe: no más adaptar componentes genéricos.

---

## Instalación

```bash
npm install cajui
```

Importa los estilos en tu entry point:

```ts
import 'cajui/style.css'
```

---

## Componentes POS

| Componente | Para qué sirve |
|---|---|
| `<NumPad>` | Teclado numérico táctil para captura de montos |
| `<ProductCard>` | Tarjeta de producto con stock badge y precio |
| `<CartItem>` | Línea de carrito con control de cantidad |
| `<CartSummary>` | Totales: subtotal, descuento, IVA, botón cobrar |
| `<BarcodeInput>` | Input inteligente para lectores de código de barras |
| `<PaymentMethod>` | Selector de forma de pago (efectivo, tarjeta, etc.) |
| `<PriceDisplay>` | Precio formateado con moneda y tamaño |
| `<QuantityControl>` | Control +/− de cantidades |
| `<StockBadge>` | Indicador visual de nivel de stock |

## Componentes ERP

| Componente | Para qué sirve |
|---|---|
| `<KPICard>` | Tarjeta de indicador clave con tendencia |

## Hooks

| Hook | Para qué sirve |
|---|---|
| `useCart()` | Estado completo del carrito: add, remove, totales, descuentos |
| `useBarcode()` | Escucha input global del escáner de código de barras |

---

## Uso básico

```tsx
import { ProductCard, CartSummary, useCart } from 'cajui'
import 'cajui/style.css'

function MiCaja() {
  const cart = useCart({ taxRate: 16 })

  return (
    <div>
      <ProductCard
        product={{ id: '1', name: 'Coca-Cola', price: 18.5 }}
        onAdd={cart.add}
      />
      <CartSummary
        items={cart.items}
        taxRate={16}
        onCheckout={(total) => console.log('Cobrar:', total)}
      />
    </div>
  )
}
```

---

## Theming

cajui usa CSS custom properties. Puedes sobreescribir los colores en tu CSS:

```css
:root {
  --caj-primary: 37 99 235;       /* blue-600 */
  --caj-primary-hover: 29 78 216; /* blue-700 */
}
```

Tema oscuro:

```html
<div data-cajui-theme="dark">
  <!-- tus componentes -->
</div>
```

---

## Documentación interactiva

```bash
npm run dev
```

Abre [http://localhost:6006](http://localhost:6006) para ver Storybook con todos los componentes.

---

## Licencia

MIT
