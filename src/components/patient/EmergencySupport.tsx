import { useState } from 'react';
import { Phone, MessageCircle, MapPin, Heart, Shield, X, AlertCircle, Bell } from 'lucide-react';

interface EmergencySupportProps {
  isOpen: boolean;
  onClose: () => void;
}

const emergencyContacts = [
  {
    id: 1,
    name: 'National Suicide Prevention Lifeline',
    phone: '988',
    available: '24/7',
    type: 'crisis',
  },
  {
    id: 2,
    name: 'Crisis Text Line',
    phone: '741741',
    text: 'Text "HELLO"',
    available: '24/7',
    type: 'text',
  },
  {
    id: 3,
    name: 'Dr. Martinez (Your Therapist)',
    phone: '+1 (555) 123-4567',
    available: 'Mon-Fri 9AM-6PM',
    type: 'therapist',
  },
];

const copingStrategies = [
  {
    id: 1,
    title: 'Deep Breathing',
    description: 'Take 5 slow, deep breaths',
    icon: '🫁',
  },
  {
    id: 2,
    title: 'Grounding Exercise',
    description: 'Name 5 things you can see',
    icon: '👁️',
  },
  {
    id: 3,
    title: 'Safe Person',
    description: 'Call a trusted friend',
    icon: '👥',
  },
  {
    id: 4,
    title: 'Safe Place',
    description: 'Go to your comfort zone',
    icon: '🏡',
  },
];

export default function EmergencySupport({ isOpen, onClose }: EmergencySupportProps) {
  const [notifiedTherapist, setNotifiedTherapist] = useState(false);

  const handleNotifyTherapist = () => {
    setNotifiedTherapist(true);
    // In real app: send emergency notification to therapist
    console.log('Emergency notification sent to therapist');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-t-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Emergency Support</h2>
                <p className="text-sm opacity-90 mt-1">You're not alone. Help is available.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Crisis Alert */}
        <div className="p-6 border-b border-gray-200 bg-red-50">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 mb-1">If you're in immediate danger:</h3>
              <p className="text-sm text-red-800 mb-3">
                Please call 911 or go to your nearest emergency room right away.
              </p>
              <a
                href="tel:911"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                <Phone className="w-5 h-5" />
                <span>Call 911 Now</span>
              </a>
            </div>
          </div>
        </div>

        {/* Notify Therapist */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Alert Your Therapist</h3>
          {notifiedTherapist ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-green-700">
                <Heart className="w-5 h-5" />
                <span className="font-medium">Your therapist has been notified</span>
              </div>
              <p className="text-sm text-green-600 mt-2">
                Dr. Martinez will reach out to you as soon as possible.
              </p>
            </div>
          ) : (
            <button
              onClick={handleNotifyTherapist}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3a7bc8] transition-colors font-medium"
            >
              <Bell className="w-5 h-5" />
              <span>Send Emergency Alert to Dr. Martinez</span>
            </button>
          )}
        </div>

        {/* Emergency Contacts */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Crisis Support Lines</h3>
          <div className="space-y-3">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{contact.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{contact.available}</p>
                  {contact.text && (
                    <p className="text-sm text-gray-600">{contact.text}</p>
                  )}
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#7ED957] text-white rounded-lg hover:bg-[#6ec847] transition-colors whitespace-nowrap"
                >
                  {contact.type === 'text' ? (
                    <MessageCircle className="w-5 h-5" />
                  ) : (
                    <Phone className="w-5 h-5" />
                  )}
                  <span>{contact.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Coping Strategies */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Coping Strategies</h3>
          <div className="grid grid-cols-2 gap-3">
            {copingStrategies.map((strategy) => (
              <div
                key={strategy.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="text-3xl mb-2">{strategy.icon}</div>
                <h4 className="font-medium text-gray-900 text-sm">{strategy.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{strategy.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="p-6 bg-blue-50 rounded-b-lg">
          <div className="flex items-start space-x-3">
            <Heart className="w-5 h-5 text-[#4A90E2] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900">You Matter</h3>
              <p className="text-sm text-gray-700 mt-1">
                Your life is valuable. These feelings are temporary, and support is available. 
                You've taken a brave step by reaching out for help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}