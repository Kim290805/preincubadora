import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Progress } from '../../ui/progress';
import { 
  ClipboardList, 
  ChevronRight,
  AlertCircle,
  Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BaselineEvaluationNewProps {
  onComplete: () => void;
}

export default function BaselineEvaluationNew({ onComplete }: BaselineEvaluationNewProps) {
  const navigate = useNavigate();
  const [currentScale, setCurrentScale] = useState<'phq9' | 'gad7'>('phq9');
  const [phq9Answers, setPhq9Answers] = useState<Record<number, number>>({});
  const [gad7Answers, setGad7Answers] = useState<Record<number, number>>({});

  // PHQ-9 Questions (Depression)
  const phq9Questions = [
    'Poco interés o placer en hacer cosas',
    'Sentirse desanimado/a, deprimido/a o sin esperanza',
    'Problemas para dormir o dormir demasiado',
    'Sentirse cansado/a o tener poca energía',
    'Poco apetito o comer en exceso',
    'Sentirse mal consigo mismo/a o sentir que es un fracaso',
    'Problemas para concentrarse en cosas',
    'Moverse o hablar tan lento que otras personas lo notaron, o lo contrario',
    'Pensamientos de que estaría mejor muerto/a o de lastimarse'
  ];

  // GAD-7 Questions (Anxiety)
  const gad7Questions = [
    'Sentirse nervioso/a, ansioso/a o con los nervios de punta',
    'No poder parar o controlar la preocupación',
    'Preocuparse demasiado por diferentes cosas',
    'Tener dificultad para relajarse',
    'Estar tan inquieto/a que no puede quedarse quieto/a',
    'Irritarse o enojarse con facilidad',
    'Sentir miedo como si algo terrible fuera a pasar'
  ];

  const answerOptions = [
    { value: 0, label: 'Nunca' },
    { value: 1, label: 'Varios días' },
    { value: 2, label: 'Más de la mitad de los días' },
    { value: 3, label: 'Casi todos los días' }
  ];

  const currentQuestions = currentScale === 'phq9' ? phq9Questions : gad7Questions;
  const currentAnswers = currentScale === 'phq9' ? phq9Answers : gad7Answers;
  const setCurrentAnswers = currentScale === 'phq9' ? setPhq9Answers : setGad7Answers;

  const completedAnswers = Object.keys(currentAnswers).length;
  const totalQuestions = currentQuestions.length;
  const progress = (completedAnswers / totalQuestions) * 100;

  const handleAnswer = (questionIndex: number, value: number) => {
    setCurrentAnswers({
      ...currentAnswers,
      [questionIndex]: value
    });
  };

  const isScaleComplete = () => {
    return Object.keys(currentAnswers).length === totalQuestions;
  };

  const handleContinue = () => {
    if (currentScale === 'phq9' && isScaleComplete()) {
      setCurrentScale('gad7');
    } else if (currentScale === 'gad7' && isScaleComplete()) {
      // Save evaluation results
      const results = {
        phq9: {
          answers: phq9Answers,
          score: Object.values(phq9Answers).reduce((a, b) => a + b, 0)
        },
        gad7: {
          answers: gad7Answers,
          score: Object.values(gad7Answers).reduce((a, b) => a + b, 0)
        },
        date: new Date().toISOString()
      };
      localStorage.setItem('baselineEvaluation', JSON.stringify(results));
      navigate('/patient/onboarding/initial-note');
    }
  };

  const calculateScore = () => {
    return Object.values(currentAnswers).reduce((a, b) => a + b, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-blue-50 p-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-[#4A90E2] to-[#7ED957] p-4 rounded-full">
              <ClipboardList className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Evaluación Inicial</h1>
          <p className="text-gray-600">
            Esta información ayudará a tu psicólogo a entender tu estado actual
          </p>
        </motion.div>

        {/* Scale Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mb-6"
        >
          <button
            onClick={() => setCurrentScale('phq9')}
            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
              currentScale === 'phq9'
                ? 'border-[#4A90E2] bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="font-bold">PHQ-9</h3>
                <p className="text-sm text-gray-600">Escala de Depresión</p>
              </div>
              {Object.keys(phq9Answers).length === phq9Questions.length && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
          </button>

          <button
            onClick={() => setCurrentScale('gad7')}
            disabled={Object.keys(phq9Answers).length < phq9Questions.length}
            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
              currentScale === 'gad7'
                ? 'border-[#4A90E2] bg-blue-50'
                : Object.keys(phq9Answers).length < phq9Questions.length
                ? 'border-gray-200 opacity-50 cursor-not-allowed'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="font-bold">GAD-7</h3>
                <p className="text-sm text-gray-600">Escala de Ansiedad</p>
              </div>
              {Object.keys(gad7Answers).length === gad7Questions.length && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
          </button>
        </motion.div>

        {/* Progress Bar */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Progreso: {completedAnswers}/{totalQuestions}
              </span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Questions Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScale}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="shadow-2xl border-2 border-blue-100">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-[#4A90E2]" />
                  {currentScale === 'phq9' ? 'Escala PHQ-9 - Depresión' : 'Escala GAD-7 - Ansiedad'}
                </CardTitle>
                <CardDescription>
                  En las últimas 2 semanas, ¿con qué frecuencia has tenido estos problemas?
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-8">
                  {currentQuestions.map((question, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="space-y-4"
                    >
                      <Label className="text-base font-medium flex items-start gap-2">
                        <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#4A90E2] to-[#7ED957] text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <span className="pt-1">{question}</span>
                      </Label>

                      <RadioGroup
                        value={currentAnswers[index]?.toString()}
                        onValueChange={(value) => handleAnswer(index, parseInt(value))}
                      >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {answerOptions.map((option) => (
                            <div key={option.value}>
                              <RadioGroupItem
                                value={option.value.toString()}
                                id={`${currentScale}-${index}-${option.value}`}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={`${currentScale}-${index}-${option.value}`}
                                className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-[#4A90E2] peer-data-[state=checked]:border-[#4A90E2] peer-data-[state=checked]:bg-blue-50"
                              >
                                <span className="text-2xl mb-1">{option.value}</span>
                                <span className="text-xs text-center">{option.label}</span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </motion.div>
                  ))}
                </div>

                {/* Current Score */}
                {completedAnswers > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Puntuación actual:</span>
                      <span className="text-2xl font-bold text-[#4A90E2]">
                        {calculateScore()}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Important Note */}
                {currentScale === 'phq9' && currentAnswers[8] >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 p-4 bg-orange-50 border-2 border-orange-200 rounded-xl"
                  >
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-orange-900">Nota Importante</p>
                        <p className="text-sm text-orange-800 mt-1">
                          Tu psicólogo revisará esta respuesta con especial atención. Recuerda que el botón de pánico está disponible 24/7.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="flex-1"
                  >
                    Volver
                  </Button>
                  <Button
                    onClick={handleContinue}
                    disabled={!isScaleComplete()}
                    className="flex-1 bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90 disabled:opacity-50"
                  >
                    {currentScale === 'phq9' ? 'Siguiente Escala' : 'Finalizar Evaluación'}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}