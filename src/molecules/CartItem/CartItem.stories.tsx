import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CartItem, type CartItemData } from './CartItem'

const ITEM: CartItemData = {
  id: 'item-1',
  name: 'Refresco Coca-Cola 600ml',
  price: 18.5,
  quantity: 2,
  sku: 'COC-600',
}

const meta: Meta<typeof CartItem> = {
  title: 'POS / CartItem',
  component: CartItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Línea de producto en el carrito. Incluye control de cantidad, precio unitario y total de línea.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CartItem>

export const Default: Story = {
  render: () => {
    const [item, setItem] = useState(ITEM)
    return (
      <div className="w-80">
        <CartItem
          item={item}
          onQuantityChange={(_, q) => setItem({ ...item, quantity: q })}
          onRemove={() => console.log('remove')}
        />
      </div>
    )
  },
}

export const WithDiscount: Story = {
  name: 'Con descuento 20%',
  render: () => {
    const [item, setItem] = useState({ ...ITEM, discount: 20 })
    return (
      <div className="w-80">
        <CartItem
          item={item}
          onQuantityChange={(_, q) => setItem({ ...item, quantity: q })}
          onRemove={() => console.log('remove')}
        />
      </div>
    )
  },
}

export const ReadOnly: Story = {
  name: 'Solo lectura (ticket)',
  args: { item: { ...ITEM, quantity: 3 }, readOnly: true },
  decorators: [(S) => <div className="w-80"><S /></div>],
}
