import type { Meta, StoryObj } from '@storybook/react-vite'
import { KPICard } from './KPICard'

const SalesIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const meta: Meta<typeof KPICard> = {
  title: 'ERP / KPICard',
  component: KPICard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tarjeta de indicador clave de rendimiento. Calcula la tendencia automáticamente si se provee `previousValue`.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof KPICard>

export const Default: Story = {
  args: {
    label: 'Ventas del día',
    value: '$12,480.00',
    trendLabel: '+8.3%',
    trend: 'up',
    color: 'green',
    icon: <SalesIcon />,
    description: 'Comparado con ayer',
  },
  decorators: [(S) => <div className="w-64"><S /></div>],
}

export const Dashboard: Story = {
  name: 'Dashboard de POS',
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4 w-[560px]">
      <KPICard label="Ventas hoy" value="$12,480" previousValue={11520} color="green" icon={<SalesIcon />} description="vs ayer" />
      <KPICard label="Tickets" value={48} previousValue={52} color="blue" description="transacciones" />
      <KPICard label="Ticket promedio" value="$260" previousValue={221} color="amber" description="por venta" />
      <KPICard label="Devoluciones" value={3} previousValue={1} trend="down" color="red" description="esta semana" />
    </div>
  ),
}
