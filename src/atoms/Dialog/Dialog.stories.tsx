import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { useState } from "react";
import { Button } from "../Button";
import { Dialog } from "./Dialog";

const meta: Meta<typeof Dialog> = {
	title: "Atoms/Dialog",
	component: Dialog,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Ventana modal interactiva estilo Liquid Glass que se monta en un React Portal. Admite títulos, botones de cierre, contenidos personalizados de formularios e integraciones con nuestro componente Button.",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// 1. Simple Confirmation Dialog story
function ConfirmationDemo() {
	const [open, setOpen] = useState(false);

	return (
		<div className="p-8 bg-slate-900 rounded-xl flex flex-col items-center justify-center min-h-[200px] w-96 text-white border border-white/5">
			<p className="text-sm text-white/60 mb-4 text-center">
				Haz clic abajo para abrir un diálogo de confirmación básico.
			</p>
			<Button variant="primary" onClick={() => setOpen(true)}>
				Eliminar Registro
			</Button>

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				title="Confirmación de Eliminación"
				footer={
					<>
						<Button variant="ghost" onClick={() => setOpen(false)}>
							Cancelar
						</Button>
						<Button
							variant="danger"
							onClick={() => {
								alert("Registro eliminado con éxito.");
								setOpen(false);
							}}
						>
							Confirmar
						</Button>
					</>
				}
			>
				<p className="text-white/80">
					¿Estás seguro de que deseas eliminar este registro de venta? Esta
					acción no se puede deshacer y quedará registrada en la bitácora de
					auditoría.
				</p>
			</Dialog>
		</div>
	);
}

// 2. Form Dialog story mimicking Element UI Form inside a Dialog
function FormDialogDemo() {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		nombre: "",
		rfc: "",
		telefono: "",
		limiteCredito: "10000",
		tipoCliente: "General",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			alert(`Cliente Registrado:\n${JSON.stringify(formData, null, 2)}`);
			setOpen(false);
			setFormData({
				nombre: "",
				rfc: "",
				telefono: "",
				limiteCredito: "10000",
				tipoCliente: "General",
			});
		}, 1500);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="p-8 bg-slate-900 rounded-xl flex flex-col items-center justify-center min-h-[200px] w-96 text-white border border-white/5">
			<p className="text-sm text-white/60 mb-4 text-center">
				Haz clic abajo para abrir un diálogo de formulario de creación
				(inspirado en Element UI).
			</p>
			<Button variant="success" onClick={() => setOpen(true)}>
				Nuevo Cliente Facturación
			</Button>

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				title="Creación de Nuevo Cliente"
				size="lg"
			>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="nombre"
								className="text-xs font-semibold text-white/70"
							>
								Nombre Completo / Razón Social
							</label>
							<input
								id="nombre"
								type="text"
								name="nombre"
								required
								placeholder="Ej. Distribuidora Gómez S.A."
								className="caj-input"
								value={formData.nombre}
								onChange={handleInputChange}
							/>
						</div>

						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="rfc"
								className="text-xs font-semibold text-white/70"
							>
								RFC o Tax ID
							</label>
							<input
								id="rfc"
								type="text"
								name="rfc"
								required
								placeholder="Ej. GOMX920815AB3"
								className="caj-input"
								value={formData.rfc}
								onChange={handleInputChange}
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="telefono"
								className="text-xs font-semibold text-white/70"
							>
								Teléfono de Contacto
							</label>
							<input
								id="telefono"
								type="tel"
								name="telefono"
								placeholder="Ej. 6622159020"
								className="caj-input"
								value={formData.telefono}
								onChange={handleInputChange}
							/>
						</div>

						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="tipoCliente"
								className="text-xs font-semibold text-white/70"
							>
								Tipo de Cliente
							</label>
							<select
								id="tipoCliente"
								name="tipoCliente"
								className="caj-input bg-slate-900/60"
								value={formData.tipoCliente}
								onChange={handleInputChange}
							>
								<option value="General" className="bg-slate-950 text-white">
									General / Mostrador
								</option>
								<option value="Frecuente" className="bg-slate-950 text-white">
									Cliente Frecuente (VIP)
								</option>
								<option value="Mayorista" className="bg-slate-950 text-white">
									Distribuidor / Mayorista
								</option>
							</select>
						</div>
					</div>

					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="limiteCredito"
							className="text-xs font-semibold text-white/70"
						>
							Límite de Crédito Autorizado (MXN)
						</label>
						<input
							id="limiteCredito"
							type="number"
							name="limiteCredito"
							placeholder="10000"
							className="caj-input"
							value={formData.limiteCredito}
							onChange={handleInputChange}
						/>
					</div>

					<div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 mt-6">
						<Button variant="ghost" onClick={() => setOpen(false)}>
							Cancelar
						</Button>
						<Button variant="success" type="submit" loading={isSubmitting}>
							Guardar Cliente
						</Button>
					</div>
				</form>
			</Dialog>
		</div>
	);
}

export const Basic: Story = {
	render: () => <ConfirmationDemo />,
};

export const ConFormulario: Story = {
	name: "Sección Diálogo con Formulario",
	render: () => <FormDialogDemo />,
};
