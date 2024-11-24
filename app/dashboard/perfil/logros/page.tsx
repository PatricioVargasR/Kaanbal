import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { obtenerSesion, obtenerUnUsuario, obtenreProgresoLogros } from "@/lib/utils";
import { Trophy, Star, Clock, Book, Target, Zap } from "lucide-react";

export default async function AchievementsPage() {
  // Obtiene la sesión del usuario
  const sesion = await obtenerSesion();

  // Obtiene el id_usuario con base a su email
  const usuario = await obtenerUnUsuario(sesion?.user?.email?.toString());

  // Obtiene todos los logros
  const logros = await obtenreProgresoLogros(usuario?.id_usuario);

  // Mapeo de los íconos según su nombre
  const iconos: Record<string, JSX.Element> = {
    Zap: <Zap className="h-6 w-6" />,
    Trophy: <Trophy className="h-6 w-6" />,
    Star: <Star className="h-6 w-6" />,
    Clock: <Clock className="h-6 w-6" />,
    Book: <Book className="h-6 w-6" />,
    Target: <Target className="h-6 w-6" />,
  };

  return (
    <div className="space-y-6 px-4 sm:px-6">
      <h1 className="text-2xl md:text-3xl font-bold text-[#0f4c81] text-center md:text-left">
        Logros
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {logros.map((logro, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {iconos[logro.icono_logro] || <Zap className="h-6 w-6" />}
                <span className="truncate">{logro.nombre_logro}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm text-gray-600">{logro.descripcion}</p>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span>Progreso</span>
                <span>
                  {logro.Progreso_logros.reduce(
                    (total, progreso) => total + progreso.progreso,
                    0
                  )}
                  %
                </span>
              </div>
              <Progress
                value={logro.Progreso_logros.reduce(
                  (total, progreso) => total + progreso.progreso,
                  0
                )}
                className="h-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
