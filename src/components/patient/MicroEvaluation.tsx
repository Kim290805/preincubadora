import { useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, Award, Zap, Mic, StopCircle, Play, Trash2, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../ui/button';

// PHQ-9 and GAD-7 adapted questions - simplified for 2 minutes
const evaluationQuestions = [
  {
    id: 1,
    text: '¿Cómo te has sentido hoy?',
    type: 'mood',
    emoji: true,
    options: [
      { value: 5, label: 'Muy bien', emoji: '😊' },
      { value: 4, label: 'Bien', emoji: '🙂' },
      { value: 3, label: 'Normal', emoji: '😐' },
      { value: 2, label: 'Mal', emoji: '😔' },
      { value: 1, label: 'Muy mal', emoji: '😢' },
    ]
  },
  {
    id: 2,
    text: '¿Te has sentido nervioso o ansioso?',
    type: 'anxiety',
    emoji: true,
    options: [
      { value: 0, label: 'Para nada', emoji: '😌' },
      { value: 1, label: 'Un poco', emoji: '😐' },
      { value: 2, label: 'Moderadamente', emoji: '😟' },
      { value: 3, label: 'Bastante', emoji: '😰' },
      { value: 4, label: 'Mucho', emoji: '😫' },
    ]
  },
  {
    id: 3,
    text: '¿Cómo dormiste anoche?',
    type: 'sleep',
    emoji: true,
    options: [
      { value: 5, label: 'Muy bien', emoji: '😴' },
      { value: 4, label: 'Bien', emoji: '🙂' },
      { value: 3, label: 'Regular', emoji: '😐' },
      { value: 2, label: 'Mal', emoji: '😕' },
      { value: 1, label: 'Muy mal', emoji: '😫' },
    ]
  },
  {
    id: 4,
    text: '¿Te sientes motivado hoy?',
    type: 'motivation',
    emoji: true,
    options: [
      { value: 5, label: 'Muy motivado', emoji: '🤩' },
      { value: 4, label: 'Motivado', emoji: '😊' },
      { value: 3, label: 'Neutral', emoji: '😐' },
      { value: 2, label: 'Poco motivado', emoji: '😕' },
      { value: 1, label: 'Nada motivado', emoji: '😞' },
    ]
  },
  {
    id: 5,
    text: '¿Has tenido pensamientos negativos?',
    type: 'thoughts',
    emoji: true,
    options: [
      { value: 0, label: 'No', emoji: '😊' },
      { value: 1, label: 'Muy pocos', emoji: '🙂' },
      { value: 2, label: 'Algunos', emoji: '😐' },
      { value: 3, label: 'Bastantes', emoji: '😔' },
      { value: 4, label: 'Muchos', emoji: '😢' },
    ]
  },
];

export default function MicroEvaluation() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showAudioPrompt, setShowAudioPrompt] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers({ ...answers, [questionId]: value });

    // Auto-advance with smooth transition
    setTimeout(() => {
      if (currentQuestion < evaluationQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // All questions answered - show audio prompt
        setShowAudioPrompt(true);
      }
    }, 400);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // Mock recording timer
    const interval = setInterval(() => {
      setRecordingDuration(prev => {
        if (prev >= 60) {
          handleStopRecording();
          clearInterval(interval);
          return 60;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setHasRecording(true);
  };

  const handleSkipAudio = () => {
    completeEvaluation();
  };

  const handleContinueWithAudio = () => {
    completeEvaluation();
  };

  const completeEvaluation = () => {
    setIsComplete(true);
    
    // Simulate submitting to backend/ML engine
    const completionTime = Math.round((Date.now() - startTime) / 1000);
    console.log('Evaluation completed:', {
      answers,
      hasAudioNote: hasRecording,
      completionTime,
      timestamp: new Date().toISOString()
    });
  };

  const progress = ((currentQuestion + 1) / evaluationQuestions.length) * 100;
  const question = evaluationQuestions[currentQuestion];

  // Audio Recording Prompt
  if (showAudioPrompt && !isComplete) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#4A90E2] to-[#7ED957] rounded-full flex items-center justify-center mx-auto">
              <Mic className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Cómo te sientes hoy?</h2>
              <p className="text-gray-600">
                Graba una nota de audio breve (opcional, máx. 1 min)
              </p>
            </div>

            {!isRecording && !hasRecording && (
              <Button
                onClick={handleStartRecording}
                className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90"
              >
                <Mic className="w-6 h-6 mr-2" />
                Comenzar a Grabar
              </Button>
            )}

            {isRecording && (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-2xl font-bold text-gray-900">
                    {Math.floor(recordingDuration / 60)}:{(recordingDuration % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <Button
                  onClick={handleStopRecording}
                  variant="outline"
                  className="w-full h-16 text-lg font-semibold border-2"
                >
                  <StopCircle className="w-6 h-6 mr-2" />
                  Detener Grabación
                </Button>
              </div>
            )}

            {hasRecording && !isRecording && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Play className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900">
                        Audio guardado ({recordingDuration}s)
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        setHasRecording(false);
                        setRecordingDuration(0);
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <Button
                  onClick={handleContinueWithAudio}
                  className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90"
                >
                  Continuar
                </Button>
              </div>
            )}

            <button
              onClick={handleSkipAudio}
              className="text-gray-500 hover:text-gray-700 underline text-sm"
            >
              Saltar (continuar sin audio)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Completion Screen with Gamification
  if (isComplete) {
    const pointsEarned = 10 + (hasRecording ? 5 : 0);
    
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-br from-[#7ED957] to-[#4A90E2] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Genial! 🎉</h2>
              <p className="text-lg text-gray-600">
                Has completado tu evaluación diaria
              </p>
            </div>

            {/* Points and Streak */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Zap className="w-8 h-8 text-[#FFA500]" />
                <span className="text-4xl font-black text-gray-900">+{pointsEarned}</span>
                <span className="text-xl font-semibold text-gray-700">puntos</span>
              </div>
              <p className="text-sm text-gray-600">
                {hasRecording && '¡+5 puntos extra por incluir audio!'}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <div className="text-3xl mb-1">🔥</div>
                <p className="text-xl font-bold text-gray-900">15</p>
                <p className="text-xs text-gray-600">Racha</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-1" />
                <p className="text-xl font-bold text-gray-900">6/7</p>
                <p className="text-xs text-gray-600">Esta Semana</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <Award className="w-8 h-8 text-blue-600 mx-auto mb-1" />
                <p className="text-xl font-bold text-gray-900">460</p>
                <p className="text-xs text-gray-600">Puntos Total</p>
              </div>
            </div>

            {/* Insight */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 font-medium">
                📊 Mini insight: Tu estado mejoró vs ayer
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => navigate('/patient/mood-tracker')}
                variant="outline"
                className="flex-1 h-12"
              >
                Ver Tareas Pendientes
              </Button>
              <Button
                onClick={() => navigate('/patient/home')}
                className="flex-1 h-12 bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90"
              >
                Listo por Hoy
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Question Screen
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/patient/home"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </Link>
        <div className="flex items-center space-x-2 text-gray-600">
          <Clock className="w-5 h-5" />
          <span className="text-sm">~2 min</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Pregunta {currentQuestion + 1} de {evaluationQuestions.length}
          </span>
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#4A90E2] to-[#7ED957] h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card with Animation */}
      <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-8 animate-fadeIn">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 leading-relaxed mb-6">
            {question.text}
          </h2>
        </div>

        {/* Answer Options with Emojis */}
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(question.id, option.value)}
              className="w-full text-left px-6 py-5 rounded-xl border-2 transition-all hover:border-[#4A90E2] hover:bg-blue-50 hover:scale-102 active:scale-98 border-gray-200 flex items-center gap-4"
            >
              <span className="text-3xl">{option.emoji}</span>
              <span className="text-lg font-medium text-gray-900">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Encouragement */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
        <p className="text-sm text-center text-gray-700 font-medium">
          ¡Vas genial! Solo {evaluationQuestions.length - currentQuestion - 1} más 💪
        </p>
      </div>
    </div>
  );
}