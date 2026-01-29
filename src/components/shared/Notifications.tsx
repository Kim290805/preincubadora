import { AlertCircle, Calendar, CheckCircle, Bell } from 'lucide-react';
import { UserType } from '../../App';

interface NotificationsProps {
  userType: UserType;
}

// Mock notifications
const psychologistNotifications = [
  {
    id: 1,
    type: 'alert',
    title: 'Missed Exercise Alert',
    message: 'Emma Davis has missed 3 exercises this week',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'session',
    title: 'Upcoming Session',
    message: 'Session with Sarah Johnson starts in 30 minutes',
    time: '30 minutes ago',
    read: false,
  },
  {
    id: 3,
    type: 'completed',
    title: 'Exercise Completed',
    message: 'Michael Chen completed "Thought Record" exercise',
    time: '3 hours ago',
    read: true,
  },
  {
    id: 4,
    type: 'alert',
    title: 'Mood Decline',
    message: "Michael Chen's mood score has decreased by 20%",
    time: '5 hours ago',
    read: true,
  },
  {
    id: 5,
    type: 'session',
    title: 'Session Reminder',
    message: 'You have 3 sessions scheduled for tomorrow',
    time: '1 day ago',
    read: true,
  },
];

const patientNotifications = [
  {
    id: 1,
    type: 'alert',
    title: 'Pending Exercise',
    message: 'You have 2 exercises due today',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 2,
    type: 'session',
    title: 'Session Reminder',
    message: 'Your session with Dr. Martinez is tomorrow at 9:00 AM',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 3,
    type: 'completed',
    title: 'Great Job!',
    message: 'You completed "Deep Breathing Exercise"! Keep it up! 🎉',
    time: '4 hours ago',
    read: true,
  },
  {
    id: 4,
    type: 'alert',
    title: 'Mood Tracking',
    message: "Don't forget to log your mood for today",
    time: '6 hours ago',
    read: true,
  },
  {
    id: 5,
    type: 'completed',
    title: '7-Day Streak!',
    message: "Amazing! You've maintained a 7-day streak! 🔥",
    time: '1 day ago',
    read: true,
  },
];

export default function Notifications({ userType }: NotificationsProps) {
  const notifications = userType === 'psychologist' ? psychologistNotifications : patientNotifications;
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-[#FFA500]" />;
      case 'session':
        return <Calendar className="w-5 h-5 text-[#4A90E2]" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-[#7ED957]" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getBackgroundColor = (type: string, read: boolean) => {
    if (read) return 'bg-white';
    switch (type) {
      case 'alert':
        return 'bg-orange-50 border-orange-200';
      case 'session':
        return 'bg-blue-50 border-blue-200';
      case 'completed':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        <button className="px-4 py-2 text-sm text-[#4A90E2] hover:bg-blue-50 rounded-lg transition-colors">
          Mark all as read
        </button>
      </div>

      {/* Unread Notifications */}
      {unreadCount > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Unread ({unreadCount})</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {notifications
              .filter(n => !n.read)
              .map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 ${
                    notification.type === 'alert'
                      ? 'border-[#FFA500]'
                      : notification.type === 'session'
                      ? 'border-[#4A90E2]'
                      : 'border-[#7ED957]'
                  } ${getBackgroundColor(notification.type, notification.read)}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{notification.title}</p>
                          <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                        </div>
                        <button className="ml-4 text-sm text-[#4A90E2] hover:underline flex-shrink-0">
                          Mark read
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* All Notifications */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">All Notifications</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                notification.read ? 'opacity-70' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <span className="ml-4 w-2 h-2 bg-[#4A90E2] rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Bell className="w-5 h-5 text-[#4A90E2] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">Notification Settings</h3>
            <p className="text-sm text-gray-700 mt-1">
              {userType === 'psychologist'
                ? 'Stay informed about patient activities, missed exercises, and upcoming sessions. You can customize your notification preferences in settings.'
                : 'Receive reminders for exercises, mood tracking, and upcoming sessions. Manage your notification preferences to stay on track with your mental health journey.'}
            </p>
            <button className="text-sm text-[#4A90E2] hover:underline mt-2">
              Manage preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
