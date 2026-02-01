import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { UserPlus, TrendingUp, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PsychologistTutorialProps {
  onComplete: () => void;
}

const tutorialSteps = [
  {
    icon: UserPlus,
    title: 'Crear Pacientes',
    description: 'Agrega nuevos pacientes a tu práctica de manera sencilla. Genera credenciales de acceso automáticas y personaliza el tratamiento para cada caso.',
    color: '#4A90E2'
  },
  {
    icon: TrendingUp,
    title: 'Ver Evolución Emocional',
    description: 'Monitorea el progreso de tus pacientes en tiempo real con gráficos intuitivos. Analiza patrones de estado de ánimo y ejercicios completados.',
    color: '#7ED957'
  },
  {
    icon: AlertTriangle,
    title: 'Recibir Alertas Críticas',
    description: 'Nuestro motor de ML analiza los datos y genera alertas codificadas por colores cuando detecta patrones que requieren atención inmediata.',
    color: '#FFA500'
  }
];

export default function PsychologistTutorial({ onComplete }: PsychologistTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTutorial = tutorialSteps[currentStep];
  const Icon = currentTutorial.icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F5F5] to-blue-50 p-4">
      <div className="w-full max-w-3xl">
        <Card className="shadow-2xl">
          <CardContent className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  <div 
                    className="p-6 rounded-full"
                    style={{ backgroundColor: `${currentTutorial.color}20` }}
                  >
                    <Icon 
                      className="w-16 h-16 md:w-20 md:h-20" 
                      style={{ color: currentTutorial.color }}
                    />
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {currentTutorial.title}
                </h2>

                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                  {currentTutorial.description}
                </p>

                {/* Progress dots */}
                <div className="flex justify-center gap-2 mb-8">
                  {tutorialSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentStep 
                          ? 'w-8 bg-[#4A90E2]' 
                          : 'w-2 bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation buttons */}
                <div className="flex gap-4 justify-center">
                  {currentStep > 0 && (
                    <Button
                      onClick={handlePrev}
                      variant="outline"
                      className="px-6"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Anterior
                    </Button>
                  )}
                  
                  <Button
                    onClick={handleNext}
                    className="px-8 bg-[#4A90E2] hover:bg-[#3A7BC8]"
                  >
                    {currentStep === tutorialSteps.length - 1 ? 'Comenzar' : 'Siguiente'}
                    {currentStep < tutorialSteps.length - 1 && (
                      <ChevronRight className="w-4 h-4 ml-2" />
                    )}
                  </Button>
                </div>

                <button
                  onClick={onComplete}
                  className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Saltar tutorial
                </button>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
