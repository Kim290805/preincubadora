import { useState } from 'react';
import { CheckCircle, Circle, Smile, Frown, Meh, Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

// Mock exercises
const exercises = [
  { id: 1, name: 'Deep Breathing Exercise', completed: true, dueDate: 'Jan 16' },
  { id: 2, name: 'Thought Record', completed: true, dueDate: 'Jan 17' },
  { id: 3, name: 'Progressive Muscle Relaxation', completed: false, dueDate: 'Jan 19' },
  { id: 4, name: 'Gratitude Journal', completed: false, dueDate: 'Jan 20' },
  { id: 5, name: 'Mindful Walking', completed: false, dueDate: 'Jan 21' },
];

const moodEmojis = [
  { value: 1, emoji: '😢', label: 'Very Bad' },
  { value: 2, emoji: '😟', label: 'Bad' },
  { value: 3, emoji: '😕', label: 'Poor' },
  { value: 4, emoji: '😐', label: 'Below Average' },
  { value: 5, emoji: '😶', label: 'Neutral' },
  { value: 6, emoji: '🙂', label: 'Fair' },
  { value: 7, emoji: '😊', label: 'Good' },
  { value: 8, emoji: '😄', label: 'Great' },
  { value: 9, emoji: '😁', label: 'Very Good' },
  { value: 10, emoji: '🤩', label: 'Excellent' },
];

export default function PatientMoodTracker() {
  const [moodScore, setMoodScore] = useState<number>(7);
  const [exercisesList, setExercisesList] = useState(exercises);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [notes, setNotes] = useState('');

  const toggleExercise = (id: number) => {
    setExercisesList(exercisesList.map(exercise => 
      exercise.id === id ? { ...exercise, completed: !exercise.completed } : exercise
    ));
  };

  const handleSubmit = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  const completedCount = exercisesList.filter(e => e.completed).length;
  const totalCount = exercisesList.length;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back Button */}
      <Link
        to="/patient/home"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Mood & Activity Tracker</h1>
        <p className="text-gray-600 mt-1">Track your mood and complete your exercises</p>
      </div>

      {/* Confirmation Message */}
      {showConfirmation && (
        <div className="bg-[#7ED957] text-white rounded-lg p-4 flex items-center space-x-3 shadow-lg">
          <CheckCircle className="w-6 h-6 flex-shrink-0" />
          <div>
            <p className="font-semibold">Submitted Successfully! 🎉</p>
            <p className="text-sm opacity-90">Your mood and activities have been recorded.</p>
          </div>
        </div>
      )}

      {/* Mood Tracker Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Heart className="w-6 h-6 text-[#4A90E2]" />
          <h2 className="text-xl font-semibold text-gray-900">How are you feeling today?</h2>
        </div>

        {/* Mood Scale */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <span className="flex items-center space-x-1">
              <Frown className="w-4 h-4" />
              <span>Poor</span>
            </span>
            <span className="flex items-center space-x-1">
              <Meh className="w-4 h-4" />
              <span>Neutral</span>
            </span>
            <span className="flex items-center space-x-1">
              <Smile className="w-4 h-4" />
              <span>Great</span>
            </span>
          </div>

          {/* Slider */}
          <div className="relative">
            <input
              type="range"
              min="1"
              max="10"
              value={moodScore}
              onChange={(e) => setMoodScore(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #FFA500 0%, #7ED957 ${(moodScore - 1) * 11.11}%, #e5e7eb ${(moodScore - 1) * 11.11}%, #e5e7eb 100%)`
              }}
            />
          </div>

          {/* Current Mood Display */}
          <div className="text-center bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200">
            <div className="text-6xl mb-2">
              {moodEmojis[moodScore - 1].emoji}
            </div>
            <p className="text-2xl font-bold text-gray-900">{moodScore}/10</p>
            <p className="text-gray-700 mt-1">{moodEmojis[moodScore - 1].label}</p>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How was your day? Any thoughts you'd like to share..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent resize-none"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Exercise Checklist Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Exercise Checklist</h2>
          <span className="text-sm text-gray-600">
            {completedCount} of {totalCount} completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round((completedCount / totalCount) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-[#7ED957] h-3 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Exercise List */}
        <div className="space-y-3">
          {exercisesList.map((exercise) => (
            <div
              key={exercise.id}
              onClick={() => toggleExercise(exercise.id)}
              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                exercise.completed
                  ? 'bg-green-50 border-green-300'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                {exercise.completed ? (
                  <CheckCircle className="w-6 h-6 text-[#7ED957] flex-shrink-0" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-medium ${exercise.completed ? 'text-gray-900' : 'text-gray-700'}`}>
                    {exercise.name}
                  </p>
                  <p className="text-sm text-gray-500">Due: {exercise.dueDate}</p>
                </div>
              </div>
              {exercise.completed && (
                <span className="px-3 py-1 bg-[#7ED957] text-white text-xs font-medium rounded-full">
                  Completed
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleSubmit}
          className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3a7bc8] transition-colors font-medium"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Submit Today's Progress</span>
        </button>
        <Link
          to="/patient/home"
          className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
        >
          Save for Later
        </Link>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Heart className="w-5 h-5 text-[#4A90E2] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">Daily Check-in</h3>
            <p className="text-sm text-gray-700 mt-1">
              Tracking your mood and activities helps you and your therapist understand your progress better. 
              Try to complete this daily for the best results!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}