import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Brain, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfessionalRegistrationProps {
  onComplete: () => void;
}

export default function ProfessionalRegistration({ onComplete }: ProfessionalRegistrationProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    professionalCollege: '',
    licenseNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock verification
    setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F5F5] to-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-[#4A90E2] p-4 rounded-full">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl">Registro Profesional</CardTitle>
            <CardDescription className="text-base">
              Completa tu información profesional para comenzar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre Completo *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Dr. Juan Pérez"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Profesional *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="doctor@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="professionalCollege">Colegio Profesional</Label>
                  <Input
                    id="professionalCollege"
                    name="professionalCollege"
                    type="text"
                    placeholder="Colegio de Psicólogos"
                    value={formData.professionalCollege}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">Número de Licencia *</Label>
                  <Input
                    id="licenseNumber"
                    name="licenseNumber"
                    type="text"
                    placeholder="PSI-12345"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#4A90E2] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  Tu información será verificada por nuestro equipo. Recibirás un correo de confirmación una vez que tu cuenta sea aprobada.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8] text-lg py-6"
                disabled={loading}
              >
                {loading ? 'Verificando Identidad...' : 'Verificar Identidad'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
