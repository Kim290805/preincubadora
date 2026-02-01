import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { 
  Smile, 
  BookOpen, 
  AlertCircle, 
  ChevronRight,
  Heart,
  TrendingUp,
  Calendar,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PatientOnboardingTutorialProps {
  onComplete: () => void;
}

export default function PatientOnboardingTutorial({ onComplete }: PatientOnboardingTutorialProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: 'Check-in Emocional',
      icon: Smile,
      gradient: 'from-blue-400 to-cyan-400',
      description: 'Registra cómo te sientes cada día',
      features: [
        { icon: Heart, text: 'Selecciona tu estado de ánimo actual' },
        { icon: TrendingUp, text: 'Observa tus patrones emocionales' },
        { icon: Calendar, text: 'Evaluaciones diarias rápidas' }
      ],
      illustration: (
        <div className="grid grid-cols-3 gap-2 mt-4">
          {['😊', '😐', '😢'].map((emoji, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-md text-center text-4xl hover:scale-110 transition-transform cursor-pointer"
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: 'Diario Emocional',
      icon: BookOpen,
      gradient: 'from-purple-400 to-pink-400',
      description: 'Escribe tus pensamientos y reflexiones',
      features: [
        { icon: BookOpen, text: 'Registro privado de tus emociones' },
        { icon: Heart, text: 'Comparte con tu psicólogo si lo deseas' },
        { icon: TrendingUp, text: 'Reflexiona sobre tu progreso' }
      ],
      illustration: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-white rounded-xl p-6 shadow-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-600">Hoy, 31 de Enero</span>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded w-full"></div>
            <div className="h-2 bg-gray-200 rounded w-5/6"></div>
            <div className="h-2 bg-gray-200 rounded w-4/6"></div>
          </div>
        </motion.div>
      )
    },
    {
      title: 'Botón de Pánico',
      icon: AlertCircle,
      gradient: 'from-red-400 to-orange-400',
      description: 'Ayuda inmediata cuando la necesites',
      features: [
        { icon: Shield, text: 'Acceso a recursos de emergencia 24/7' },
        { icon: Heart, text: 'Ejercicios de respiración guiados' },
        { icon: AlertCircle, text: 'Contacto directo con líneas de ayuda' }
      ],
      illustration: (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="mt-4 mx-auto w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-2xl flex items-center justify-center cursor-pointer"
        >
          <AlertCircle className="w-16 h-16 text-white" />
        </motion.div>
      )
    }
  ];

  const currentTutorial = tutorialSteps[currentStep];
  const Icon = currentTutorial.icon;

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/patient/onboarding/profile-setup');
    }
  };

  const handleSkip = () => {
    navigate('/patient/onboarding/profile-setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-2xl border-2 border-blue-100">
              <CardContent className="p-8">
                {/* Header Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`bg-gradient-to-br ${currentTutorial.gradient} p-6 rounded-full shadow-lg`}>
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                </div>

                {/* Title & Description */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    {currentTutorial.title}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {currentTutorial.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {currentTutorial.features.map((feature, index) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-xl"
                      >
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                          <FeatureIcon className="w-5 h-5 text-[#4A90E2]" />
                        </div>
                        <span className="text-gray-800 font-medium">{feature.text}</span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Illustration */}
                <div className="mb-8">
                  {currentTutorial.illustration}
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center gap-2 mb-8">
                  {tutorialSteps.map((_, index) => (
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

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleSkip}
                    variant="outline"
                    className="flex-1"
                  >
                    Saltar Tutorial
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="flex-1 bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90"
                  >
                    {currentStep < tutorialSteps.length - 1 ? (
                      <>
                        Siguiente
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </>
                    ) : (
                      'Comenzar'
                    )}
                  </Button>
                </div>

                {/* Step Counter */}
                <div className="text-center mt-4 text-sm text-gray-500">
                  Paso {currentStep + 1} de {tutorialSteps.length}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}