import { Link } from 'react-router';
import { Calendar, Activity, CheckCircle, Circle, TrendingUp, Sparkles, AlertCircle, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import EmergencySupport from './EmergencySupport';

// Mock data for patient
const patientData = {
  name: 'Sarah',
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
  streak: 7,
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
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#4A90E2] to-[#7ED957] rounded-lg shadow-sm p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {patientData.name}! 👋</h1>
        <p className="mt-2 opacity-90">How are you feeling today?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Current Mood</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{patientData.currentMood}/10</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-[#4A90E2]" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Day Streak</p>
              <p className="text-3xl font-bold text-[#7ED957] mt-1">{patientData.streak}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#7ED957]" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completed Today</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{patientData.completedToday}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
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

      {/* Pending Exercises */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Pending Exercises</h2>
          <Link
            to="/patient/mood-tracker"
            className="text-sm text-[#4A90E2] hover:underline"
          >
            View All
          </Link>
        </div>
        {patientData.pendingExercises.length > 0 ? (
          <div className="space-y-3">
            {patientData.pendingExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <Circle className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{exercise.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-500">Due: {exercise.dueDate}</span>
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                        {exercise.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#7ED957] text-white rounded-lg hover:bg-[#6ec847] transition-colors">
                  Start
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="w-12 h-12 mx-auto text-[#7ED957] mb-2" />
            <p>All exercises completed! Great job! 🎉</p>
          </div>
        )}
      </div>

      {/* Mood Progress Graph */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Mood Journey (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={250}>
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/patient/mood-tracker"
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-[#4A90E2]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Track Mood</h3>
              <p className="text-sm text-gray-600">Log how you're feeling today</p>
            </div>
          </div>
        </Link>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#7ED957]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Complete Exercises</h3>
              <p className="text-sm text-gray-600">View and finish your tasks</p>
            </div>
          </div>
        </div>
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

      {/* Emergency Support */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Emergency Support</h3>
            <p className="text-gray-700">Need immediate help? Click here.</p>
          </div>
        </div>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors mt-3"
          onClick={() => setShowEmergencySupport(true)}
        >
          Get Support
        </button>
      </div>

      {/* Emergency Support Modal */}
      <EmergencySupport isOpen={showEmergencySupport} onClose={() => setShowEmergencySupport(false)} />
    </div>
  );
}