import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { User, ChevronRight, Calendar, Users, Heart, Bell, Zap } from 'lucide-react';

export default function SetupProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    reason: '',
    notificationTime: '9:00',
    gamification: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('patientProfileSetup', JSON.stringify(formData));
    navigate('/patient/baseline-assessment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#4A90E2] to-[#7ED957] rounded-2xl flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Configura tu perfil</h1>
            <p className="text-sm text-gray-600">Personaliza tu experiencia</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
          {/* Age */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4" />
              Edad
            </label>
            <input
              type="number"
              min="13"
              max="120"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#4A90E2] focus:outline-none transition-all text-base"
              placeholder="Tu edad"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4" />
              Sexo <span className="text-gray-400">(opcional)</span>
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#4A90E2] focus:outline-none transition-all text-base"
            >
              <option value="">Prefiero no decir</option>
              <option value="female">Femenino</option>
              <option value="male">Masculino</option>
              <option value="non-binary">No binario</option>
              <option value="other">Otro</option>
            </select>
          </div>

          {/* Reason */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
              <Heart className="w-4 h-4" />
              Motivo de terapia
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'anxiety', label: 'Ansiedad', emoji: '😰' },
                { value: 'depression', label: 'Depresión', emoji: '😢' },
                { value: 'stress', label: 'Estrés', emoji: '😓' },
                { value: 'other', label: 'Otro', emoji: '💭' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, reason: option.value })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.reason === option.value
                      ? 'border-[#4A90E2] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{option.emoji}</div>
                  <div className="text-sm font-medium">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Notification Time */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Bell className="w-4 h-4" />
              Horario preferido para notificaciones
            </label>
            <select
              value={formData.notificationTime}
              onChange={(e) => setFormData({ ...formData, notificationTime: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#4A90E2] focus:outline-none transition-all text-base"
            >
              <option value="9:00">Mañana (9:00 AM)</option>
              <option value="14:00">Tarde (2:00 PM)</option>
              <option value="20:00">Noche (8:00 PM)</option>
            </select>
          </div>

          {/* Gamification Level */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
              <Zap className="w-4 h-4" />
              Nivel de gamificación
            </label>
            <div className="space-y-2">
              {[
                { value: 'low', label: 'Bajo', desc: 'Sin presión, a tu ritmo', emoji: '🐢' },
                { value: 'medium', label: 'Medio', desc: 'Balance perfecto', emoji: '🐰' },
                { value: 'high', label: 'Alto', desc: 'Desafíos motivadores', emoji: '🚀' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, gamification: option.value })}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    formData.gamification === option.value
                      ? 'border-[#7ED957] bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{option.emoji}</span>
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </div>
                    {formData.gamification === option.value && (
                      <div className="w-6 h-6 bg-[#7ED957] rounded-full flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* Bottom Button */}
      <div className="p-6 bg-white border-t border-gray-200">
        <button
          onClick={handleSubmit}
          disabled={!formData.age || !formData.reason}
          className="w-full bg-gradient-to-r from-[#4A90E2] to-[#7ED957] text-white font-bold py-4 rounded-2xl hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Guardar y continuar
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
