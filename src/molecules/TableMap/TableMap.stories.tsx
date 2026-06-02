import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TableMap, type TableData } from './TableMap'

const TABLES: TableData[] = [
  { id: 't1', number: 1, capacity: 4, status: 'available' },
  { id: 't2', number: 2, capacity: 6, status: 'occupied', guests: 4, timeSeated: '14:32' },
  { id: 't3', number: 3, capacity: 2, status: 'reserved', waiter: 'Ana' },
  { id: 't4', number: 4, capacity: 8, status: 'occupied', guests: 7, timeSeated: '13:15' },
  { id: 't5', number: 5, capacity: 4, status: 'dirty' },
  { id: 't6', number: 6, capacity: 4, status: 'paying', guests: 3 },
  { id: 't7', number: 7, capacity: 4, status: 'available' },
  { id: 't8', number: 8, capacity: 2, status: 'available' },
]

const meta: Meta<typeof TableMap> = {
  title: 'Restaurante / TableMap',
  component: TableMap,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Mapa visual de mesas del restaurante con estados de color. Soporta secciones (terraza, barra, salón).',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof TableMap>

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null)
    return (
      <div className="p-4">
        <TableMap
          tables={TABLES}
          selectedId={selected}
          onSelectTable={(t) => setSelected(selected === t.id ? null : t.id)}
          showLegend
        />
        {selected && (
          <p className="mt-3 text-sm font-semibold text-caj-primary">
            ✓ Mesa seleccionada: {TABLES.find(t => t.id === selected)?.number}
          </p>
        )}
      </div>
    )
  },
}

export const Sections: Story = {
  name: 'Con secciones',
  args: {
    sections: [
      { name: 'Salón', tables: TABLES.slice(0, 4) },
      { name: 'Terraza', tables: TABLES.slice(4) },
    ],
  },
}
