import { useState } from 'react';
import { Calendar, Clock, User, Check, X, Send } from 'lucide-react';

// Mock session data
const sessionsData = [
  { id: 1, patientName: 'Sarah Johnson', date: '2026-01-18', time: '09:00', duration: '50 min', type: 'Therapy Session', status: 'scheduled', reminderSent: true },
  { id: 2, patientName: 'Michael Chen', date: '2026-01-18', time: '11:00', duration: '50 min', type: 'Weekly Check-in', status: 'scheduled', reminderSent: true },
  { id: 3, patientName: 'James Wilson', date: '2026-01-18', time: '14:00', duration: '50 min', type: 'Therapy Session', status: 'scheduled', reminderSent: false },
  { id: 4, patientName: 'Emma Davis', date: '2026-01-19', time: '10:00', duration: '50 min', type: 'Follow-up', status: 'scheduled', reminderSent: false },
  { id: 5, patientName: 'Lisa Anderson', date: '2026-01-20', time: '15:00', duration: '50 min', type: 'Therapy Session', status: 'scheduled', reminderSent: false },
  { id: 6, patientName: 'Robert Taylor', date: '2026-01-21', time: '09:30', duration: '50 min', type: 'Initial Assessment', status: 'scheduled', reminderSent: false },
];

export default function PsychologistAgenda() {
  const [sessions, setSessions] = useState(sessionsData);
  const [selectedDate, setSelectedDate] = useState('2026-01-18');

  const handleStatusChange = (sessionId: number, newStatus: 'completed' | 'canceled') => {
    setSessions(sessions.map(session => 
      session.id === sessionId ? { ...session, status: newStatus } : session
    ));
  };

  const handleSendReminder = (sessionId: number) => {
    setSessions(sessions.map(session => 
      session.id === sessionId ? { ...session, reminderSent: true } : session
    ));
  };

  const filteredSessions = sessions.filter(session => session.date === selectedDate);
  const allDates = Array.from(new Set(sessions.map(s => s.date))).sort();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Session Agenda</h1>
          <p className="text-gray-600 mt-1">Manage your upcoming sessions</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3a7bc8] transition-colors">
          <Calendar className="w-5 h-5" />
          <span>Add Session</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Today's Sessions</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">3</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#4A90E2]" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">This Week</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-[#7ED957]" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Reminders Sent</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Send className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">Select Date</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {allDates.map(date => {
            const dateObj = new Date(date);
            const formatted = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const isSelected = date === selectedDate;
            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isSelected
                    ? 'bg-[#4A90E2] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {formatted}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sessions List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Sessions for {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <div key={session.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#4A90E2] to-[#7ED957] rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                        {session.patientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{session.patientName}</h3>
                        <p className="text-sm text-gray-600 mt-1">{session.type}</p>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{session.time}</span>
                          </span>
                          <span>{session.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {session.status === 'scheduled' ? (
                      <>
                        {!session.reminderSent && (
                          <button
                            onClick={() => handleSendReminder(session.id)}
                            className="flex items-center space-x-2 px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                          >
                            <Send className="w-4 h-4" />
                            <span>Send Reminder</span>
                          </button>
                        )}
                        {session.reminderSent && (
                          <span className="flex items-center space-x-1 px-3 py-2 text-sm bg-purple-50 text-purple-700 rounded-lg">
                            <Check className="w-4 h-4" />
                            <span>Reminder Sent</span>
                          </span>
                        )}
                        <button
                          onClick={() => handleStatusChange(session.id, 'completed')}
                          className="flex items-center space-x-2 px-3 py-2 text-sm bg-[#7ED957] text-white rounded-lg hover:bg-[#6ec847] transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          <span>Complete</span>
                        </button>
                        <button
                          onClick={() => handleStatusChange(session.id, 'canceled')}
                          className="flex items-center space-x-2 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                      </>
                    ) : (
                      <span
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          session.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-gray-500">
              No sessions scheduled for this date
            </div>
          )}
        </div>
      </div>

      {/* Automated Reminders Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Send className="w-5 h-5 text-[#4A90E2] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">Automated Reminders</h3>
            <p className="text-sm text-gray-700 mt-1">
              Reminders are automatically sent to patients 24 hours before their scheduled session. 
              You can also manually send reminders using the button above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
