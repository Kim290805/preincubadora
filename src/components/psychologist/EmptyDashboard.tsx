import { useNavigate } from 'react-router';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { UserPlus, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface EmptyDashboardProps {
  onAddPatient: () => void;
}

export default function EmptyDashboard({ onAddPatient }: EmptyDashboardProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Panel de Control
          </h1>
          <p className="text-gray-600">Bienvenido a tu espacio profesional</p>
        </div>

        {/* Empty state */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg">
            <CardContent className="p-12 md:p-16 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-50 p-8 rounded-full">
                  <Users className="w-20 h-20 md:w-24 md:h-24 text-[#4A90E2]" />
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Aún no tienes pacientes
              </h2>

              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Comienza agregando tu primer paciente para empezar a monitorear su progreso y bienestar emocional.
              </p>

              <Button
                onClick={onAddPatient}
                className="bg-[#4A90E2] hover:bg-[#3A7BC8] text-lg px-8 py-6"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Agregar Primer Paciente
              </Button>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  ¿Qué puedes hacer en MindGo?
                </h3>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="w-10 h-10 bg-[#4A90E2] rounded-lg flex items-center justify-center mb-3">
                      <span className="text-xl">📋</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Gestionar Pacientes</h4>
                    <p className="text-sm text-gray-600">
                      Crea perfiles detallados con diagnóstico y capacidad cognitiva
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="w-10 h-10 bg-[#7ED957] rounded-lg flex items-center justify-center mb-3">
                      <span className="text-xl">📊</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Monitorear Progreso</h4>
                    <p className="text-sm text-gray-600">
                      Visualiza gráficos de estado de ánimo y ejercicios completados
                    </p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="w-10 h-10 bg-[#FFA500] rounded-lg flex items-center justify-center mb-3">
                      <span className="text-xl">🚨</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Recibir Alertas</h4>
                    <p className="text-sm text-gray-600">
                      El motor ML detecta patrones críticos automáticamente
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
