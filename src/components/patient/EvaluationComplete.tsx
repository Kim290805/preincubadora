import { useNavigate } from 'react-router';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle, Home, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function EvaluationComplete() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-2 border-green-100">
          <CardContent className="p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="flex justify-center mb-6"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                ¡Evaluación Completada!
              </h1>
              <p className="text-gray-600 mb-8">
                Tus respuestas han sido guardadas. Tu psicólogo las revisará pronto.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-8">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Gracias por tomarte el tiempo</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Completar estas evaluaciones ayuda a tu psicólogo a entender mejor tu progreso y ajustar tu tratamiento de manera personalizada.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/patient/home')}
                  className="w-full bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90"
                  size="lg"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Volver al Inicio
                </Button>
                <Button
                  onClick={() => navigate('/patient/achievements')}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Ver mi Progreso
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
