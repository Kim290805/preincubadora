import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { 
  User, 
  Heart, 
  Bell, 
  Zap,
  ChevronRight,
  Calendar,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';

interface PatientProfileSetupNewProps {
  onComplete: () => void;
}

export default function PatientProfileSetupNew({ onComplete }: PatientProfileSetupNewProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    therapyReason: '',
    notificationTime: 'morning',
    gamificationLevel: 'medium'
  });

  const therapyReasons = [
    { value: 'anxiety', label: 'Ansiedad', icon: '😰' },
    { value: 'depression', label: 'Depresión', icon: '😢' },
    { value: 'stress', label: 'Estrés', icon: '😓' },
    { value: 'other', label: 'Otro', icon: '💭' }
  ];

  const notificationTimes = [
    { value: 'morning', label: 'Mañana', time: '8:00 AM - 12:00 PM' },
    { value: 'afternoon', label: 'Tarde', time: '12:00 PM - 6:00 PM' },
    { value: 'evening', label: 'Noche', time: '6:00 PM - 10:00 PM' }
  ];

  const gamificationLevels = [
    { 
      value: 'low', 
      label: 'Bajo', 
      description: 'Sin presión, a tu ritmo',
      icon: '🐢'
    },
    { 
      value: 'medium', 
      label: 'Medio', 
      description: 'Balance perfecto',
      icon: '🐰'
    },
    { 
      value: 'high', 
      label: 'Alto', 
      description: 'Desafíos motivadores',
      icon: '🚀'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile data
    localStorage.setItem('patientProfile', JSON.stringify(formData));
    navigate('/patient/baseline-evaluation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-blue-50 p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        <Card className="shadow-2xl border-2 border-blue-100">
          <CardHeader className="text-center border-b border-gray-100 pb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-[#4A90E2] to-[#7ED957] p-4 rounded-full">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl">Configura tu Perfil</CardTitle>
            <CardDescription className="text-base">
              Personaliza tu experiencia en MindGo
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Age & Gender */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age" className="flex items-center gap-2 text-base">
                    <Calendar className="w-4 h-4" />
                    Edad
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min="13"
                    max="120"
                    placeholder="Tu edad"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="flex items-center gap-2 text-base">
                    <Users className="w-4 h-4" />
                    Sexo (Opcional)
                  </Label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A90E2] text-base"
                  >
                    <option value="">Prefiero no decir</option>
                    <option value="female">Femenino</option>
                    <option value="male">Masculino</option>
                    <option value="non-binary">No binario</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
              </div>

              {/* Therapy Reason */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-base">
                  <Heart className="w-4 h-4" />
                  Motivo de Terapia
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {therapyReasons.map((reason) => (
                    <motion.div
                      key={reason.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <label
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.therapyReason === reason.value
                            ? 'border-[#4A90E2] bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="therapyReason"
                          value={reason.value}
                          checked={formData.therapyReason === reason.value}
                          onChange={(e) => setFormData({ ...formData, therapyReason: e.target.value })}
                          className="sr-only"
                          required
                        />
                        <span className="text-2xl">{reason.icon}</span>
                        <span className="font-medium">{reason.label}</span>
                      </label>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Notification Time */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-base">
                  <Bell className="w-4 h-4" />
                  Horario Preferido para Notificaciones
                </Label>
                <RadioGroup
                  value={formData.notificationTime}
                  onValueChange={(value) => setFormData({ ...formData, notificationTime: value })}
                  className="space-y-3"
                >
                  {notificationTimes.map((time) => (
                    <div key={time.value} className="flex items-center space-x-3">
                      <RadioGroupItem value={time.value} id={time.value} />
                      <Label
                        htmlFor={time.value}
                        className="flex-1 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium">{time.label}</div>
                        <div className="text-sm text-gray-500">{time.time}</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Gamification Level */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-base">
                  <Zap className="w-4 h-4" />
                  Nivel de Gamificación
                </Label>
                <p className="text-sm text-gray-600">
                  ¿Qué tanto te motivan las recompensas y desafíos?
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  {gamificationLevels.map((level) => (
                    <motion.div
                      key={level.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <label
                        className={`flex flex-col items-center p-5 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.gamificationLevel === level.value
                            ? 'border-[#7ED957] bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="gamificationLevel"
                          value={level.value}
                          checked={formData.gamificationLevel === level.value}
                          onChange={(e) => setFormData({ ...formData, gamificationLevel: e.target.value })}
                          className="sr-only"
                        />
                        <span className="text-3xl mb-2">{level.icon}</span>
                        <span className="font-bold text-lg mb-1">{level.label}</span>
                        <span className="text-xs text-gray-600 text-center">{level.description}</span>
                      </label>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="flex-1"
                >
                  Volver
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90"
                >
                  Continuar
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}