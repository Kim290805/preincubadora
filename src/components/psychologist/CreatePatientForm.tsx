import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { UserPlus, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface CreatePatientFormProps {
  onComplete: (credentials: { username: string; password: string }) => void;
  onBack: () => void;
}

export default function CreatePatientForm({ onComplete, onBack }: CreatePatientFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    mainReason: '',
    duration: '30',
    observations: ''
  });
  const [loading, setLoading] = useState(false);

  // Generate patient ID
  const patientId = `PAC-${Date.now().toString().slice(-6)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock credential generation
    setTimeout(() => {
      const username = formData.username || `paciente_${Date.now().toString().slice(-4)}`;
      const password = `temp${Math.floor(Math.random() * 10000)}`;
      
      setLoading(false);
      onComplete({ username, password });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Dashboard
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-[#4A90E2] p-4 rounded-full">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl">Crear Nuevo Paciente</CardTitle>
              <CardDescription className="text-base">
                Completa la información del paciente para generar sus credenciales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient ID (auto-generated) */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <Label className="text-sm text-gray-700 mb-1 block">ID del Paciente (Autogenerado)</Label>
                  <p className="text-xl font-mono font-bold text-[#4A90E2]">{patientId}</p>
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username">Usuario *</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="nombre_paciente"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    El paciente usará este usuario para iniciar sesión
                  </p>
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age">Edad *</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={handleChange}
                    min="1"
                    max="120"
                    required
                  />
                </div>

                {/* Main Reason */}
                <div className="space-y-2">
                  <Label htmlFor="mainReason">Motivo Principal *</Label>
                  <Textarea
                    id="mainReason"
                    name="mainReason"
                    placeholder="Ansiedad generalizada, dificultad para dormir..."
                    value={formData.mainReason}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <Label htmlFor="duration">Duración Estimada del Tratamiento *</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la duración" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 días</SelectItem>
                      <SelectItem value="60">60 días</SelectItem>
                      <SelectItem value="90">90 días</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Observations */}
                <div className="space-y-2">
                  <Label htmlFor="observations">Observaciones</Label>
                  <Textarea
                    id="observations"
                    name="observations"
                    placeholder="Notas adicionales sobre el paciente..."
                    value={formData.observations}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                {/* Submit button */}
                <Button 
                  type="submit" 
                  className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8] text-lg py-6"
                  disabled={loading}
                >
                  {loading ? 'Generando Credenciales...' : 'Generar Credenciales'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
