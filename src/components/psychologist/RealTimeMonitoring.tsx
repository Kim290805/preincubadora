import { useState } from 'react';
import { AlertCircle, TrendingUp, TrendingDown, Activity, Bell, Filter, Search } from 'lucide-react';
import { Link } from 'react-router';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock real-time patient data with ML-generated alerts
const patientsWithAlerts = [
  {
    id: 1,
    name: 'Emma Davis',
    age: 42,
    lastEvaluation: '2 hours ago',
    riskLevel: 'high',
    riskScore: 82,
    trend: 'declining',
    alert: {
      type: 'critical',
      message: 'PHQ-9 score increased by 35% in last 3 days',
      timestamp: '2 hours ago',
      anomalyDetected: true,
    },
    recentScores: [
      { date: 'Jan 14', phq9: 8, gad7: 7 },
      { date: 'Jan 15', phq9: 10, gad7: 9 },
      { date: 'Jan 16', phq9: 12, gad7: 10 },
      { date: 'Jan 17', phq9: 14, gad7: 12 },
      { date: 'Jan 18', phq9: 15, gad7: 13 },
    ],
  },
  {
    id: 2,
    name: 'Michael Chen',
    age: 35,
    lastEvaluation: '4 hours ago',
    riskLevel: 'medium',
    riskScore: 58,
    trend: 'stable',
    alert: {
      type: 'warning',
      message: 'Missed 2 consecutive evaluations',
      timestamp: '1 day ago',
      anomalyDetected: false,
    },
    recentScores: [
      { date: 'Jan 14', phq9: 9, gad7: 8 },
      { date: 'Jan 15', phq9: 9, gad7: 7 },
      { date: 'Jan 16', phq9: 8, gad7: 8 },
      { date: 'Jan 17', phq9: 9, gad7: 7 },
      { date: 'Jan 18', phq9: 8, gad7: 8 },
    ],
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    age: 28,
    lastEvaluation: '30 min ago',
    riskLevel: 'low',
    riskScore: 25,
    trend: 'improving',
    alert: null,
    recentScores: [
      { date: 'Jan 14', phq9: 7, gad7: 8 },
      { date: 'Jan 15', phq9: 6, gad7: 7 },
      { date: 'Jan 16', phq9: 5, gad7: 6 },
      { date: 'Jan 17', phq9: 4, gad7: 5 },
      { date: 'Jan 18', phq9: 3, gad7: 4 },
    ],
  },
  {
    id: 4,
    name: 'Lisa Anderson',
    age: 26,
    lastEvaluation: '6 hours ago',
    riskLevel: 'medium',
    riskScore: 64,
    trend: 'declining',
    alert: {
      type: 'warning',
      message: 'GAD-7 score above baseline threshold',
      timestamp: '6 hours ago',
      anomalyDetected: true,
    },
    recentScores: [
      { date: 'Jan 14', phq9: 6, gad7: 7 },
      { date: 'Jan 15', phq9: 7, gad7: 9 },
      { date: 'Jan 16', phq9: 7, gad7: 10 },
      { date: 'Jan 17', phq9: 8, gad7: 11 },
      { date: 'Jan 18', phq9: 8, gad7: 12 },
    ],
  },
];

const mlInsights = [
  {
    id: 1,
    title: 'Pattern Detected: Sleep Issues',
    description: '3 patients reporting sleep disturbances in last 48 hours',
    severity: 'medium',
    patients: ['Emma Davis', 'Michael Chen', 'James Wilson'],
  },
  {
    id: 2,
    title: 'Positive Trend: Weekend Effect',
    description: 'Average mood scores +12% higher on weekends',
    severity: 'low',
    patients: ['All monitored patients'],
  },
];

export default function RealTimeMonitoring() {
  const [selectedPatient, setSelectedPatient] = useState(patientsWithAlerts[0]);
  const [filterRisk, setFilterRisk] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredPatients = filterRisk === 'all' 
    ? patientsWithAlerts 
    : patientsWithAlerts.filter(p => p.riskLevel === filterRisk);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' };
      case 'medium': return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' };
      case 'low': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' };
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-[#7ED957]" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Real-Time Monitoring</h1>
          <p className="text-gray-600 mt-1">AI-powered patient monitoring and alerts</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Bell className="w-5 h-5" />
            <span>Alerts</span>
            <span className="ml-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">3</span>
          </button>
        </div>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-red-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Critical Alerts</p>
              <p className="text-3xl font-bold text-red-600 mt-1">1</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-orange-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Warnings</p>
              <p className="text-3xl font-bold text-[#FFA500] mt-1">2</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-[#FFA500]" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Patients</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">15</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-[#4A90E2]" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Response Time</p>
              <p className="text-3xl font-bold text-[#7ED957] mt-1">1.8m</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#7ED957]" />
            </div>
          </div>
        </div>
      </div>

      {/* ML Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-start space-x-3 mb-4">
          <Activity className="w-6 h-6 text-purple-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900">ML Engine Insights</h3>
            <p className="text-sm text-gray-700 mt-1">Patterns detected by our machine learning system</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mlInsights.map((insight) => (
            <div key={insight.id} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{insight.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  insight.severity === 'medium' 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {insight.severity}
                </span>
              </div>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content: Patient List + Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4 max-h-[600px] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Patients</h2>
            <div className="relative">
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value as any)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
              >
                <option value="all">All Risk Levels</option>
                <option value="high">High Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="low">Low Risk</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            {filteredPatients.map((patient) => {
              const colors = getRiskColor(patient.riskLevel);
              const isSelected = selectedPatient.id === patient.id;
              
              return (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected 
                      ? 'border-[#4A90E2] bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{patient.name}</h3>
                      <p className="text-xs text-gray-500">{patient.age} years old</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                      {patient.riskLevel}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{patient.lastEvaluation}</span>
                    {getTrendIcon(patient.trend)}
                  </div>

                  {patient.alert && (
                    <div className="mt-2 flex items-start space-x-2 text-xs">
                      <AlertCircle className={`w-3 h-3 flex-shrink-0 mt-0.5 ${
                        patient.alert.type === 'critical' ? 'text-red-500' : 'text-orange-500'
                      }`} />
                      <span className="text-gray-700 line-clamp-1">{patient.alert.message}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail View */}
        <div className="lg:col-span-2 space-y-4">
          {/* Patient Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                <p className="text-gray-600">{selectedPatient.age} years old</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`px-4 py-2 rounded-lg ${getRiskColor(selectedPatient.riskLevel).bg}`}>
                  <p className="text-xs text-gray-600">Risk Score</p>
                  <p className={`text-2xl font-bold ${getRiskColor(selectedPatient.riskLevel).text}`}>
                    {selectedPatient.riskScore}
                  </p>
                </div>
                <Link
                  to={`/psychologist/patient/${selectedPatient.id}`}
                  className="px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3a7bc8] transition-colors"
                >
                  View Full Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Alert Card */}
          {selectedPatient.alert && (
            <div className={`rounded-lg border-2 p-4 ${
              selectedPatient.alert.type === 'critical' 
                ? 'bg-red-50 border-red-300' 
                : 'bg-orange-50 border-orange-300'
            }`}>
              <div className="flex items-start space-x-3">
                <AlertCircle className={`w-6 h-6 flex-shrink-0 ${
                  selectedPatient.alert.type === 'critical' ? 'text-red-600' : 'text-orange-600'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {selectedPatient.alert.type === 'critical' ? 'Critical Alert' : 'Warning'}
                    </h3>
                    <span className="text-xs text-gray-600">{selectedPatient.alert.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{selectedPatient.alert.message}</p>
                  {selectedPatient.alert.anomalyDetected && (
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="px-2 py-1 bg-white rounded text-gray-700 font-medium">
                        🤖 ML Anomaly Detected
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Trend Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Trends (Last 5 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={selectedPatient.recentScores}>
                <defs>
                  <linearGradient id="phq9Gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4A90E2" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gad7Gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFA500" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FFA500" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="phq9" 
                  stroke="#4A90E2" 
                  fillOpacity={1} 
                  fill="url(#phq9Gradient)" 
                  strokeWidth={2}
                  name="PHQ-9 (Depression)"
                />
                <Area 
                  type="monotone" 
                  dataKey="gad7" 
                  stroke="#FFA500" 
                  fillOpacity={1} 
                  fill="url(#gad7Gradient)" 
                  strokeWidth={2}
                  name="GAD-7 (Anxiety)"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#4A90E2] rounded-full" />
                <span className="text-sm text-gray-700">PHQ-9 (Depression)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#FFA500] rounded-full" />
                <span className="text-sm text-gray-700">GAD-7 (Anxiety)</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button className="px-4 py-3 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3a7bc8] transition-colors">
              Schedule Urgent Session
            </button>
            <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}