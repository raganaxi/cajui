import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PaymentMethodGroup, type PaymentType } from './PaymentMethod'

const meta: Meta<typeof PaymentMethodGroup> = {
  title: 'POS / PaymentMethod',
  component: PaymentMethodGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Selector de método de pago para pantalla de cobro. Soporta efectivo, tarjeta, transferencia, crédito y vale.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PaymentMethodGroup>

export const Default: Story = {
  render: () => {
    const [method, setMethod] = useState<PaymentType | null>('cash')
    return (
      <div className="flex flex-col gap-4 p-4">
        <p className="text-sm text-gray-500">Selecciona forma de pago:</p>
        <PaymentMethodGroup value={method ?? undefined} onChange={setMethod} />
        {method && (
          <p className="text-sm font-semibold text-green-600">
            ✓ Seleccionado: {method}
          </p>
        )}
      </div>
    )
  },
}

export const AllMethods: Story = {
  name: 'Todos los métodos',
  args: {
    methods: ['cash', 'card', 'transfer', 'credit', 'voucher', 'other'],
    value: 'card',
  },
}
