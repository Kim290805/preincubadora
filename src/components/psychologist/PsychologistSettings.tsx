import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Bell, 
  Lock, 
  LogOut, 
  Save,
  Edit2,
  Shield,
  Moon,
  Globe
} from 'lucide-react';
import { motion } from 'motion/react';

interface PsychologistSettingsProps {
  onLogout: () => void;
}

export default function PsychologistSettings({ onLogout }: PsychologistSettingsProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const [profileData, setProfileData] = useState({
    fullName: 'Dr. Juan Pérez',
    email: 'juan.perez@mindgo.com',
    phone: '+52 123 456 7890',
    licenseNumber: 'PSI-12345',
    professionalCollege: 'Colegio de Psicólogos',
    specialty: 'Psicología Clínica'
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    alertsOnly: false,
    darkMode: false,
    language: 'es'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Mock save - in production, this would be an API call
  };

  const handleLogout = () => {
    // Just call the onLogout callback - App.tsx will handle navigation
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
            <p className="text-gray-600 mt-1">Gestiona tu perfil profesional y preferencias</p>
          </div>
          <Button
            onClick={() => setShowLogoutConfirm(true)}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 bg-[#4A90E2]">
                    <AvatarFallback className="text-white text-2xl">
                      {profileData.fullName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{profileData.fullName}</CardTitle>
                    <CardDescription className="text-base">{profileData.specialty}</CardDescription>
                  </div>
                </div>
                <Button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="bg-[#4A90E2] hover:bg-[#3A7BC8]"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Editar
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nombre Completo
                  </Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Profesional
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="licenseNumber" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Número de Licencia
                  </Label>
                  <Input
                    id="licenseNumber"
                    value={profileData.licenseNumber}
                    onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="professionalCollege" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Colegio Profesional
                  </Label>
                  <Input
                    id="professionalCollege"
                    value={profileData.professionalCollege}
                    onChange={(e) => setProfileData({ ...profileData, professionalCollege: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialty" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Especialidad
                  </Label>
                  <Input
                    id="specialty"
                    value={profileData.specialty}
                    onChange={(e) => setProfileData({ ...profileData, specialty: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#4A90E2]" />
                <CardTitle>Notificaciones</CardTitle>
              </div>
              <CardDescription>Configura cómo quieres recibir alertas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificaciones por Email</p>
                  <p className="text-sm text-gray-500">Recibe alertas importantes por correo</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, emailNotifications: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificaciones Push</p>
                  <p className="text-sm text-gray-500">Alertas instantáneas en tu dispositivo</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, pushNotifications: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Solo Alertas Críticas</p>
                  <p className="text-sm text-gray-500">Recibir únicamente notificaciones urgentes</p>
                </div>
                <Switch
                  checked={settings.alertsOnly}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, alertsOnly: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Appearance & Language */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-[#4A90E2]" />
                <CardTitle>Apariencia e Idioma</CardTitle>
              </div>
              <CardDescription>Personaliza la experiencia visual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Modo Oscuro</p>
                  <p className="text-sm text-gray-500">Cambia a tema oscuro</p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, darkMode: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <div>
                    <p className="font-medium">Idioma</p>
                    <p className="text-sm text-gray-500">Español (México)</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Cambiar
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#4A90E2]" />
                <CardTitle>Seguridad</CardTitle>
              </div>
              <CardDescription>Protege tu cuenta profesional</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Lock className="w-4 h-4 mr-2" />
                Cambiar Contraseña
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Configurar Autenticación de Dos Factores
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>¿Cerrar Sesión?</CardTitle>
                <CardDescription>
                  ¿Estás seguro que deseas cerrar tu sesión profesional?
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-3">
                <Button
                  onClick={() => setShowLogoutConfirm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleLogout}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Cerrar Sesión
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}