import { Link } from 'react-router';
import { Calendar, Activity, CheckCircle, Circle, TrendingUp, Sparkles, AlertCircle, Award, Flame, Zap, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import EmergencySupport from './EmergencySupport';
import { Button } from '../ui/button';

// Mock data for patient
const patientData = {
  name: 'Kim',
  dayNumber: 15,
  nextSession: {
    date: 'January 18, 2026',
    time: '09:00 AM',
    therapist: 'Dr. Martinez',
    type: 'Therapy Session',
  },
  pendingExercises: [
    { id: 1, name: 'Progressive Muscle Relaxation', dueDate: 'Jan 19', difficulty: 'Easy' },
    { id: 2, name: 'Gratitude Journal', dueDate: 'Jan 20', difficulty: 'Easy' },
  ],
  completedToday: 2,
  moodData: [
    { date: 'Jan 12', mood: 6 },
    { date: 'Jan 13', mood: 7 },
    { date: 'Jan 14', mood: 5 },
    { date: 'Jan 15', mood: 7 },
    { date: 'Jan 16', mood: 8 },
    { date: 'Jan 17', mood: 7 },
    { date: 'Jan 18', mood: 8 },
  ],
  currentMood: 8,
  streak: 15, // Updated to match day 15
  weeklyGoal: 7,
  completed: 5,
  totalPoints: 450,
  nextReward: 500,
};

const motivationalTips = [
  "Progress, not perfection. Every small step counts! 🌟",
  "You're doing great! Keep up the consistency! 💪",
  "Remember to be kind to yourself today. 💚",
  "Your mental health journey matters. Keep going! 🌈",
];

const randomTip = motivationalTips[Math.floor(Math.random() * motivationalTips.length)];

export default function PatientHomeScreen() {
  const [showEmergencySupport, setShowEmergencySupport] = useState(false);

  return (
    <div className="space-y-6 pb-20">
      {/* Hero Welcome Section with Streak - BIG and VISIBLE */}
      <div className="bg-gradient-to-r from-[#4A90E2] to-[#7ED957] rounded-lg shadow-lg p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Flame className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold">¡Hola {patientData.name}!</h1>
          <p className="text-xl opacity-90 mt-2">Día {patientData.dayNumber}</p>
          
          {/* HUGE STREAK DISPLAY */}
          <div className="mt-6 flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-6 flex items-center gap-4">
              <Flame className="w-16 h-16 text-orange-300 animate-pulse" />
              <div>
                <p className="text-6xl font-black">{patientData.streak}</p>
                <p className="text-sm uppercase tracking-wide opacity-90">Días Seguidos</p>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">{patientData.totalPoints} puntos</span>
              </div>
              <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-white h-full transition-all duration-500"
                  style={{ width: `${(patientData.totalPoints / patientData.nextReward) * 100}%` }}
                />
              </div>
              <p className="text-sm opacity-75">{patientData.nextReward - patientData.totalPoints} puntos para próxima recompensa</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CTA - Start Daily Evaluation */}
      <Link to="/patient/evaluation">
        <Button className="w-full h-20 text-xl font-bold bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90 shadow-lg">
          <Target className="w-8 h-8 mr-3" />
          Iniciar Evaluación Diaria
        </Button>
      </Link>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <Activity className="w-8 h-8 text-[#4A90E2] mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{patientData.currentMood}/10</p>
            <p className="text-xs text-gray-600">Ánimo Actual</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-[#7ED957] mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{patientData.completed}/{patientData.weeklyGoal}</p>
            <p className="text-xs text-gray-600">Esta Semana</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <Award className="w-8 h-8 text-[#FFA500] mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{patientData.completedToday}</p>
            <p className="text-xs text-gray-600">Completadas Hoy</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">+15%</p>
            <p className="text-xs text-gray-600">vs Semana Ant.</p>
          </div>
        </div>
      </div>

      {/* Pending Tasks with Badge */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">Tareas Pendientes</h2>
            {patientData.pendingExercises.length > 0 && (
              <span className="bg-[#FFA500] text-white text-xs font-bold px-2 py-1 rounded-full">
                {patientData.pendingExercises.length}
              </span>
            )}
          </div>
          <Link
            to="/patient/mood-tracker"
            className="text-sm text-[#4A90E2] hover:underline"
          >
            Ver Todas
          </Link>
        </div>
        {patientData.pendingExercises.length > 0 ? (
          <div className="space-y-3">
            {patientData.pendingExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-[#4A90E2] hover:bg-blue-50 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center">
                    <Circle className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{exercise.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-500">Vence: {exercise.dueDate}</span>
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                        {exercise.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                <Button className="bg-[#7ED957] hover:bg-[#6ec847]">
                  Comenzar
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="w-12 h-12 mx-auto text-[#7ED957] mb-2" />
            <p className="font-semibold">¡Todo completado! 🎉</p>
            <p className="text-sm">¡Excelente trabajo!</p>
          </div>
        )}
      </div>

      {/* Next Session */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-5 h-5 text-[#4A90E2]" />
          <h2 className="text-lg font-semibold text-gray-900">Next Session</h2>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="font-semibold text-gray-900">{patientData.nextSession.type}</p>
              <p className="text-sm text-gray-700 mt-1">with {patientData.nextSession.therapist}</p>
              <p className="text-sm text-gray-600 mt-2">
                {patientData.nextSession.date} at {patientData.nextSession.time}
              </p>
            </div>
            <button className="px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3a7bc8] transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Mini Progress Graph */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tu Progreso Semanal</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={patientData.moodData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis domain={[0, 10]} stroke="#6b7280" />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="mood" 
              stroke="#4A90E2" 
              strokeWidth={3} 
              dot={{ fill: '#4A90E2', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Motivational Tip */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Daily Motivation</h3>
            <p className="text-gray-700">{randomTip}</p>
          </div>
        </div>
      </div>

      {/* Emergency Support Modal */}
      <EmergencySupport isOpen={showEmergencySupport} onClose={() => setShowEmergencySupport(false)} />

      {/* Floating Panic Button - only show on desktop, mobile has bottom nav */}
      <button
        onClick={() => setShowEmergencySupport(true)}
        className="hidden md:flex fixed bottom-6 right-6 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl items-center justify-center z-50 transition-all hover:scale-110"
        aria-label="Botón de pánico"
      >
        <AlertCircle className="w-8 h-8" />
      </button>
    </div>
  );
}