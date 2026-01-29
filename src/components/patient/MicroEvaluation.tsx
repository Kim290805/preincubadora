import { useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, Award, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

// PHQ-9 and GAD-7 adapted questions
const evaluationQuestions = [
  {
    id: 1,
    text: 'Over the last few days, how often have you felt down, depressed, or hopeless?',
    type: 'phq9',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ]
  },
  {
    id: 2,
    text: 'How often have you felt nervous, anxious, or on edge?',
    type: 'gad7',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ]
  },
  {
    id: 3,
    text: 'Have you had trouble falling or staying asleep, or sleeping too much?',
    type: 'phq9',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ]
  },
  {
    id: 4,
    text: 'Have you been able to stop or control worrying?',
    type: 'gad7',
    options: [
      { value: 3, label: 'Not at all' },
      { value: 2, label: 'With difficulty' },
      { value: 1, label: 'Somewhat' },
      { value: 0, label: 'Yes, easily' },
    ]
  },
  {
    id: 5,
    text: 'How often have you felt little interest or pleasure in doing things?',
    type: 'phq9',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ]
  },
];

export default function MicroEvaluation() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers({ ...answers, [questionId]: value });

    // Auto-advance to next question
    setTimeout(() => {
      if (currentQuestion < evaluationQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // All questions answered
        setIsComplete(true);
        
        // Simulate submitting to backend/ML engine
        const completionTime = Math.round((Date.now() - startTime) / 1000);
        console.log('Evaluation completed:', {
          answers,
          completionTime,
          timestamp: new Date().toISOString()
        });

        // Redirect after showing completion
        setTimeout(() => {
          navigate('/patient/home');
        }, 2500);
      }
    }, 300);
  };

  const progress = ((currentQuestion + (answers[evaluationQuestions[currentQuestion]?.id] !== undefined ? 1 : 0)) / evaluationQuestions.length) * 100;
  const question = evaluationQuestions[currentQuestion];

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-[#7ED957] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Great Job! 🎉</h2>
            <p className="text-gray-600 mb-6">
              You've completed today's evaluation in under 2 minutes!
            </p>

            {/* Gamification */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">+10 Points</p>
                <p className="text-xs text-gray-600">Earned</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
                <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">7 Day Streak</p>
                <p className="text-xs text-gray-600">Keep going!</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">5/7 This Week</p>
                <p className="text-xs text-gray-600">Completed</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                Your responses help your therapist understand your progress. Keep up the excellent work! 💙
              </p>
            </div>

            <Link
              to="/patient/home"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3a7bc8] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/patient/home"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
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
            Question {currentQuestion + 1} of {evaluationQuestions.length}
          </span>
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#4A90E2] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-[#4A90E2] rounded-full text-xs font-medium mb-4">
            {question.type === 'phq9' ? 'Mood Check' : 'Anxiety Check'}
          </div>
          <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
            {question.text}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(question.id, option.value)}
              className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all hover:border-[#4A90E2] hover:bg-blue-50 ${
                answers[question.id] === option.value
                  ? 'border-[#4A90E2] bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <span className="text-gray-900 font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Encouragement */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
        <p className="text-sm text-center text-gray-700">
          You're doing great! Just {evaluationQuestions.length - currentQuestion - 1} more {evaluationQuestions.length - currentQuestion - 1 === 1 ? 'question' : 'questions'} to go 💪
        </p>
      </div>

      {/* Quick Skip (for demo purposes) */}
      <div className="text-center">
        <button
          onClick={() => setCurrentQuestion(Math.min(currentQuestion + 1, evaluationQuestions.length - 1))}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}