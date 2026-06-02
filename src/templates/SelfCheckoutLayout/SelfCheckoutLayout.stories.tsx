import type { Meta, StoryObj } from '@storybook/react-vite'
import { SelfCheckoutLayout } from './SelfCheckoutLayout'

const meta: Meta<typeof SelfCheckoutLayout> = {
  title: 'Templates / SelfCheckoutLayout',
  component: SelfCheckoutLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Plantilla de pantalla completa para Auto Cobro (Self-Checkout) con diseño Liquid Glass.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SelfCheckoutLayout>

export const Default: Story = {}
