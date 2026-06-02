import type { Meta, StoryObj } from '@storybook/react-vite';
import { Login } from './Login';
import { Branding } from '@/atoms/Branding';

const meta: Meta<typeof Login> = {
  title: 'Organisms/Login',
  component: Login,
  tags: ['autodocs', 'ai-generated', 'needs-work'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Pantalla de inicio de sesión o terminal de punto de venta (POS). Admite el método rápido mediante código PIN (utilizando el teclado en pantalla `<NumPad>`) o credenciales tradicionales de correo y contraseña.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Login>;

export const DefaultPinAndCredentials: Story = {
  args: {
    allowPin: true,
    allowCredentials: true,
    companyBranding: <Branding companyName="Cajui POS" size="sm" />,
    onLogin: (creds) => alert(`Intentando ingresar con: ${JSON.stringify(creds)}`),
  },
};

export const PinOnly: Story = {
  args: {
    allowPin: true,
    allowCredentials: false,
    companyBranding: <Branding companyName="Boutique POS" size="sm" themeColor="#ec4899" />,
    onLogin: (creds) => alert(`PIN enviado: ${creds.pin}`),
  },
};

export const CredentialsOnly: Story = {
  args: {
    allowPin: false,
    allowCredentials: true,
    companyBranding: <Branding companyName="Corporación ERP" size="sm" themeColor="#06b6d4" />,
    onLogin: (creds) => alert(`Credenciales: ${creds.email} / ${creds.password}`),
  },
};

export const LoadingState: Story = {
  args: {
    allowPin: true,
    allowCredentials: true,
    isLoading: true,
    companyBranding: <Branding companyName="Cajui Cloud" size="sm" />,
    onLogin: () => {},
  },
};

export const ErrorState: Story = {
  args: {
    allowPin: true,
    allowCredentials: true,
    error: 'PIN incorrecto o usuario no registrado. Intente nuevamente.',
    companyBranding: <Branding companyName="Cajui POS" size="sm" />,
    onLogin: (creds) => alert(`Reintentando con: ${JSON.stringify(creds)}`),
  },
};
