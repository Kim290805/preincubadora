import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { 
  Heart, 
  Sparkles, 
  Target, 
  Trophy, 
  Clock,
  CheckCircle
} from 'lucide-react';

const tutorialSteps = [
  {
    title: '¡Bienvenido a MindGo!',
    description: 'Tu compañero diario para el bienestar emocional',
    icon: Heart,
    color: 'from-pink-400 to-pink-600'
  },
  {
    title: 'Solo 2 minutos al día',
    description: 'Completa una evaluación rápida cada día para monitorear tu estado emocional',
    icon: Clock,
    color: 'from-blue-400 to-blue-600'
  },
  {
    title: 'Gana recompensas',
    description: 'Completa tareas, mantén rachas y desbloquea logros',
    icon: Trophy,
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    title: 'Seguimiento de tu progreso',
    description: 'Tu psicólogo verá tu evolución y te ayudará en tiempo real',
    icon: Target,
    color: 'from-green-400 to-green-600'
  },
  {
    title: '¡Estamos contigo!',
    description: 'Recuerda: siempre hay ayuda disponible cuando la necesites',
    icon: Sparkles,
    color: 'from-purple-400 to-purple-600'
  }
];

export default function PatientTutorial() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/patient/setup-profile');
    }
  };

  const handleSkip = () => {
    navigate('/patient/setup-profile');
  };

  const step = tutorialSteps[currentStep];
  const Icon = step.icon;
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-600 mt-2 text-center">
            {currentStep + 1} de {tutorialSteps.length}
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className={`bg-gradient-to-br ${step.color} p-6 rounded-full shadow-lg`}>
                  <Icon className="w-16 h-16 text-white" />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-gray-900">{step.title}</h2>
                <p className="text-lg text-gray-600 max-w-md mx-auto">
                  {step.description}
                </p>
              </div>

              {currentStep === tutorialSteps.length - 1 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3 text-left">
                    <CheckCircle className="w-5 h-5 text-[#4A90E2] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      <strong>Promesa:</strong> MindGo te tomará solo 2 minutos al día. 
                      Tu bienestar es nuestra prioridad.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 justify-center pt-4">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-8"
                  >
                    Anterior
                  </Button>
                )}
                
                <Button
                  onClick={handleNext}
                  className="px-8 bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90"
                >
                  {currentStep === tutorialSteps.length - 1 ? '¡Comenzar!' : 'Siguiente'}
                </Button>
              </div>

              {currentStep < tutorialSteps.length - 1 && (
                <button
                  onClick={handleSkip}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Saltar tutorial
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-2 mt-6">
          {tutorialSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep 
                  ? 'bg-[#4A90E2] w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
