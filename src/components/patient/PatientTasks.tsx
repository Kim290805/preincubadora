import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle, 
  Circle, 
  Clock,
  ChevronRight,
  Sparkles,
  Trophy,
  Target
} from 'lucide-react';

// Mock tasks data
const mockTasks = [
  {
    id: 1,
    title: 'Ejercicio de Respiración Profunda',
    description: 'Realiza 10 minutos de respiración diafragmática. Encuentra un lugar tranquilo, siéntate cómodamente y respira profundamente, inhalando por la nariz durante 4 segundos, manteniendo 4 segundos, y exhalando por la boca durante 6 segundos.',
    icon: '🧘',
    dueDate: '2026-02-03',
    daysLeft: 2,
    completed: false,
    points: 15,
    category: 'Relajación',
    allowedFormats: ['text', 'audio', 'file', 'video']
  },
  {
    id: 2,
    title: 'Diario de Gratitud',
    description: 'Escribe 3 cosas por las que te sientas agradecido hoy. Pueden ser eventos pequeños o grandes, lo importante es reflexionar sobre aspectos positivos de tu día.',
    icon: '📝',
    dueDate: '2026-02-02',
    daysLeft: 1,
    completed: false,
    points: 10,
    category: 'Reflexión',
    allowedFormats: ['text', 'audio', 'file']
  },
  {
    id: 3,
    title: 'Actividad Física',
    description: 'Realiza 30 minutos de ejercicio moderado. Puede ser caminar, correr, yoga o cualquier actividad que disfrutes. Documenta cómo te sentiste antes y después.',
    icon: '🏃',
    dueDate: '2026-02-04',
    daysLeft: 3,
    completed: true,
    points: 20,
    category: 'Bienestar',
    allowedFormats: ['text', 'audio', 'file', 'video']
  },
  {
    id: 4,
    title: 'Técnica de Mindfulness',
    description: 'Practica 15 minutos de meditación mindfulness. Enfócate en el momento presente, observa tus pensamientos sin juzgarlos. Puedes usar una app guiada o hacerlo por tu cuenta.',
    icon: '🧠',
    dueDate: '2026-02-01',
    daysLeft: 0,
    completed: false,
    points: 15,
    category: 'Mindfulness',
    allowedFormats: ['text', 'audio']
  },
  {
    id: 5,
    title: 'Registro de Pensamientos',
    description: 'Cuando sientas ansiedad, anota el pensamiento que la desencadenó, la emoción que sentiste (del 1-10) y una alternativa más racional a ese pensamiento.',
    icon: '💭',
    dueDate: '2026-02-05',
    daysLeft: 4,
    completed: false,
    points: 12,
    category: 'Cognitivo',
    allowedFormats: ['text', 'file']
  },
];

export default function PatientTasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(mockTasks);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;
  const totalPoints = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0);

  const getTaskStatus = (dueDate: string) => {
    const today = new Date('2026-02-01');
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Vencida', color: 'text-red-600 bg-red-50 border-red-200' };
    if (diffDays === 0) return { text: 'Hoy', color: 'text-orange-600 bg-orange-50 border-orange-200' };
    if (diffDays === 1) return { text: 'Mañana', color: 'text-blue-600 bg-blue-50 border-blue-200' };
    return { text: `${diffDays} días`, color: 'text-gray-600 bg-gray-50 border-gray-200' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4A90E2] to-[#7ED957] text-white p-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() => navigate('/patient/home-new')}
          className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Volver</span>
        </button>
        
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-1">Mis Tareas</h1>
          <p className="text-sm opacity-90">Actividades terapéuticas asignadas</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-3 text-center">
            <Target className="w-5 h-5 mx-auto mb-1" />
            <p className="text-lg font-bold">{pendingCount}</p>
            <p className="text-xs opacity-90">Pendientes</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-3 text-center">
            <CheckCircle className="w-5 h-5 mx-auto mb-1" />
            <p className="text-lg font-bold">{completedCount}</p>
            <p className="text-xs opacity-90">Completadas</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-3 text-center">
            <Trophy className="w-5 h-5 mx-auto mb-1" />
            <p className="text-lg font-bold">{totalPoints}</p>
            <p className="text-xs opacity-90">Puntos</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 pb-4">
        <div className="flex gap-2 bg-white rounded-2xl p-1 shadow-md">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-2 px-4 rounded-xl font-medium text-sm transition-all ${
              filter === 'all' 
                ? 'bg-gradient-to-r from-[#4A90E2] to-[#7ED957] text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Todas ({tasks.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`flex-1 py-2 px-4 rounded-xl font-medium text-sm transition-all ${
              filter === 'pending' 
                ? 'bg-gradient-to-r from-[#4A90E2] to-[#7ED957] text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Pendientes ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`flex-1 py-2 px-4 rounded-xl font-medium text-sm transition-all ${
              filter === 'completed' 
                ? 'bg-gradient-to-r from-[#4A90E2] to-[#7ED957] text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Hechas ({completedCount})
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="px-6 space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {filter === 'completed' ? '¡No hay tareas completadas!' : '¡Todo al día!'}
            </h3>
            <p className="text-gray-600">
              {filter === 'completed' 
                ? 'Completa tus primeras tareas para ganar puntos' 
                : 'No tienes tareas pendientes en este momento'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task, index) => {
            const status = getTaskStatus(task.dueDate);
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleTask(task.id)}
                className={`bg-white rounded-2xl p-5 shadow-lg border-2 transition-all cursor-pointer ${
                  task.completed 
                    ? 'border-green-200 bg-green-50/50' 
                    : 'border-gray-100 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox Icon */}
                  <div className="mt-1">
                    {task.completed ? (
                      <CheckCircle className="w-6 h-6 text-[#7ED957]" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
                    )}
                  </div>

                  {/* Task Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{task.icon}</span>
                        <h3 className={`font-bold text-gray-900 ${task.completed ? 'line-through opacity-60' : ''}`}>
                          {task.title}
                        </h3>
                      </div>
                      {!task.completed && (
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-medium whitespace-nowrap ${status.color}`}>
                          <Clock className="w-3 h-3" />
                          {status.text}
                        </div>
                      )}
                    </div>
                    
                    <p className={`text-sm mb-3 ${task.completed ? 'text-gray-500 line-through' : 'text-gray-600'}`}>
                      {task.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Sparkles className="w-3 h-3 text-yellow-500" />
                        <span className="font-medium">{task.points} puntos</span>
                      </div>
                      
                      {task.completed ? (
                        <span className="px-3 py-1 bg-[#7ED957] text-white text-xs font-bold rounded-full">
                          ✓ Completada
                        </span>
                      ) : (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/patient/task-detail/${task.id}`);
                          }}
                          className="flex items-center gap-1 text-[#4A90E2] text-sm font-medium hover:gap-2 transition-all"
                        >
                          Ver detalles
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Motivational Card */}
      {pendingCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-6 mt-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200"
        >
          <p className="text-2xl mb-2">💪</p>
          <h3 className="font-bold text-gray-900 mb-2">¡Sigue adelante!</h3>
          <p className="text-sm text-gray-700">
            Tienes {pendingCount} {pendingCount === 1 ? 'tarea pendiente' : 'tareas pendientes'}. 
            Cada pequeño paso cuenta en tu proceso de bienestar.
          </p>
        </motion.div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 z-40">
        <div className="flex justify-around">
          <button 
            onClick={() => navigate('/patient/home-new')}
            className="flex flex-col items-center gap-1 text-gray-500"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Inicio</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[#4A90E2]">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4A90E2] to-[#7ED957] rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium">Tareas</span>
          </button>
          <button 
            onClick={() => navigate('/patient/profile')}
            className="flex flex-col items-center gap-1 text-gray-500"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
}