import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ClipboardList, Play, Clock, ChevronRight } from 'lucide-react';

export default function BaselineAssessment() {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);

  const handleStart = (type: 'phq9' | 'gad7') => {
    navigate(`/patient/assessment/${type}`);
  };

  if (started) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#4A90E2] to-[#7ED957] rounded-2xl flex items-center justify-center">
            <ClipboardList className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Evaluación inicial</h1>
            <p className="text-sm text-gray-600">Conoce tu estado emocional</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-6"
          >
            <p className="text-gray-800 leading-relaxed">
              Esta evaluación nos ayudará a conocer tu estado emocional actual. 
              Responde con honestidad, no hay respuestas correctas o incorrectas.
            </p>
          </motion.div>

          {/* PHQ-9 Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📋</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-1">PHQ-9</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Cuestionario sobre depresión
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>~3 minutos</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleStart('phq9')}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Iniciar PHQ-9
            </button>
          </motion.div>

          {/* GAD-7 Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📝</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-1">GAD-7</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Cuestionario sobre ansiedad
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>~2 minutos</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleStart('gad7')}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Iniciar GAD-7
            </button>
          </motion.div>

          {/* Time Info */}
          <div className="text-center text-sm text-gray-500">
            <p>Tiempo estimado total: 5-7 minutos</p>
          </div>
        </div>
      </div>

      {/* Skip Button */}
      <div className="p-6 bg-white border-t border-gray-200">
        <button
          onClick={() => navigate('/patient/optional-note')}
          className="w-full text-gray-600 font-medium py-3 rounded-2xl hover:bg-gray-100 transition-colors"
        >
          Hacer después
        </button>
      </div>
    </div>
  );
}
