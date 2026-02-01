import { useState } from 'react';
import { CheckCircle, Circle, Smile, Frown, Meh, Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

// Mock exercises
const exercises = [
  { id: 1, name: 'Ejercicio de Respiración Profunda', completed: true, dueDate: '16 Ene' },
  { id: 2, name: 'Registro de Pensamientos', completed: true, dueDate: '17 Ene' },
  { id: 3, name: 'Relajación Muscular Progresiva', completed: false, dueDate: '19 Ene' },
  { id: 4, name: 'Diario de Gratitud', completed: false, dueDate: '20 Ene' },
  { id: 5, name: 'Caminata Consciente', completed: false, dueDate: '21 Ene' },
];

const moodEmojis = [
  { value: 1, emoji: '😢', label: 'Muy Mal' },
  { value: 2, emoji: '😟', label: 'Mal' },
  { value: 3, emoji: '😕', label: 'Pobre' },
  { value: 4, emoji: '😐', label: 'Bajo Promedio' },
  { value: 5, emoji: '😶', label: 'Neutral' },
  { value: 6, emoji: '🙂', label: 'Regular' },
  { value: 7, emoji: '😊', label: 'Bien' },
  { value: 8, emoji: '😄', label: 'Genial' },
  { value: 9, emoji: '😁', label: 'Muy Bien' },
  { value: 10, emoji: '🤩', label: 'Excelente' },
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
        <span>Volver al Inicio</span>
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Rastreador de Ánimo y Actividades</h1>
        <p className="text-gray-600 mt-1">Registra tu estado de ánimo y completa tus ejercicios</p>
      </div>

      {/* Confirmation Message */}
      {showConfirmation && (
        <div className="bg-[#7ED957] text-white rounded-lg p-4 flex items-center space-x-3 shadow-lg">
          <CheckCircle className="w-6 h-6 flex-shrink-0" />
          <div>
            <p className="font-semibold">¡Enviado Exitosamente! 🎉</p>
            <p className="text-sm opacity-90">Tu ánimo y actividades han sido registrados.</p>
          </div>
        </div>
      )}

      {/* Mood Tracker Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Heart className="w-6 h-6 text-[#4A90E2]" />
          <h2 className="text-xl font-semibold text-gray-900">¿Cómo te sientes hoy?</h2>
        </div>

        {/* Mood Scale */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <span className="flex items-center space-x-1">
              <Frown className="w-4 h-4" />
              <span>Mal</span>
            </span>
            <span className="flex items-center space-x-1">
              <Meh className="w-4 h-4" />
              <span>Neutral</span>
            </span>
            <span className="flex items-center space-x-1">
              <Smile className="w-4 h-4" />
              <span>Genial</span>
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
              Notas Adicionales (Opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="¿Cómo fue tu día? ¿Alguna reflexión que quieras compartir..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent resize-none"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Exercise Checklist Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Lista de Ejercicios</h2>
          <span className="text-sm text-gray-600">
            {completedCount} de {totalCount} completados
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progreso</span>
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
                  <p className="text-sm text-gray-500">Vence: {exercise.dueDate}</p>
                </div>
              </div>
              {exercise.completed && (
                <span className="px-3 py-1 bg-[#7ED957] text-white text-xs font-medium rounded-full">
                  Completado
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
          <span>Enviar Progreso de Hoy</span>
        </button>
        <Link
          to="/patient/home"
          className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
        >
          Guardar para Más Tarde
        </Link>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Heart className="w-5 h-5 text-[#4A90E2] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">Revisión Diaria</h3>
            <p className="text-sm text-gray-700 mt-1">
              Rastrear tu estado de ánimo y actividades ayuda a ti y a tu terapeuta a entender mejor tu progreso. 
              Intenta completar esto diariamente para obtener los mejores resultados!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}