import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  Brain,
  Smile,
  Frown,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import PatientBottomNav from './PatientBottomNav';

// Mock data for emotional state over the week
const emotionalData = [
  { day: 'Lun', mood: 6, label: 'Lunes', emotion: 'Tranquilo', notes: 'Día productivo en el trabajo' },
  { day: 'Mar', mood: 7, label: 'Martes', emotion: 'Motivado', notes: 'Completé mi rutina de ejercicio' },
  { day: 'Mié', mood: 5, label: 'Miércoles', emotion: 'Ansioso', notes: 'Reunión estresante con equipo' },
  { day: 'Jue', mood: 8, label: 'Jueves', emotion: 'Feliz', notes: 'Recibí buenas noticias' },
  { day: 'Vie', mood: 7, label: 'Viernes', emotion: 'Relajado', notes: 'Terminé proyectos pendientes' },
  { day: 'Sáb', mood: 9, label: 'Sábado', emotion: 'Muy feliz', notes: 'Pasé tiempo con familia' },
  { day: 'Dom', mood: 8, label: 'Domingo', emotion: 'Tranquilo', notes: 'Día de descanso y reflexión' },
];

// ML-generated recommendations based on patient data
const mlRecommendations = {
  primaryCondition: 'Ansiedad moderada',
  riskLevel: 'Bajo',
  insights: [
    {
      icon: '📊',
      title: 'Patrón detectado',
      message: 'Tu nivel de ansiedad tiende a aumentar a mitad de semana (miércoles-jueves). Considera programar actividades relajantes esos días.'
    },
    {
      icon: '💚',
      title: 'Fortaleza identificada',
      message: 'Los fines de semana muestran tu mejor estado emocional. El tiempo con familia y descanso son factores clave en tu bienestar.'
    },
    {
      icon: '🎯',
      title: 'Recomendación personalizada',
      message: 'Mantén tu rutina de ejercicio. Los datos muestran que los días con actividad física tu ánimo mejora en promedio 1.5 puntos.'
    }
  ],
  generalRecommendations: [
    'Continúa con tus técnicas de respiración profunda',
    'Considera agregar 5 minutos de meditación matinal',
    'Mantén tu diario de gratitud, especialmente los miércoles',
    'El ejercicio físico está demostrando ser muy efectivo para ti'
  ]
};

export default function IntelligentAnalysis() {
  const navigate = useNavigate();
  
  // Find best and worst days
  const bestDay = emotionalData.reduce((prev, current) => (prev.mood > current.mood) ? prev : current);
  const worstDay = emotionalData.reduce((prev, current) => (prev.mood < current.mood) ? prev : current);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white p-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() => navigate('/patient/emotional-state')}
          className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Volver</span>
        </button>
        
        <div className="flex items-center gap-3 mb-3">
          <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
            <Brain className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Análisis Inteligente</h1>
            <p className="text-sm opacity-90">Powered by Machine Learning</p>
          </div>
          <div className="px-3 py-1 bg-white bg-opacity-20 rounded-full">
            <span className="text-xs font-bold">ML</span>
          </div>
        </div>
        
        <p className="text-sm opacity-90 leading-relaxed">
          Este análisis utiliza inteligencia artificial para identificar patrones en tu comportamiento, 
          estado emocional y progreso terapéutico.
        </p>
      </div>

      <div className="p-6 space-y-4">
        {/* Best Day */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg border-2 border-green-200"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Smile className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                Mejor Estado de Ánimo
                <span className="text-2xl">🌟</span>
              </h3>
              <div className="mb-3">
                <p className="text-sm text-gray-600">Día con mejor ánimo:</p>
                <p className="text-lg font-bold text-green-700">{bestDay.label}</p>
              </div>
              <div className="mb-3">
                <p className="text-sm text-gray-600">Emoción predominante:</p>
                <p className="text-lg font-bold text-gray-900">{bestDay.emotion}</p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    style={{ width: `${(bestDay.mood / 10) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-green-600">{bestDay.mood}/10</span>
              </div>
              <p className="text-sm text-gray-700 italic">"{bestDay.notes}"</p>
            </div>
          </div>
        </motion.div>

        {/* Worst Day */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 shadow-lg border-2 border-orange-200"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Frown className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                Mayor Nivel de Ansiedad
                <span className="text-2xl">⚠️</span>
              </h3>
              <div className="mb-3">
                <p className="text-sm text-gray-600">Día con más estrés:</p>
                <p className="text-lg font-bold text-orange-700">{worstDay.label}</p>
              </div>
              <div className="mb-3">
                <p className="text-sm text-gray-600">Emoción predominante:</p>
                <p className="text-lg font-bold text-gray-900">{worstDay.emotion}</p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                    style={{ width: `${(worstDay.mood / 10) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-orange-600">{worstDay.mood}/10</span>
              </div>
              <p className="text-sm text-gray-700 italic">"{worstDay.notes}"</p>
            </div>
          </div>
        </motion.div>

        {/* ML Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 shadow-lg border-2 border-purple-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-6 h-6 text-purple-600" />
            <h3 className="font-bold text-gray-900">Análisis Profundo</h3>
            <span className="ml-auto px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              IA
            </span>
          </div>

          {/* Risk Level */}
          <div className="mb-4 p-4 bg-white rounded-xl border-2 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Condición principal detectada:</p>
                <p className="font-bold text-gray-900 text-lg">{mlRecommendations.primaryCondition}</p>
              </div>
              <div className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-bold text-sm border-2 border-green-300">
                Riesgo {mlRecommendations.riskLevel}
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="space-y-3 mb-4">
            {mlRecommendations.insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{insight.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{insight.title}</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{insight.message}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="p-4 bg-white rounded-xl border-2 border-indigo-200">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-indigo-600" />
              <h4 className="font-bold text-gray-900">Recomendaciones Personalizadas</h4>
            </div>
            <ul className="space-y-2">
              {mlRecommendations.generalRecommendations.map((rec, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border-2 border-blue-200"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-gray-900 mb-1">¿Cómo funciona este análisis?</h4>
              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                Nuestro sistema de Machine Learning analiza:
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Tus check-ins emocionales diarios</li>
                <li>• Notas de tu diario emocional</li>
                <li>• Cumplimiento y resultados de tareas</li>
                <li>• Evaluaciones clínicas (PHQ-9, GAD-7)</li>
                <li>• Patrones de comportamiento</li>
              </ul>
              <p className="text-sm text-gray-700 leading-relaxed mt-2">
                Esta información ayuda a tu psicólogo a brindarte mejor atención personalizada.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <PatientBottomNav />
    </div>
  );
}
