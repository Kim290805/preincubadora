import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Progress } from '../ui/progress';
import { Sparkles } from 'lucide-react';

const baselineQuestions = [
  {
    id: 1,
    question: '¿Cómo describirías tu estado de ánimo general en las últimas dos semanas?',
    options: [
      { value: '1', label: 'Muy bajo', emoji: '😢' },
      { value: '2', label: 'Bajo', emoji: '😔' },
      { value: '3', label: 'Neutral', emoji: '😐' },
      { value: '4', label: 'Bueno', emoji: '🙂' },
      { value: '5', label: 'Muy bueno', emoji: '😊' }
    ]
  },
  {
    id: 2,
    question: '¿Con qué frecuencia te has sentido nervioso o ansioso?',
    options: [
      { value: '5', label: 'Casi siempre', emoji: '😰' },
      { value: '4', label: 'A menudo', emoji: '😟' },
      { value: '3', label: 'A veces', emoji: '😐' },
      { value: '2', label: 'Rara vez', emoji: '🙂' },
      { value: '1', label: 'Nunca', emoji: '😌' }
    ]
  },
  {
    id: 3,
    question: '¿Qué tan bien has podido concentrarte en tus actividades diarias?',
    options: [
      { value: '1', label: 'Muy mal', emoji: '😵' },
      { value: '2', label: 'Mal', emoji: '😕' },
      { value: '3', label: 'Regular', emoji: '😐' },
      { value: '4', label: 'Bien', emoji: '🙂' },
      { value: '5', label: 'Muy bien', emoji: '😊' }
    ]
  },
  {
    id: 4,
    question: '¿Cómo calificarías tu calidad de sueño?',
    options: [
      { value: '1', label: 'Muy mala', emoji: '😫' },
      { value: '2', label: 'Mala', emoji: '😔' },
      { value: '3', label: 'Regular', emoji: '😐' },
      { value: '4', label: 'Buena', emoji: '🙂' },
      { value: '5', label: 'Muy buena', emoji: '😴' }
    ]
  },
  {
    id: 5,
    question: '¿Te sientes motivado para realizar tus actividades diarias?',
    options: [
      { value: '1', label: 'Nada motivado', emoji: '😞' },
      { value: '2', label: 'Poco motivado', emoji: '😕' },
      { value: '3', label: 'Moderadamente', emoji: '😐' },
      { value: '4', label: 'Motivado', emoji: '🙂' },
      { value: '5', label: 'Muy motivado', emoji: '🤩' }
    ]
  }
];

export default function BaselineEvaluation() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const progress = ((currentQuestion + 1) / baselineQuestions.length) * 100;
  const question = baselineQuestions[currentQuestion];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [question.id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < baselineQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleComplete = () => {
    // Save baseline results
    navigate('/patient/home');
  };

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 p-4">
        <Card className="w-full max-w-md shadow-lg text-center">
          <CardContent className="p-8 space-y-6">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-[#7ED957] to-[#4A90E2] p-6 rounded-full">
                <Sparkles className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">¡Evaluación Completada!</h2>
              <p className="text-gray-600">
                Gracias por completar tu evaluación inicial. Esta información nos ayuda 
                a entender tu punto de partida y personalizar tu experiencia.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Tu psicólogo revisará esta información</strong> y podrá 
                brindarte un mejor apoyo basado en tus respuestas.
              </p>
            </div>

            <Button
              onClick={handleComplete}
              className="w-full bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90"
            >
              Ir a mi Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Pregunta {currentQuestion + 1} de {baselineQuestions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
          <CardTitle className="text-xl pt-4">Evaluación Inicial</CardTitle>
          <CardDescription>
            Esta evaluación nos ayuda a entender tu estado actual
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-lg font-medium">{question.question}</Label>
            
            <RadioGroup
              value={answers[question.id]}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {question.options.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    answers[question.id] === option.value
                      ? 'border-[#4A90E2] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleAnswer(option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <label
                    htmlFor={option.value}
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="font-medium">{option.label}</span>
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex gap-3 pt-4">
            {currentQuestion > 0 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                Anterior
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!answers[question.id]}
              className="flex-1 bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90"
            >
              {currentQuestion === baselineQuestions.length - 1 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
