"use client";

import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast"; // Asegúrate de tener esta utilidad
import { useForm } from "react-hook-form";
import SignUpButtons from "@/components/user/signupButtons";
import { useLoading } from "@/components/user/LoadingContext";

// export const metadata: Metadata = {
//   title: 'Inicia sesión'
// }
// TODO: Crear un estado global para manejar el inicio de sesión

export default function SignUp() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { toast } = useToast();

	const { isLoading, setLoading } = useLoading();

	const onSubmit = async (data: any) => {
		setLoading(true);
		try {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.status == 200) {
				toast({
					title: "Registro exitoso",
					description: "Tu cuenta ha sido creada correctamente.",
					variant: "default",
				});
				window.location.href = "/dashboard";
			} else {
				toast({
					title: "Error en el registro",
					description: "Ocurrió un error, inténtalo de nuevo.",
					variant: "destructive",
				});
			}
		} catch (error) {
			toast({
				title: "Error",
				description:
					"No se pudo completar la solicitud, por favor intenta nuevamente.",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#f3f3f3]">
			<Link
				href="/"
				className="absolute top-4 left-4 text-[#0f4c81] flex items-center gap-2 hover:underline"
			>
				<ArrowLeft size={20} />
				<span>Volver</span>
			</Link>
			<Link
				href="/login"
				className="absolute top-4 right-4 text-[#0f4c81] hover:underline"
			>
				Inicia sesión
			</Link>
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center text-[#0f4c81]">
						Regístrate
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="space-y-4">
							<Input
								type="text"
								placeholder="Nombre"
								{...register("nombre", {
									required: {
										value: true,
										message: "Este campo es obligatorio",
									},
								})}
							/>

							{errors.nombre &&
								typeof errors.nombre.message === "string" && (
									<span className="text-sm text-red-500">
										{errors.nombre.message}
									</span>
								)}

							<Input
								type="number"
								placeholder="Edad"
								{...register("edad", {
									required: "Este campo es obligatorio",
								})}
							/>
							{errors.edad &&
								typeof errors.edad.message === "string" && (
									<p className="text-sm text-red-500">
										{errors.edad.message}
									</p>
								)}

							<Input
								type="email"
								placeholder="Correo"
								{...register("email", {
									required: "Este campo es obligatorio",
								})}
							/>
							{errors.email &&
								typeof errors.email.message === "string" && (
									<p className="text-sm text-red-500">
										{errors.email.message}
									</p>
								)}

							<Input
								type="password"
								placeholder="Contraseña"
								{...register("contrasena", {
									required: "Este campo es obligatorio",
								})}
							/>
							{errors.contrasena &&
								typeof errors.contrasena.message ===
									"string" && (
									<p className="text-sm text-red-500">
										{errors.contrasena.message}
									</p>
								)}

							<Button
								type="submit"
								className="w-full bg-[#0f4c81] hover:bg-[#98bee0]"
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Registrandose...
									</>
								) : (
									"Registrate"
								)}
							</Button>
						</div>
					</form>
				</CardContent>
				<SignUpButtons />
			</Card>
		</div>
	);
}
