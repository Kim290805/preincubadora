import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight,
  Calendar as CalendarIcon,
  Video,
  Target,
  ClipboardList,
  Clock,
  X
} from 'lucide-react';
import PatientBottomNav from './PatientBottomNav';

// Event types
type EventType = 'session' | 'task' | 'evaluation';

interface CalendarEvent {
  id: number;
  type: EventType;
  title: string;
  date: string;
  time: string;
  description: string;
  psychologistNotes?: string;
  link?: string;
}

// Mock events data
const events: CalendarEvent[] = [
  {
    id: 1,
    type: 'session',
    title: 'Sesión de Terapia',
    date: '2026-02-03',
    time: '10:00 AM',
    description: 'Sesión semanal con tu psicólogo',
    psychologistNotes: 'Revisaremos tu progreso de la semana y trabajaremos en técnicas de manejo de ansiedad.',
    link: 'https://zoom.us/j/123456789'
  },
  {
    id: 2,
    type: 'task',
    title: 'Ejercicio de Respiración',
    date: '2026-02-03',
    time: '8:00 PM',
    description: 'Completar ejercicio de respiración profunda',
    psychologistNotes: 'Recuerda hacerlo en un lugar tranquilo, durante 10 minutos.'
  },
  {
    id: 3,
    type: 'evaluation',
    title: 'Evaluación PHQ-9',
    date: '2026-02-05',
    time: '6:00 PM',
    description: 'Evaluación mensual de depresión',
    psychologistNotes: 'Es importante que completes esta evaluación para monitorear tu progreso.'
  },
  {
    id: 4,
    type: 'session',
    title: 'Sesión de Seguimiento',
    date: '2026-02-10',
    time: '10:00 AM',
    description: 'Sesión quincenal de seguimiento',
    psychologistNotes: 'Analizaremos los resultados de tus evaluaciones y ajustaremos el plan terapéutico si es necesario.',
    link: 'https://zoom.us/j/123456789'
  },
  {
    id: 5,
    type: 'task',
    title: 'Diario de Gratitud',
    date: '2026-02-02',
    time: '9:00 PM',
    description: 'Escribir 3 cosas por las que estás agradecido',
    psychologistNotes: 'Enfócate en detalles específicos de tu día.'
  },
  {
    id: 6,
    type: 'evaluation',
    title: 'Evaluación GAD-7',
    date: '2026-02-07',
    time: '7:00 PM',
    description: 'Evaluación de ansiedad',
    psychologistNotes: 'Completa esta evaluación cuando te sientas tranquilo y puedas reflexionar honestamente.'
  },
  {
    id: 7,
    type: 'task',
    title: 'Actividad Física',
    date: '2026-02-04',
    time: '6:00 AM',
    description: '30 minutos de ejercicio',
    psychologistNotes: 'Cualquier actividad que disfrutes está bien. Documenta cómo te sientes después.'
  },
];

const getEventIcon = (type: EventType) => {
  switch (type) {
    case 'session':
      return { icon: Video, emoji: '📅', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    case 'task':
      return { icon: Target, emoji: '🎯', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    case 'evaluation':
      return { icon: ClipboardList, emoji: '📝', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' };
  }
};

const getEventTypeName = (type: EventType) => {
  switch (type) {
    case 'session':
      return 'Sesión con Psicólogo';
    case 'task':
      return 'Tarea Terapéutica';
    case 'evaluation':
      return 'Evaluación Clínica';
  }
};

export default function PatientCalendar() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // February 2026
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getEventsForDate = (dateStr: string) => {
    return events.filter(event => event.date === dateStr);
  };

  const handleDateClick = (day: number) => {
    const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayEvents = getEventsForDate(dateStr);
    
    if (dayEvents.length > 0) {
      setSelectedDate(dateStr);
    }
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-20" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(dateStr);
      const isToday = dateStr === '2026-02-01'; // Mock today
      const isSelected = dateStr === selectedDate;

      days.push(
        <motion.button
          key={day}
          onClick={() => handleDateClick(day)}
          whileTap={{ scale: 0.95 }}
          className={`h-20 p-2 rounded-xl border-2 transition-all relative ${
            isSelected
              ? 'bg-gradient-to-br from-[#4A90E2] to-[#7ED957] border-[#4A90E2] text-white'
              : isToday
              ? 'bg-blue-50 border-blue-300'
              : dayEvents.length > 0
              ? 'bg-white border-gray-200 hover:border-[#4A90E2] hover:shadow-md'
              : 'bg-gray-50 border-gray-100'
          }`}
        >
          <div className="flex flex-col h-full">
            <span className={`text-sm font-bold ${isSelected ? 'text-white' : isToday ? 'text-blue-600' : 'text-gray-900'}`}>
              {day}
            </span>
            {dayEvents.length > 0 && (
              <div className="flex-1 flex flex-wrap gap-0.5 mt-1">
                {dayEvents.slice(0, 3).map((event, idx) => {
                  const eventStyle = getEventIcon(event.type);
                  return (
                    <span key={idx} className="text-xs">
                      {eventStyle.emoji}
                    </span>
                  );
                })}
                {dayEvents.length > 3 && (
                  <span className="text-xs text-gray-600">+{dayEvents.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </motion.button>
      );
    }

    return days;
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

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
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Mi Calendario</h1>
            <p className="text-sm opacity-90">Organiza tu tratamiento</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Calendar Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-lg border-2 border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={previousMonth}
              className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={nextMonth}
              className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {renderCalendarDays()}
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-lg border-2 border-gray-100"
        >
          <h3 className="font-bold text-gray-900 mb-3 text-sm">Leyenda</h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">📅</span>
              <span className="text-xs text-gray-700">Sesión</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🎯</span>
              <span className="text-xs text-gray-700">Tarea</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📝</span>
              <span className="text-xs text-gray-700">Evaluación</span>
            </div>
          </div>
        </motion.div>

        {/* Events list for selected date */}
        {selectedDate && selectedDateEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100"
          >
            <h3 className="font-bold text-gray-900 mb-3">
              Eventos del {new Date(selectedDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
            </h3>
            <div className="space-y-3">
              {selectedDateEvents.map(event => {
                const eventStyle = getEventIcon(event.type);
                const Icon = eventStyle.icon;
                
                return (
                  <motion.button
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-xl border-2 ${eventStyle.border} ${eventStyle.bg} text-left hover:shadow-md transition-all`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 ${eventStyle.bg} rounded-lg flex items-center justify-center border-2 ${eventStyle.border}`}>
                        <Icon className={`w-5 h-5 ${eventStyle.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold ${eventStyle.color} mb-1`}>{event.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <Clock className="w-3 h-3" />
                          <span>{event.time}</span>
                        </div>
                        <p className="text-sm text-gray-700">{event.description}</p>
                      </div>
                      <span className="text-2xl">{eventStyle.emoji}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Upcoming events summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5 shadow-lg border-2 border-blue-200"
        >
          <h3 className="font-bold text-gray-900 mb-3">Próximos 7 días</h3>
          <div className="space-y-2">
            {events.slice(0, 4).map(event => {
              const eventStyle = getEventIcon(event.type);
              return (
                <div key={event.id} className="flex items-center gap-3 text-sm">
                  <span className="text-lg">{eventStyle.emoji}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-600">{new Date(event.date).toLocaleDateString('es-ES')} - {event.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {(() => {
                    const eventStyle = getEventIcon(selectedEvent.type);
                    const Icon = eventStyle.icon;
                    return (
                      <div className={`w-12 h-12 ${eventStyle.bg} rounded-xl flex items-center justify-center border-2 ${eventStyle.border}`}>
                        <Icon className={`w-6 h-6 ${eventStyle.color}`} />
                      </div>
                    );
                  })()}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h3>
                    <p className="text-sm text-gray-600">{getEventTypeName(selectedEvent.type)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Date & Time */}
                <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarIcon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">Fecha y Hora</span>
                  </div>
                  <p className="text-gray-900 font-bold">
                    {new Date(selectedEvent.date).toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-gray-700">{selectedEvent.time}</p>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Descripción</h4>
                  <p className="text-gray-700">{selectedEvent.description}</p>
                </div>

                {/* Psychologist Notes */}
                {selectedEvent.psychologistNotes && (
                  <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <span>💬</span>
                      Indicaciones del Psicólogo
                    </h4>
                    <p className="text-gray-700 text-sm">{selectedEvent.psychologistNotes}</p>
                  </div>
                )}

                {/* Link for sessions */}
                {selectedEvent.link && (
                  <a
                    href={selectedEvent.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-3 rounded-xl text-center hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Video className="w-5 h-5" />
                      Unirse a la Sesión
                    </div>
                  </a>
                )}

                {/* Close button */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-full bg-gray-200 text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <PatientBottomNav />
    </div>
  );
}
