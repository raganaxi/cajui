import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Botón interactivo altamente adaptable para interfaces POS, diseñado con estética Liquid Glass.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Standard icons for stories
const EditIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.155 1.263a.5.5 0 01-.65-.65z" />
    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
  </svg>
);

const SearchIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      fillRule="evenodd"
      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
      clipRule="evenodd"
    />
  </svg>
);

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 rounded-xl max-w-4xl text-white">
      <div>
        <h4 className="text-sm font-semibold text-slate-400 mb-3">Botones Básicos</h4>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="text">Text Button</Button>
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-xl">
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4 bg-slate-950 rounded-xl">
      <Button variant="default" disabled>Default</Button>
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="success" disabled>Success</Button>
      <Button variant="warning" disabled>Warning</Button>
      <Button variant="danger" disabled>Danger</Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4 bg-slate-950 rounded-xl">
      <Button variant="primary" loading>Loading Primary</Button>
      <Button variant="success" loading>Loading Success</Button>
      <Button variant="default" loading>Loading Default</Button>
    </div>
  ),
};

export const Icons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4 bg-slate-950 rounded-xl">
      <Button variant="primary" icon={SearchIcon}>Buscar</Button>
      <Button variant="primary" icon={EditIcon} iconPosition="right">Editar</Button>
    </div>
  ),
};

export const Block: Story = {
  render: () => (
    <div className="w-80 p-4 bg-slate-950 rounded-xl flex flex-col gap-3">
      <Button variant="primary" block>Bloque Primario (w-full)</Button>
      <Button variant="ghost" block>Bloque Ghost (w-full)</Button>
    </div>
  ),
};

