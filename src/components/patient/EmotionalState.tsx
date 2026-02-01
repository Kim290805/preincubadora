import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  TrendingUp,
  TrendingDown,
  Minus,
  Heart,
  Brain,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PatientBottomNav from './PatientBottomNav';

// Mock data for emotional state over the week
const emotionalData = [
  { day: 'Lun', mood: 6, label: 'Lunes', emotion: 'Tranquilo' },
  { day: 'Mar', mood: 7, label: 'Martes', emotion: 'Motivado' },
  { day: 'Mié', mood: 5, label: 'Miércoles', emotion: 'Ansioso' },
  { day: 'Jue', mood: 8, label: 'Jueves', emotion: 'Feliz' },
  { day: 'Vie', mood: 7, label: 'Viernes', emotion: 'Relajado' },
  { day: 'Sáb', mood: 9, label: 'Sábado', emotion: 'Muy feliz' },
  { day: 'Dom', mood: 8, label: 'Domingo', emotion: 'Tranquilo' },
];

const emotionalStates = [
  { emoji: '😌', label: 'Tranquilo', range: [7, 10], color: 'text-green-600', bgColor: 'bg-green-100' },
  { emoji: '😰', label: 'Ansioso', range: [4, 6], color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  { emoji: '😢', label: 'Triste', range: [1, 3], color: 'text-blue-600', bgColor: 'bg-blue-100' },
];

export default function EmotionalState() {
  const navigate = useNavigate();
  
  // Calculate average mood
  const averageMood = (emotionalData.reduce((sum, d) => sum + d.mood, 0) / emotionalData.length).toFixed(1);
  
  // Determine predominant state
  const getPredominantState = () => {
    const avg = parseFloat(averageMood);
    if (avg >= 7) return emotionalStates[0]; // Tranquilo
    if (avg >= 4) return emotionalStates[1]; // Ansioso
    return emotionalStates[2]; // Triste
  };

  const predominantState = getPredominantState();

  // Calculate trend
  const getTrend = () => {
    const firstHalf = emotionalData.slice(0, 3).reduce((sum, d) => sum + d.mood, 0) / 3;
    const secondHalf = emotionalData.slice(4).reduce((sum, d) => sum + d.mood, 0) / 3;
    const diff = secondHalf - firstHalf;
    
    if (diff > 0.5) return { type: 'up', text: 'mejorando', icon: TrendingUp, color: 'text-green-600' };
    if (diff < -0.5) return { type: 'down', text: 'bajando', icon: TrendingDown, color: 'text-red-600' };
    return { type: 'stable', text: 'estable', icon: Minus, color: 'text-blue-600' };
  };

  const trend = getTrend();
  const TrendIcon = trend.icon;

  // Task completion rate
  const taskCompletionRate = 75; // Mock data

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4A90E2] to-[#7ED957] text-white p-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() => navigate('/patient/home-new')}
          className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Volver</span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Estado Emocional</h1>
            <p className="text-sm opacity-90">Análisis de tu bienestar</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Main State Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
        >
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-2">Esta semana te sentiste mayormente:</p>
            <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl ${predominantState.bgColor}`}>
              <span className="text-5xl">{predominantState.emoji}</span>
              <div className="text-left">
                <h2 className={`text-2xl font-bold ${predominantState.color}`}>
                  {predominantState.label}
                </h2>
                <p className="text-sm text-gray-600">Promedio: {averageMood}/10</p>
              </div>
            </div>
          </div>

          {/* Trend Indicator */}
          <div className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-50 ${trend.color}`}>
            <TrendIcon className="w-5 h-5" />
            <span className="font-medium">Tu estado está {trend.text}</span>
          </div>
        </motion.div>

        {/* Intelligent Analysis CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate('/patient/intelligent-analysis')}
          className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Brain className="w-7 h-7" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                Ver Análisis Inteligente
                <span className="px-2 py-0.5 bg-white bg-opacity-20 rounded-full text-xs">ML</span>
              </h3>
              <p className="text-sm opacity-90">
                Descubre patrones, recomendaciones personalizadas y más
              </p>
            </div>
            <div className="text-3xl">✨</div>
          </div>
        </motion.button>

        {/* Emotional Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
        >
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-[#4A90E2]" />
            Gráfico Emocional (Última Semana)
          </h3>
          
          <div className="w-full" style={{ height: '256px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={emotionalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  domain={[0, 10]}
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '8px 12px'
                  }}
                  formatter={(value: any) => [`${value}/10`, 'Ánimo']}
                  labelFormatter={(label: any) => {
                    const item = emotionalData.find(d => d.day === label);
                    return item?.label || label;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="url(#colorGradient)" 
                  strokeWidth={3}
                  dot={{ fill: '#4A90E2', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4A90E2" />
                    <stop offset="100%" stopColor="#7ED957" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Task Completion Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
        >
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#7ED957]" />
            Cumplimiento de Tareas
          </h3>
          
          <div className="space-y-3">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Esta semana</span>
                <span className="text-lg font-bold text-gray-900">{taskCompletionRate}%</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${taskCompletionRate}%` }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="h-full bg-gradient-to-r from-[#4A90E2] to-[#7ED957]"
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-green-50 rounded-xl p-3 text-center border-2 border-green-200">
                <p className="text-2xl font-bold text-green-600">12</p>
                <p className="text-xs text-gray-600">Completadas</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 text-center border-2 border-blue-200">
                <p className="text-2xl font-bold text-blue-600">4</p>
                <p className="text-xs text-gray-600">Pendientes</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-3 text-center border-2 border-orange-200">
                <p className="text-2xl font-bold text-orange-600">16</p>
                <p className="text-xs text-gray-600">Total</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border-2 border-blue-200"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Sobre este análisis</h4>
              <p className="text-sm text-gray-700">
                Los resultados se generan mediante análisis de tus check-ins diarios, notas del diario emocional 
                y cumplimiento de tareas. Esta información ayuda a tu psicólogo a brindarte mejor atención.
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
