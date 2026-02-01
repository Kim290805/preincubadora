import { useNavigate, useLocation } from 'react-router';
import { Home, Heart, User } from 'lucide-react';

export default function PatientBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 z-40 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {/* Inicio */}
        <button 
          onClick={() => navigate('/patient/home-new')}
          className={`flex flex-col items-center gap-1 transition-all ${
            isActive('/patient/home-new') ? 'text-[#4A90E2]' : 'text-gray-500'
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
            isActive('/patient/home-new')
              ? 'bg-gradient-to-br from-[#4A90E2] to-[#7ED957]'
              : 'hover:bg-gray-100'
          }`}>
            <Home className={`w-6 h-6 ${isActive('/patient/home-new') ? 'text-white' : ''}`} />
          </div>
          <span className="text-xs font-medium">Inicio</span>
        </button>

        {/* Estado Emocional */}
        <button 
          onClick={() => navigate('/patient/emotional-state')}
          className={`flex flex-col items-center gap-1 transition-all ${
            isActive('/patient/emotional-state') ? 'text-[#4A90E2]' : 'text-gray-500'
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
            isActive('/patient/emotional-state')
              ? 'bg-gradient-to-br from-[#4A90E2] to-[#7ED957]'
              : 'hover:bg-gray-100'
          }`}>
            <Heart className={`w-6 h-6 ${isActive('/patient/emotional-state') ? 'text-white' : ''}`} />
          </div>
          <span className="text-xs font-medium">Estado</span>
        </button>

        {/* Perfil */}
        <button 
          onClick={() => navigate('/patient/profile')}
          className={`flex flex-col items-center gap-1 transition-all ${
            isActive('/patient/profile') ? 'text-[#4A90E2]' : 'text-gray-500'
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
            isActive('/patient/profile')
              ? 'bg-gradient-to-br from-[#4A90E2] to-[#7ED957]'
              : 'hover:bg-gray-100'
          }`}>
            <User className={`w-6 h-6 ${isActive('/patient/profile') ? 'text-white' : ''}`} />
          </div>
          <span className="text-xs font-medium">Perfil</span>
        </button>
      </div>
    </div>
  );
}
