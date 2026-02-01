import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AssessmentQuestions() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: 'phq9' | 'gad7' }>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const phq9 = [
    'Poco interés o placer en hacer cosas',
    'Sentirse desanimado/a, deprimido/a o sin esperanza',
    'Problemas para dormir o dormir demasiado',
    'Sentirse cansado/a o tener poca energía',
    'Poco apetito o comer en exceso',
    'Sentirse mal consigo mismo/a',
    'Problemas para concentrarse',
    'Moverse o hablar muy lento',
    'Pensamientos de hacerse daño'
  ];

  const gad7 = [
    'Sentirse nervioso/a o ansioso/a',
    'No poder parar o controlar la preocupación',
    'Preocuparse demasiado por diferentes cosas',
    'Tener dificultad para relajarse',
    'Estar tan inquieto/a que no puede quedarse quieto/a',
    'Irritarse o enojarse con facilidad',
    'Sentir miedo como si algo terrible fuera a pasar'
  ];

  const questions = type === 'phq9' ? phq9 : gad7;
  const options = [
    { value: 0, label: 'Nunca', emoji: '😊' },
    { value: 1, label: 'Varios días', emoji: '😐' },
    { value: 2, label: 'Más de la mitad', emoji: '😟' },
    { value: 3, label: 'Casi todos los días', emoji: '😢' }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    // Auto advance
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 300);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleComplete = () => {
    const score = Object.values(answers).reduce((a, b) => a + b, 0);
    const result = {
      type,
      answers,
      score,
      date: new Date().toISOString()
    };
    
    const existing = JSON.parse(localStorage.getItem('assessments') || '[]');
    existing.push(result);
    localStorage.setItem('assessments', JSON.stringify(existing));

    if (type === 'phq9') {
      navigate('/patient/assessment/gad7');
    } else {
      navigate('/patient/optional-note');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="p-2 rounded-xl hover:bg-gray-100 disabled:opacity-30"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">
              {type === 'phq9' ? 'PHQ-9' : 'GAD-7'}
            </p>
            <p className="text-xs text-gray-500">
              Pregunta {currentQuestion + 1} de {questions.length}
            </p>
          </div>
          <div className="w-10"></div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-[#4A90E2] to-[#7ED957]"
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-md mx-auto">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#4A90E2] to-[#7ED957] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">{currentQuestion + 1}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    En las últimas 2 semanas, ¿con qué frecuencia has tenido este problema?
                  </p>
                  <p className="text-lg font-medium text-gray-900">
                    {questions[currentQuestion]}
                  </p>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      answers[currentQuestion] === option.value
                        ? 'border-[#4A90E2] bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{option.emoji}</span>
                      <div className="flex-1">
                        <p className="font-medium">{option.label}</p>
                      </div>
                      {answers[currentQuestion] === option.value && (
                        <div className="w-6 h-6 bg-[#4A90E2] rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="p-6 bg-white border-t border-gray-200">
        <button
          onClick={handleNext}
          disabled={answers[currentQuestion] === undefined}
          className="w-full bg-gradient-to-r from-[#4A90E2] to-[#7ED957] text-white font-bold py-4 rounded-2xl hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {currentQuestion < questions.length - 1 ? 'Siguiente' : 'Finalizar'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
