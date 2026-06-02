import type { Meta, StoryObj } from '@storybook/react-vite'
import { AgeVerification } from './AgeVerification'

const meta: Meta<typeof AgeVerification> = {
  title: 'Auto Cobro / AgeVerification',
  component: AgeVerification,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modal de verificación de edad para productos restringidos (alcohol, tabaco) en kioscos de auto cobro.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AgeVerification>

export const SelfConfirm: Story = {
  name: 'Autoconfirmación',
  args: {
    productName: 'Cerveza Corona 355ml',
    onApprove: () => alert('Aprobado'),
    onDeny: () => alert('Denegado'),
  },
  decorators: [(S) => <div className="w-96"><S /></div>],
}

export const RequiresStaff: Story = {
  name: 'Requiere empleado',
  args: {
    productName: 'Tequila Don Julio 750ml',
    requireStaff: true,
    onApprove: () => alert('Empleado aprobó'),
    onDeny: () => alert('Cancelado'),
  },
  decorators: [(S) => <div className="w-96"><S /></div>],
}
