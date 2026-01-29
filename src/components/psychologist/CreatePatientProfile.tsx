import { useState } from 'react';
import { ArrowLeft, UserPlus, Save, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

interface PatientFormData {
  name: string;
  age: string;
  email: string;
  phone: string;
  diagnosis: string;
  cognitiveCapacity: 'high' | 'medium' | 'low';
  therapyType: string;
  evaluationFrequency: 'daily' | 'twice-weekly' | 'weekly' | 'biweekly';
  riskLevel: 'low' | 'medium' | 'high';
  notes: string;
}

const therapyTypes = ['CBT', 'DBT', 'ACT', 'Mindfulness', 'Psychodynamic', 'Humanistic'];
const commonDiagnoses = [
  'Generalized Anxiety Disorder',
  'Major Depressive Disorder',
  'Social Anxiety Disorder',
  'Panic Disorder',
  'PTSD',
  'OCD',
  'Bipolar Disorder',
  'Other'
];

export default function CreatePatientProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PatientFormData>({
    name: '',
    age: '',
    email: '',
    phone: '',
    diagnosis: '',
    cognitiveCapacity: 'medium',
    therapyType: 'CBT',
    evaluationFrequency: 'daily',
    riskLevel: 'low',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age || parseInt(formData.age) < 1) newErrors.age = 'Valid age is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.diagnosis) newErrors.diagnosis = 'Diagnosis is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Patient profile created:', formData);
      setIsSubmitting(false);
      navigate('/psychologist/dashboard');
    }, 1500);
  };

  const updateField = (field: keyof PatientFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Back Button */}
      <Link
        to="/psychologist/dashboard"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Dashboard</span>
      </Link>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-[#4A90E2]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Patient Profile</h1>
            <p className="text-gray-600">Set up a personalized treatment plan</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => updateField('age', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent ${
                  errors.age ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="28"
              />
              {errors.age && (
                <p className="text-red-500 text-xs mt-1">{errors.age}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        </div>

        {/* Clinical Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Clinical Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Diagnosis <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.diagnosis}
                onChange={(e) => updateField('diagnosis', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent ${
                  errors.diagnosis ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select diagnosis...</option>
                {commonDiagnoses.map((diagnosis) => (
                  <option key={diagnosis} value={diagnosis}>
                    {diagnosis}
                  </option>
                ))}
              </select>
              {errors.diagnosis && (
                <p className="text-red-500 text-xs mt-1">{errors.diagnosis}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Therapy Type
              </label>
              <select
                value={formData.therapyType}
                onChange={(e) => updateField('therapyType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
              >
                {therapyTypes.map((therapy) => (
                  <option key={therapy} value={therapy}>
                    {therapy}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cognitive Capacity
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['high', 'medium', 'low'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => updateField('cognitiveCapacity', level)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      formData.cognitiveCapacity === level
                        ? 'border-[#4A90E2] bg-blue-50 text-[#4A90E2] font-medium'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This helps personalize evaluation complexity and frequency
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Risk Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => updateField('riskLevel', 'low')}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.riskLevel === 'low'
                      ? 'border-[#7ED957] bg-green-50 text-green-700 font-medium'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Low
                </button>
                <button
                  type="button"
                  onClick={() => updateField('riskLevel', 'medium')}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.riskLevel === 'medium'
                      ? 'border-[#FFA500] bg-orange-50 text-orange-700 font-medium'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Medium
                </button>
                <button
                  type="button"
                  onClick={() => updateField('riskLevel', 'high')}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.riskLevel === 'high'
                      ? 'border-red-500 bg-red-50 text-red-700 font-medium'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  High
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Plan */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Treatment Plan</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Evaluation Frequency
              </label>
              <select
                value={formData.evaluationFrequency}
                onChange={(e) => updateField('evaluationFrequency', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
              >
                <option value="daily">Daily (Recommended for high engagement)</option>
                <option value="twice-weekly">Twice Weekly</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                Patient will receive micro-evaluations based on this frequency
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent resize-none"
                rows={4}
                placeholder="Treatment goals, special considerations, medication information, etc."
              />
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-[#4A90E2] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900">AI-Powered Monitoring</h3>
              <p className="text-sm text-gray-700 mt-1">
                Once created, the patient will receive personalized micro-evaluations (PHQ-9, GAD-7 adapted). 
                Our ML engine will analyze patterns and generate real-time alerts to help you monitor their progress effectively.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3a7bc8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating Profile...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Create Patient Profile</span>
              </>
            )}
          </button>
          <Link
            to="/psychologist/dashboard"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}