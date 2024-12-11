"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { obtenerCantidadCursos, obtenerCantidadPreguntas, obtenerSesion, obtenerUnUsuario, obtenreProgresoLogros } from "@/lib/utils";
import Link from "next/link";

export default function ProfilePage() {
  const [avatarUrl, setAvatarUrl] = useState<string | ArrayBuffer | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);
  const [cantidadCursos, setCantidadCursos] = useState(0);
  const [cantidadPreguntas, setCantidadPreguntas] = useState(0);
  const [logros, setLogros] = useState<any[]>([]);
  const [progreso, setProgreso] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const sesion = await obtenerSesion();
      const usuarioData = await obtenerUnUsuario(sesion?.user?.email?.toString());
      const cursos = await obtenerCantidadCursos(usuarioData?.id_usuario);
      const preguntas = await obtenerCantidadPreguntas(usuarioData?.id_usuario);
      const logrosData = await obtenreProgresoLogros(usuarioData?.id_usuario);

      const progresoData = logrosData.flatMap((logro) =>
        logro.Progreso_logros.flatMap((progreso) => progreso.progreso)
      );

      setUsuario(usuarioData);
      setCantidadCursos(cursos);
      setCantidadPreguntas(preguntas);
      setLogros(logrosData);
      setProgreso(progresoData);
    };

    fetchData();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setAvatarUrl(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Avatar className="w-20 h-20">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl.toString()} alt={Imagen del usuario: ${usuario?.nombre}} />
          ) : usuario?.avatar ? (
            <AvatarImage src={usuario.avatar.toString()} alt={Imagen del usuario: ${usuario?.nombre}} />
          ) : (
            <AvatarFallback>{usuario?.nombre?.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
          )}
        </Avatar>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0f4c81]">{usuario?.nombre}</h1>
          <p className="text-sm text-muted-foreground">{usuario?.proveedor_auth}</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} variant="outline" className="w-full sm:w-auto mt-4 sm:mt-0">
          Cambiar icono
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seleccionar Imagen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Avatar className="w-20 h-20">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl.toString()} alt="Imagen de perfil" />
              ) : (
                <AvatarFallback>?</AvatarFallback>
              )}
            </Avatar>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Subir imagen</label>
              <input
                type="file"
                accept="image/*"
                className="mt-2 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <CardTitle>Estadísticas</CardTitle>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/dashboard/perfil/estadisticas">Ver más</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div key="Estadistica_usuario1" className="text-center">
              <p className="text-sm text-muted-foreground">Cursos completados</p>
              <p className="text-2xl font-bold">{cantidadCursos}</p>
            </div>
            <div key="Estadistica_usuario2" className="text-center">
              <p className="text-sm text-muted-foreground">Logros obtenidos</p>
              <p className="text-2xl font-bold">{logros.length}</p>
            </div>
            <div key="Estadistica_usuario3" className="text-center">
              <p className="text-sm text-muted-foreground">Total de preguntas</p>
              <p className="text-2xl font-bold">{cantidadPreguntas}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <CardTitle>Logros</CardTitle>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/dashboard/perfil/logros">Ver más</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logros.slice(0, 3).map((logro, indice) => (
              <div key={indice}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{logro.nombre_logro}</span>
                  {logro.Progreso_logros.map((progreso: { progreso: number }, indice: number) => (
                    <span key={indice} className="text-sm">{progreso.progreso}%</span>
                  ))}
                </div>
                <Progress value={progreso[indice]} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
