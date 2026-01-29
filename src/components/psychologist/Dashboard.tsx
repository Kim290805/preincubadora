import { Link } from 'react-router';
import { UserPlus, Calendar, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data
const patients = [
  { id: 1, name: 'Sarah Johnson', age: 28, therapy: 'CBT', status: 'engaged', lastActivity: '2 hours ago', progress: 85 },
  { id: 2, name: 'Michael Chen', age: 35, therapy: 'DBT', status: 'engaged', lastActivity: '1 day ago', progress: 72 },
  { id: 3, name: 'Emma Davis', age: 42, therapy: 'Mindfulness', status: 'inactive', lastActivity: '5 days ago', progress: 45 },
  { id: 4, name: 'James Wilson', age: 31, therapy: 'CBT', status: 'engaged', lastActivity: '3 hours ago', progress: 90 },
  { id: 5, name: 'Lisa Anderson', age: 26, therapy: 'ACT', status: 'inactive', lastActivity: '4 days ago', progress: 38 },
];

const alerts = [
  { id: 1, patientName: 'Emma Davis', type: 'missed_exercise', message: 'Missed 3 exercises this week' },
  { id: 2, patientName: 'Lisa Anderson', type: 'missed_session', message: 'Missed session on Jan 15' },
  { id: 3, patientName: 'Michael Chen', type: 'mood_decline', message: 'Mood score decreased by 20%' },
];

const progressData = [
  { week: 'Week 1', average: 65 },
  { week: 'Week 2', average: 68 },
  { week: 'Week 3', average: 72 },
  { week: 'Week 4', average: 75 },
];

const engagementData = [
  { month: 'Oct', engaged: 12, inactive: 3 },
  { month: 'Nov', engaged: 14, inactive: 2 },
  { month: 'Dec', engaged: 13, inactive: 4 },
  { month: 'Jan', engaged: 15, inactive: 2 },
];

export default function PsychologistDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, Dr. Martinez</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/psychologist/create-patient"
            className="flex items-center space-x-2 px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3a7bc8] transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add Patient</span>
          </Link>
          <Link
            to="/psychologist/agenda"
            className="flex items-center space-x-2 px-4 py-2 bg-[#7ED957] text-white rounded-lg hover:bg-[#6ec847] transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span>Schedule Session</span>
          </Link>
          <Link
            to="/psychologist/monitoring"
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <TrendingUp className="w-5 h-5" />
            <span>Monitoring</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Patients</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">17</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-[#4A90E2]" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Engaged</p>
              <p className="text-3xl font-bold text-[#7ED957] mt-1">15</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#7ED957]" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Inactive</p>
              <p className="text-3xl font-bold text-[#FFA500] mt-1">2</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-[#FFA500]" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Sessions This Week</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="w-5 h-5 text-[#FFA500]" />
            <h2 className="text-lg font-semibold text-gray-900">Alerts</h2>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start space-x-3 p-4 bg-orange-50 border border-orange-200 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 text-[#FFA500] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{alert.patientName}</p>
                  <p className="text-sm text-gray-700">{alert.message}</p>
                </div>
                <button className="text-sm text-[#4A90E2] hover:underline flex-shrink-0">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Average Patient Progress</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="average" stroke="#4A90E2" strokeWidth={2} dot={{ fill: '#4A90E2' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Engagement</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="engaged" fill="#7ED957" />
              <Bar dataKey="inactive" fill="#FFA500" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Patients List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Active Patients</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Therapy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{patient.name}</div>
                      <div className="text-sm text-gray-500">{patient.age} years old</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {patient.therapy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        patient.status === 'engaged'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {patient.lastActivity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-[#7ED957] h-2 rounded-full"
                          style={{ width: `${patient.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-700">{patient.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      to={`/psychologist/patient/${patient.id}`}
                      className="text-[#4A90E2] hover:underline"
                    >
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}