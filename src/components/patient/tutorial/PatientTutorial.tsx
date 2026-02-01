import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Smile, BookOpen, AlertCircle, ChevronRight, Check } from 'lucide-react';

export default function PatientTutorial() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: '😊',
      title: 'Check-in emocional',
      description: 'Registra cómo te sientes cada día en menos de 1 minuto.',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      icon: '📓',
      title: 'Diario emocional',
      description: 'Escribe o graba notas sobre tus emociones cuando lo necesites.',
      color: 'from-purple-400 to-pink-400'
    },
    {
      icon: '🚨',
      title: 'Botón de pánico',
      description: 'Si necesitas ayuda inmediata, usa el botón de pánico para contactar a tu psicólogo.',
      color: 'from-red-400 to-orange-400'
    }
  ];

  const currentTutorial = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/patient/setup-profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Progress Dots */}
      <div className="flex justify-center gap-2 pt-8 pb-4">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentStep
                ? 'w-8 bg-gradient-to-r from-[#4A90E2] to-[#7ED957]'
                : index < currentStep
                ? 'w-2 bg-[#7ED957]'
                : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className={`inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br ${currentTutorial.color} rounded-full mb-8 shadow-2xl`}
            >
              <span className="text-6xl">{currentTutorial.icon}</span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              {currentTutorial.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 leading-relaxed px-4"
            >
              {currentTutorial.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="p-6 space-y-3">
        <button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-[#4A90E2] to-[#7ED957] text-white font-bold py-4 rounded-2xl hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {currentStep < steps.length - 1 ? (
            <>
              Siguiente
              <ChevronRight className="w-5 h-5" />
            </>
          ) : (
            <>
              Comenzar
              <Check className="w-5 h-5" />
            </>
          )}
        </button>

        <button
          onClick={() => navigate('/patient/setup-profile')}
          className="w-full text-gray-500 font-medium py-3 rounded-2xl hover:bg-gray-100 transition-colors"
        >
          Saltar tutorial
        </button>

        <p className="text-center text-sm text-gray-400">
          Paso {currentStep + 1} de {steps.length}
        </p>
      </div>
    </div>
  );
}