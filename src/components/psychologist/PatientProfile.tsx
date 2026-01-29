import { useParams, Link } from 'react-router';
import { ArrowLeft, Calendar, CheckCircle, Circle, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock patient data
const patientData = {
  1: {
    id: 1,
    name: 'Sarah Johnson',
    age: 28,
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    therapy: 'CBT',
    startDate: 'Nov 15, 2025',
    diagnosis: 'Generalized Anxiety Disorder',
    moodData: [
      { date: 'Jan 12', mood: 6 },
      { date: 'Jan 13', mood: 7 },
      { date: 'Jan 14', mood: 5 },
      { date: 'Jan 15', mood: 7 },
      { date: 'Jan 16', mood: 8 },
      { date: 'Jan 17', mood: 7 },
      { date: 'Jan 18', mood: 8 },
    ],
    exercises: [
      { id: 1, name: 'Deep Breathing Exercise', status: 'completed', dueDate: 'Jan 16' },
      { id: 2, name: 'Thought Record', status: 'completed', dueDate: 'Jan 17' },
      { id: 3, name: 'Progressive Muscle Relaxation', status: 'pending', dueDate: 'Jan 19' },
      { id: 4, name: 'Gratitude Journal', status: 'pending', dueDate: 'Jan 20' },
    ],
    sessions: [
      { id: 1, date: 'Jan 15, 2026', type: 'Weekly Check-in', duration: '50 min', notes: 'Patient showing good progress. Discussed coping strategies for work-related stress.' },
      { id: 2, date: 'Jan 8, 2026', type: 'Therapy Session', duration: '50 min', notes: 'Introduced cognitive restructuring techniques. Patient engaged and receptive.' },
      { id: 3, date: 'Jan 1, 2026', type: 'Therapy Session', duration: '50 min', notes: 'Reviewed holiday stressors. Patient reported improved sleep quality.' },
    ],
  },
};

export default function PatientProfile() {
  const { id } = useParams<{ id: string }>();
  const patient = patientData[id as keyof typeof patientData] || patientData[1];

  const completedExercises = patient.exercises.filter(e => e.status === 'completed').length;
  const totalExercises = patient.exercises.length;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/psychologist/dashboard"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Dashboard</span>
      </Link>

      {/* Patient Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4A90E2] to-[#7ED957] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
              <p className="text-gray-600">{patient.age} years old • {patient.therapy}</p>
              <p className="text-sm text-gray-500 mt-1">Patient since {patient.startDate}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3a7bc8] transition-colors">
              <Calendar className="w-5 h-5" />
              <span>Schedule Session</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900">{patient.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-900">{patient.phone}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Treatment Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Therapy Type</p>
              <p className="text-gray-900">{patient.therapy}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Diagnosis</p>
              <p className="text-gray-900">{patient.diagnosis}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Progress Overview</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Exercises Completed</p>
              <p className="text-gray-900">{completedExercises} / {totalExercises}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Mood</p>
              <p className="text-gray-900 flex items-center">
                8/10 <TrendingUp className="w-4 h-4 text-[#7ED957] ml-2" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mood Tracking Graph */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Mood Tracking (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={patient.moodData}>
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

      {/* Exercises */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Assigned Exercises</h2>
        <div className="space-y-3">
          {patient.exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                {exercise.status === 'completed' ? (
                  <CheckCircle className="w-5 h-5 text-[#7ED957]" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
                <div>
                  <p className={`font-medium ${exercise.status === 'completed' ? 'text-gray-900' : 'text-gray-700'}`}>
                    {exercise.name}
                  </p>
                  <p className="text-sm text-gray-500">Due: {exercise.dueDate}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  exercise.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-orange-100 text-orange-800'
                }`}
              >
                {exercise.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Session History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Session History</h2>
        <div className="space-y-4">
          {patient.sessions.map((session) => (
            <div key={session.id} className="border-l-4 border-[#4A90E2] pl-4 py-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-900">{session.type}</p>
                  <p className="text-sm text-gray-500">{session.date} • {session.duration}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-3 rounded">{session.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}