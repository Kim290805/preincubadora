import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { User, Camera, Bell, Heart } from 'lucide-react';

const avatarOptions = [
  '😊', '😌', '🙂', '😄', '🌟', '🌈', '🦋', '🌸', '🌺', '🌻'
];

const notificationTimes = [
  { value: '8', label: '8:00 AM - Mañana' },
  { value: '12', label: '12:00 PM - Mediodía' },
  { value: '18', label: '6:00 PM - Tarde' },
  { value: '21', label: '9:00 PM - Noche' }
];

export default function PatientProfileSetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    avatar: '😊',
    photoUrl: '',
    notificationTime: '18',
    interests: '',
    motivations: ''
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save profile and navigate to first baseline evaluation
      navigate('/patient/baseline-evaluation');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Configura tu Perfil</CardTitle>
          <CardDescription>
            Paso {step} de 3 - Personaliza tu experiencia en MindGo
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <Label className="text-base">Elige tu Avatar</Label>
                <div className="flex justify-center">
                  <Avatar className="w-24 h-24 text-4xl">
                    <AvatarFallback className="bg-gradient-to-br from-[#4A90E2] to-[#7ED957] text-white">
                      {formData.avatar}
                    </AvatarFallback>
                    {formData.photoUrl && <AvatarImage src={formData.photoUrl} />}
                  </Avatar>
                </div>
                
                <div className="grid grid-cols-5 gap-3 max-w-sm mx-auto">
                  {avatarOptions.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setFormData({ ...formData, avatar: emoji })}
                      className={`p-3 text-2xl rounded-lg border-2 transition-all ${
                        formData.avatar === emoji
                          ? 'border-[#4A90E2] bg-blue-50 scale-110'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => {
                      // Mock photo upload
                      alert('Función de subir foto próximamente');
                    }}
                  >
                    <Camera className="w-4 h-4" />
                    O sube una foto
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-5 h-5 text-[#4A90E2]" />
                  <Label className="text-base">Horario de Notificaciones</Label>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  ¿A qué hora te gustaría recibir recordatorios para tu check-in diario?
                </p>
                
                <Select 
                  value={formData.notificationTime}
                  onValueChange={(value) => setFormData({ ...formData, notificationTime: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {notificationTimes.map((time) => (
                      <SelectItem key={time.value} value={time.value}>
                        {time.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-gray-700">
                    💡 <strong>Consejo:</strong> Elige un horario en el que normalmente estés disponible 
                    y tengas unos minutos para reflexionar sobre tu día.
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-[#4A90E2]" />
                  <Label className="text-base">Cuéntanos sobre ti</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="interests">¿Qué te gusta hacer? (Opcional)</Label>
                  <Textarea
                    id="interests"
                    placeholder="Ej: Leer, caminar, escuchar música, pintar..."
                    value={formData.interests}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivations">¿Qué te motiva a usar MindGo? (Opcional)</Label>
                  <Textarea
                    id="motivations"
                    placeholder="Ej: Quiero sentirme mejor, entender mis emociones, mejorar mi bienestar..."
                    value={formData.motivations}
                    onChange={(e) => setFormData({ ...formData, motivations: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    🌟 Esta información nos ayuda a personalizar tu experiencia, 
                    pero puedes omitirla si prefieres.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                Anterior
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90"
            >
              {step === 3 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
