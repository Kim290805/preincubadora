import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { 
  Smile, 
  BookOpen, 
  ClipboardList, 
  AlertCircle,
  Settings,
  TrendingUp,
  Calendar,
  Award,
  CheckSquare,
  Mic
} from 'lucide-react';
import PatientBottomNav from './PatientBottomNav';

export default function PatientHomeNew() {
  const navigate = useNavigate();
  const [showPanicConfirm, setShowPanicConfirm] = useState(false);

  const todayDate = new Date().toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Get streak from localStorage
  const streak = parseInt(localStorage.getItem('patientStreak') || '0');
  const userName = 'Paciente'; // Could be from localStorage

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4A90E2] to-[#7ED957] text-white p-6 rounded-b-3xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-90 capitalize">{todayDate}</p>
              <h1 className="text-2xl font-bold mt-1">Hola, {userName} 👋</h1>
            </div>
            <button
              onClick={() => navigate('/patient/settings')}
              className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center hover:bg-opacity-30 transition-all"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>

          {/* Streak Card */}
          {streak > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white bg-opacity-30 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">{streak} días de racha 🔥</p>
                  <p className="text-sm opacity-90">¡Sigue así!</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Main Actions */}
        <div className="p-6 space-y-4">
          {/* Check-in Quick Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate('/patient/check-in')}
            className="w-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <Smile className="w-8 h-8" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-xl mb-1">Check-in rápido</h3>
                <p className="text-sm opacity-90">¿Cómo te sientes hoy?</p>
              </div>
              <div className="text-3xl">😊</div>
            </div>
          </motion.button>

          {/* Grid of Main Actions - 4 cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Diario Emocional */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => navigate('/patient/journal')}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all border-2 border-gray-100"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-3">
                <BookOpen className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Diario</h3>
              <p className="text-xs text-gray-600">Escribe o graba</p>
            </motion.button>

            {/* Evaluaciones (solo asignadas) */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              onClick={() => navigate('/patient/formal-evaluation')}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all border-2 border-gray-100 relative"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-3">
                <ClipboardList className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Evaluaciones</h3>
              <p className="text-xs text-gray-600">PHQ-9, GAD-7</p>
              {/* Badge de pendiente */}
              <div className="absolute top-3 right-3 w-6 h-6 bg-[#FFA500] text-white rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
            </motion.button>

            {/* Tareas (NUEVO - separado de evaluaciones) */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => navigate('/patient/tasks')}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all border-2 border-gray-100 relative"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-3">
                <CheckSquare className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Tareas</h3>
              <p className="text-xs text-gray-600">5 pendientes</p>
              {/* Badge de pendiente */}
              <div className="absolute top-3 right-3 w-6 h-6 bg-[#4A90E2] text-white rounded-full flex items-center justify-center text-xs font-bold">
                5
              </div>
            </motion.button>

            {/* Estado Emocional (antes Mi Progreso) */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              onClick={() => navigate('/patient/emotional-state')}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all border-2 border-gray-100"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl flex items-center justify-center mb-3">
                <TrendingUp className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Estado Emocional</h3>
              <p className="text-xs text-gray-600">Cómo te sientes</p>
            </motion.button>
          </div>

          {/* Calendario - Full Width */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => navigate('/patient/calendar')}
            className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all border-2 border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <Calendar className="w-7 h-7 text-indigo-600" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-gray-900 mb-1">Calendario</h3>
                <p className="text-xs text-gray-600">Historial de actividades y evaluaciones</p>
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Panic Button - Fixed */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: 'spring' }}
        onClick={() => setShowPanicConfirm(true)}
        className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 active:scale-95 transition-all z-50 flex items-center justify-center"
      >
        <AlertCircle className="w-8 h-8" />
      </motion.button>

      {/* Panic Confirmation Modal */}
      {showPanicConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                ¿Necesitas ayuda inmediata?
              </h3>
              <p className="text-gray-600 mb-6">
                Estamos aquí para apoyarte
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowPanicConfirm(false);
                    navigate('/patient/emergency');
                  }}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all"
                >
                  Sí, necesito ayuda
                </button>
                <button
                  onClick={() => setShowPanicConfirm(false)}
                  className="w-full bg-gray-200 text-gray-700 font-medium py-4 rounded-xl hover:bg-gray-300 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Bottom Navigation */}
      <PatientBottomNav />
    </>
  );
}