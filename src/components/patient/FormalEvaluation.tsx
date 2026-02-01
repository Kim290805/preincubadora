import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Progress } from '../ui/progress';
import { 
  ClipboardList, 
  ChevronRight,
  CheckCircle,
  Clock,
  Brain,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FormalEvaluation() {
  const navigate = useNavigate();
  const [currentScale, setCurrentScale] = useState<'phq9' | 'gad7'>('phq9');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [phq9Answers, setPhq9Answers] = useState<Record<number, number>>({});
  const [gad7Answers, setGad7Answers] = useState<Record<number, number>>({});
  const [startTime] = useState(Date.now());

  const phq9Questions = [
    'Poco interés o placer en hacer cosas',
    'Sentirse desanimado/a, deprimido/a o sin esperanza',
    'Problemas para dormir o dormir demasiado',
    'Sentirse cansado/a o tener poca energía',
    'Poco apetito o comer en exceso',
    'Sentirse mal consigo mismo/a o sentir que es un fracaso',
    'Problemas para concentrarse en cosas',
    'Moverse o hablar tan lento que otras personas lo notaron',
    'Pensamientos de que estaría mejor muerto/a o de lastimarse'
  ];

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
    { value: 0, label: 'Nunca', emoji: '😊' },
    { value: 1, label: 'Varios días', emoji: '😐' },
    { value: 2, label: 'Más de la mitad', emoji: '😟' },
    { value: 3, label: 'Casi todos los días', emoji: '😢' }
  ];

  const currentQuestions = currentScale === 'phq9' ? phq9Questions : gad7Questions;
  const currentAnswers = currentScale === 'phq9' ? phq9Answers : gad7Answers;
  const setCurrentAnswers = currentScale === 'phq9' ? setPhq9Answers : setGad7Answers;

  const totalQuestions = currentQuestions.length;
  const answeredCount = Object.keys(currentAnswers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const handleAnswer = (value: number) => {
    setCurrentAnswers({
      ...currentAnswers,
      [currentQuestion]: value
    });

    // Auto advance to next question
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 300);
  };

  const handleNext = () => {
    if (currentScale === 'phq9' && answeredCount === totalQuestions) {
      setCurrentScale('gad7');
      setCurrentQuestion(0);
    } else if (currentScale === 'gad7' && answeredCount === totalQuestions) {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000 / 60); // minutes

    const evaluation = {
      phq9: {
        answers: phq9Answers,
        score: Object.values(phq9Answers).reduce((a, b) => a + b, 0)
      },
      gad7: {
        answers: gad7Answers,
        score: Object.values(gad7Answers).reduce((a, b) => a + b, 0)
      },
      duration,
      date: new Date().toISOString(),
      assignedBy: 'Dr. Juan Pérez'
    };

    const existingEvaluations = JSON.parse(localStorage.getItem('formalEvaluations') || '[]');
    existingEvaluations.push(evaluation);
    localStorage.setItem('formalEvaluations', JSON.stringify(existingEvaluations));

    navigate('/patient/evaluation-complete');
  };

  const getEstimatedTime = () => {
    const elapsed = Math.round((Date.now() - startTime) / 1000 / 60);
    const remaining = Math.max(5 - elapsed, 0);
    return `~${remaining} min restantes`;
  };

  const canProceed = answeredCount === totalQuestions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-blue-50 p-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="shadow-lg border-2 border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-[#4A90E2] to-[#7ED957] p-3 rounded-xl">
                    <ClipboardList className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Evaluación Formal
                    </h1>
                    <p className="text-sm text-gray-600">
                      Asignada por tu psicólogo
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{getEstimatedTime()}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">5-7 minutos total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Scale Progress */}
        <div className="flex gap-3 mb-6">
          <div className={`flex-1 p-4 rounded-xl border-2 ${
            currentScale === 'phq9'
              ? 'border-[#4A90E2] bg-blue-50'
              : Object.keys(phq9Answers).length === phq9Questions.length
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">PHQ-9</p>
                <p className="text-xs text-gray-600">Depresión</p>
              </div>
              {Object.keys(phq9Answers).length === phq9Questions.length && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
            </div>
          </div>

          <div className={`flex-1 p-4 rounded-xl border-2 ${
            currentScale === 'gad7'
              ? 'border-[#4A90E2] bg-blue-50'
              : Object.keys(gad7Answers).length === gad7Questions.length
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 bg-white opacity-60'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">GAD-7</p>
                <p className="text-xs text-gray-600">Ansiedad</p>
              </div>
              {Object.keys(gad7Answers).length === gad7Questions.length && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Pregunta {currentQuestion + 1} de {totalQuestions}
              </span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentScale}-${currentQuestion}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="shadow-2xl border-2 border-blue-100">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-[#4A90E2]" />
                  <CardTitle>
                    {currentScale === 'phq9' ? 'Escala PHQ-9' : 'Escala GAD-7'}
                  </CardTitle>
                </div>
                <CardDescription>
                  En las últimas 2 semanas, ¿con qué frecuencia has tenido este problema?
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                {/* Question */}
                <div className="mb-8">
                  <Label className="text-lg font-medium flex items-start gap-3">
                    <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#4A90E2] to-[#7ED957] text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {currentQuestion + 1}
                    </span>
                    <span className="pt-2">{currentQuestions[currentQuestion]}</span>
                  </Label>
                </div>

                {/* Answer Options */}
                <RadioGroup
                  value={currentAnswers[currentQuestion]?.toString()}
                  onValueChange={(value) => handleAnswer(parseInt(value))}
                >
                  <div className="grid gap-3">
                    {answerOptions.map((option) => (
                      <div key={option.value}>
                        <RadioGroupItem
                          value={option.value.toString()}
                          id={`option-${option.value}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`option-${option.value}`}
                          className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl cursor-pointer transition-all hover:border-[#4A90E2] hover:bg-blue-50 peer-data-[state=checked]:border-[#4A90E2] peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:shadow-md"
                        >
                          <span className="text-3xl">{option.emoji}</span>
                          <div className="flex-1">
                            <p className="font-medium text-base">{option.label}</p>
                          </div>
                          <div className="w-6 h-6 rounded-full border-2 border-gray-300 peer-data-[state=checked]:border-[#4A90E2] peer-data-[state=checked]:bg-[#4A90E2] flex items-center justify-center">
                            {currentAnswers[currentQuestion] === option.value && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                {/* Navigation */}
                <div className="flex gap-3 mt-8">
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    disabled={currentQuestion === 0}
                    className="flex-1"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Anterior
                  </Button>
                  
                  {currentQuestion < totalQuestions - 1 ? (
                    <Button
                      onClick={() => setCurrentQuestion(currentQuestion + 1)}
                      disabled={currentAnswers[currentQuestion] === undefined}
                      className="flex-1 bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90 disabled:opacity-50"
                    >
                      Siguiente
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed}
                      className="flex-1 bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90 disabled:opacity-50"
                    >
                      {currentScale === 'phq9' ? 'Siguiente Escala' : 'Finalizar'}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
