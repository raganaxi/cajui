# cajui

> Bootstrap tu punto de venta en minutos.

Librería de componentes React + Tailwind CSS diseñada específicamente para sistemas de **Punto de Venta** y **ERP**. Todo lo que necesitas para construir una caja rápida ya existe: no más adaptar componentes genéricos.

---

## Instalación

Puedes instalar `cajui` de tres formas distintas según las necesidades de tu proyecto:

### 1. Desde GitHub Releases (Recomendado para uso interno sin NPM público)
Descarga y compila directamente el paquete usando el archivo `.tgz` de los Releases de GitHub. Esta es la opción más recomendada si no deseas publicar tu paquete públicamente, ya que **no requiere compilar la librería en el cliente**:
```bash
# Reemplaza v0.1.0 y 0.1.0 con la versión que desees instalar
pnpm add https://github.com/raganaxi/cajui/releases/download/v0.1.0/cajui-0.1.0.tgz
# O con npm:
npm install https://github.com/raganaxi/cajui/releases/download/v0.1.0/cajui-0.1.0.tgz
```

### 2. Directamente desde el repositorio Git (Tags/Branches)
Instala apuntando directamente a un tag o branch de Git. Gracias al script `prepare` configurado, el paquete se compilará automáticamente al instalarse:
```bash
# Usando un tag de versión (e.g. v0.1.0)
pnpm add github:raganaxi/cajui#v0.1.0
# Usando una rama específica (e.g. main)
pnpm add github:raganaxi/cajui#main
```

### 3. Desde el registro de NPM (Público o GitHub Packages)
Si has configurado la publicación automática en el registro de NPM:
```bash
pnpm add cajui
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

## Despliegue y Nuevas Versiones

Este repositorio cuenta con un pipeline automatizado de GitHub Actions en `.github/workflows/release.yml` que se ejecuta automáticamente al hacer un push o merge directo a la rama `main`.

### Cómo funciona el despliegue automático:

1. **Desarrolla tus cambios** en tu rama de trabajo (e.g. `dev`).
2. **Fusiona o haz push a la rama `main`**.
3. **El pipeline detecta el cambio en `main` y automáticamente**:
   - Analiza el mensaje del commit principal.
   - Determina el tipo de incremento de versión (SemVer):
     - **Default (Parche)**: Si no se especifica nada, subirá un parche (e.g. `0.1.0` ➡️ `0.1.1`).
     - **Menor (`minor`)**: Si el mensaje del commit o título de la PR contiene `#minor` (e.g. `feat: agregar nuevo botón #minor`), subirá la versión menor (e.g. `0.1.0` ➡️ `0.2.0`).
     - **Mayor (`major`)**: Si el mensaje del commit o título de la PR contiene `#major` (e.g. `refactor: cambiar API pública #major`), subirá la versión mayor (e.g. `0.1.0` ➡️ `1.0.0`).
   - Modifica el archivo `package.json` con la nueva versión y realiza un commit automático etiquetado con `[skip ci]` (evitando bucles infinitos en el pipeline).
   - Genera y sube el Tag de Git correspondiente (e.g., `v0.1.1`).
   - Compila la librería (`dist/`) y genera el archivo `.tgz` empaquetado.
   - Crea un **GitHub Release** automático en tu repositorio adjuntando el archivo `.tgz` compilado para que otros proyectos puedan instalar la librería de forma directa.
   - (Opcional) Si configuras un `NPM_TOKEN` en los GitHub Secrets del repositorio, publicará la versión automáticamente en el registro de NPM.

> [!NOTE]
> **Protección de la rama `main`**:
> El pipeline necesita subir el commit de release y el tag de regreso a `main`. Si tu rama `main` tiene reglas de protección de rama activadas (como requerir PRs aprobados), el token estándar de GitHub Actions (`GITHUB_TOKEN`) podría verse bloqueado.
> Para resolverlo, genera un Personal Access Token (PAT) con permisos de escritura, agrégalo a los Secrets de tu repositorio como `RELEASE_PAT` y la acción lo utilizará automáticamente para subir los cambios.

---

## Licencia

MIT
