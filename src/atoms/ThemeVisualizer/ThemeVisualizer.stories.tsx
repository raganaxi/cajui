import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeVisualizer } from './ThemeVisualizer';
import { expect } from 'storybook/test';

const meta: Meta<typeof ThemeVisualizer> = {
  title: 'Theme / ThemeVisualizer',
  component: ThemeVisualizer,
  tags: ['autodocs', 'ai-generated', 'needs-work'],
  parameters: {
    docs: {
      description: {
        component:
          'Herramienta de desarrollo y visualización de tokens del tema (colores de marca, estados, degradados y variables de Liquid Glass). Lee en tiempo real el valor computado del DOM y permite copiar las declaraciones CSS para crear temas personalizados.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeVisualizer>;

export const Default: Story = {
  args: {
    showColors: true,
    showGlassTokens: true,
    showGradients: true,
  },
  decorators: [(S) => <div className="max-w-4xl w-full p-4"><S /></div>],
};

export const ColorsOnly: Story = {
  args: {
    showColors: true,
    showGlassTokens: false,
    showGradients: false,
  },
  decorators: [(S) => <div className="max-w-4xl w-full p-4"><S /></div>],
};

export const GlassTokensOnly: Story = {
  args: {
    showColors: false,
    showGlassTokens: true,
    showGradients: false,
  },
  decorators: [(S) => <div className="max-w-4xl w-full p-4"><S /></div>],
};

export const InteractiveCheck: Story = {
  args: {},
  decorators: [(S) => <div className="max-w-4xl w-full p-4" id="visualizer-test-root"><S /></div>],
  play: async ({ canvas }) => {
    // Assert that the color palette title is displayed
    const title = canvas.getByText('Paleta de Colores de Marca y Estados');
    await expect(title).toBeVisible();
    
    // Assert that CSS variable keys are rendered
    const primaryKey = canvas.getByText('--caj-primary');
    await expect(primaryKey).toBeVisible();
  },
};
