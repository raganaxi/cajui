import type { Meta, StoryObj } from '@storybook/react-vite'
import { DataTable } from './DataTable'
import { StockBadge } from '@/atoms/StockBadge'
import { PriceDisplay } from '@/atoms/PriceDisplay'

interface Product {
  id: string
  sku: string
  name: string
  category: string
  price: number
  stock: number
  cost: number
}

const DATA: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: `p${i}`,
  sku: `SKU-${String(i + 1).padStart(4, '0')}`,
  name: ['Coca-Cola 600ml', 'Sabritas 45g', 'Agua Bonafont', 'Gomitas Haribo', 'Jugo Del Valle'][i % 5],
  category: ['Bebidas', 'Botanas', 'Bebidas', 'Dulces', 'Bebidas'][i % 5],
  price: [18.5, 15, 12, 22, 14][i % 5],
  stock: Math.floor(Math.random() * 50),
  cost: [10, 8, 7, 14, 9][i % 5],
}))

const meta: Meta<typeof DataTable<Product>> = {
  title: 'ERP / DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tabla de datos ERP con búsqueda, ordenamiento y paginación. Soporta renderizado personalizado por columna.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof DataTable<Product>>

export const Inventory: Story = {
  name: 'Inventario de productos',
  render: () => (
    <div className="p-4">
      <DataTable
        data={DATA}
        rowKey="id"
        searchable
        searchPlaceholder="Buscar producto, SKU…"
        columns={[
          { key: 'sku', header: 'SKU', sortable: true, width: '120px', render: (v) => <span className="font-mono text-xs">{String(v)}</span> },
          { key: 'name', header: 'Producto', sortable: true },
          { key: 'category', header: 'Categoría', sortable: true },
          { key: 'price', header: 'Precio', align: 'right', sortable: true, render: (v) => <PriceDisplay value={Number(v)} size="sm" variant="highlight" /> },
          { key: 'cost', header: 'Costo', align: 'right', render: (v) => <PriceDisplay value={Number(v)} size="sm" variant="muted" /> },
          {
            key: 'stock', header: 'Stock', align: 'center', sortable: true,
            render: (v) => <StockBadge quantity={Number(v)} showCount />,
          },
        ]}
        onRowClick={(row) => console.log('row', row)}
      />
    </div>
  ),
}

export const Loading: Story = {
  args: { data: [], rowKey: 'id', columns: [{ key: 'name', header: 'Nombre' }, { key: 'price', header: 'Precio' }], loading: true },
}
