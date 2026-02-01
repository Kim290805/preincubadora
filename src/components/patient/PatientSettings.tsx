import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import { 
  User, 
  Mail, 
  Calendar, 
  Bell, 
  Lock, 
  LogOut, 
  Save,
  Edit2,
  Moon,
  Volume2,
  Heart,
  Trophy,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';

interface PatientSettingsProps {
  onLogout: () => void;
}

export default function PatientSettings({ onLogout }: PatientSettingsProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const [profileData, setProfileData] = useState({
    username: 'paciente_2024',
    displayName: 'María González',
    email: 'maria@email.com',
    age: '28',
    startDate: '15 de Enero, 2025'
  });

  const [settings, setSettings] = useState({
    dailyReminders: true,
    moodTracking: true,
    soundEffects: true,
    darkMode: false,
    shareProgress: false
  });

  // Mock stats
  const stats = {
    streak: 12,
    totalEvaluations: 45,
    completionRate: 87
  };

  const handleSave = () => {
    setIsEditing(false);
    // Mock save - in production, this would be an API call
  };

  const handleLogout = () => {
    // Just call the onLogout callback - App.tsx will handle navigation
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-blue-50 p-4 pb-24">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
            <p className="text-gray-600 mt-1">Gestiona tu información y preferencias</p>
          </div>
          <Button
            onClick={() => setShowLogoutConfirm(true)}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Salir
          </Button>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="shadow-lg border-2 border-blue-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 bg-gradient-to-br from-[#4A90E2] to-[#7ED957]">
                    <AvatarFallback className="text-white text-2xl">
                      {profileData.displayName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{profileData.displayName}</CardTitle>
                    <CardDescription className="text-base">@{profileData.username}</CardDescription>
                  </div>
                </div>
                <Button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="bg-gradient-to-r from-[#4A90E2] to-[#7ED957] hover:opacity-90"
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
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                  <Trophy className="w-6 h-6 text-[#FFA500] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stats.streak}</p>
                  <p className="text-xs text-gray-600">Días de racha</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
                  <Activity className="w-6 h-6 text-[#7ED957] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stats.totalEvaluations}</p>
                  <p className="text-xs text-gray-600">Evaluaciones</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
                  <Heart className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
                  <p className="text-xs text-gray-600">Completado</p>
                </div>
              </div>

              <Separator />

              {/* Profile Fields */}
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nombre para mostrar
                  </Label>
                  <Input
                    id="displayName"
                    value={profileData.displayName}
                    onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Edad
                    </Label>
                    <Input
                      id="age"
                      value={profileData.age}
                      onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Inicio de tratamiento
                    </Label>
                    <Input
                      value={profileData.startDate}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#7ED957]" />
                <CardTitle>Mi Progreso</CardTitle>
              </div>
              <CardDescription>Tu avance en el tratamiento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Progreso del Tratamiento</span>
                  <span className="text-sm text-gray-600">40%</span>
                </div>
                <Progress value={40} className="h-3" />
                <p className="text-xs text-gray-500 mt-1">12 de 30 días completados</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Evaluaciones completadas</span>
                  <span className="font-bold text-[#4A90E2]">{stats.totalEvaluations}/60</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Racha más larga</span>
                  <span className="font-bold text-[#FFA500]">15 días 🔥</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Promedio de ánimo</span>
                  <span className="font-bold text-[#7ED957]">7.2/10 😊</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#4A90E2]" />
                <CardTitle>Recordatorios</CardTitle>
              </div>
              <CardDescription>Configura tus notificaciones diarias</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Recordatorios Diarios</p>
                  <p className="text-sm text-gray-500">Recibe avisos para completar evaluaciones</p>
                </div>
                <Switch
                  checked={settings.dailyReminders}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, dailyReminders: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Seguimiento de Ánimo</p>
                  <p className="text-sm text-gray-500">Alertas para registrar tu estado de ánimo</p>
                </div>
                <Switch
                  checked={settings.moodTracking}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, moodTracking: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Efectos de Sonido</p>
                  <p className="text-sm text-gray-500">Sonidos al completar tareas</p>
                </div>
                <Switch
                  checked={settings.soundEffects}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, soundEffects: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy & Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-[#4A90E2]" />
                <CardTitle>Privacidad y Apariencia</CardTitle>
              </div>
              <CardDescription>Personaliza tu experiencia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Modo Oscuro</p>
                  <p className="text-sm text-gray-500">Tema oscuro para la aplicación</p>
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
                <div>
                  <p className="font-medium">Compartir Progreso</p>
                  <p className="text-sm text-gray-500">Permitir que tu psicólogo vea tu progreso</p>
                </div>
                <Switch
                  checked={settings.shareProgress}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, shareProgress: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#4A90E2]" />
                <CardTitle>Seguridad</CardTitle>
              </div>
              <CardDescription>Protege tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Lock className="w-4 h-4 mr-2" />
                Cambiar Contraseña
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
                  ¿Estás seguro que deseas salir de tu cuenta?
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