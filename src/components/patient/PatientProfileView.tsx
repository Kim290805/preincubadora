import { User, Settings, Bell, HelpCircle, LogOut, Award, Flame, TrendingUp, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import PatientBottomNav from './PatientBottomNav';

const patientProfile = {
  name: 'Kim Hidalgo',
  avatar: '😊',
  email: 'kim.patient@mindgo.com',
  memberSince: 'Enero 2026',
  psychologist: 'Dr. María Martínez',
  stats: {
    totalPoints: 460,
    currentStreak: 15,
    longestStreak: 22,
    completedTasks: 48,
    evaluationsCompleted: 15,
    averageMood: 7.2
  },
  achievements: [
    { id: 1, name: 'Primera Semana', icon: '🎯', unlocked: true },
    { id: 2, name: 'Racha de 7 días', icon: '🔥', unlocked: true },
    { id: 3, name: 'Racha de 15 días', icon: '⚡', unlocked: true },
    { id: 4, name: '50 Tareas', icon: '✨', unlocked: false },
    { id: 5, name: 'Racha de 30 días', icon: '🌟', unlocked: false },
    { id: 6, name: '100 Evaluaciones', icon: '🏆', unlocked: false },
  ],
  notifications: {
    dailyReminders: true,
    taskDeadlines: true,
    psychologistMessages: true,
    achievements: true
  }
};

export default function PatientProfileView() {
  const [notifications, setNotifications] = useState(patientProfile.notifications);

  const handleToggleNotification = (key: keyof typeof notifications) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('currentUsername');
    // Navigate to root which will trigger login
    window.location.href = '/';
  };

  return (
    <>
      <div className="space-y-6 pb-24 md:pb-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
        {/* Profile Header */}
        <Card className="shadow-lg border-2 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24 text-5xl border-4 border-[#4A90E2]">
                <AvatarFallback className="bg-gradient-to-br from-[#4A90E2] to-[#7ED957] text-white">
                  {patientProfile.avatar}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{patientProfile.name}</h1>
                <p className="text-gray-600">{patientProfile.email}</p>
                <p className="text-sm text-gray-500 mt-1">Miembro desde {patientProfile.memberSince}</p>
                
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <span className="text-gray-600">Tu psicólogo:</span>
                  <span className="font-semibold text-[#4A90E2]">{patientProfile.psychologist}</span>
                </div>
              </div>

              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 text-[#FFA500] mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{patientProfile.stats.totalPoints}</p>
              <p className="text-xs text-gray-600">Puntos Totales</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{patientProfile.stats.currentStreak}</p>
              <p className="text-xs text-gray-600">Racha Actual</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-[#4A90E2] mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{patientProfile.stats.completedTasks}</p>
              <p className="text-xs text-gray-600">Tareas Completadas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-[#7ED957] mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{patientProfile.stats.averageMood}</p>
              <p className="text-xs text-gray-600">Ánimo Promedio</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-2xl font-bold text-gray-900">{patientProfile.stats.evaluationsCompleted}</p>
              <p className="text-xs text-gray-600">Evaluaciones</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">🏅</div>
              <p className="text-2xl font-bold text-gray-900">{patientProfile.stats.longestStreak}</p>
              <p className="text-xs text-gray-600">Mejor Racha</p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FFA500]" />
              Logros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {patientProfile.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`text-center p-4 rounded-lg border-2 transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
                      : 'bg-gray-50 border-gray-200 opacity-50'
                  }`}
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <p className="text-xs font-medium text-gray-900">{achievement.name}</p>
                  {achievement.unlocked && (
                    <Badge className="mt-2 bg-[#7ED957] text-white text-xs">Desbloqueado</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#4A90E2]" />
              Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Recordatorios Diarios</p>
                <p className="text-sm text-gray-600">Recibe recordatorios para tu check-in</p>
              </div>
              <Switch
                checked={notifications.dailyReminders}
                onCheckedChange={() => handleToggleNotification('dailyReminders')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Fechas Límite de Tareas</p>
                <p className="text-sm text-gray-600">Alertas cuando una tarea está por vencer</p>
              </div>
              <Switch
                checked={notifications.taskDeadlines}
                onCheckedChange={() => handleToggleNotification('taskDeadlines')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Mensajes del Psicólogo</p>
                <p className="text-sm text-gray-600">Notificaciones de nuevos mensajes</p>
              </div>
              <Switch
                checked={notifications.psychologistMessages}
                onCheckedChange={() => handleToggleNotification('psychologistMessages')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Logros y Recompensas</p>
                <p className="text-sm text-gray-600">Celebra cuando desbloquees logros</p>
              </div>
              <Switch
                checked={notifications.achievements}
                onCheckedChange={() => handleToggleNotification('achievements')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="w-4 h-4 mr-2" />
              Centro de Ayuda
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Settings className="w-4 h-4 mr-2" />
              Preferencias
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Bottom Navigation */}
      <PatientBottomNav />
    </>
  );
}