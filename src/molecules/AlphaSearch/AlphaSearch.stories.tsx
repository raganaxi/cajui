import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlphaSearch } from './AlphaSearch'
import type { Product } from '@/molecules/ProductCard/ProductCard'

const PRODUCTS: Product[] = [
  { id: 'a1', name: 'Aguacate Hass', price: 22.9, sku: 'FRU-001', stock: 30 },
  { id: 'a2', name: 'Arroz Verde Valle 1kg', price: 28.5, sku: 'ABA-010', stock: 15 },
  { id: 'b1', name: 'Bolillo', price: 3.5, sku: 'PAN-001', stock: 50 },
  { id: 'c1', name: 'Coca-Cola 600ml', price: 18.5, sku: 'BEB-030', stock: 48 },
  { id: 'c2', name: 'Cerveza Corona', price: 28.0, sku: 'ALC-001', stock: 60 },
  { id: 'f1', name: 'Frijoles La Sierra', price: 34.5, sku: 'ABA-030', stock: 25 },
  { id: 'g1', name: 'Galletas Oreo', price: 55.0, sku: 'GAL-001', stock: 18 },
  { id: 'l1', name: 'Leche Lala 1L', price: 26.5, sku: 'LAC-001', stock: 22 },
  { id: 'p1', name: 'Pan Bimbo', price: 49.0, sku: 'PAN-010', stock: 12 },
  { id: 'p2', name: 'Papas Ruffles', price: 16.5, sku: 'BOT-010', stock: 45 },
  { id: 's1', name: 'Sabritas Original', price: 15.0, sku: 'BOT-020', stock: 60 },
  { id: 't1', name: 'Tomate 1kg', price: 22.0, sku: 'FRU-040', stock: 25 },
  { id: 'y1', name: 'Yogurt Yoplait', price: 12.5, sku: 'LAC-020', stock: 20 },
]

const meta: Meta<typeof AlphaSearch> = {
  title: 'Auto Cobro / AlphaSearch',
  component: AlphaSearch,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Buscador de productos con índice alfabético tipo rockola — como la pantalla de auto cobro de Calimax. El panel izquierdo muestra letras disponibles; al tocar una letra se filtran los productos. También incluye buscador por texto libre.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AlphaSearch>

export const Default: Story = {
  args: {
    products: PRODUCTS,
    onAdd: (p) => console.log('add', p),
  },
  decorators: [(S) => <div className="h-screen p-4"><S /></div>],
}
